# Phase 3: Differentiator and Launch-Ready - Research

**Researched:** 2026-04-19
**Domain:** Next.js 16 App Router — dynamic routes, Sanity CMS schema expansion, nav dropdown, Core Web Vitals
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Branded Program Names**
- The five core branded programs are: ADVANCE ENGAGE, ADVANCE ABM, ADVANCE INSTALL, ADVANCE BANT, ADVANCE EXPAND
- Webinar program is still actively offered — needs its own dedicated page alongside the 5 ADVANCE programs
- Source of truth for all program copy (taglines, How it Works, What You Get, Best For) is `docs/AB2B_Services_Portfolio.md`
- Seed Sanity with portfolio doc content directly — it is final copy; Ab2bm refines later in Studio

**Program Pages (scope expansion — was 2 programs, now 6)**
- Build individual program landing pages for all 6 programs: ADVANCE ENGAGE, ADVANCE ABM, ADVANCE INSTALL, ADVANCE BANT, ADVANCE EXPAND, and Webinar
- URL structure: `/programs/advance-engage`, `/programs/advance-abm`, `/programs/advance-install`, `/programs/advance-bant`, `/programs/advance-expand`, `/programs/webinar`
- `/programs` index page becomes an overview grid of all 6 programs (cards/tiles with tagline), each linking to its individual page
- Individual page structure per portfolio doc: Hero (name + tagline) → Solution Overview → How the Program Works (bullets) → What You Get (bullets) → Best For → Optional Ingredients module (shared) → CTA
- Each program CTA routes to the inquiry form with program pre-selected (existing CONV-05 pattern)
- All program content managed through Sanity CMS

**Methodology Page**
- Single page at `/methodology`
- Three distinct labeled sections: Audience Building, ADVANCE ENGAGE / Content Syndication Process, Webinar Program Process
- Tone: mechanics-first, plain English — step-by-step how things work, no marketing fluff
- References ADVANCE program names directly within mechanics explanations
- Sanity-managed — Ab2bm can update without touching code
- Content sourced from portfolio doc's "Audience & Infrastructure" and per-program "How the Program Works" sections

**Navigation Update**
- Programs becomes a dropdown listing all 6 programs by name (linking to individual pages)
- Final nav structure: Home | Programs ▾ | Methodology | Audience | Resources | About | Contact
- Audience (/audience) and Resources/Blog (/blog) added as top-level nav items
- Mobile nav (MobileMenu client component) needs corresponding updates

**Core Web Vitals**
- Validate LCP < 2.5s, CLS < 0.1, INP < 200ms across all pages on Vercel production

### Claude's Discretion
- Optional Ingredients module design (shared across program pages) — reuse existing card/list patterns
- Compliance block (GDPR/CASL/CCPA) placement on program pages — include or link to methodology
- Program Management block placement — include on programs pages or methodology only
- Exact dropdown implementation for Programs nav item (hover vs click, animation style)
- Webinar program copy — no source in portfolio doc; use existing Phase 1 fallback content as base and structure it to match ADVANCE program page format

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| METH-01 | Methodology page explains how Ab2bm's audience is built, engaged, and qualified (distinguishes from scraped databases) | New `/methodology` page with Sanity schema `methodologyPage`; Audience Building section driven by 6-activity model from portfolio doc |
| METH-02 | Methodology page explains content syndication mechanics — how a lead is qualified and delivered | ADVANCE ENGAGE / Content Syndication Process section in methodology page; sourced from portfolio doc "How the Program Works" |
| METH-03 | Methodology page explains webinar program mechanics — promotion, registration, attendance, lead delivery | Webinar Program Process section in methodology page; use Phase 1 fallback webinar copy as base |
| METH-04 | Programs are referred to with named/branded framework names (not just generic "content syndication") | Site-wide rename: 6 individual program pages + `/programs` index refactor + nav dropdown + methodology page all use ADVANCE ENGAGE / ABM / INSTALL / BANT / EXPAND + Webinar branding |
| INFRA-06 | Site passes Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms) on Vercel production | Lighthouse CI on Vercel preview, `@vercel/speed-insights` for field data, `next/image` / font optimization audit |
</phase_requirements>

---

## Summary

Phase 3 has three distinct workstreams: (1) expanding the Sanity-managed content model to support 6 individual program pages plus a methodology page, (2) refactoring the programs routes from a single flat page to a `/programs/[slug]` dynamic route and overhauling the `/programs` index, and (3) updating the navigation and passing Core Web Vitals on production. All three workstreams must land together for launch.

