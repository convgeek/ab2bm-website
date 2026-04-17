---
phase: 01-foundation-and-core-pages
plan: "03"
subsystem: ui
tags: [nextjs, sanity, portabletext, playwright, programs, demand-gen]

# Dependency graph
requires:
  - phase: 01-foundation-and-core-pages/01-01
    provides: Sanity schema (program document with programType enum), PROGRAMS_QUERY, sanityFetch, stegaClean usage patterns
  - phase: 01-foundation-and-core-pages/01-02
    provides: SiteHeader/SiteFooter layout context, homepage ProgramsOverview anchor link targets
provides:
  - /programs route — two-section page for Content Syndication and Webinar programs
  - ProgramCard component — Portable Text mechanics/deliverables/targeting subsections with fallback copy
  - ProgramInquiryCta component — program-specific CTA link with ?program= query param pre-selection
  - Anchor IDs #content-syndication and #webinar for homepage ProgramsOverview deep links
affects:
  - 01-05 (InquiryForm reads ?program= param from URL to pre-select program type — must match programType enum exactly)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - stegaClean() applied to programType before use in HTML id attributes and href construction
    - Sanity not-yet-provisioned fallback: try/catch around sanityFetch with hardcoded seed content
    - ProgramData interface typed explicitly to avoid FALLBACK_PROGRAMS const inference conflicts with Portable Text arrays

key-files:
  created:
    - src/app/(site)/programs/page.tsx
    - src/components/sections/ProgramCard.tsx
    - src/components/sections/ProgramInquiryCta.tsx
  modified:
    - tests/e2e/programs.spec.ts

key-decisions:
  - "ProgramData interface declared explicitly — prevents TypeScript error from FALLBACK_PROGRAMS null fields being incompatible with PortableTextBlock[] return from extractPrograms"
  - "Playwright CTA test scoped to main element — header nav 'Contact' link also matches /conversation|inquire|contact/ regex, causing false positives without scope boundary"

patterns-established:
  - "ProgramInquiryCta uses buttonVariants from @/components/ui/button with cn() helper — renders as Link not Button primitive to preserve correct href behavior"
  - "Fallback mechanics copy keyed by programType string (content-syndication, webinar) — same values as stegaClean output"

requirements-completed:
  - PROG-01
  - PROG-02
  - PROG-03
  - PROG-04

# Metrics
duration: 15min
completed: 2026-04-17
---

# Phase 01 Plan 03: Programs Page Summary

**Programs page at /programs with Content Syndication and Webinar sections, Portable Text mechanics rendered, fallback seed copy, and ?program= CTA links pre-selecting program type for the contact form**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-17T19:37:00Z
- **Completed:** 2026-04-17T19:52:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- /programs page renders two program sections with hardcoded fallback content when Sanity is not provisioned
- ProgramCard renders "How It Works", "What You Get", and "Audience Targeting" subsections using @portabletext/react
- Anchor IDs #content-syndication and #webinar enable deep links from homepage ProgramsOverview
- ProgramInquiryCta passes ?program=content-syndication and ?program=webinar to /contact for form pre-selection
- All 4 Playwright e2e tests pass

## Task Commits

1. **Task 1: Build programs page and program card components** - `9dcb544` (feat)
2. **Task 2: Fill in programs e2e test stubs** - `37b0b75` (test)

**Plan metadata:** (this commit)

## Files Created/Modified
- `src/app/(site)/programs/page.tsx` - Server component fetching programs via PROGRAMS_QUERY; fallback to hardcoded seed content
- `src/components/sections/ProgramCard.tsx` - Individual program section with three Portable Text subsections and fallback copy per programType
- `src/components/sections/ProgramInquiryCta.tsx` - CTA Link with stegaClean(?program=) for contact form pre-selection
- `tests/e2e/programs.spec.ts` - Real Playwright assertions replacing .todo stubs; scoped to main element

## Decisions Made
- Declared `ProgramData` interface explicitly instead of inferring from `FALLBACK_PROGRAMS` constant — the fallback uses `null` fields but `extractPrograms()` returns `PortableTextBlock[] | null`, causing TypeScript incompatibility when using `typeof FALLBACK_PROGRAMS` as return type.
- Scoped Playwright CTA link selector to `main` element — the header nav link labeled "Contact" also matched the `/conversation|inquire|contact/i` regex, causing the test to find zero ?program= links without the scope boundary.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript type error from FALLBACK_PROGRAMS const inference**
- **Found during:** Task 1 (Build verification — npm run build)
- **Issue:** `extractPrograms` return type declared as `typeof FALLBACK_PROGRAMS` — TypeScript inferred `mechanics: null` from the const, making `PortableTextBlock[]` values incompatible
- **Fix:** Replaced `typeof FALLBACK_PROGRAMS` with explicit `ProgramData` interface; typed `let programs: ProgramData[]`
- **Files modified:** src/app/(site)/programs/page.tsx
- **Verification:** npm run build exits 0 with TypeScript passing
- **Committed in:** 9dcb544 (Task 1 commit)

**2. [Rule 1 - Bug] Playwright CTA test finding header nav link instead of program CTAs**
- **Found during:** Task 2 (npx playwright test — test 3 failed)
- **Issue:** `page.getByRole('link', { name: /conversation|inquire|contact/i })` matched header "Contact" nav link (href="/contact", no ?program=) before program CTA links
- **Fix:** Changed selector to scope within `page.locator('main')` so only content area links are matched
- **Files modified:** tests/e2e/programs.spec.ts
- **Verification:** All 4 playwright tests pass
- **Committed in:** 37b0b75 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 — bugs discovered during verification)
**Impact on plan:** Both fixes necessary for build correctness and test accuracy. No scope creep.

## Issues Encountered
- Dev server was already running an older cache when first playwright test run returned 404 — killing the existing process and letting playwright restart the dev server resolved the stale routing.

## User Setup Required
None — no additional external service configuration required for this plan.

## Next Phase Readiness
- /programs page is complete; homepage ProgramsOverview deep links (#content-syndication, #webinar) now resolve
- ?program= query param ready for InquiryForm in Plan 01-05 to read and pre-populate the programType field
- Plan 01-04 (About page) and Plan 01-05 (Contact/InquiryForm) can now proceed

---
*Phase: 01-foundation-and-core-pages*
*Completed: 2026-04-17*
