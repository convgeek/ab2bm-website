import { describe, it, expect, vi, beforeEach } from 'vitest'

// --- Hoisted mocks (vitest hoists vi.mock to top, variables must use vi.hoisted) ---

const { insertMock, fromMock } = vi.hoisted(() => {
  const insertMock = vi.fn().mockResolvedValue({ error: null })
  const fromMock = vi.fn(() => ({ insert: insertMock }))
  return { insertMock, fromMock }
})

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({ from: fromMock }),
}))

const fetchMock = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({}),
})
vi.stubGlobal('fetch', fetchMock)

// Import after mocks are set up
import { submitInquiry } from '@/lib/actions/submit-inquiry'

const validPayload = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  company: 'Acme Corp',
  programType: 'advance-content' as const,
  message: 'Hello',
}

describe('submitInquiry server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    insertMock.mockResolvedValue({ error: null })
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) })
    // Set env vars for integration
    process.env.HUBSPOT_PORTAL_ID = 'test-portal'
    process.env.HUBSPOT_INQUIRY_FORM_GUID = 'test-form-guid'
    process.env.HUBSPOT_PRIVATE_APP_TOKEN = 'test-token'
    process.env.DEV_MOCK_HUBSPOT = ''
  })

  it('validates required fields with zod schema — returns error on missing email', async () => {
    const result = await submitInquiry({
      firstName: 'Jane',
      lastName: 'Doe',
      email: '',
      company: 'Acme',
      programType: 'general',
    })
    expect(result).toHaveProperty('error')
    const err = result as { error: Record<string, string[]> }
    expect(err.error).toHaveProperty('email')
  })

  it('validates programType is one of: content-syndication, webinar, general', async () => {
    const result = await submitInquiry({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      company: 'Acme',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      programType: 'unknown' as any,
    })
    expect(result).toHaveProperty('error')
    const err = result as { error: Record<string, string[]> }
    expect(err.error).toHaveProperty('programType')
  })

  it('writes to Supabase inquiries table — Supabase error does not block HubSpot call', async () => {
    insertMock.mockRejectedValueOnce(new Error('DB error'))
    const result = await submitInquiry(validPayload)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('api.hsforms.com'),
      expect.any(Object)
    )
    expect(result).toEqual({ success: true })
  })

  it('submits to HubSpot Forms API with correct field mapping', async () => {
    await submitInquiry(validPayload)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('api.hsforms.com/submissions'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    )
    const callArgs = fetchMock.mock.calls.find((c: unknown[]) =>
      (c[0] as string).includes('hsforms.com')
    )
    const body = JSON.parse((callArgs![1] as RequestInit).body as string)
    const fields: Array<{ name: string; value: string }> = body.fields
    expect(fields.find((f) => f.name === 'email')?.value).toBe('jane@example.com')
  })

  it('creates HubSpot deal with program_type property', async () => {
    await submitInquiry(validPayload)
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('api.hubspot.com/crm/v3/objects/deals'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('Bearer'),
        }),
      })
    )
  })

  it('returns { success: true } on successful dual-write', async () => {
    const result = await submitInquiry(validPayload)
    expect(result).toEqual({ success: true })
  })

  it('returns error when HubSpot Forms API returns 4xx', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 400, json: async () => ({}) })
    const result = await submitInquiry(validPayload)
    expect(result).toHaveProperty('error')
    expect((result as { error: string }).error).toMatch(/hubspot/i)
  })
})
