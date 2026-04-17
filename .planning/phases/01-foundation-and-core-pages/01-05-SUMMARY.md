---
phase: 01-foundation-and-core-pages
plan: "05"
subsystem: forms
tags: [hubspot, supabase, react-hook-form, zod, server-actions, forms, crm, lead-capture]

# Dependency graph
requires:
  - phase: 01-01
    provides: Next.js scaffold, Supabase client (createClient), env var wiring
  - phase: 01-03
    provides: program type values (content-syndication, webinar, general), Programs page ?program= CTA links

provides:
  - /contact page with InquiryForm and MediaKitForm
  - submitInquiry server action (zod validation + Supabase dual-write + HubSpot Forms API + HubSpot CRM deal)
  - submitMediaKit server action (zod validation + Supabase dual-write + HubSpot Forms API with media_kit source)
  - ?program= pre-selection from Programs page CTAs
  - FormConfirmation component for post-submit feedback
  - Unit tests covering dual-write isolation (Supabase failure does not block HubSpot)
  - E2e stubs for form render, media kit form, and ?program= pre-selection

affects:
  - phase-2 (depends on HubSpot deal pipeline being provisioned and HUBSPOT_* env vars being set before end-to-end verification)
  - programs page (CTA links already use ?program= — now connected to InquiryForm defaultProgram prop)

# Tech tracking
tech-stack:
  added: [react-hook-form, @hookform/resolvers, zod (schema reuse between server actions and client forms)]
  patterns:
    - Server action dual-write pattern (Supabase fire-and-forget + HubSpot required path)
    - DEV_MOCK_HUBSPOT env var to skip external calls during local development
    - HubSpot auth separation: Forms API uses no auth header; CRM Deals API uses Bearer token
    - ?program= URL param drives defaultProgram prop through server component → client form

key-files:
  created:
    - src/lib/actions/submit-inquiry.ts
    - src/lib/actions/submit-mediakit.ts
    - src/components/forms/InquiryForm.tsx
    - src/components/forms/MediaKitForm.tsx
    - src/components/forms/FormConfirmation.tsx
    - src/app/(site)/contact/page.tsx
    - tests/unit/submit-inquiry.test.ts
    - tests/unit/submit-mediakit.test.ts
    - tests/e2e/conversion.spec.ts
  modified: []

key-decisions:
  - "Supabase failure is fire-and-forget — try/catch logs error but does not block HubSpot submission (CONV-02 requirement)"
  - "HubSpot Forms API requires no Authorization header; CRM Deals API requires Bearer HUBSPOT_PRIVATE_APP_TOKEN (distinct auth paths)"
  - "DEV_MOCK_HUBSPOT=true skips all external HubSpot calls in local dev — returns { success: true, dev: true } so UI flow can be developed without credentials"
  - "hutk cookie read in useEffect on client side and injected as hidden field before submission (HubSpot Pitfall 1 — tracking attribution)"
  - "Task 3 end-to-end HubSpot + Supabase verification deferred to a later session pending HubSpot account setup and HUBSPOT_* env vars"

patterns-established:
  - "Server action dual-write: try/catch Supabase insert first (fire-and-forget), then required external API call with error propagation"
  - "DEV_MOCK_HUBSPOT pattern: check HUBSPOT_PORTAL_ID presence before making external calls, return success stub in dev"
  - "Form pre-selection via URL param: searchParams.program passed server-component → client form as defaultProgram prop"

requirements-completed: [CONV-01, CONV-02, CONV-03, CONV-04, CONV-05]

# Metrics
duration: ~25min
completed: 2026-04-17
---

# Phase 01 Plan 05: Conversion Layer Summary

**Inquiry and media kit forms at /contact with Next.js server actions dual-writing to Supabase (fire-and-forget) and HubSpot (Forms API + CRM deals), with ?program= pre-selection from Programs page CTAs — end-to-end verification deferred pending HubSpot credentials**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-04-17
- **Completed:** 2026-04-17
- **Tasks:** 2 of 3 complete (Task 3 deferred — see below)
- **Files modified:** 9

## Accomplishments

- `submitInquiry` server action with zod validation, Supabase insert (isolated from failures), HubSpot Forms API POST, and HubSpot CRM deal creation
- `submitMediaKit` server action with same pattern, `media_kit` source tag, no CRM deal (top-of-funnel contact only)
- `/contact` page hosting InquiryForm and MediaKitForm; pre-selects program type from `?program=` URL param
- Unit tests covering all validation paths and Supabase failure isolation (HubSpot still called when Supabase throws)
- E2e test stubs covering form render, media kit field set, and `?program=content-syndication` pre-selection

