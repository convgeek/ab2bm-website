import { describe, it } from 'vitest'

describe('submitInquiry server action', () => {
  it.todo('validates required fields with zod schema — returns error on missing email')
  it.todo('validates programType is one of: content-syndication, webinar, general')
  it.todo('writes to Supabase inquiries table — Supabase error does not block HubSpot call')
  it.todo('submits to HubSpot Forms API with correct field mapping')
  it.todo('creates HubSpot deal with program_type property')
  it.todo('returns { success: true } on successful dual-write')
})
