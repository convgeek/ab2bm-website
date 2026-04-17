'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const MediaKitSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
})

type MediaKitInput = z.input<typeof MediaKitSchema>

type SubmitMediaKitResult =
  | { success: true; dev?: boolean }
  | { error: string | Record<string, string[]> }

export async function submitMediaKit(data: MediaKitInput): Promise<SubmitMediaKitResult> {
  // 1. Validate — zod strips unknown fields by default
  const parsed = MediaKitSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { firstName, email, company } = parsed.data

  // 2. Dev mode bypass
  const isDev =
    process.env.DEV_MOCK_HUBSPOT === 'true' || !process.env.HUBSPOT_PORTAL_ID

  if (isDev) {
    console.warn('[submitMediaKit] HUBSPOT_PORTAL_ID not set — skipping HubSpot calls (dev mode)')
    try {
      const supabase = await createClient()
      await supabase.from('inquiries').insert({
        email,
        company: company ?? null,
        source: 'media_kit',
        raw_payload: { firstName, email, company },
      })
    } catch (err) {
      console.error('[submitMediaKit] Supabase insert error (dev mode):', err)
    }
    return { success: true, dev: true }
  }

  // 3. Supabase insert (fire-and-forget)
  try {
    const supabase = await createClient()
    await supabase.from('inquiries').insert({
      email,
      company: company ?? null,
      source: 'media_kit',
      raw_payload: { firstName, email, company },
    })
  } catch (err) {
    console.error('[submitMediaKit] Supabase insert error:', err)
  }

  // 4. HubSpot Forms API — uses mediakit form guid, no Authorization header
  const portalId = process.env.HUBSPOT_PORTAL_ID!
  const formGuid = process.env.HUBSPOT_MEDIAKIT_FORM_GUID!
  const formsUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`

  const formsPayload = {
    fields: [
      { name: 'firstname', value: firstName },
      { name: 'email', value: email },
      ...(company ? [{ name: 'company', value: company }] : []),
      { name: 'lead_source', value: 'media_kit' },
    ],
    context: {
      pageUri: 'https://advanceb2bmedia.com/contact',
      pageName: 'Contact — Media Kit',
    },
  }

  const formsRes = await fetch(formsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formsPayload),
  })

  if (!formsRes.ok) {
    console.error('[submitMediaKit] HubSpot Forms API error:', formsRes.status)
    return { error: 'HubSpot submission failed' }
  }

  return { success: true }
}
