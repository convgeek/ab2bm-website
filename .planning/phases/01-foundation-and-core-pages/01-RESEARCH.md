# Phase 1: Foundation and Core Pages — Research

**Researched:** 2026-04-17
**Domain:** Next.js 15 / Sanity v3 / HubSpot CRM / Supabase — B2B marketing site build
**Confidence:** HIGH (stack confirmed by prior project research + official docs); MEDIUM (HubSpot dual-write pattern, Tailwind v4/shadcn compatibility)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFRA-01 | Site built on Next.js 15 App Router, deployed to Vercel | Next.js 15 scaffold pattern, Vercel deployment via git push |
| INFRA-02 | Sanity v3 integrated via `next-sanity` and `defineLive()` | `defineLive()` + `sanityFetch` + `SanityLive` pattern confirmed |
| INFRA-03 | Non-technical staff can edit all content through Sanity Studio | Sanity Studio embedded at `/studio`, Visual Editing via Draft Mode |
| INFRA-04 | GTM installed via `@next/third-parties` | `GoogleTagManager` component in root layout — confirmed pattern |
| INFRA-05 | Supabase configured with `inquiries` table as audit log | `@supabase/ssr` server client for server actions confirmed |
| HOME-01 | Hero section naming IT decision-makers AND MSPs/MSSPs | MSP/MSSP whitespace confirmed by competitor research — content differentiator |
| HOME-02 | Client/partner logo strip below hero | Standard B2B pattern; logo data from Ab2bm, no technical complexity |
| HOME-03 | Programs overview section with CTAs to program detail pages | 3-column card pattern from competitor analysis; Sanity-managed content |
| HOME-04 | Audience statistics section with quantified claims | Placeholder stats at Phase 1; real numbers gated on Phase 2 content delivery |
| HOME-05 | Case study or testimonial highlight | Single Sanity-managed testimonial document at minimum |
| HOME-06 | Blog/resources preview (3 most recent posts) | GROQ query for latest 3 posts; Phase 1 can use placeholder content |
| HOME-07 | Conversion section (inquiry CTA + media kit download) | Two-path CTA architecture — inquiry form + media kit form |
| PROG-01 | Content syndication program — deliverables, targeting, campaign structure | Sanity-managed `program` document type with rich text mechanics field |
| PROG-02 | Webinar program — deliverables, co-hosting, campaign structure | Same `program` document type; Phase 1 content authored by CG |
| PROG-03 | Program-specific inquiry CTA pre-identifying program type in HubSpot | URL param or hidden form field (`program_type`) passed to server action |
| PROG-04 | Program descriptions explain mechanics, not just outcomes | Content strategy constraint — enforced via Sanity field descriptions and validation |
| ABUT-01 | Company story and mission on About page | Static content; Sanity-managed |
| ABUT-02 | Team section with real names and photos | Sanity `teamMember` document type |
| ABUT-03 | Conversational Geek partnership surfaced on About page | Dedicated section in About page; Sanity-managed |
| CONV-01 | Inquiry form via HubSpot Forms API — Next.js Server Action, no `hbspt` embed | `submissions/v3/integration/submit/{portalId}/{formGuid}` POST from server action |
| CONV-02 | Inquiry form creates HubSpot deal with program type, company, contact | Two-step server action: Forms API submit → CRM `POST /crm/v3/objects/deals` |
| CONV-03 | Media kit download form — name + email only | Separate low-friction form; HubSpot Forms API with `source: media_kit` tag |
| CONV-04 | Media kit download submits to HubSpot as contact with media kit source tag | Same server action pattern as CONV-01 with different form GUID |
| CONV-05 | Every program page has program-specific CTA routed to inquiry form | `?program=content-syndication` query param read by form component to pre-fill |
</phase_requirements>

---

## Summary

Phase 1 builds the entire technical foundation of the Ab2bm website: Next.js 15 App Router scaffold with Sanity v3 CMS, Supabase audit log, HubSpot CRM integration, Google Tag Manager, and Vercel deployment — plus the homepage, programs page, about page, and full conversion layer. All of this can be built without waiting on external content (audience stats, logo permissions, case studies) which are gated to Phase 2.

