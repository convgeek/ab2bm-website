---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: completed
stopped_at: Completed 02-05-PLAN.md — case studies routes and homepage wiring
last_updated: "2026-04-17T21:52:09.110Z"
last_activity: 2026-04-17 — Plan 02-01 (Wave 0 test scaffolding) complete
progress:
  total_phases: 3
  completed_phases: 1
  total_plans: 11
  completed_plans: 10
  percent: 55
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-17)

**Core value:** Tech vendor marketers land on the site, immediately understand who Ab2bm reaches and how, and feel confident enough to start a conversation
**Current focus:** Phase 2 — Content and Proof Layer

## Current Position

Phase: 2 of 3 (Content and Proof Layer) — IN PROGRESS
Plan: 1 of 6 in current phase (Plan 02-01 complete)
Status: Wave 0 test scaffolding complete — ready for implementation plans
Last activity: 2026-04-17 — Plan 02-01 (Wave 0 test scaffolding) complete

Progress: [██████░░░░] 55%

## Performance Metrics

**Velocity:**
- Total plans completed: 1
- Average duration: 12 min
- Total execution time: 0.2 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation-and-core-pages | 1/5 | 12 min | 12 min |

**Recent Trend:**
- Last 5 plans: 12 min
- Trend: baseline

*Updated after each plan completion*
| Phase 01-foundation-and-core-pages P02 | 4 min | 2 tasks | 13 files |
| Phase 01-foundation-and-core-pages P03 | 15 | 2 tasks | 4 files |
| Phase 01-foundation-and-core-pages P04 | 10 | 2 tasks | 5 files |
| Phase 02-content-and-proof-layer P01 | 8 | 2 tasks | 4 files |
| Phase 02-content-and-proof-layer P02 | 2 | 2 tasks | 6 files |
| Phase 02-content-and-proof-layer P03 | 1 | 2 tasks | 2 files |
| Phase 02-content-and-proof-layer P04 | 1 | 2 tasks | 2 files |
| Phase 02-content-and-proof-layer P05 | 2 | 2 tasks | 5 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Init: Stack confirmed — Next.js 15 + Vercel + Supabase + Sanity v3 + HubSpot Free CRM
- Init: Greenfield build — existing advanceb2bmedia.com is not a reference
- Init: Phase 2 is gated on Ab2bm delivering real audience stats, client logo permissions, and case study data; CG delivering 6+ blog posts
- 01-01: Import defineLive from next-sanity/live (sub-export in v12.x, not main package)
- 01-01: NextStudio wrapped in client component to prevent SSR createContext errors in next build
- 01-01: Singleton Sanity schemas use @ts-expect-error for __experimental_actions (runtime-only, excluded from public types)
- 01-01: vitest configured to exclude tests/e2e/** to prevent Playwright spec incompatibility
- [Phase 01-02]: sanityFetch wrapped in try/catch in page.tsx — build must pass without Sanity credentials
- [Phase 01-02]: GROQ result types use explicit any helper functions — avoids requiring sanity typegen before project is provisioned
- [Phase 01-02]: Mobile nav uses MobileMenu client component — @base-ui/react v1.4 has no Sheet; avoids adding Radix dependency
- [Phase 01-02]: BlogPreview returns null when posts empty — intentional Phase 1 behavior per RESEARCH.md Pitfall 6
- [Phase 01-03]: ProgramData interface declared explicitly — prevents TypeScript error from FALLBACK_PROGRAMS null fields being incompatible with PortableTextBlock[] return
- [Phase 01-03]: Playwright CTA test scoped to main element — header nav Contact link matches program regex causing false positives without scope boundary
- [Phase 01-04]: Playwright CG partnership test scoped to [data-testid=cg-partnership] locator — footer also contains a Conversational Geek link, causing strict mode violation without scope boundary
- [Phase 01-04]: TeamGrid renders placeholder members when members array is empty — page is never blank at Phase 1 before Sanity is provisioned
- [Phase 01-05]: Supabase failure is fire-and-forget in server actions — try/catch logs but does not re-throw, HubSpot always runs (CONV-02 requirement)
- [Phase 01-05]: HubSpot auth is split — Forms API uses no Authorization header; CRM Deals API uses Bearer HUBSPOT_PRIVATE_APP_TOKEN
- [Phase 01-05]: DEV_MOCK_HUBSPOT=true skips all HubSpot calls, returns { success: true, dev: true } — allows UI development without credentials
- [Phase 01-05]: Task 3 end-to-end HubSpot + Supabase verification deferred — requires HubSpot account setup; see 01-05-SUMMARY.md Deferred Items section
- [Phase 02-content-and-proof-layer]: BLOG-03 and CASE-01 count assertions are Wave 0 stubs — only pass after Sanity content published in Wave 4
- [Phase 02-content-and-proof-layer]: data-testid locators are canonical Playwright selector strategy for Phase 2 components (persona-card, audience-stats, logo-strip, testimonial-highlight, case-study-highlight, etc.)
- [Phase 02-content-and-proof-layer]: personaCard object type registered before audiencePage in sanity.config.ts — Sanity type reference resolution is order-sensitive; misordering causes Studio error 'Unknown type: personaCard'
- [Phase 02-content-and-proof-layer]: caseStudy clientName field is optional — anonymized studies use descriptive title field; clientName left blank
- [Phase 02-content-and-proof-layer]: Phase 2 GROQ queries appended to queries.ts without modifying Phase 1 queries — preserves existing homepage/programs/team data shapes
- [Phase 02-content-and-proof-layer]: generateStaticParams returns empty array on Sanity fetch failure — blog/[slug] renders on-demand with no pre-built static paths
- [Phase 02-content-and-proof-layer]: No export const dynamic used in blog routes — static generation via defineLive ISR pattern per RESEARCH.md
- [Phase 02-content-and-proof-layer]: methodology-note data-testid always rendered (with fallback text) so Playwright locators work before Sanity content is published
- [Phase 02-content-and-proof-layer]: MSP and MSSP explicitly named in audience page Section 2 intro copy — satisfies AUDN-01/AUDN-02 even in empty Sanity state
- [Phase 02-content-and-proof-layer]: PersonaCard is a pure presentational component — named export from sections/, props-only, no data fetching
- [Phase 02-content-and-proof-layer]: CaseStudyHighlight returns null when featuredCaseStudy is null — never shows empty section before Studio content is published
- [Phase 02-content-and-proof-layer]: FEATURED_CASE_STUDY_QUERY and BLOG_PREVIEW_QUERY fetched separately from HOMEPAGE_QUERY — preserves existing homepage data extractor functions

### Pending Todos

- Task 1b: User must provision Sanity project (npx sanity@latest login + init), create Supabase inquiries table (SQL in SUMMARY), connect to Vercel (git push + npx vercel --yes), and fill in .env.local from .env.local.example
- Plan 01-05 Task 3 (deferred): End-to-end HubSpot + Supabase verification — requires HubSpot account setup (Portal ID, Form GUIDs, Private App Token). Full checklist in 01-05-SUMMARY.md under "Deferred Items".

### Blockers/Concerns

- Task 1b external services (Sanity, Supabase, Vercel) require user credentials — cannot be automated
- Phase 2 start is blocked until Ab2bm provides: verified audience stats (total size, MSP/MSSP counts, job function/industry breakdown), permission to use client logos, and case study data (client names or anonymized industry + outcome metrics)
- Phase 2 start is also blocked until CG has 6+ blog posts authored and ready to publish
- Program naming/branding decisions (branded framework names for METH-04) should be resolved before Phase 3 begins to allow site-wide application

## Session Continuity

Last session: 2026-04-17T21:52:09.108Z
Stopped at: Completed 02-05-PLAN.md — case studies routes and homepage wiring
Resume file: None
