---
phase: 03-differentiator-and-launch-ready
plan: "03"
subsystem: ui
tags: [nextjs, tailwind, portabletext, static-generation, programs]

requires:
  - phase: 03-02
    provides: PROGRAM_BY_SLUG_QUERY, ALL_PROGRAM_SLUGS_QUERY, program Sanity schema with solutionOverview/howItWorks/whatYouGet/bestFor fields
  - phase: 01-03
    provides: ProgramInquiryCta component, CONV-05 pattern (?program= routing)

provides:
  - Dynamic /programs/[slug] route serving 6 program landing pages via generateStaticParams
  - ProgramHero section component (name/tagline hero with programType accent border)
  - ProgramDetail section component (solutionOverview, howItWorks, whatYouGet, bestFor)
  - OptionalIngredients section component (static 8-ingredient grid from portfolio doc)
  - ComplianceBlock section component (GDPR/CASL/CCPA three-pillar layout)
  - ProgramManagement section component (24-48hr launch stats block)

affects:
  - 03-04 (nav dropdown — will link to /programs/[slug] pages built here)
  - 03-05 (programs index — will reference same FALLBACK_PROGRAMS slugs)

tech-stack:
  added: []
  patterns:
    - generateStaticParams returns FALLBACK_PROGRAMS slugs when Sanity unconfigured — ensures all 6 routes pre-render at build time
    - ProgramData interface declared explicitly — prevents TypeScript error from null fields being incompatible with PortableTextBlock[]
    - fallback-first data logic: Sanity fetch → null check → fallback lookup → notFound() (never blank, never 404 for known slugs)

key-files:
  created:
    - src/app/(site)/programs/[slug]/page.tsx
    - src/components/sections/ProgramHero.tsx
    - src/components/sections/ProgramDetail.tsx
    - src/components/sections/OptionalIngredients.tsx
    - src/components/sections/ComplianceBlock.tsx
    - src/components/sections/ProgramManagement.tsx
  modified: []

key-decisions:
  - "generateStaticParams returns FALLBACK_PROGRAMS slugs (not []) when Sanity fetch fails — ensures all 6 pages are SSG even before Sanity is provisioned"
  - "ProgramDetail renders nothing for null portable-text fields rather than placeholder text — cleaner UX when Sanity content not yet published"
  - "nav dropdown tests expected to fail (programs-dropdown testid not yet built) — confirmed in plan verification section"

patterns-established:
  - "Program page structure: Hero → Detail → OptionalIngredients → ComplianceBlock → ProgramManagement → ProgramInquiryCta"

requirements-completed:
  - METH-04

duration: 3min
completed: "2026-04-19"
---

# Phase 3 Plan 03: Individual Program Landing Pages Summary

**Dynamic /programs/[slug] static-generated route serving all 6 branded program pages (ADVANCE ENGAGE, ADVANCE ABM, ADVANCE INSTALL, ADVANCE BANT, ADVANCE EXPAND, Webinar) with 5 new shared section components and fallback content when Sanity is unconfigured**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-04-19T23:08:19Z
- **Completed:** 2026-04-19T23:10:58Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- 6 program landing pages pre-rendered as SSG at build time — build output confirms `/programs/advance-engage`, `/programs/advance-abm`, `/programs/advance-install`, `/programs/advance-bant`, `/programs/advance-expand`, `/programs/webinar`
- 5 new pure-presentational section components created — all props-only with `data-testid` attributes, no data fetching
- 12/16 Playwright program tests pass — all individual program hero and CTA tests pass; 4 failures are expected (programs index grid + nav dropdown not yet built)

## Task Commits

1. **Task 1: Create shared program section components** - `d90157e` (feat)
2. **Task 2: Create /programs/[slug] dynamic route** - `a10c71e` (feat)

**Plan metadata:** (to be filled after final commit)

## Files Created/Modified

- `src/app/(site)/programs/[slug]/page.tsx` — Dynamic route with generateStaticParams, generateMetadata, FALLBACK_PROGRAMS, full page composition
- `src/components/sections/ProgramHero.tsx` — Hero with programType-based accent border (brand-purple/brand-orange/brand-silver)
- `src/components/sections/ProgramDetail.tsx` — Solution overview + PortableText sections (howItWorks, whatYouGet) + bestFor
- `src/components/sections/OptionalIngredients.tsx` — Static 8-ingredient grid from portfolio doc
- `src/components/sections/ComplianceBlock.tsx` — 3-pillar GDPR/CASL/CCPA compliance section
- `src/components/sections/ProgramManagement.tsx` — 4-stat launch guarantee block (24-48hr, 3 days, global, QA team)

## Decisions Made

- **generateStaticParams fallback to FALLBACK_PROGRAMS slugs** — When Sanity is not configured, returning `[]` would mean no pages are pre-rendered. Instead, fall back to the full 6-slug list so all routes are always statically generated at build time.
- **ProgramDetail renders nothing for null PortableText fields** — Cleaner UX than placeholder text; the solutionOverview and bestFor string fields are always populated from fallbacks, so pages are never blank.
- **Nav dropdown tests expected to fail** — Confirmed in plan verification: `nav dropdown tests still fail (not yet built)`. These will pass in plan 03-04.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript check showed only pre-existing errors in test files (sanity-cms.spec.ts and submit-mediakit.test.ts) that are out of scope.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 6 `/programs/[slug]` pages are live and statically generated
- Plan 03-04 (nav dropdown) can now link directly to these pages
- Plan 03-05 (programs index refactor) can reference the same FALLBACK_PROGRAMS slug list for consistency
- METH-04 requirement satisfied: each branded program has a dedicated landing page with hero, detail, and CTA

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