The stack is fully decided and prior project research has already characterized all major libraries. This research phase refines that into Phase 1-specific implementation patterns: how `defineLive()` wires Sanity to Next.js, how the HubSpot dual-write (Forms API + CRM deals) works from a server action, how the Supabase insert fits in the same action, and what Tailwind v4 + shadcn/ui compatibility looks like in a greenfield Next.js 15 project.

The most technically complex element in Phase 1 is the conversion layer (CONV-01 through CONV-05). The form server action must: (1) validate with Zod, (2) write to Supabase, (3) submit to HubSpot Forms API to create/update a contact, and (4) POST to HubSpot CRM API to create a deal with program type. All four steps must handle independent failure modes. This is the highest-risk task in Phase 1.

**Primary recommendation:** Build in the order of the 5 planned work units — scaffold first, then homepage, programs, about, and conversion layer last. The conversion layer depends on Sanity content (program names) existing to build the pre-selection mechanism; building it last avoids rework.

---

## Standard Stack

### Core (All Decided — No Alternatives to Evaluate)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (App Router) | Framework + SSR/ISR | Decided. App Router stable. `sanityFetch` + ISR is the correct CMS integration pattern. |
| Vercel | — | Hosting + CDN + preview deployments | Decided. Native Next.js support, preview URLs per branch, edge network. |
| TypeScript | 5.x | Type safety | `create-next-app` default; Sanity generates types from schema. |
| Sanity | v3 (Studio v3) | Headless CMS | Decided. Embedded Studio at `/studio`, Visual Editing, free at this scale. |
| next-sanity | 12.x | Sanity toolkit for Next.js | `defineLive()` is the canonical ISR + Draft Mode integration. Requires v11+. |
| Supabase | 2.x + `@supabase/ssr` | `inquiries` table audit log | Decided. Use `@supabase/ssr` not deprecated `auth-helpers`. |
| Tailwind CSS | v4.x | Styling | CSS-first config. No `tailwind.config.ts`. `@tailwindcss/postcss` required. |
| shadcn/ui | latest | Component primitives | Supports Tailwind v4 via `npx shadcn@latest init`. |

### Forms and CRM

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-hook-form | 7.x | Client-side form state | All forms. Minimal re-renders; integrates with shadcn/ui `Form` components. |
| zod | 3.x | Schema validation | Shared between client (`@hookform/resolvers/zod`) and server action. |
| @hookform/resolvers | 3.x | zod resolver for react-hook-form | Required to connect zod schema to react-hook-form. |

### Analytics

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| @next/third-parties | bundled | GTM + GA4 | `GoogleTagManager` component in root layout. Load GTM only — not GA4 directly. |

### Content Rendering

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| @portabletext/react | 3.x | Render Sanity Portable Text | Required for any rich-text body copy fields from Sanity. |
| @sanity/image-url | latest | Responsive image URLs from Sanity CDN | Use for all images stored in Sanity assets. |
| groq | 3.x | Typed GROQ queries | TypeScript autocomplete for GROQ in VS Code. |

### SEO

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| next-sitemap | 4.x | Sitemap + robots.txt | Run as `postbuild` script. B2B SEO requirement. |

### Installation