The existing codebase provides strong scaffolding. The `program` Sanity schema exists but only covers the original 2-program flat layout; it needs new fields (`solutionOverview`, `howItWorks`, `whatYouGet`, `bestFor`, `optionalIngredients`) and its `programType` enum must be expanded to the 6 new values. The `SiteHeader` uses a flat `navLinks` array — the dropdown implementation is pure React state + CSS (no dependency already provides this; the project chose @base-ui/react v1.4 which has no Sheet, so the same pattern — custom client component state — applies to the dropdown). Core Web Vitals validation is the final wave: run Lighthouse CI on Vercel preview, check `next/image` usage on all new pages, and confirm no layout shift from font loading.

**Primary recommendation:** Use a single `src/app/(site)/programs/[slug]/page.tsx` dynamic route with `generateStaticParams` (same pattern as `blog/[slug]/page.tsx`) rather than 6 individual static files — this keeps the slug-to-content mapping in Sanity and avoids 6 near-identical files. The methodology page is a singleton Sanity document (same pattern as `audiencePage`).

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.2.4 | App Router, dynamic routes, ISR | Already installed, pinned |
| next-sanity | ^12.3.0 | `sanityFetch`, `defineLive()` ISR | Already integrated; all CMS data flows through this |
| @portabletext/react | ^6.0.3 | Render Sanity PortableText blocks | Already used in ProgramCard, blog |
| @sanity/client | ^7.21.0 | `stegaClean()` for query params | Already used in ProgramInquiryCta |
| tailwindcss | ^4 | Styling | All existing components use Tailwind v4 |
| @playwright/test | ^1.59.1 | E2E validation | Already configured; all Phase 2+ tests use it |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/speed-insights | latest | Field data Core Web Vitals (INP/CLS/LCP) | Add to root layout for production field metrics |
| next/image | built-in | Image optimization — prevents CLS, lazy loads | Use for any images on new program pages |
| next/font | built-in | Eliminates layout shift from font loading | Audit root layout — if fonts not using next/font, switch |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Dynamic `/programs/[slug]` | 6 static files | Static files simpler but creates 6 nearly-identical files; slug route scales with Sanity |
| Custom dropdown state | Radix Dropdown / Headless UI | Radix not in project; @base-ui/react v1.4 lacks dropdown primitive — custom is correct |
| Lighthouse CI | PageSpeed Insights manual | Both are valid; Lighthouse CI in a separate npm script automates it |

**Installation (new dependency only):**
```bash
npm install @vercel/speed-insights
```

---

## Architecture Patterns

### Recommended Project Structure — Phase 3 additions
```
src/
├── app/(site)/
│   ├── programs/
│   │   ├── page.tsx              # Refactored: overview grid of 6 programs
│   │   └── [slug]/
│   │       └── page.tsx          # New: individual program page (dynamic route)
│   └── methodology/
│       └── page.tsx              # New: singleton methodology page
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx        # Modified: Programs dropdown + new nav items
│   │   └── MobileMenu.tsx        # Modified: matching dropdown + new items
│   └── sections/
│       ├── ProgramHero.tsx       # New: program name + tagline hero
│       ├── ProgramDetail.tsx     # New: How it Works + What You Get + Best For
│       ├── OptionalIngredients.tsx # New: shared across all 6 program pages
│       ├── ComplianceBlock.tsx   # New: GDPR/CASL/CCPA — shared
│       ├── ProgramManagement.tsx # New: 24–48hr launch guarantee — shared
│       └── MethodologyPage.tsx   # New: 3-section methodology content
└── sanity/
    ├── schemas/documents/
    │   ├── program.ts            # Modified: new fields + expanded programType enum
    │   └── methodologyPage.ts    # New: singleton methodology document
    └── sanity.config.ts          # Modified: register methodologyPage schema
```

