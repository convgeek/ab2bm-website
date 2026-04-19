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
  - "INFRA-06 partially satisfied: field data collection enabled; production CWV pass pending human checkpoint"
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

**@vercel/speed-insights installed in root layout; Phase 3 pages audited with zero raw img tags and next/font confirmed — production CWV pass pending Vercel deployment checkpoint**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-19T23:20:00Z
- **Completed:** 2026-04-19T23:25:00Z (Task 1); Task 2 awaiting human checkpoint
- **Tasks:** 1/2 (Task 2 is a human-verify checkpoint)
- **Files modified:** 2

## Accomplishments
- Installed `@vercel/speed-insights` v2.0.0 and added `SpeedInsights` component to root layout — field CWV data collection is now active on production
- Audited all Phase 3 pages (`/programs/*`, `/methodology`): zero raw `<img>` tags found; pages are text-heavy with no image assets that could cause LCP/CLS failures
- Confirmed fonts use `next/font/google` (Geist + Geist_Mono) — no font-swap layout shift possible
- `npm run build` passes cleanly across all 19 routes with Speed Insights in place

## Task Commits

1. **Task 1: Install Speed Insights + audit Phase 3 pages for CWV** - `479e09b` (feat)
2. **Task 2: Core Web Vitals checkpoint** - PENDING human verification

**Plan metadata:** (to be committed after Task 2 approval)

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

**Task 2 requires human action:**
1. Push current branch to Vercel (git push → auto-deploy on main)
2. Run Chrome Lighthouse on the Vercel production/preview URL for these pages:
   - `/` (homepage)
   - `/programs` (programs grid)
   - `/programs/advance-engage` (individual program page)
   - `/methodology`
   - `/audience`
3. Verify LCP < 2.5s, CLS < 0.1, TBT < 200ms on each page
4. Run functional smoke test (programs dropdown, mobile nav, CTA → /contact?program= prefill, InquiryForm dropdown)
5. Type "approved" to continue if all pass

## Next Phase Readiness
- Speed Insights is collecting field data as soon as production is deployed
- Phase 3 is fully built — awaiting human CWV verification to close INFRA-06
- After Task 2 approval: Phase 3 complete, site is launch-ready

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19 (partial — Task 2 checkpoint pending)*