```bash
# Scaffold (if greenfield)
npx create-next-app@latest ab2bm-website --typescript --tailwind --app --src-dir

# CMS
npm install next-sanity @sanity/client @sanity/image-url groq @portabletext/react

# Forms and validation
npm install react-hook-form @hookform/resolvers zod

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# shadcn/ui (after Tailwind is set up)
npx shadcn@latest init

# SEO
npm install next-sitemap

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── (site)/              # Public site routes
│   │   ├── page.tsx         # Homepage
│   │   ├── programs/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
│   ├── studio/
│   │   └── [[...tool]]/     # Sanity Studio embedded route
│   │       └── page.tsx
│   ├── api/
│   │   └── draft-mode/      # Draft mode enable/disable endpoints
│   │       ├── enable/
│   │       └── disable/
│   └── layout.tsx           # Root layout — SanityLive + GTM here
├── components/
│   ├── ui/                  # shadcn/ui primitives (auto-generated)
│   ├── sections/            # Page section components (Hero, LogoStrip, etc.)
│   └── forms/               # InquiryForm, MediaKitForm
├── sanity/
│   ├── lib/
│   │   ├── client.ts        # Configured Sanity client
│   │   ├── live.ts          # defineLive() exports
│   │   └── queries.ts       # GROQ queries
│   ├── schemas/             # All document and object type definitions
│   │   ├── documents/       # page, program, teamMember, testimonial
│   │   └── objects/         # heroSection, logoStrip, seoMeta, etc.
│   └── sanity.config.ts     # Studio config + schema registration
├── lib/
│   ├── supabase/
│   │   └── server.ts        # createServerClient() helper
│   └── actions/
│       ├── submit-inquiry.ts # Server action: validate → Supabase → HubSpot
│       └── submit-mediakit.ts
└── types/
    └── sanity.ts            # Auto-generated from `sanity typegen generate`
```

### Pattern 1: Sanity Live Content (`defineLive`)

**What:** `next-sanity`'s `defineLive()` returns `sanityFetch` (server component data fetcher) and `SanityLive` (root layout component). Together they handle ISR revalidation when content is published, plus real-time draft preview when Draft Mode is active.

**When to use:** Every server component that reads CMS data. All homepage sections, program descriptions, team members, testimonials.

**`sanity/lib/live.ts`:**
```typescript
// Source: https://github.com/sanity-io/agent-toolkit/blob/main/skills/sanity-best-practices/references/nextjs.md
import { defineLive } from 'next-sanity'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: '2026-02-01' }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
```

**`app/layout.tsx` (root layout):**
```typescript
// SanityLive MUST be in root layout — activates live updates
import { SanityLive } from '@/sanity/lib/live'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import { GoogleTagManager } from '@next/third-parties/google'

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
```

**Server component usage:**
```typescript
// Source: sanity-io/agent-toolkit nextjs.md
const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY })
```

**Critical caveat — `stegaClean()`:** When a Sanity string field is used in logic (conditionals, CSS class names), wrap it in `stegaClean()` before comparison. Visual Editing injects invisible encoding markers into strings that will break string equality checks.

### Pattern 2: HubSpot Dual-Write Server Action

**What:** A single Next.js Server Action validates form data with Zod, writes to Supabase (fire-and-forget audit log), submits to HubSpot Forms API (creates/updates contact), then POSTs to HubSpot CRM API to create a deal. Failures in HubSpot do NOT roll back the Supabase write.

**When to use:** Inquiry form and media kit download form submissions.

**Submit endpoint (HubSpot Forms API):**
```
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
Content-Type: application/json
```

**Payload:**
```json
{
  "fields": [
    { "name": "email", "value": "user@example.com" },
    { "name": "firstname", "value": "Jane" },
    { "name": "company", "value": "Acme Corp" },
    { "name": "program_type", "value": "content-syndication" }
  ],
  "context": {
    "hutk": "...",
    "pageUri": "https://advanceb2bmedia.com/programs",
    "pageName": "Programs"
  }
}
```

**Deal creation (HubSpot CRM API v3):**
```
POST https://api.hubspot.com/crm/v3/objects/deals
Authorization: Bearer {HUBSPOT_PRIVATE_APP_TOKEN}
Content-Type: application/json

{
  "properties": {
    "dealname": "Inquiry — Jane Doe / Acme Corp",
    "dealstage": "appointmentscheduled",
    "pipeline": "default",
    "program_type__c": "content-syndication"
  },
  "associations": [{ "to": { "id": "{contactId}" }, "types": [...] }]
}
```