### Pattern 1: Dynamic Route with generateStaticParams (program pages)
**What:** Single `[slug]/page.tsx` renders all 6 program pages. `generateStaticParams` pre-renders them at build. Falls back gracefully when Sanity is not configured.
**When to use:** Multiple content items with the same layout driven by Sanity.
```typescript
// src/app/(site)/programs/[slug]/page.tsx
// Source: mirrors existing src/app/(site)/blog/[slug]/page.tsx pattern

const ALL_PROGRAM_SLUGS_QUERY = defineQuery(`*[_type == "program"]{ "slug": slug.current }`)

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const result = await sanityFetch({ query: ALL_PROGRAM_SLUGS_QUERY })
    const slugs = (result.data ?? []) as { slug: string | null }[]
    return slugs
      .filter((item) => typeof item.slug === 'string' && item.slug)
      .map((item) => ({ slug: item.slug as string }))
  } catch {
    return []
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ... sanityFetch with try/catch, notFound() on null
}
```

### Pattern 2: Singleton Sanity Document (methodology page)
**What:** Same pattern as `audiencePage` — one document per document type, fetched with `[0]` in GROQ.
**When to use:** Pages with unique, non-repeating content managed in Sanity Studio.
```typescript
// src/sanity/schemas/documents/methodologyPage.ts
import { defineType, defineField } from 'sanity'

export const methodologyPage = defineType({
  name: 'methodologyPage',
  title: 'Methodology Page',
  type: 'document',
  // Singleton: hide "Create new" in Studio
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'pageHeadline', type: 'string', title: 'Page Headline' }),
    defineField({ name: 'pageSubheadline', type: 'text', title: 'Page Subheadline' }),
    defineField({
      name: 'audienceBuilding',
      type: 'array',
      title: 'Audience Building (PortableText)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentSyndicationProcess',
      type: 'array',
      title: 'Content Syndication Process (PortableText)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'webinarProcess',
      type: 'array',
      title: 'Webinar Program Process (PortableText)',
      of: [{ type: 'block' }],
    }),
  ],
})
```

### Pattern 3: Programs nav dropdown (no new dependency)
**What:** SiteHeader is a Server Component — the dropdown trigger must be a Client Component boundary. Use the same pattern as MobileMenu (useState, no library).
**When to use:** Any interactive nav element in this project.
```typescript
// src/components/layout/ProgramsDropdown.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'

const programs = [
  { label: 'ADVANCE ENGAGE', href: '/programs/advance-engage' },
  { label: 'ADVANCE ABM', href: '/programs/advance-abm' },
  { label: 'ADVANCE INSTALL', href: '/programs/advance-install' },
  { label: 'ADVANCE BANT', href: '/programs/advance-bant' },
  { label: 'ADVANCE EXPAND', href: '/programs/advance-expand' },
  { label: 'Webinar', href: '/programs/webinar' },
]

export function ProgramsDropdown() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button aria-haspopup="true" aria-expanded={open}>Programs</button>
      {open && (
        <div className="absolute top-full left-0 z-50 ...">
          {programs.map(p => <Link key={p.href} href={p.href}>{p.label}</Link>)}
        </div>
      )}
    </div>
  )
}
```

### Pattern 4: Expanded program Sanity schema
**What:** The existing `program.ts` schema needs new fields and an expanded `programType` enum. The `programType` enum drives CONV-05 CTA routing — values must match what the inquiry form expects.
**Critical constraint:** Do NOT change existing `content-syndication` and `webinar` enum values (referenced in server actions and existing Sanity documents). Add the 6 new values alongside them or replace old names only if no live Sanity data uses them yet. Since this is a new build with no live data, the enum can be cleanly replaced.

New `programType` values:
```
advance-engage | advance-abm | advance-install | advance-bant | advance-expand | webinar
```

Note: `content-syndication` can be dropped since ADVANCE ENGAGE replaces it conceptually — but the server action in `submit-inquiry.ts` accepts `programType` as a free string passed to HubSpot, so the rename is safe as long as the contact form's program selector is updated in sync.

### Anti-Patterns to Avoid
- **Rendering program pages as static files:** Never create `advance-engage/page.tsx`, `advance-abm/page.tsx`, etc. individually — use `[slug]/page.tsx`.
- **Data fetching in section components:** All new section components (ProgramHero, ProgramDetail, OptionalIngredients) must be pure presentational, props-only. Data fetching belongs in the page.tsx Server Component only.
- **navLinks array duplication:** Currently `navLinks` is duplicated identically in `SiteHeader.tsx` and `MobileMenu.tsx`. When updating nav, update both files. Consider extracting to a shared constant file if further drift is a risk.
- **searchParams opt-out of static rendering:** The contact page uses `searchParams` (Promise) which opts it into dynamic rendering — do NOT add searchParams to the new program pages or methodology page. These should be fully statically generated.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Manual `<img>` with explicit dimensions | `next/image` | Automatic WebP conversion, lazy loading, prevents CLS (layout shift) |
| Font layout shift | Self-hosted CSS font-face | `next/font/google` or `next/font/local` | Eliminates FOUT/FOUT, zero layout shift, inlines critical font CSS |
| CWV field data | Manual performance.mark() reporting | `@vercel/speed-insights` (one-line install) | Real-user INP/CLS/LCP from Vercel dashboard, no custom plumbing |
| PortableText rendering | Custom rich-text renderer | `@portabletext/react` (already installed) | Handles all Sanity block types including marks, lists, nested blocks |
| Slug-to-route mapping | Hardcoded route switch/case | `generateStaticParams` + Sanity GROQ | Sanity is the single source of truth; no code change needed when slugs change |

