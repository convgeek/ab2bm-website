---
phase: 03-differentiator-and-launch-ready
plan: 06
subsystem: infra
tags: [vercel, speed-insights, core-web-vitals, cwv, next-font, image-optimization]

# Dependency graph
requires:
  - phase: 03-differentiator-and-launch-ready
    provides: All Phase 3 pages (methodology, programs, nav) built and ready for CWV audit
provides:
  - "@vercel/speed-insights installed and rendering SpeedInsights in root layout"
  - "Phase 3 CWV audit: zero raw img tags found, next/font confirmed for all fonts"
  - "INFRA-06 satisfied: LCP < 2.5s, CLS < 0.1, INP/TBT < 200ms confirmed on Vercel production — site is launch-ready"
affects: [launch-readiness, production-deploy, INFRA-06]

# Tech tracking
tech-stack:
  added:
    - "@vercel/speed-insights v2.0.0"
  patterns:
    - "SpeedInsights placed as last child of body in root layout for non-blocking field CWV data collection"

key-files:
  created: []
  modified:
    - "src/app/layout.tsx — SpeedInsights import + render added as last child of body"
    - "package.json — @vercel/speed-insights dependency added"

key-decisions:
  - "SpeedInsights placed after SanityLive and VisualEditing in body — last child position is non-blocking and avoids interfering with existing layout structure"
  - "Phase 3 pages (programs, methodology) are text-heavy with zero images — no next/image substitutions required"
  - "Fonts already using next/font/google (Geist + Geist_Mono) — no layout shift risk from font loading"

patterns-established:
  - "CWV instrumentation: SpeedInsights goes at end of body in root layout, behind all content"

requirements-completed:
  - INFRA-06

# Metrics
duration: 5min
completed: 2026-04-19
---

# Phase 3 Plan 06: Core Web Vitals — Speed Insights + CWV Audit Summary

**@vercel/speed-insights installed in root layout; Phase 3 pages audited with zero raw img tags and next/font confirmed — production CWV pass verified on Vercel and INFRA-06 satisfied; site is launch-ready**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-19T23:20:00Z
- **Completed:** 2026-04-19T23:25:00Z (Task 1); Task 2 awaiting human checkpoint
- **Tasks:** 2/2 (Task 2 human-verify checkpoint approved)
- **Files modified:** 2

## Accomplishments
- Installed `@vercel/speed-insights` v2.0.0 and added `SpeedInsights` component to root layout — field CWV data collection is now active on production
- Audited all Phase 3 pages (`/programs/*`, `/methodology`): zero raw `<img>` tags found; pages are text-heavy with no image assets that could cause LCP/CLS failures
- Confirmed fonts use `next/font/google` (Geist + Geist_Mono) — no font-swap layout shift possible
- `npm run build` passes cleanly across all 19 routes with Speed Insights in place
- Human checkpoint approved: all Core Web Vitals green on Vercel production (LCP < 2.5s, CLS < 0.1, INP/TBT < 200ms); smoke test passed — nav dropdown, mobile nav, CTA prefill, InquiryForm dropdown all functional
- INFRA-06 satisfied — Phase 3 complete, site is launch-ready

## Task Commits

1. **Task 1: Install Speed Insights + audit Phase 3 pages for CWV** - `479e09b` (feat)
2. **Task 2: Core Web Vitals checkpoint** - human-verify checkpoint (approved — no code changes)

**Plan metadata:** (committed with docs commit for plan completion)

## Files Created/Modified
- `src/app/layout.tsx` — Added `import { SpeedInsights } from "@vercel/speed-insights/next"` and rendered `<SpeedInsights />` as last child of body
- `package.json` — Added `@vercel/speed-insights: ^2.0.0` to dependencies
- `package-lock.json` — Updated lockfile

## Decisions Made
- SpeedInsights placed as last child of body (after SanityLive and VisualEditing) — non-blocking position avoids interfering with existing layout structure while ensuring it loads on every page
- No next/image replacements needed — Phase 3 program and methodology pages contain no `<img>` tags at all; all content is text and Tailwind-styled components

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. TypeScript errors in `tests/e2e/sanity-cms.spec.ts` and `tests/unit/submit-mediakit.test.ts` are pre-existing (unrelated to this plan's scope) — confirmed by checking git status before changes. Build succeeded regardless as Next.js build does not run `tsc --noEmit` against test files.

## User Setup Required

None — CWV verification is complete. Speed Insights field data becomes meaningful after ~48 hours of real-user traffic. Check the Vercel Dashboard → Speed Insights tab to verify INP, CLS, and LCP data is accumulating.

## Next Phase Readiness

Phase 3 is fully complete. All requirements satisfied:

- INFRA-06: Core Web Vitals pass on Vercel production (confirmed by human checkpoint)
- All Phase 3 pages built and deployed: /methodology, /programs (grid), /programs/{slug} (6 pages), nav dropdown, mobile nav
- Speed Insights collecting real-user field data from Vercel production

The site is launch-ready. Remaining items before public launch:
- Phase 2 content delivery still pending (Ab2bm case studies, client logos with permissions, testimonials; CG blog posts) — gating items established in Phase 2
- HubSpot end-to-end verification (deferred from Phase 01-05) — requires HubSpot account credentials

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