**Server action structure (`lib/actions/submit-inquiry.ts`):**
```typescript
'use server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const InquirySchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  programType: z.enum(['content-syndication', 'webinar', 'general']),
  message: z.string().optional(),
})

export async function submitInquiry(formData: z.infer<typeof InquirySchema>) {
  const parsed = InquirySchema.safeParse(formData)
  if (!parsed.success) return { error: parsed.error.flatten() }

  // 1. Supabase audit log (independent — does not gate HubSpot)
  const supabase = createClient()
  await supabase.from('inquiries').insert({
    email: parsed.data.email,
    company: parsed.data.company,
    program_type: parsed.data.programType,
    raw_payload: parsed.data,
    created_at: new Date().toISOString(),
  })

  // 2. HubSpot Forms API — create/update contact
  const hsFormsRes = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_INQUIRY_FORM_GUID}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: [
          { name: 'email', value: parsed.data.email },
          { name: 'firstname', value: parsed.data.firstName },
          { name: 'company', value: parsed.data.company },
          { name: 'program_type', value: parsed.data.programType },
        ],
        context: { pageUri: 'https://advanceb2bmedia.com/programs' },
      }),
    }
  )

  // 3. HubSpot CRM API — create deal
  await fetch('https://api.hubspot.com/crm/v3/objects/deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        dealname: `Inquiry — ${parsed.data.firstName} / ${parsed.data.company}`,
        dealstage: 'appointmentscheduled',
        pipeline: 'default',
      },
    }),
  })

  return { success: true }
}
```

### Pattern 3: Program Pre-Selection via URL Param

**What:** Each program page CTA links to the inquiry form with a `?program=` query parameter. The form component reads this on mount and pre-populates the hidden `programType` field, so every HubSpot submission knows which program the visitor was reading.

**When to use:** All "Inquire about this program" CTAs on the programs page.

```typescript
// On programs page:
<Link href="/contact?program=content-syndication">Start a Conversation</Link>

// In the InquiryForm component:
const searchParams = useSearchParams()
const defaultProgram = searchParams.get('program') ?? 'general'
```

### Pattern 4: Sanity Schema for Site Content

**What:** Document types for each content area, using `defineType` + `defineField`. Singleton documents (e.g., homepage settings) use `__experimental_actions` to prevent creation of multiple instances.

**Homepage document schema (abbreviated):**
```typescript
import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // singleton — no create/delete
  fields: [
    defineField({ name: 'heroHeadline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'heroSubheadline', type: 'text', title: 'Hero Subheadline' }),
    defineField({ name: 'heroCta', type: 'string', title: 'Hero CTA Label' }),
    defineField({
      name: 'clientLogos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'mechanics', type: 'array', of: [{ type: 'block' }] }), // Portable Text — mechanics description
    defineField({ name: 'deliverables', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'ctaLabel', type: 'string' }),
  ],
})
```

### Pattern 5: Supabase Server Client in Server Actions

**What:** Use `@supabase/ssr`'s `createServerClient` (not `createClient` from `@supabase/supabase-js` directly) inside server actions. The SSR package handles cookie-based session correctly in App Router.

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

**Supabase `inquiries` table schema:**
```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company text,
  program_type text,
  source text default 'inquiry',  -- 'inquiry' | 'media_kit'
  raw_payload jsonb,
  created_at timestamptz default now()
);
```

### Anti-Patterns to Avoid

- **`hbspt.forms.create()` embed:** Injects jQuery-dependent form into React. Causes CSP violations and layout shift. Never use. Always use HubSpot Forms API from a server action.
- **`next-hubspot` npm package:** Uses `--legacy-peer-deps` workaround; not compatible with Next.js 15 without hacks. Use custom server actions instead.
- **Loading GA4 directly alongside GTM:** Causes duplicate pageview and event tracking. Load GTM only; configure GA4 as a tag inside GTM.
- **`@supabase/auth-helpers-nextjs`:** Deprecated. Use `@supabase/ssr` in all new Next.js 15 App Router projects.
- **`stegaClean()` omission:** Forgetting to clean Sanity strings before using them in conditionals or class names will cause rendering bugs when Visual Editing is active.
- **Singleton documents without `__experimental_actions`:** Without locking `create`/`delete`, editors can accidentally create duplicate homepages, causing data fetching to be non-deterministic.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sanity ISR + cache revalidation | Custom webhook → revalidateTag | `defineLive()` + `SanityLive` | `next-sanity` handles all revalidation automatically on publish; custom webhooks require additional infrastructure |
| Form state management | Custom useState form | react-hook-form + shadcn/ui `<Form>` | Error handling, validation, loading states, accessibility — all solved |
| Schema validation (client + server) | Separate client/server schemas | Single zod schema with `safeParse` | DRY; same schema runs in browser (via resolver) and server action |
| Image optimization from Sanity CDN | Manual URL construction | `@sanity/image-url` `urlFor()` | Handles crop/hotspot, format negotiation, width params correctly |
| GTM script loading | Manual `<script>` tag | `@next/third-parties` `GoogleTagManager` | Handles performance timing (loads after hydration), no duplicate tags |
| Portable Text rendering | Custom block renderer | `@portabletext/react` | Handles all Sanity block types, marks, annotations correctly |
| Sitemap generation | Manual XML construction | `next-sitemap` post-build | Handles dynamic routes, lastmod, robots.txt automatically |