**Key insight:** Next.js 16 + Vercel provides most CWV optimization automatically (prerendering, code splitting, prefetching). The remaining manual work is: audit `<img>` tags → `next/image`, confirm fonts use `next/font`, add `@vercel/speed-insights` to root layout.

---

## Common Pitfalls

### Pitfall 1: programType enum mismatch breaks CTA routing (CONV-05)
**What goes wrong:** The `ProgramInquiryCta` component passes `programType` as a URL param to `/contact?program=X`. The contact page passes this to `InquiryForm` as `defaultProgram`. If a program page's Sanity document has a `programType` of `advance-engage` but the form's select options still list `content-syndication`, the pre-selection silently fails.
**Why it happens:** The `programType` enum in `program.ts` schema, the `InquiryForm` select options, and any `FALLBACK_PROGRAMS` arrays are defined independently.
**How to avoid:** Update all three in the same task: schema enum, `InquiryForm` select options, and fallback program data objects.
**Warning signs:** Visiting `/contact?program=advance-engage` shows no program pre-selected in the form.

### Pitfall 2: Programs index page renders old flat layout alongside new grid
**What goes wrong:** The existing `/programs/page.tsx` renders `ProgramCard` components in a scrolling flat layout. After Phase 3, this page must become an overview grid linking to individual pages. If the old layout is not fully replaced, the page will have duplicate/conflicting content.
**Why it happens:** The old ProgramCard components are still imported and rendered.
**How to avoid:** Replace (not extend) the programs index page — remove `ProgramCard` imports and the `PROGRAMS_QUERY` usage that drives the old layout. The new overview grid fetches only `name`, `tagline`, `slug`, and `programType` (already available in the `HOMEPAGE_QUERY` pattern for `programsOverview`).

### Pitfall 3: Sanity schema registration order causes Studio crash
**What goes wrong:** If `methodologyPage` references an object type that is not registered before it in `sanity.config.ts`, Sanity Studio throws "Unknown type: X" at startup.
**Why it happens:** Sanity schema type resolution is order-sensitive (documented decision from Phase 2: `personaCard` before `audiencePage`).
**How to avoid:** `methodologyPage` uses only built-in block types — no custom object types — so order only matters relative to: register `methodologyPage` after all built-in schema is loaded. No special ordering needed unless custom objects are introduced.

### Pitfall 4: Dynamic route not found when Sanity is unconfigured
**What goes wrong:** `/programs/advance-engage` returns a 404 or throws during the build because `generateStaticParams` returns `[]` and the slug is not in the static manifest.
**Why it happens:** With `generateStaticParams` returning empty, Next.js falls back to on-demand rendering. The page.tsx then calls `sanityFetch` which throws, and if `notFound()` is called on throw (rather than on null result), all program pages 404 in dev.
**How to avoid:** In the `[slug]/page.tsx`, the try/catch should set `program = null` (not re-throw). Then check `if (!program)` → show fallback content, NOT `notFound()`. Reserve `notFound()` for when Sanity returns data but the slug is genuinely missing.

### Pitfall 5: CLS from unsized images on program pages
**What goes wrong:** LCP > 2.5s or CLS > 0.1 caused by images without explicit width/height or by using `<img>` instead of `next/image`.
**Why it happens:** Program pages may include logo images or hero imagery pulled from Sanity. Raw `<img>` tags have no dimensions until load.
**How to avoid:** Use `next/image` with explicit `width` / `height` or `fill` + sized container for all images on new pages. For Sanity image assets, use `@sanity/image-url` to generate URLs and pass dimensions.

