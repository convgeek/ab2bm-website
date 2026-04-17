---
phase: 02-content-and-proof-layer
plan: 01
subsystem: testing
tags: [playwright, e2e, audience, blog, case-studies, homepage]

# Dependency graph
requires:
  - phase: 01-foundation-and-core-pages
    provides: Homepage, contact form, programs page, Playwright test infrastructure
provides:
  - Playwright e2e spec stubs for all Phase 2 routes (audience, blog, case-studies)
  - Replaced homepage.spec.ts test.todo() placeholders with real assertions
  - Test contracts for AUDN-01/02/03/04, BLOG-01/02/03, CASE-01/02/03, TRST-01/03
affects:
  - 02-02 (audience page implementation must satisfy audience.spec.ts)
  - 02-03 (blog route and Sanity wiring must satisfy blog.spec.ts)
  - 02-04 (case studies must satisfy case-studies.spec.ts and homepage CASE-03 test)
  - 02-05 (logo strip and testimonial must satisfy homepage.spec.ts TRST-01/03)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "data-testid attributes as stable Playwright selectors (persona-card, audience-stats, methodology-note, industry-breakdown, company-size-distribution, logo-strip, programs-overview, testimonial-highlight, case-study-highlight, blog-card, case-study-card, case-study-metrics)"
    - "Wave 0 stub pattern: tests written before implementation, expected to fail until implementation plans execute"

key-files:
  created:
    - tests/e2e/audience.spec.ts
    - tests/e2e/blog.spec.ts
    - tests/e2e/case-studies.spec.ts
  modified:
    - tests/e2e/homepage.spec.ts

key-decisions:
  - "BLOG-03 and CASE-01 count assertions (6+ posts, 3+ cards) are Wave 0 stubs — they will only pass after Sanity content is published in Wave 4"
  - "CASE-03 homepage highlight test appears in both case-studies.spec.ts and homepage.spec.ts — both specs assert the same [data-testid=case-study-highlight] locator for maximum coverage"
  - "programs-overview test asserts a[href*=/programs] link exists inside the section — implementation must use this data-testid on the section wrapper"

patterns-established:
  - "Wave 0 test stub pattern: failing tests define acceptance criteria before routes exist"
  - "data-testid locators are the canonical Playwright selector strategy for Phase 2 components"

requirements-completed:
  - AUDN-01
  - AUDN-02
  - AUDN-03
  - AUDN-04
  - BLOG-01
  - BLOG-02
  - BLOG-03
  - CASE-01
  - CASE-02
  - CASE-03
  - TRST-01
  - TRST-03

# Metrics
duration: 8min
completed: 2026-04-17
---

# Phase 02 Plan 01: Wave 0 Test Scaffolding Summary

**Playwright e2e spec stubs for audience, blog, and case-studies routes with real homepage assertions replacing four test.todo() placeholders — 34 total tests discovered, all Phase 2 acceptance criteria codified before implementation begins**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-04-17T21:30:00Z
- **Completed:** 2026-04-17T21:39:03Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Created 3 new spec files (audience, blog, case-studies) with 13 tests covering AUDN-01/02/03/04, BLOG-01/02/03, CASE-01/02/03
- Replaced all 4 test.todo() placeholders in homepage.spec.ts with real Playwright assertions (TRST-01, TRST-03, CASE-03, programs overview)
- All 34 tests across 8 spec files discoverable via `npx playwright test --list`
- `npm run build` passes with no TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create audience, blog, and case-studies e2e spec stubs** - `bd1ccbf` (test)
2. **Task 2: Implement homepage.spec.ts test.todo() placeholders** - `34e7d71` (test)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `tests/e2e/audience.spec.ts` - 5 tests for AUDN-01/02/03/04 audience page requirements
- `tests/e2e/blog.spec.ts` - 4 tests for BLOG-01/02/03 listing, count, and post detail
- `tests/e2e/case-studies.spec.ts` - 4 tests for CASE-01/02/03 listing, detail metrics, and homepage highlight
- `tests/e2e/homepage.spec.ts` - Replaced 4 test.todo() groups with real assertions; added CASE-03 to social proof group

## Decisions Made
- BLOG-03 (6+ posts) and CASE-01 (3+ cards) count assertions intentionally fail until Wave 4 Sanity content is published — this is correct Wave 0 stub behavior
- CASE-03 homepage highlight test duplicated across `case-studies.spec.ts` and `homepage.spec.ts` for broader coverage without redundancy concerns
- `programs-overview` test locates `a[href*="/programs"]` inside `[data-testid="programs-overview"]` — implementation must add this testid to the section wrapper in Plan 02-04+

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Test contracts fully defined for all Phase 2 routes
- Implementation plans (02-02 audience, 02-03 blog, 02-04 case studies, 02-05 social proof) can now reference these spec files as verification targets
- data-testid selector conventions established; implementation must use matching testids

---
*Phase: 02-content-and-proof-layer*
*Completed: 2026-04-17*