---

## Common Pitfalls

### Pitfall 1: `hutk` Cookie Missing from HubSpot Form Submission

**What goes wrong:** Form submits to HubSpot but the contact record has no browsing history or attribution. The `hutk` value in the context object is what HubSpot uses to stitch the form submission to prior page visits tracked by the GTM/HubSpot tracking pixel.

**Why it happens:** Server actions cannot read browser cookies directly. The `hutk` value (from the `hubspotutk` cookie) must be sent from the client to the server action as part of the form payload.

**How to avoid:** Read `document.cookie` on the client before form submission, extract `hubspotutk`, and pass it as a hidden field. The server action includes it in the `context.hutk` field.

**Warning signs:** HubSpot contacts have no "Original source" or "First page seen" data.

---

### Pitfall 2: Sanity Singleton Documents Without Action Locking

**What goes wrong:** Editors in Sanity Studio accidentally create a second homepage document. GROQ query returns the wrong one (or both). Page renders incorrectly.

**Why it happens:** By default, Sanity allows creating multiple instances of any document type.

**How to avoid:** Add `__experimental_actions: ['update', 'publish']` to the schema for singleton documents (homepage, site settings). This removes the "Create" and "Delete" buttons in Studio.

**Warning signs:** GROQ query for homepage returns an array with more than one result.

---

### Pitfall 3: Supabase Insert Blocking HubSpot Submission

**What goes wrong:** If Supabase is slow or throws an error, the HubSpot API call is never reached. The form appears to submit but no CRM deal is created.

**Why it happens:** Sequential `await` calls in the server action — if step 1 (Supabase) throws, step 2 (HubSpot) never runs.

**How to avoid:** Wrap the Supabase insert in a `try/catch` that logs the error but does not re-throw. HubSpot submission proceeds regardless. The audit log is secondary; the CRM entry is primary.

**Warning signs:** Supabase insert errors silently blocking HubSpot submissions.

---

### Pitfall 4: Tailwind v4 Class Autocomplete Not Working

**What goes wrong:** VS Code doesn't autocomplete Tailwind classes. Developers fall back to custom CSS or write incorrect utility names.

**Why it happens:** Tailwind v4 CSS-first config (`@import "tailwindcss"` in globals.css) requires the Tailwind CSS IntelliSense extension to detect the new format. If the extension is outdated or the project structure deviates from expected paths, autocomplete fails.

**How to avoid:** Ensure VS Code Tailwind CSS IntelliSense extension is v0.12+ (supports Tailwind v4 detection). The CSS entry point must be explicitly referenced in the VS Code settings or in the PostCSS config.

**Warning signs:** No class suggestions when typing `class="` in JSX. Custom CSS appearing in the codebase where utility classes should be used.

---

### Pitfall 5: shadcn/ui Init Conflict with Tailwind v4

**What goes wrong:** `npx shadcn@latest init` fails or writes a `tailwind.config.ts` that conflicts with the CSS-first Tailwind v4 setup.

