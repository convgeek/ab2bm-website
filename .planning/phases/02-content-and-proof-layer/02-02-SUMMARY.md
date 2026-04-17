---
phase: 02-content-and-proof-layer
plan: "02"
subsystem: cms
tags: [sanity, groq, typescript, schemas]

# Dependency graph
requires:
  - phase: 01-foundation-and-core-pages
    provides: sanity.config.ts, queries.ts, homepage singleton pattern with @ts-expect-error

provides:
  - post document type (blog post schema with Portable Text body)
  - caseStudy document type (outcome metrics, featured flag, optional clientName for anonymized studies)
  - audiencePage singleton document type (stats, industry/size breakdown, personas array)
  - personaCard object type (segmentName, description, jobTitles, companyProfile)
  - 7 named GROQ query exports: BLOG_LISTING_QUERY, BLOG_POST_QUERY, BLOG_PREVIEW_QUERY, CASE_STUDIES_QUERY, CASE_STUDY_QUERY, FEATURED_CASE_STUDY_QUERY, AUDIENCE_PAGE_QUERY
  - All 4 new schemas registered in sanity.config.ts with correct type ordering

affects:
  - 02-03 (blog routes depend on post schema + BLOG_LISTING_QUERY, BLOG_POST_QUERY, BLOG_PREVIEW_QUERY)
  - 02-04 (case study routes depend on caseStudy schema + CASE_STUDIES_QUERY, CASE_STUDY_QUERY, FEATURED_CASE_STUDY_QUERY)
  - 02-05 (audience page route depends on audiencePage schema + personaCard + AUDIENCE_PAGE_QUERY)
  - 02-06 (homepage wiring uses BLOG_PREVIEW_QUERY + FEATURED_CASE_STUDY_QUERY)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Sanity object type registered before document types that reference it (personaCard before audiencePage)
    - GROQ queries namespaced to content domain and appended to shared queries.ts without modifying Phase 1 queries
    - audiencePage singleton follows @ts-expect-error pattern for __experimental_actions established in homepage.ts

key-files:
  created:
    - src/sanity/schemas/objects/personaCard.ts
    - src/sanity/schemas/documents/post.ts
    - src/sanity/schemas/documents/caseStudy.ts
    - src/sanity/schemas/documents/audiencePage.ts
  modified:
    - src/sanity/sanity.config.ts
    - src/sanity/lib/queries.ts

key-decisions:
  - "personaCard object type must be registered before audiencePage in sanity.config.ts types array — Sanity resolves type references in registration order, omitting or misordering causes Studio error Unknown type: personaCard"
  - "caseStudy clientName field is optional — anonymized studies use descriptive title field instead (e.g. Enterprise Security Vendor — Webinar Lead Generation)"
  - "Phase 1 GROQ queries in queries.ts are untouched — Phase 2 queries appended as a clearly delimited block to avoid breaking existing homepage/programs/team data shapes"

patterns-established:
  - "Object types registered before document types that reference them in sanity.config.ts types array"
  - "Phase 2 GROQ queries appended to queries.ts with // Phase 2 queries comment block delimiter"

requirements-completed: [BLOG-02, CASE-02, AUDN-01, AUDN-02, AUDN-03, AUDN-04]

# Metrics
duration: 2min
completed: 2026-04-17
---

# Phase 2 Plan 02: Sanity Schemas and GROQ Queries Summary

**4 new Sanity schemas (post, caseStudy, audiencePage singleton, personaCard object) and 7 GROQ query exports registered — data contracts established for all Phase 2 content routes**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-17T21:40:42Z
- **Completed:** 2026-04-17T21:42:12Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Created personaCard object type and 3 document types (post, caseStudy, audiencePage) with correct field shapes per RESEARCH.md patterns
- Registered all 4 new schemas in sanity.config.ts with personaCard listed before audiencePage to satisfy Sanity's reference resolution order
- Appended 7 named GROQ query exports to queries.ts without touching existing Phase 1 queries — data contracts ready for blog, case study, and audience page routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Sanity object and document schemas** - `0d92b67` (feat)
2. **Task 2: Register schemas and add GROQ queries** - `ac8698c` (feat)

**Plan metadata:** (committed with docs commit below)

## Files Created/Modified
- `src/sanity/schemas/objects/personaCard.ts` - Audience persona card object type (segmentName, description, jobTitles, companyProfile)
- `src/sanity/schemas/documents/post.ts` - Blog post document type with Portable Text body and publishedAt ordering
- `src/sanity/schemas/documents/caseStudy.ts` - Case study document type with optional clientName, outcome metrics array, featured flag
- `src/sanity/schemas/documents/audiencePage.ts` - Singleton audience page document with stats, industry/size breakdown, personas array
- `src/sanity/sanity.config.ts` - Added 4 new type imports and registrations (9 total types, personaCard before audiencePage)
- `src/sanity/lib/queries.ts` - Appended 7 new GROQ query exports for Phase 2 content routes

## Decisions Made
- personaCard object type registered before audiencePage in sanity.config.ts — Sanity resolves type references in registration order; out-of-order causes Studio error "Unknown type: personaCard"
- caseStudy clientName field is optional with descriptive guidance: anonymized studies use the title field (e.g. "Enterprise Security Vendor — Webinar Lead Generation") and leave clientName blank
- Phase 1 GROQ queries untouched — Phase 2 queries appended as a clearly delimited block to prevent breaking existing homepage/programs/team data shapes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required. Schema changes take effect in Sanity Studio when the project is provisioned and sanity.config.ts is loaded.

## Next Phase Readiness
- All Phase 2 data contracts established — post, caseStudy, audiencePage schemas are ready for content in Studio
- BLOG_LISTING_QUERY, BLOG_POST_QUERY, BLOG_PREVIEW_QUERY ready for import in 02-03 (blog routes)
- CASE_STUDIES_QUERY, CASE_STUDY_QUERY, FEATURED_CASE_STUDY_QUERY ready for import in 02-04 (case study routes)
- AUDIENCE_PAGE_QUERY ready for import in 02-05 (audience page route)
- BLOG_PREVIEW_QUERY and FEATURED_CASE_STUDY_QUERY ready for import in 02-06 (homepage wiring)

---
*Phase: 02-content-and-proof-layer*
*Completed: 2026-04-17*
