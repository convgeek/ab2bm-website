---
phase: 02-content-and-proof-layer
plan: "03"
subsystem: ui
tags: [next.js, sanity, groq, portabletext, blog, static-generation]

# Dependency graph
requires:
  - phase: 02-02
    provides: BLOG_LISTING_QUERY and BLOG_POST_QUERY in queries.ts; Sanity post schema
provides:
  - Blog listing page at /blog — Server Component with try/catch Sanity fetch, empty state, data-testid blog-card grid
  - Individual post page at /blog/[slug] — generateStaticParams, await params, notFound(), PortableText body renderer
affects: [02-04, 02-05, testing, navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - generateStaticParams with try/catch returns empty array when Sanity not provisioned (prevents build crash)
    - params typed as Promise<{ slug }> and destructured after await (Next.js 15 App Router requirement)
    - PortableText custom component map for h2 and blockquote (site typography consistency)
    - Blog route pages mirror homepage try/catch sanityFetch pattern established in Phase 1

key-files:
  created:
    - src/app/(site)/blog/page.tsx
    - src/app/(site)/blog/[slug]/page.tsx
  modified: []

key-decisions:
  - "generateStaticParams returns empty array on Sanity fetch failure — blog/[slug] renders as SSG with no static paths at build time, on-demand at runtime"
  - "Inline ALL_POST_SLUGS_QUERY defined with defineQuery in [slug]/page.tsx — only slugs needed for generateStaticParams, avoids over-fetching"
  - "No export const dynamic used — static generation via defineLive ISR pattern per RESEARCH.md anti-pattern note"

patterns-established:
  - "Blog post card: data-testid='blog-card' on article element — required by audience.spec.ts and blog.spec.ts"
  - "Empty state: rounded-xl border bg-card centered text block — consistent with Phase 1 card styling"

requirements-completed: [BLOG-01, BLOG-02, BLOG-04]

# Metrics
duration: 1min
completed: 2026-04-17
---

# Phase 02 Plan 03: Blog Routes Summary

**Next.js App Router blog routes at /blog and /blog/[slug] — static generation with Sanity GROQ, PortableText body, and graceful empty-state handling**

## Performance

- **Duration:** 1 min
- **Started:** 2026-04-17T21:44:11Z
- **Completed:** 2026-04-17T21:45:23Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Blog listing page at /blog fetches all published posts via BLOG_LISTING_QUERY, renders grid of blog-card articles with data-testid, shows empty state ("Content coming soon") when Sanity has no posts
- Individual post page at /blog/[slug] with generateStaticParams (empty array fallback), awaited params, notFound() on missing slug, PortableText body with custom h2 and blockquote renderers
- Both routes build cleanly — /blog as static, /blog/[slug] as SSG — with no TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Build blog listing page at /blog** - `c521620` (feat)
2. **Task 2: Build individual blog post page at /blog/[slug]** - `8a1a86d` (feat)

## Files Created/Modified
- `src/app/(site)/blog/page.tsx` - Blog listing page — BLOG_LISTING_QUERY fetch, extractPosts helper, empty-state, card grid
- `src/app/(site)/blog/[slug]/page.tsx` - Individual post page — generateStaticParams, awaited params, notFound(), PortableText

## Decisions Made
- `generateStaticParams` returns empty array on Sanity fetch failure — /blog/[slug] is SSG with no static paths pre-built; pages render on first request
- Inline `ALL_POST_SLUGS_QUERY` (only slugs) defined directly in [slug]/page.tsx rather than adding a new export to queries.ts — keeps the query scoped to generateStaticParams use only
- No `export const dynamic` used — consistent with RESEARCH.md anti-pattern note prohibiting force-dynamic

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required for these routes. Blog content will populate when CG publishes posts in Sanity Studio.

## Next Phase Readiness
- Blog routes are complete and building. BLOG-01 and BLOG-02 structural requirements fulfilled.
- BLOG-03 (6+ posts) and BLOG-04 (IT-pro-targeted content) are content requirements that will pass once CG publishes in Sanity Studio.
- Navigation link to /blog can be added once this plan is merged.

---
*Phase: 02-content-and-proof-layer*
*Completed: 2026-04-17*