**Why it happens:** Some versions of the shadcn CLI still attempt to write v3-compatible configuration. The `shadcn@latest` tag should resolve to a v4-compatible version, but this has had bugs (GitHub issues #6522, #7952 in shadcn-ui repo).

**How to avoid:** Always use `npx shadcn@latest init` (not a pinned old version). If the init fails or writes a `tailwind.config.ts`, delete it and follow the CSS-variable path in `globals.css`. The CSS variables (`--background`, `--foreground`, etc.) go in `:root` and are referenced in `@theme inline` block. Confidence: MEDIUM — verify this works at scaffold time.

**Warning signs:** `tailwind.config.ts` file appears in the project root after `npx shadcn@latest init`. Components don't pick up CSS custom properties.

---

### Pitfall 6: Homepage Blog Preview Section Empty at Phase 1 Launch

**What goes wrong:** `HOME-06` requires a blog/resources preview with 3 most recent posts. At Phase 1, no blog content exists (blog is Phase 2). An empty section looks unfinished.

**Why it happens:** The homepage section queries for latest posts before any posts are published.

**How to avoid:** The blog preview GROQ query should return gracefully when no posts exist. The section should be conditionally rendered: if 0 posts returned, render nothing (no empty grid). At Phase 1 launch, this section is intentionally absent from the rendered page. Phase 2 populates it.

**Warning signs:** Empty card grid or "Coming soon" placeholder in the live homepage.

---

### Pitfall 7: HubSpot Private App Token vs. Forms API — Two Auth Systems

**What goes wrong:** Developers confuse the two HubSpot integrations needed and use the wrong credentials for each.

**Why it happens:** The Forms API (`api.hsforms.com/submissions/v3/...`) uses the Portal ID + Form GUID and does NOT require an Authorization header for the non-secure endpoint. The CRM API (`api.hubspot.com/crm/v3/objects/deals`) requires `Authorization: Bearer {HUBSPOT_PRIVATE_APP_TOKEN}`.

**How to avoid:** Keep the two integrations clearly separated in the server action. Forms API = no token (or hapikey for secure variant). CRM Deals API = Private App Token in Authorization header. Name env vars clearly: `HUBSPOT_PORTAL_ID`, `HUBSPOT_INQUIRY_FORM_GUID`, `HUBSPOT_MEDIAKIT_FORM_GUID`, `HUBSPOT_PRIVATE_APP_TOKEN`.

---

## Code Examples

### GROQ Query — Homepage Data

```typescript
// Source: confirmed Sanity GROQ pattern from sanity-io/agent-toolkit
import { defineQuery } from 'groq'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCta,
    clientLogos[]{
      asset->{ url },
      alt
    },
    programsOverview[]->{
      _id,
      name,
      slug,
      tagline,
      ctaLabel
    },
    audienceStats[]{
      label,
      value,
      footnote
    },
    testimonialHighlight->{
      quote,
      attribution,
      role,
      company
    }
  }
`)

// Usage in server component:
const { data: homepage } = await sanityFetch({ query: HOMEPAGE_QUERY })
```

### GROQ Query — Programs Page

```typescript
export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program"] | order(order asc) {
    _id,
    name,
    slug,
    tagline,
    mechanics,
    deliverables,
    ctaLabel
  }
`)
```

### Sanity Studio Embedded Route

```typescript
// app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### GTM in Root Layout

```typescript
// Source: https://nextjs.org/docs/app/guides/third-party-libraries
import { GoogleTagManager } from '@next/third-parties/google'