### Pitfall 6: Nav dropdown blocks mobile tap targets
**What goes wrong:** A hover-triggered dropdown on desktop works fine but provides no tap mechanism on mobile. The mobile version of Programs shows a non-interactive label.
**Why it happens:** `onMouseEnter`/`onMouseLeave` does not fire on touch devices.
**How to avoid:** The desktop dropdown uses hover (fine for desktop nav). The MobileMenu component is completely separate and renders Programs as an expanded list (accordion or flat list of 6 links), not a hover dropdown.

### Pitfall 7: Methodology page content missing `data-testid` attributes
**What goes wrong:** Playwright tests can't reliably target the three methodology sections.
**Why it happens:** The `data-testid` convention is established for Phase 2 components but easy to forget on new pages.
**How to avoid:** Add `data-testid="methodology-audience-building"`, `data-testid="methodology-content-syndication"`, `data-testid="methodology-webinar"` to the three section wrappers. The fallback content (pre-Sanity) should always render these containers.

---

## Code Examples

Verified patterns from existing codebase:

### GROQ query for program by slug
```typescript
// Append to src/sanity/lib/queries.ts — do NOT modify existing queries
export const PROGRAM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    tagline,
    programType,
    solutionOverview,
    howItWorks,
    whatYouGet,
    bestFor,
    ctaLabel
  }
`)

export const ALL_PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program"]{ "slug": slug.current }
`)

export const PROGRAMS_INDEX_QUERY = defineQuery(`
  *[_type == "program"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    programType
  }
`)

export const METHODOLOGY_PAGE_QUERY = defineQuery(`
  *[_type == "methodologyPage"][0]{
    pageHeadline,
    pageSubheadline,
    audienceBuilding,
    contentSyndicationProcess,
    webinarProcess
  }
`)
```

### Fallback data shape for 6 programs (programs index)
```typescript
// Used in /programs/page.tsx when Sanity returns empty
const FALLBACK_PROGRAM_INDEX = [
  { _id: 'fb-engage',  name: 'ADVANCE ENGAGE',  slug: 'advance-engage',  programType: 'advance-engage',  tagline: 'Top-of-funnel opt-in lead generation built around your content.' },
  { _id: 'fb-abm',    name: 'ADVANCE ABM',      slug: 'advance-abm',     programType: 'advance-abm',     tagline: 'Account-based engagement that fuels your ABM strategy.' },
  { _id: 'fb-install',name: 'ADVANCE INSTALL',  slug: 'advance-install', programType: 'advance-install', tagline: 'Leads at organizations with the specific installed technology you need.' },
  { _id: 'fb-bant',   name: 'ADVANCE BANT',     slug: 'advance-bant',    programType: 'advance-bant',    tagline: 'Sales-ready leads qualified on Budget, Authority, Need, and Timing.' },
  { _id: 'fb-expand', name: 'ADVANCE EXPAND',   slug: 'advance-expand',  programType: 'advance-expand',  tagline: 'Cross-sell, upsell, and expansion inside your current customer base.' },
  { _id: 'fb-webinar',name: 'Webinar',           slug: 'webinar',         programType: 'webinar',         tagline: 'Connect your experts directly with senior IT buyers via co-branded virtual events.' },
]
```

### Sanity seed script sketch (Wave 0 or Wave 1)
The portfolio doc content is the seed source. Each program document in Sanity Studio needs:
- `name`: ADVANCE ENGAGE (etc.)
- `slug`: auto-generated from name via `options: { source: 'name' }` → `advance-engage`
- `tagline`: from portfolio doc
- `programType`: `advance-engage` (etc.) — must match new enum values
- `howItWorks`, `whatYouGet`, `bestFor`: PortableText — seed as bullet list blocks

Seeding can be done manually in Sanity Studio or via a `sanity dataset import` script. Given the portfolio doc is finalized copy, manual Studio entry is the most reliable approach for this project.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 2-program flat `/programs` page | 6 individual program pages + overview grid | Phase 3 | Programs page refactored; old ProgramCard layout replaced |
| `programType: content-syndication` enum | `programType: advance-engage` etc. | Phase 3 | CONV-05 CTA routing enum updated; InquiryForm select updated |
| Flat `navLinks` array | Programs dropdown + new nav items | Phase 3 | SiteHeader and MobileMenu both updated |
| No methodology page | `/methodology` singleton Sanity page | Phase 3 | Fulfills METH-01/02/03/04 |

