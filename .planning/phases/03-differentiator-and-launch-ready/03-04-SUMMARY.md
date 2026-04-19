---
phase: 03-differentiator-and-launch-ready
plan: "04"
subsystem: ui
tags: [next.js, sanity, portable-text, methodology, isr]

# Dependency graph
requires:
  - phase: 03-02
    provides: METHODOLOGY_PAGE_QUERY defined in queries.ts; methodologyPage Sanity singleton schema

provides:
  - /methodology route (static, ISR via defineLive) with three labeled content sections
  - MethodologyPage presentational component with PortableText + fallback content
  - data-testid attributes for methodology-audience-building, methodology-content-syndication, methodology-webinar

affects:
  - 03-05-nav (navigation link to /methodology)
  - Playwright e2e suite (methodology.spec.ts — all 4 tests now passing)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Singleton Sanity page — METHODOLOGY_PAGE_QUERY + defineLive ISR (mirrors audience pattern)
    - Three-section fallback content always rendered — data-testid locators always present before Sanity provisioned
    - Named export only from section component (no default export)

key-files:
  created:
    - src/components/sections/MethodologyPage.tsx
    - src/app/(site)/methodology/page.tsx
  modified: []

key-decisions:
  - "MethodologyData interface typed explicitly on FALLBACK_METHODOLOGY constant — prevents TypeScript inference from null literals narrowing field types to null (not PortableTextBlock[] | null)"
  - "Fallback content always renders when Sanity PortableText fields are null — data-testid locators always present per RESEARCH.md Pitfall 7"
  - "ADVANCE ENGAGE named explicitly in Section 2 heading and fallback body — satisfies METH-04 without Sanity content"

patterns-established:
  - "MethodologyPage: pure presentational component, named export, props-only, no data fetching"
  - "Methodology page route: try/catch sanityFetch, typed MethodologyData interface, FALLBACK_METHODOLOGY constant"

requirements-completed: [METH-01, METH-02, METH-03, METH-04]

# Metrics
duration: 4min
completed: 2026-04-19
---

# Phase 03 Plan 04: Methodology Page Summary

**Opt-in audience credibility page with three labeled sections (Audience Building, ADVANCE ENGAGE / Content Syndication, Webinar Process), PortableText Sanity content, and permanent fallback copy satisfying all METH requirements**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-19T23:12:53Z
- **Completed:** 2026-04-19T23:16:30Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- `/methodology` route renders statically as ISR, appears in build output, returns 200
- Three section containers always rendered with `data-testid` attributes — Playwright locators never miss
- Fallback content explicitly names ADVANCE ENGAGE in Section 2, satisfying METH-04 without Sanity content
- All 4 methodology.spec.ts tests pass (page render + 3 section visibility/non-empty checks)

## Task Commits

1. **Task 1: Create MethodologyPage section component** - `fda0fac` (feat)
2. **Task 2: Create /methodology page route** - `21c740f` (feat)

## Files Created/Modified

- `src/components/sections/MethodologyPage.tsx` — Three-section presentational component; named export; PortableText rendering with 6-step fallback content per section
- `src/app/(site)/methodology/page.tsx` — Singleton Sanity page route using METHODOLOGY_PAGE_QUERY; typed MethodologyData interface; try/catch sanityFetch; defineLive ISR

## Decisions Made

- Typed `MethodologyData` interface on `FALLBACK_METHODOLOGY` constant — TypeScript inferred field types as `null` (not `PortableTextBlock[] | null`) without explicit annotation, causing assignment errors on the Sanity branch
- Fallback text always renders for all three sections — `data-testid` sections are always present even with null Sanity fields, per RESEARCH.md Pitfall 7 requirement

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added explicit MethodologyData interface to fix TypeScript type inference**
- **Found during:** Task 2 (Create /methodology page route)
- **Issue:** FALLBACK_METHODOLOGY constant without type annotation caused TypeScript to infer `null` for PortableText fields instead of `PortableTextBlock[] | null`, producing TS2322 assignment errors
- **Fix:** Added `MethodologyData` interface and annotated constant with it
- **Files modified:** src/app/(site)/methodology/page.tsx
- **Verification:** `npx tsc --noEmit` produces zero new errors; build succeeds
- **Committed in:** 21c740f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug — TypeScript inference)
**Impact on plan:** Necessary for type correctness; no scope creep.

## Issues Encountered

None beyond the auto-fixed TypeScript inference issue above.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- `/methodology` is fully functional with fallback content; Sanity Studio editors can populate all three sections without code changes
- Navigation plan (03-05) can now add `/methodology` link to the header dropdown
- All METH-01 through METH-04 requirements satisfied

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