// In <body> — loads after hydration, correct timing
<GoogleTagManager gtmId="GTM-XXXXXXX" />
```

### Draft Mode Enable Route

```typescript
// app/api/draft-mode/enable/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/sanity/lib/client'

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client,
    request.url
  )
  if (!isValid) return new Response('Invalid secret', { status: 401 })
  ;(await draftMode()).enable()
  redirect(redirectTo)
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` | 2023–2024 | New package required for App Router server actions |
| `tailwind.config.ts` JS config | CSS-first `@theme` directive in globals.css | Tailwind v4 (Jan 2025) | No config file; all theming in CSS |
| `hbspt.forms.create()` embed | HubSpot Forms API POST from server action | Next.js 13+ App Router era | No jQuery, no CSP issues, full control |
| `next-sanity` manual webhook revalidation | `defineLive()` + `SanityLive` | next-sanity v11 (2024) | Automatic ISR revalidation on Sanity publish |
| Separate Sanity Studio deployment | Studio embedded in Next.js at `/studio` | Sanity Studio v3 | Same domain, no separate hosting |
| `sanity@v2` | Sanity Studio v3 | 2022–2023 | React 18+/19 compatible; different schema API |

**Deprecated/outdated:**
- `@supabase/auth-helpers-nextjs`: Deprecated. Replace with `@supabase/ssr`.
- `next-hubspot` npm package: Not compatible with Next.js 15 without `--legacy-peer-deps`. Use custom server actions.
- Direct `gtag.js` script: Replaced by `@next/third-parties` `GoogleTagManager`.
- HubSpot API keys (non-private-app): Deprecated by HubSpot. Use Private App tokens.

---

## Open Questions

1. **HubSpot Portal ID, Form GUIDs, and Private App Token**
   - What we know: These are required env vars for CONV-01 through CONV-04. The HubSpot Free account must be created and two forms must be set up (inquiry form, media kit form) before the server actions can be tested end-to-end.
   - What's unclear: Has Ab2bm already set up a HubSpot Free account? Do forms exist, or must they be created as part of the build?
   - Recommendation: Confirm with Ab2bm before starting Plan 01-05 (conversion layer). If the HubSpot account doesn't exist, it is a prerequisite. Mock the HubSpot calls with a flag during development.

2. **Sanity Project ID and Dataset**
   - What we know: A Sanity project must be created at sanity.io and the project ID + dataset name must be in `.env.local`.
   - What's unclear: Whether this has been provisioned already.
   - Recommendation: Create the Sanity project as part of Plan 01-01 (scaffold). Run `npx sanity@latest init` inside the project to provision.

3. **Supabase Project and `inquiries` Table**
   - What we know: The table schema is defined. A Supabase project must be created and the URL + anon key must be in `.env.local`.
   - What's unclear: Whether a Supabase project has been provisioned.
   - Recommendation: Create as part of Plan 01-01. The `inquiries` table migration is part of the scaffold task.

4. **shadcn/ui + Tailwind v4 Init Compatibility**
   - What we know: As of 2026, `npx shadcn@latest init` claims Tailwind v4 support. GitHub issues (#6522, #7952) document past friction.
   - What's unclear: Whether the current `shadcn@latest` handles the init cleanly on a `create-next-app` with Tailwind v4 without manual intervention.
   - Recommendation: Test the init command at scaffold time. If it writes a `tailwind.config.ts`, delete it and manually wire CSS variables into `globals.css`. Flag this as a risk in Plan 01-01.

5. **Homepage Blog Preview (HOME-06) at Phase 1**
   - What we know: HOME-06 is a Phase 1 requirement but blog content is Phase 2.
   - What's unclear: Whether the planner intends the section to be present but empty, or present but hidden when no posts exist.
   - Recommendation: Build the section to render conditionally — hidden if 0 posts returned. Document in the plan that it will be invisible at Phase 1 launch and populated in Phase 2.

---

## Validation Architecture

> `nyquist_validation` is `true` in `.planning/config.json` — this section is included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — greenfield project, no tests exist |
| Config file | None — Wave 0 task creates it |
| Quick run command | `npm run test -- --passWithNoTests` (once configured) |
| Full suite command | `npm run test` |

**Note:** This is a Next.js marketing site. Most testable behaviors are UI rendering and integration flows (form submission, Sanity data fetching). Unit tests are thin; the meaningful validation is visual/functional QA per section. Recommend Playwright for end-to-end smoke tests rather than unit tests.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFRA-01 | Next.js 15 App Router builds and deploys | smoke | `npm run build` | ❌ Wave 0 |
| INFRA-02 | `sanityFetch` returns data from Sanity | integration | `npm run test -- sanity` | ❌ Wave 0 |
| INFRA-04 | GTM script tag present in rendered HTML | smoke | `npx playwright test --grep "gtm"` | ❌ Wave 0 |
| INFRA-05 | Supabase insert writes a row to `inquiries` | integration | `npm run test -- supabase` | ❌ Wave 0 |
| CONV-01 | Form submission calls HubSpot Forms API | integration | `npm run test -- hubspot-forms` | ❌ Wave 0 |
| CONV-02 | Server action creates a HubSpot deal | integration | `npm run test -- hubspot-deals` | ❌ Wave 0 |
| CONV-03 | Media kit form accepts name + email only | unit | `npm run test -- media-kit-form` | ❌ Wave 0 |
| CONV-05 | `?program=` param pre-selects program in form | unit | `npm run test -- program-preselect` | ❌ Wave 0 |
| HOME-01 | Hero renders with MSP/MSSP text | e2e | `npx playwright test --grep "hero"` | ❌ Wave 0 |
| PROG-03 | Program CTA links include `?program=` param | e2e | `npx playwright test --grep "program-cta"` | ❌ Wave 0 |

**Practical validation approach for a marketing site:** The highest-value validation is manual functional QA per section (does it render, does the form submit, does HubSpot receive the deal). Automated tests should focus on the server action logic (zod validation, error handling) and the most critical e2e flows (form submission round-trip).

### Sampling Rate

- **Per task commit:** `npm run build` (confirms no TypeScript or build errors)
- **Per wave merge:** `npm run build && npx playwright test` (full smoke suite)
- **Phase gate:** Full build passes + Vercel preview URL reviewed for all 5 pages before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `playwright.config.ts` — Playwright e2e test config
- [ ] `tests/smoke/homepage.spec.ts` — covers HOME-01 through HOME-07
- [ ] `tests/smoke/programs.spec.ts` — covers PROG-01 through PROG-05
- [ ] `tests/unit/submit-inquiry.test.ts` — covers CONV-01, CONV-02 (mocked HubSpot)
- [ ] `tests/unit/submit-mediakit.test.ts` — covers CONV-03, CONV-04
- [ ] Framework install: `npm install -D @playwright/test && npx playwright install`

---

## Sources

### Primary (HIGH confidence)
- `sanity-io/agent-toolkit` nextjs.md — `defineLive()` pattern, `SanityLive` root layout placement, `stegaClean()` requirement
- `https://www.sanity.io/docs/nextjs` — Sanity Next.js integration overview
- `https://nextjs.org/docs/app/guides/third-party-libraries` — `@next/third-parties` `GoogleTagManager` pattern
- `https://supabase.com/docs/guides/auth/server-side/nextjs` — `@supabase/ssr` App Router setup
- `https://ui.shadcn.com/docs/tailwind-v4` — shadcn/ui Tailwind v4 compatibility status
- `.planning/research/STACK.md` — Full stack decision rationale (project prior research)
- `.planning/research/ARCHITECTURE.md` — Competitor messaging architecture
- `.planning/research/PITFALLS.md` — B2B site anti-patterns from 14 competitor observations
- `.planning/research/FEATURES.md` — Feature landscape from competitor analysis

