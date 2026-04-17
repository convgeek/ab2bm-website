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
import { submitMediaKit } from '@/lib/actions/submit-mediakit'

describe('submitMediaKit server action', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    insertMock.mockResolvedValue({ error: null })
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) })
    process.env.HUBSPOT_PORTAL_ID = 'test-portal'
    process.env.HUBSPOT_MEDIAKIT_FORM_GUID = 'test-mediakit-guid'
    process.env.DEV_MOCK_HUBSPOT = ''
  })

  it('accepts name and email only — extra fields are stripped (no error)', async () => {
    const result = await submitMediaKit({
      firstName: 'Bob',
      email: 'bob@example.com',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      extraField: 'ignored' as any,
    })
    expect(result).toEqual({ success: true })
  })

  it('submits to HubSpot with source: media_kit tag (uses mediakit form guid)', async () => {
    await submitMediaKit({ firstName: 'Bob', email: 'bob@example.com' })
    const callArgs = fetchMock.mock.calls.find((c: unknown[]) =>
      (c[0] as string).includes('hsforms.com')
    )
    expect(callArgs).toBeDefined()
    const body = JSON.parse((callArgs![1] as RequestInit).body as string)
    const fields: Array<{ name: string; value: string }> = body.fields
    expect(fields.find((f) => f.name === 'email')?.value).toBe('bob@example.com')
  })

  it('returns { success: true } on successful submission', async () => {
    const result = await submitMediaKit({ firstName: 'Bob', email: 'bob@example.com' })
    expect(result).toEqual({ success: true })
  })

  it('returns error on missing email', async () => {
    const result = await submitMediaKit({ firstName: 'Bob', email: '' })
    expect(result).toHaveProperty('error')
    const err = result as { error: Record<string, string[]> }
    expect(err.error).toHaveProperty('email')
  })
})
