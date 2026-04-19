---
phase: 03-differentiator-and-launch-ready
plan: 01
subsystem: testing
tags: [playwright, e2e, tdd, wave-0, test-stubs]

# Dependency graph
requires: []
provides:
  - Failing Playwright spec for /methodology page (METH-01, METH-02, METH-03)
  - Failing Playwright spec for /programs index, 6 individual program routes, nav dropdown, and CTA routing (METH-04, CONV-05)
affects:
  - 03-02-programs
  - 03-03-methodology
  - 03-04-programs-index-and-nav

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Wave 0 test-first: spec files are created with failing assertions before implementation routes exist
    - data-testid anchored assertions: all locators use data-testid for resilience

key-files:
  created:
    - tests/e2e/methodology.spec.ts
  modified:
    - tests/e2e/programs.spec.ts

key-decisions:
  - "Methodology spec uses 4 test groups covering page render plus 3 section testids (METH-01/02/03) — matches data-testid conventions already established in Phase 2 STATE.md"
  - "Programs spec BRANDED_NAMES array uses mixed case matching expected copy — ADVANCE ENGAGE uppercase, Webinar title case"
  - "Old programs.spec.ts anchor-based tests (#content-syndication, #webinar) replaced entirely — those IDs will not exist in the refactored programs structure"

patterns-established:
  - "Wave 0 spec pattern: create failing test file, run to confirm failure type is connection-refused or element-not-found (not syntax error), then commit"
  - "PROGRAM_SLUGS and BRANDED_NAMES arrays defined at module scope so for-loops in test.describe blocks iterate cleanly in Playwright"

requirements-completed: [METH-01, METH-02, METH-03, METH-04]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 03 Plan 01: Wave 0 Test Scaffolding Summary

**Playwright test stubs with data-testid assertions for methodology page (METH-01/02/03) and 6 branded program pages with nav dropdown (METH-04) — all failing correctly before implementation**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-19T23:01:13Z
- **Completed:** 2026-04-19T23:02:57Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments

- Created `tests/e2e/methodology.spec.ts` with 4 tests targeting `/methodology` page and 3 section testids
- Rewrote `tests/e2e/programs.spec.ts` to cover 6 branded program slugs, programs-grid index, program-hero individual pages, CONV-05 CTA routing, and programs-dropdown nav
- Both spec files compile with no TypeScript errors; 19 of 20 new assertions fail (Wave 0 correct state)

## Task Commits

1. **Task 1: Create methodology.spec.ts** - `ae3edd3` (test)
2. **Task 2: Rewrite programs.spec.ts for METH-04** - `2d8280b` (test)

## Files Created/Modified

- `tests/e2e/methodology.spec.ts` - Wave 0 spec: /methodology page render + 3 section visibility stubs (METH-01/02/03)
- `tests/e2e/programs.spec.ts` - Rewrote with PROGRAM_SLUGS loop, programs-grid, program-hero, CTA routing, nav dropdown tests (METH-04/CONV-05)

## Decisions Made

- The old `programs.spec.ts` tested `#content-syndication` and `#webinar` anchor IDs — these won't exist after the programs refactor, so a full rewrite was correct rather than appending
- `BRANDED_NAMES` array uses mixed case: all ADVANCE programs are uppercase, Webinar is title case — matches the expected copy convention from 03-CONTEXT.md

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

Pre-existing TypeScript errors in `tests/e2e/sanity-cms.spec.ts` (test.todo type issue) and `tests/unit/submit-mediakit.test.ts` (extraField type) were present before this plan and are out of scope. New spec files compile cleanly.

## Next Phase Readiness

- Wave 0 gates are in place — Plans 03-02 through 03-04 each have automated verify targets they must pass
- `npx playwright test tests/e2e/methodology.spec.ts` will serve as the verification command for Plan 03-03 (methodology page implementation)
- `npx playwright test tests/e2e/programs.spec.ts` will serve as the verification command for Plans 03-02 and 03-04

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