### Secondary (MEDIUM confidence)
- `https://developers.hubspot.com/blog/a-developers-guide-to-hubspot-crm-objects-deals-object` — HubSpot CRM v3 deals endpoint and payload structure
- `https://gist.github.com/Addono/605244ae0a4586718abacc6deda0c838` — HubSpot Forms API Next.js endpoint pattern
- WebSearch findings on HubSpot `submissions/v3/integration/submit` endpoint — payload shape including `hutk` in context
- WebSearch findings on Tailwind v4 shadcn/ui compatibility — CSS-first `@theme` config, shadcn CLI v4 support

### Tertiary (LOW confidence)
- GitHub issues #6522 and #7952 in `shadcn-ui/ui` — past incompatibility between shadcn CLI and Tailwind v4; may be resolved in latest version

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries confirmed by prior project research + official docs cross-reference
- Architecture patterns: HIGH — `defineLive()` confirmed from official Sanity agent-toolkit docs; HubSpot patterns confirmed from official API docs
- Pitfalls: HIGH — most from prior research observing 14 competitors; Phase 1-specific pitfalls (hutk, singleton docs, shadcn init) MEDIUM

**Research date:** 2026-04-17
**Valid until:** 2026-05-17 (stable stack; Tailwind v4/shadcn compatibility may shift faster — re-check at scaffold time)