**Deprecated/outdated after Phase 3:**
- `content-syndication` programType value: replaced by `advance-engage` 
- `ProgramCard.tsx` used as primary program layout: demoted to reuse consideration only (the new individual program pages use a different, richer layout)
- `/programs` as a flat scroll page: replaced by overview grid

---

## Open Questions

1. **Should `content-syndication` programType be kept as a legacy alias?**
   - What we know: The server action in `submit-inquiry.ts` passes programType as a free string to HubSpot — no HubSpot-side validation requires it to be a specific value
   - What's unclear: Whether any existing Sanity documents or HubSpot records already use `content-syndication` that would create orphan data
   - Recommendation: Since this is a pre-launch project with no live data, drop `content-syndication` and use `advance-engage` exclusively. Document this in the plan so it is not missed.

2. **Does the `/programs` index page need a Metadata export update?**
   - What we know: Current metadata says "Two proven demand generation programs" — this will be stale after Phase 3
   - Recommendation: Update metadata in the same task that refactors the programs index.

3. **Webinar program — what `programType` value drives CONV-05?**
   - What we know: The webinar program retains the `webinar` programType value (unchanged from Phase 1)
   - What's unclear: Nothing — `webinar` is unchanged and safe to keep
   - Recommendation: Confirm in the plan that `webinar` enum value is NOT renamed.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Playwright 1.59.1 (e2e) + Vitest 4.1.4 (unit) |
| Config file | `playwright.config.ts` (e2e), `vitest.config.ts` (unit) |
| Quick run command | `npx playwright test tests/e2e/programs.spec.ts` |
| Full suite command | `npm run test:e2e` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| METH-01 | `/methodology` renders Audience Building section with non-empty content | e2e | `npx playwright test tests/e2e/methodology.spec.ts` | ❌ Wave 0 |
| METH-02 | `/methodology` renders content syndication mechanics section | e2e | `npx playwright test tests/e2e/methodology.spec.ts` | ❌ Wave 0 |
| METH-03 | `/methodology` renders webinar program process section | e2e | `npx playwright test tests/e2e/methodology.spec.ts` | ❌ Wave 0 |
| METH-04 | Program pages use branded names (ADVANCE ENGAGE etc.), nav dropdown lists all 6 | e2e | `npx playwright test tests/e2e/programs.spec.ts` | ❌ Rewrite needed |
| INFRA-06 | LCP < 2.5s, CLS < 0.1, INP < 200ms on Vercel production | manual/Lighthouse | `npx lighthouse https://[vercel-url] --output=json` | ❌ Manual Wave 5 |

### Sampling Rate
- **Per task commit:** `npx playwright test tests/e2e/programs.spec.ts tests/e2e/methodology.spec.ts`
- **Per wave merge:** `npm run test:e2e`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/e2e/methodology.spec.ts` — covers METH-01, METH-02, METH-03
- [ ] `tests/e2e/programs.spec.ts` — rewrite to cover METH-04 (branded names, 6 programs, dropdown nav, individual page routes)
- [ ] INFRA-06 is production-only — Lighthouse/Speed Insights manual check; no automated pre-deploy gate possible

---

## Sources

### Primary (HIGH confidence)
- Existing codebase — read directly: `src/`, `tests/`, `src/sanity/schemas/`, `src/sanity/lib/queries.ts`
- `docs/AB2B_Services_Portfolio.md` — canonical program copy source
- `node_modules/next/dist/docs/01-app/02-guides/production-checklist.md` — Next.js Core Web Vitals guidance
- `.planning/phases/03-differentiator-and-launch-ready/03-CONTEXT.md` — locked decisions

### Secondary (MEDIUM confidence)
- Next.js 16 App Router `[slug]/page.tsx` dynamic route pattern — verified against existing `blog/[slug]/page.tsx` in codebase
- `@vercel/speed-insights` — standard Vercel integration for field CWV data; referenced in Next.js production docs

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed; patterns verified against existing code
- Architecture: HIGH — all patterns are extensions of Phase 1/2 patterns already in the codebase
- Pitfalls: HIGH — sourced from STATE.md decisions log and direct code reading
- CWV tooling: MEDIUM — `@vercel/speed-insights` is the standard Vercel integration but production validation is inherently post-deploy

**Research date:** 2026-04-19
**Valid until:** 2026-05-19 (stable stack; Next.js 16 / Sanity v3 APIs are not fast-moving at this version)
