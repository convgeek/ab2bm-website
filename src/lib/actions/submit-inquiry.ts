'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const InquirySchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(1, 'Company is required'),
  programType: z.enum(['advance-engage', 'advance-abm', 'advance-install', 'advance-bant', 'advance-expand', 'webinar', 'general']),
  message: z.string().optional(),
  hutk: z.string().optional(), // HubSpot tracking cookie — sent from client
})

type InquiryInput = z.input<typeof InquirySchema>

type SubmitInquiryResult =
  | { success: true; dev?: boolean }
  | { error: string | Record<string, string[]> }

export async function submitInquiry(data: InquiryInput): Promise<SubmitInquiryResult> {
  // 1. Validate with Zod
  const parsed = InquirySchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { firstName, lastName, email, company, programType, message, hutk } = parsed.data

  // 2. Dev mode bypass — skip HubSpot if env vars not set
  const isDev =
    process.env.DEV_MOCK_HUBSPOT === 'true' || !process.env.HUBSPOT_PORTAL_ID

  if (isDev) {
    console.warn('[submitInquiry] HUBSPOT_PORTAL_ID not set — skipping HubSpot calls (dev mode)')
    // Still attempt Supabase write for local dev
    try {
      const supabase = await createClient()
      await supabase.from('inquiries').insert({
        email,
        company,
        program_type: programType,
        source: 'inquiry',
        raw_payload: { firstName, lastName, email, company, programType, message },
      })
    } catch (err) {
      console.error('[submitInquiry] Supabase insert error (dev mode):', err)
    }
    return { success: true, dev: true }
  }

  // 3. Supabase insert (fire-and-forget — failure must NOT block HubSpot)
  try {
    const supabase = await createClient()
    await supabase.from('inquiries').insert({
      email,
      company,
      program_type: programType,
      source: 'inquiry',
      raw_payload: { firstName, lastName, email, company, programType, message },
    })
  } catch (err) {
    console.error('[submitInquiry] Supabase insert error:', err)
    // Intentionally NOT re-throwing — Supabase failure must not block HubSpot
  }

  // 4. HubSpot Forms API (NO Authorization header — uses portalId + formGuid in URL)
  // Research pitfall: Forms API auth-free endpoint
  const portalId = process.env.HUBSPOT_PORTAL_ID!
  const formGuid = process.env.HUBSPOT_INQUIRY_FORM_GUID!
  const formsUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const formsPayload = {
    fields: [
      { name: 'firstname', value: firstName },
      { name: 'lastname', value: lastName },
      { name: 'email', value: email },
      { name: 'company', value: company },
      { name: 'program_type', value: programType },
      ...(message ? [{ name: 'message', value: message }] : []),
    ],
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri: 'https://advanceb2bmedia.com/contact',
      pageName: 'Contact',
    },
  }

  const formsRes = await fetch(formsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formsPayload),
  })

  if (!formsRes.ok) {
    console.error('[submitInquiry] HubSpot Forms API error:', formsRes.status)
    return { error: 'HubSpot submission failed' }
  }

  // 5. HubSpot CRM Deals API (Bearer token required)
  const crmUrl = 'https://api.hubspot.com/crm/v3/objects/deals'
  const dealPayload = {
    properties: {
      dealname: `${firstName} ${lastName} — ${programType}`,
      dealstage: 'new_inquiry',
      pipeline: 'website-inquiries',
      program_type__c: programType,
      hubspot_owner_id: '',
    },
    associations: [],
  }

  const crmRes = await fetch(crmUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
    },
    body: JSON.stringify(dealPayload),
  })

  if (!crmRes.ok) {
    // CRM deal failure is logged but does not fail the submission
    // The contact was already created via Forms API
    console.error('[submitInquiry] HubSpot CRM deal creation error:', crmRes.status)
  }

  return { success: true }
}