## Task Commits

Each task was committed atomically:

1. **Task 1: Implement server actions with full dual-write logic and unit tests** - `06027e9` (feat)
2. **Task 2: Build contact page, form components, and fill in conversion e2e stubs** - `3f0a047` (feat)
3. **Task 3: End-to-end HubSpot + Supabase verification** - DEFERRED (see below)

## Files Created/Modified

- `src/lib/actions/submit-inquiry.ts` — Server action: zod validate → Supabase insert (fire-and-forget) → HubSpot Forms API → HubSpot CRM deal
- `src/lib/actions/submit-mediakit.ts` — Server action: same pattern, media_kit source, no deal creation
- `src/components/forms/InquiryForm.tsx` — react-hook-form + zod, all inquiry fields, hutk cookie injection, ?program= pre-selection
- `src/components/forms/MediaKitForm.tsx` — Minimal form (firstName + email), `data-testid="mediakit-form"`
- `src/components/forms/FormConfirmation.tsx` — Post-submit feedback for inquiry and media-kit types
- `src/app/(site)/contact/page.tsx` — Server component passing searchParams.program to InquiryForm
- `tests/unit/submit-inquiry.test.ts` — Unit tests: validation, Supabase isolation, HubSpot mocking
- `tests/unit/submit-mediakit.test.ts` — Unit tests: validation, success path
- `tests/e2e/conversion.spec.ts` — E2e tests: form render, media kit fields, ?program= pre-selection

## Decisions Made

- Supabase failure is fire-and-forget — `try/catch` logs but does not re-throw, so HubSpot always runs (CONV-02 requirement)
- HubSpot auth is split: Forms API (`api.hsforms.com`) uses no Authorization header; CRM Deals API (`api.hubspot.com`) uses `Bearer HUBSPOT_PRIVATE_APP_TOKEN`
- `DEV_MOCK_HUBSPOT=true` skips all HubSpot calls in local dev, returns `{ success: true, dev: true }` — allows full UI development without credentials
- `hutk` HubSpot tracking cookie is read client-side in `useEffect` and set as a hidden field before form submission

## Deviations from Plan

None - plan executed exactly as written for Tasks 1 and 2.

## Deferred Items

### Task 3: End-to-end HubSpot + Supabase Verification

**Status:** Deferred by user — requires HubSpot account setup and credentials not yet available.

**What to do when resuming:**

1. Set up HubSpot account and configure forms + deal pipeline per the plan's `user_setup` section:
   - Create "Website Inquiry" form with fields: `email`, `firstname`, `lastname`, `company`, `program_type`, `message`
   - Create "Media Kit Download" form with fields: `email`, `firstname`, `company`
   - Create a deal pipeline named "Website Inquiries" with stage "New Inquiry"
   - Create a Private App with CRM scopes: `crm.objects.deals.write`, `crm.objects.contacts.write`

2. Add to `.env.local`:
   ```
   HUBSPOT_PORTAL_ID=
   HUBSPOT_INQUIRY_FORM_GUID=
   HUBSPOT_MEDIAKIT_FORM_GUID=
   HUBSPOT_PRIVATE_APP_TOKEN=
   ```

3. Verify Supabase `inquiries` table exists (see 01-01-SUMMARY.md for schema SQL).

4. Run `npm run dev` and follow the manual verification checklist from the plan:
   - Visit `/contact` — confirm both forms visible
   - Visit `/contact?program=content-syndication` — confirm "Content Syndication" pre-selected
   - Visit `/contact?program=webinar` — confirm "Webinar" pre-selected
   - Submit inquiry form with valid data — verify HubSpot contact + deal appear, and Supabase row inserted
   - Submit media kit form — verify HubSpot contact created with media_kit source tag
   - Test validation: invalid email shows inline error; missing required fields show field-level errors

5. Once verified, update STATE.md to mark CONV-01 through CONV-05 as fully verified.

## User Setup Required

**HubSpot configuration required before end-to-end testing.** See `user_setup` block in `01-05-PLAN.md` for:
- Environment variables to add to `.env.local`
- HubSpot form creation steps (Portal ID, Form GUIDs, Private App Token)
- Deal pipeline creation

## Next Phase Readiness

- All conversion layer code is committed and unit-tested
- Forms UI is complete and functional (with DEV_MOCK_HUBSPOT=true)
- Phase 1 code is complete; end-to-end HubSpot verification is the only outstanding item
- Phase 2 can begin once HubSpot credentials are configured and Task 3 verification is completed

---
*Phase: 01-foundation-and-core-pages*
*Completed: 2026-04-17*
