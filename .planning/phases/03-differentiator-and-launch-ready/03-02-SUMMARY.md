---
phase: 03-differentiator-and-launch-ready
plan: 02
subsystem: database
tags: [sanity, groq, zod, typescript, program-schema, content-model]

# Dependency graph
requires:
  - phase: 03-01
    provides: Wave 0 Playwright test stubs for methodology and programs pages
provides:
  - Expanded program Sanity schema with 6-value programType enum and 4 new content fields
  - methodologyPage singleton Sanity schema with 3 PortableText section fields
  - 4 Phase 3 GROQ queries (PROGRAM_BY_SLUG_QUERY, ALL_PROGRAM_SLUGS_QUERY, PROGRAMS_INDEX_QUERY, METHODOLOGY_PAGE_QUERY)
  - Updated InquiryForm and submit-inquiry with 6 ADVANCE programType values replacing content-syndication
affects:
  - 03-03 (program detail pages — builds against PROGRAM_BY_SLUG_QUERY and program schema)
  - 03-04 (methodology page — builds against METHODOLOGY_PAGE_QUERY and methodologyPage schema)
  - 03-05 (programs index refactor — builds against PROGRAMS_INDEX_QUERY)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - singleton Sanity schema with __experimental_actions: ['update', 'publish'] and @ts-expect-error
    - Phase 3 GROQ queries appended after AUDIENCE_PAGE_QUERY without modifying existing queries
    - Zod enum, isValidProgramType guard, and select options updated atomically (RESEARCH.md Pitfall 1)

key-files:
  created:
    - src/sanity/schemas/documents/methodologyPage.ts
  modified:
    - src/sanity/schemas/documents/program.ts
    - src/sanity/sanity.config.ts
    - src/sanity/lib/queries.ts
    - src/components/forms/InquiryForm.tsx
    - src/lib/actions/submit-inquiry.ts

key-decisions:
  - "content-syndication programType dropped in Phase 3 (pre-launch, no live data); replaced by advance-engage as primary content syndication product"
  - "submit-inquiry server action Zod enum updated alongside InquiryForm to maintain type contract — both must match atomically (RESEARCH.md Pitfall 1)"
  - "program schema fields mechanics/deliverables/targetingOptions removed (Phase 1 placeholders); replaced by solutionOverview/howItWorks/whatYouGet/bestFor structured fields"

patterns-established:
  - "methodologyPage uses identical singleton pattern to audiencePage — __experimental_actions with @ts-expect-error comment"
  - "Phase 3 GROQ queries appended in dedicated comment block — never modify earlier query blocks"
  - "programType enum changes must be applied in 3 locations atomically: Zod schema, isValidProgramType(), and select JSX options"

requirements-completed: [METH-01, METH-02, METH-03, METH-04]

# Metrics
duration: 2min
completed: 2026-04-19
---

# Phase 3 Plan 02: Data Layer Summary

**Sanity program schema expanded to 6 ADVANCE programType values with 4 new content fields, methodologyPage singleton created, 4 Phase 3 GROQ queries added, and InquiryForm + server action updated atomically**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-04-19T22:04:31Z
- **Completed:** 2026-04-19T22:06:22Z
- **Tasks:** 2
- **Files modified:** 5 (+ 1 created)

## Accomplishments
- Replaced old 2-value programType enum (content-syndication/webinar) with 6-value ADVANCE enum in program.ts Sanity schema
- Created methodologyPage singleton schema following audiencePage pattern with 3 PortableText sections
- Appended 4 Phase 3 GROQ queries to queries.ts — stable contracts Plans 03/04/05 build against
- Updated all 3 programType locations in InquiryForm and synced submit-inquiry server action atomically

## Task Commits

Each task was committed atomically:

1. **Task 1: Expand program schema, create methodologyPage singleton, register in config** - `0e10781` (feat)
2. **Task 2: Add Phase 3 GROQ queries and update InquiryForm programType enum** - `69a7d26` (feat)

**Plan metadata:** (included in final commit)

## Files Created/Modified
- `src/sanity/schemas/documents/program.ts` - Updated programType enum (6 ADVANCE values), removed mechanics/deliverables/targetingOptions, added solutionOverview/howItWorks/whatYouGet/bestFor
- `src/sanity/schemas/documents/methodologyPage.ts` - New singleton schema with pageHeadline, pageSubheadline, audienceBuilding, contentSyndicationProcess, webinarProcess
- `src/sanity/sanity.config.ts` - methodologyPage imported and registered in types array
- `src/sanity/lib/queries.ts` - PROGRAM_BY_SLUG_QUERY, ALL_PROGRAM_SLUGS_QUERY, PROGRAMS_INDEX_QUERY, METHODOLOGY_PAGE_QUERY appended
- `src/components/forms/InquiryForm.tsx` - Zod enum, isValidProgramType(), and select options updated to 6+general values
- `src/lib/actions/submit-inquiry.ts` - Zod enum updated to match InquiryForm (Rule 3 auto-fix)

## Decisions Made
- content-syndication programType dropped in Phase 3 (pre-launch, no live data); replaced by advance-engage as primary content syndication product
- submit-inquiry server action Zod enum updated alongside InquiryForm to maintain type contract — both must match atomically
- program schema fields mechanics/deliverables/targetingOptions removed (Phase 1 placeholders); replaced by solutionOverview/howItWorks/whatYouGet/bestFor structured fields

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated submit-inquiry server action programType Zod enum**
- **Found during:** Task 2 (Add Phase 3 GROQ queries + update InquiryForm programType enum)
- **Issue:** submit-inquiry.ts still had `z.enum(['content-syndication', 'webinar', 'general'])`. After updating InquiryForm to the new enum, TypeScript raised TS2345: argument of type with new values is not assignable to the server action's narrower type, blocking build
- **Fix:** Updated `programType: z.enum([...])` in submit-inquiry.ts to the same 7-value list (6 ADVANCE + general)
- **Files modified:** src/lib/actions/submit-inquiry.ts
- **Verification:** `npx tsc --noEmit` passes (only pre-existing test-file errors remain); `npm run build` succeeds
- **Committed in:** 69a7d26 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix necessary for type safety and build correctness. No scope creep — server action is directly coupled to the form's data contract.

## Issues Encountered
- Pre-existing TypeScript errors in tests/e2e/sanity-cms.spec.ts and tests/unit/submit-mediakit.test.ts are unrelated to this plan and were present before execution. Confirmed via git stash check.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Stable data contracts in place for Plans 03, 04, and 05 to build against
- Program schema exports 6-value programType enum matching RESEARCH.md Pattern 4
- GROQ queries typed and verified to build cleanly without Sanity credentials
- No blockers for Plan 03 (program detail page routes)

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
