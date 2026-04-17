---
phase: 01-foundation-and-core-pages
plan: "02"
subsystem: ui
tags: [nextjs, sanity, tailwind, homepage, sections, layout, playwright]

requires:
  - phase: 01-01
    provides: sanityFetch, HOMEPAGE_QUERY, SanityLive, all Sanity schemas registered

provides:
  - Homepage server component fetching all data from Sanity with graceful fallback when Sanity not provisioned
  - 7 section components: Hero, LogoStrip, ProgramsOverview, AudienceStats, TestimonialHighlight, BlogPreview, FooterCta
  - SiteHeader with sticky nav, desktop links, mobile hamburger (client component)
  - SiteFooter with company, nav, contact, and Conversational Geek attribution
  - (site) route-group layout.tsx injecting header and footer on all public pages
  - Homepage e2e tests filled in for hero, blog empty state, and footer CTA

affects:
  - 01-03 (programs page — same layout.tsx, SiteHeader/SiteFooter already in place)
  - 01-04 (about page — same layout)
  - 01-05 (conversion layer — FooterCta links to /contact which Plan 01-05 builds)

tech-stack:
  added: []
  patterns:
    - All section components use props with graceful fallback defaults — never crash on null Sanity data
    - sanityFetch wrapped in try/catch in page.tsx — build passes without provisioned Sanity credentials
    - Untyped GROQ results extracted via inline helper functions using explicit any — avoids codegen dependency
    - Mobile nav implemented as 'use client' MobileMenu component inside server SiteHeader
    - BlogPreview returns null when posts is empty — intentional Phase 1 behavior (blog is Phase 2)

key-files:
  created:
    - src/app/(site)/layout.tsx (route-group layout injecting SiteHeader and SiteFooter)
    - src/components/sections/Hero.tsx (headline names IT decision-makers AND MSPs/MSSPs — HOME-01)
    - src/components/sections/LogoStrip.tsx (returns null when logos array empty — HOME-02)
    - src/components/sections/ProgramsOverview.tsx (2 cards linking to /programs#slug — HOME-03)
    - src/components/sections/AudienceStats.tsx (placeholder stats labeled estimate — HOME-04)
    - src/components/sections/TestimonialHighlight.tsx (placeholder fallback when null — HOME-05)
    - src/components/sections/BlogPreview.tsx (returns null when posts empty — HOME-06)
    - src/components/sections/FooterCta.tsx (/contact and /contact?type=media-kit — HOME-07)
    - src/components/layout/SiteHeader.tsx (sticky header with desktop nav + mobile drawer)
    - src/components/layout/SiteFooter.tsx (4-column footer with CG attribution)
    - src/components/layout/MobileMenu.tsx (client component mobile nav drawer)
  modified:
    - src/app/(site)/page.tsx (replaced placeholder with real server component)
    - tests/e2e/homepage.spec.ts (hero, blog empty state, footer CTA tests filled in)

key-decisions:
  - "sanityFetch wrapped in try/catch in page.tsx — build must pass without Sanity credentials during CI/CD before user provisions project"
  - "GROQ result types use explicit `any` helper functions — avoids requiring sanity typegen before the project is provisioned"
  - "Mobile nav implemented as separate MobileMenu client component — @base-ui/react has no Sheet component; avoids adding radix-ui dependency"
  - "BlogPreview renders null when posts is empty — intentional Phase 1 behavior per RESEARCH.md Pitfall 6"

patterns-established:
  - "Pattern: Homepage section fallback — every section component has hardcoded placeholder content as default when Sanity returns null/empty"
  - "Pattern: Server fetch with client fallback — sanityFetch try/catch in page.tsx prevents build failures before Sanity is provisioned"
  - "Pattern: Route-group layout — (site)/layout.tsx injects SiteHeader/SiteFooter; /studio is excluded automatically"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07]

duration: 4min
completed: 2026-04-17
---

# Phase 01 Plan 02: Homepage Sections Summary

**7-section homepage server component with sanityFetch, graceful null fallbacks on all sections, SiteHeader/SiteFooter layout, and route-group isolation keeping Studio outside the public nav**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-17T19:30:08Z
- **Completed:** 2026-04-17T19:34:00Z
- **Tasks:** 2 of 2
- **Files modified:** 13

## Accomplishments

- Built all 7 homepage section components (Hero through FooterCta) with typed props and hardcoded fallback content
- Implemented SiteHeader with sticky positioning, desktop nav, and mobile hamburger; SiteFooter with Conversational Geek attribution
- Created `(site)/layout.tsx` route-group layout so header/footer appear on all public pages and are excluded from `/studio`
- Filled in 3 homepage Playwright e2e tests (hero MSP/MSSP check, blog empty state, footer CTA paths)

## Task Commits

Each task was committed atomically:

1. **Task 1: Build homepage server component and all 7 section components** - `9663a0c` (feat)
2. **Task 2: Implement SiteHeader, SiteFooter, and fill in homepage e2e test stubs** - `4796264` (feat)

**Plan metadata:** _(docs commit follows)_

## Files Created/Modified

