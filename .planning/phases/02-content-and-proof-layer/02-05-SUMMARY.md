---
phase: 02-content-and-proof-layer
plan: 05
subsystem: case-studies
tags: [case-studies, routing, sanity, homepage, blog-preview]
dependency_graph:
  requires: [02-01, 02-02]
  provides: [/case-studies listing, /case-studies/[slug] detail, homepage case study highlight, homepage blog preview wired]
  affects: [src/app/(site)/page.tsx, src/app/(site)/case-studies/*, src/components/sections/CaseStudyCard.tsx, src/components/sections/CaseStudyHighlight.tsx]
tech_stack:
  added: []
  patterns: [Next.js 15 dynamic route with awaited params, generateStaticParams with try/catch fallback, PortableText body rendering, null-safe section components]
key_files:
  created:
    - src/components/sections/CaseStudyCard.tsx
    - src/components/sections/CaseStudyHighlight.tsx
    - src/app/(site)/case-studies/page.tsx
    - src/app/(site)/case-studies/[slug]/page.tsx
  modified:
    - src/app/(site)/page.tsx
decisions:
  - "CaseStudyHighlight returns null when featuredCaseStudy is null — never shows empty section before Studio content is published"
  - "case-studies/[slug] awaits params (Promise<{slug}>) per Next.js 15 Pitfall 1 — same pattern as blog/[slug]"
  - "FEATURED_CASE_STUDY_QUERY and BLOG_PREVIEW_QUERY fetched separately from HOMEPAGE_QUERY — preserves existing homepage data extractor functions"
  - "BlogPreview now receives real blogPosts array instead of undefined — activates blog preview when Sanity posts exist"
metrics:
  duration: 2 min
  completed_date: "2026-04-17"
  tasks_completed: 2
  files_changed: 5
---

# Phase 2 Plan 5: Case Studies Routes and Homepage Wiring Summary

Case study listing, individual case study pages, and homepage CaseStudyHighlight + BlogPreview wired to real Sanity data using FEATURED_CASE_STUDY_QUERY and BLOG_PREVIEW_QUERY fetched independently.

## What Was Built

**Task 1: CaseStudyCard + CaseStudyHighlight components**

- `CaseStudyCard` — presentational card with `data-testid="case-study-card"`, renders title, display name (clientName or industry), summary, up to 2 metrics in a grid, and "Read case study →" link
- `CaseStudyHighlight` — featured case study section with `data-testid="case-study-highlight"`, returns null when `featuredCaseStudy` is null, shows up to 3 metrics prominently

**Task 2: Case-studies routes + homepage wiring**

- `/case-studies` — server component listing page with responsive grid of `CaseStudyCard` components, empty state message when no content, try/catch Sanity fallback
- `/case-studies/[slug]` — dynamic route server component following blog/[slug] pattern: `generateStaticParams` with empty array fallback, awaits `params`, calls `notFound()` on null result, `data-testid="case-study-metrics"` section, PortableText body
- `src/app/(site)/page.tsx` — updated to fetch `FEATURED_CASE_STUDY_QUERY` and `BLOG_PREVIEW_QUERY` separately via `Promise.all`, inserts `<CaseStudyHighlight>` after `<TestimonialHighlight>`, passes real `blogPosts` to `<BlogPreview>`

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 91b6d49 | feat(02-05): add CaseStudyCard + CaseStudyHighlight components |
| 2 | eee5656 | feat(02-05): add case-studies routes and wire homepage |

## Deviations from Plan

None — plan executed exactly as written.

## Verification

`npm run build` passes. Build output includes:
- `○ /case-studies` (static)
- `● /case-studies/[slug]` (SSG with generateStaticParams)

Both routes visible in build table. Homepage updated with CaseStudyHighlight and BlogPreview receiving live data.
