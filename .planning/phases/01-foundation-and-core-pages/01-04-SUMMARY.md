---
phase: 01-foundation-and-core-pages
plan: "04"
subsystem: ui
tags: [nextjs, sanity, react, tailwind, playwright, typescript]

requires:
  - phase: 01-foundation-and-core-pages plan 01
    provides: TEAM_MEMBERS_QUERY, sanityFetch, teamMember schema, Playwright stub test infrastructure

provides:
  - About page server component at /about fetching teamMembers from Sanity
  - CompanyStory section with Ab2bm mission narrative (static/hardcoded with TODO)
  - TeamGrid section rendering 3-column card grid with placeholder fallback (2 members)
  - CgPartnership section with external link to conversationalgeek.com and data-testid
  - All 3 about e2e Playwright tests passing

affects:
  - 01-05 (conversion layer — shares page layout pattern)
  - Phase 3 (final copy replacement for CompanyStory and CgPartnership TODO comments)

tech-stack:
  added: []
  patterns:
    - About page follows programs page pattern — sanityFetch wrapped in try/catch, extractXxx() helper function for untyped GROQ result
    - TeamGrid renders placeholder members when Sanity array is empty — page is never blank
    - Playwright link assertions scoped to data-testid section locator to avoid strict mode violations from footer duplicate links

key-files:
  created:
    - src/app/(site)/about/page.tsx (About page server component with metadata)
    - src/components/sections/CompanyStory.tsx (static company story + mission section)
    - src/components/sections/TeamGrid.tsx (team member card grid, 3-column responsive layout)
    - src/components/sections/CgPartnership.tsx (CG content partnership section, external link)
  modified:
    - tests/e2e/about.spec.ts (filled in 3 test stubs with real Playwright assertions)

key-decisions:
  - "Playwright CG partnership test scoped to [data-testid=cg-partnership] locator — footer also contains a Conversational Geek link, causing strict mode violation without scope boundary (same pattern as Plan 01-03 CTA test)"
  - "TeamGrid renders placeholder members when members array is empty — page is never blank at Phase 1 before Sanity is provisioned"
  - "CompanyStory and CgPartnership are fully static at Phase 1 — copy is hardcoded with TODO comments for final replacement before launch"

patterns-established:
  - "Pattern: sanityFetch try/catch + extractXxx() helper — always wrap Sanity fetches in try/catch; extract typed data via explicit helper to avoid requiring sanity typegen in Phase 1"
  - "Pattern: Playwright section scoping — scope link/element assertions to their data-testid parent locator to avoid strict mode violations from duplicate elements in nav/footer"

requirements-completed: [ABUT-01, ABUT-02, ABUT-03]

duration: 10min
completed: 2026-04-17
---

# Phase 01 Plan 04: About Page Summary

**About page at /about with three Sanity-backed sections — CompanyStory, TeamGrid (2-card placeholder fallback), and CgPartnership with external link to conversationalgeek.com; all 3 Playwright e2e tests passing**

## Performance

- **Duration:** 10 min
- **Started:** 2026-04-17T19:45:00Z
- **Completed:** 2026-04-17T19:55:00Z
- **Tasks:** 2 of 2
- **Files modified:** 5

## Accomplishments

- Built About page server component at `/about` fetching team members via `sanityFetch` + `TEAM_MEMBERS_QUERY`; falls back to 2 placeholder members when Sanity is not provisioned
- Created three section components: `CompanyStory` (static mission narrative), `TeamGrid` (responsive 3-column card grid with photo support), `CgPartnership` (external partnership section)
- Filled in all 3 about e2e test stubs — all tests pass including team card count and CG partnership link visibility

## Task Commits

Each task was committed atomically:

1. **Task 1: Build About page and three section components** - `8438341` (feat)
2. **Task 2: Fill in about e2e test stubs** - `af2d701` (test)

**Plan metadata:** _(pending — final docs commit)_

## Files Created/Modified

- `src/app/(site)/about/page.tsx` — Server component fetching teamMembers, renders CompanyStory + TeamGrid + CgPartnership in order, page metadata
- `src/components/sections/CompanyStory.tsx` — Static section with hardcoded Ab2bm mission copy and TODO comment
- `src/components/sections/TeamGrid.tsx` — 3-column responsive card grid; `data-testid="team-card"` on each card; falls back to 2 placeholder members
- `src/components/sections/CgPartnership.tsx` — Two-column layout with CG logo placeholder; external link to conversationalgeek.com; `data-testid="cg-partnership"` on section
- `tests/e2e/about.spec.ts` — 3 Playwright tests: company story navigation, team card count assertion, CG partnership section + link visibility

## Decisions Made

1. Playwright CG partnership link assertion scoped to `[data-testid=cg-partnership]` — the footer also contains a "Conversational Geek" link, which caused a strict mode violation (`resolved to 2 elements`) without scope boundary. Same pattern established in Plan 01-03 for the CTA test.
2. `TeamGrid` renders placeholder members (`Mark Patton / Founder & Publisher` and `Team Member / Content Strategy`) when `members` array is empty — page is never blank before Sanity is provisioned.
3. `CompanyStory` and `CgPartnership` are fully static at Phase 1 — copy is hardcoded with `// TODO` comments (`TODO(Ab2bm)` and `TODO(CG+Ab2bm)`) marking what needs final copy replacement before launch.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Playwright strict mode violation in CG partnership test**
- **Found during:** Task 2 (running `npx playwright test tests/e2e/about.spec.ts`)
- **Issue:** `page.getByRole('link', { name: /conversational geek/i })` resolved to 2 elements — the section link and a footer link — triggering strict mode error
- **Fix:** Scoped assertion to `partnershipSection.getByRole(...)` where `partnershipSection = page.locator('[data-testid="cg-partnership"]')`
- **Files modified:** tests/e2e/about.spec.ts
- **Verification:** All 3 tests pass (3 passed, 1.1s)
- **Committed in:** af2d701 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Auto-fix necessary for test correctness — test expectation was logically correct but strict mode requires unique locator. No scope creep.

## Issues Encountered

None beyond the auto-fixed strict mode violation above.

## User Setup Required

None — no external service configuration required for this plan. Sanity fallback data renders placeholder team members without credentials.

## Next Phase Readiness

- Plans 01-05 (conversion layer) can begin immediately — About page pattern and layout established
- Final copy for CompanyStory and CgPartnership should be provided by Ab2bm + CG before Phase 3 launch (TODO comments in source)
- CG logo asset needed to replace the placeholder div in CgPartnership before launch

## Self-Check

All required files exist and all task commits are present in git history.

---
*Phase: 01-foundation-and-core-pages*
*Completed: 2026-04-17*