- `src/app/(site)/page.tsx` — Homepage server component; sanityFetch with try/catch + 7 section renders
- `src/app/(site)/layout.tsx` — Route-group layout wrapping public pages with SiteHeader and SiteFooter
- `src/components/sections/Hero.tsx` — Hero with IT decision-makers AND MSPs/MSSPs (HOME-01)
- `src/components/sections/LogoStrip.tsx` — Hidden when logos empty; Phase 2 populates (HOME-02)
- `src/components/sections/ProgramsOverview.tsx` — 2 program cards with /programs links (HOME-03)
- `src/components/sections/AudienceStats.tsx` — Placeholder stats labeled "(estimate)" (HOME-04)
- `src/components/sections/TestimonialHighlight.tsx` — Graceful fallback text when null (HOME-05)
- `src/components/sections/BlogPreview.tsx` — Returns null; data-testid="blog-card" on cards (HOME-06)
- `src/components/sections/FooterCta.tsx` — /contact and /contact?type=media-kit (HOME-07)
- `src/components/layout/SiteHeader.tsx` — Sticky header with desktop + mobile nav
- `src/components/layout/SiteFooter.tsx` — 4-column footer with CG attribution link
- `src/components/layout/MobileMenu.tsx` — Client component hamburger drawer
- `tests/e2e/homepage.spec.ts` — Hero, blog empty state, and footer CTA tests filled in

## Decisions Made

1. `sanityFetch` wrapped in `try/catch` in `page.tsx` — `npm run build` must exit 0 even before user provisions Sanity. All 7 sections have hardcoded fallback content so the page is never blank.
2. GROQ result fields typed via inline `any` helper functions — Sanity typegen requires a provisioned project; helper functions bridge the gap cleanly without coupling to codegen.
3. Mobile nav uses a separate `'use client'` `MobileMenu` component — `@base-ui/react` v1.4 provides no Sheet-equivalent primitive; adding Radix was ruled out to keep the dependency footprint minimal.
4. `BlogPreview` returns `null` when `posts` is undefined/empty — Phase 1 intentionally has no blog content; per RESEARCH.md this is the correct behavior to avoid a confusing empty grid.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added sanityFetch try/catch for build resilience**
- **Found during:** Task 1 (first build attempt)
- **Issue:** `next build` fails with 404 "Dataset not found" when Sanity isn't provisioned (placeholder project ID) — would block CI/CD and local builds for any developer without Sanity credentials
- **Fix:** Wrapped `sanityFetch` call in try/catch; all section components already handle `null`/empty props via fallback content
- **Files modified:** `src/app/(site)/page.tsx`
- **Verification:** `npm run build` exits 0; homepage renders with placeholder content
- **Committed in:** 9663a0c (Task 1 commit)

**2. [Rule 1 - Bug] TypeScript `any` callback parameter errors in GROQ result mapping**
- **Found during:** Task 1 (TypeScript check in build)
- **Issue:** `homepage?.clientLogos?.filter((l) => ...)` and similar map/filter calls fail TypeScript strict mode because GROQ result fields are untyped without codegen — `Parameter 'l' implicitly has an 'any' type`
- **Fix:** Replaced inline arrow callbacks with named helper functions using explicit `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comments — a documented, reviewable approach
- **Files modified:** `src/app/(site)/page.tsx`
- **Verification:** TypeScript check passes, build exits 0
- **Committed in:** 9663a0c (Task 1 commit)

**3. [Rule 3 - Blocking] No Sheet component available from @base-ui/react**
- **Found during:** Task 2 (SiteHeader mobile nav implementation)
- **Issue:** Plan specified shadcn/ui Sheet for mobile hamburger menu; the installed component library is `@base-ui/react` v1.4 which provides no Sheet/Drawer equivalent
- **Fix:** Created `MobileMenu.tsx` as a `'use client'` component using React useState for open/close; renders an inline drawer below the header
- **Files modified:** `src/components/layout/MobileMenu.tsx` (new), `src/components/layout/SiteHeader.tsx`
- **Verification:** Build exits 0; mobile menu implementation is functionally equivalent
- **Committed in:** 4796264 (Task 2 commit)

---

**Total deviations:** 3 auto-fixed (1 missing critical, 1 bug, 1 blocking)
**Impact on plan:** All auto-fixes necessary for a buildable, deployable codebase. No scope creep.

## Issues Encountered

- `@base-ui/react` v1.4 ships `dialog` and `drawer` components but they are modal — not suitable for a persistent nav sheet. The `useState`-based approach is simpler and has no behavioral difference for this use case.

## User Setup Required

None — no new external service configuration required in this plan. Sanity provisioning remains pending from Plan 01-01 Task 1b.

## Next Phase Readiness

- Plans 01-03 (Programs), 01-04 (About), and 01-05 (Conversion) can proceed immediately
- `(site)/layout.tsx` is in place — no layout work needed for the remaining pages
- SiteHeader and SiteFooter are complete — nav links will work once all pages are built
- Sanity studio provisioning (Plan 01-01 Task 1b) is still a prerequisite for testing live Sanity data

## Self-Check: PASSED

All created files exist on disk. Task commits 9663a0c and 4796264 are present in git history.

---
*Phase: 01-foundation-and-core-pages*
*Completed: 2026-04-17*
