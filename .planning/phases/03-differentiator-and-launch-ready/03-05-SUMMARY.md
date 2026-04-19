---
phase: 03-differentiator-and-launch-ready
plan: 05
subsystem: ui
tags: [next.js, react, tailwind, nav, dropdown, programs, playwright]

# Dependency graph
requires:
  - phase: 03-03
    provides: individual program pages at /programs/{slug} for all 6 slugs
  - phase: 03-04
    provides: methodology page and METH-04 branded program name conventions
provides:
  - Programs overview grid at /programs with data-testid="programs-grid"
  - ProgramsDropdown client component with hover trigger and data-testid="programs-dropdown"
  - NavLinks.ts single source of truth for nav link constants
  - Updated SiteHeader with Programs dropdown + Methodology/Audience/Resources
  - Updated MobileMenu with expanded program flat list (no hover)
affects:
  - Any future nav changes should update NavLinks.ts only
  - Playwright nav tests depend on data-testid="programs-dropdown"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - NavLinks.ts constants file as single source of truth (eliminates nav duplication anti-pattern)
    - ProgramsDropdown as separate 'use client' component boundary within Server Component SiteHeader
    - Mobile nav uses flat expanded list for programs — no hover dropdown (avoids touch device pitfall)

key-files:
  created:
    - src/components/layout/NavLinks.ts
    - src/components/layout/ProgramsDropdown.tsx
  modified:
    - src/components/layout/SiteHeader.tsx
    - src/components/layout/MobileMenu.tsx
    - src/app/(site)/programs/page.tsx

key-decisions:
  - "NavLinks.ts extracted as single source of truth — MobileMenu and SiteHeader both import from it to prevent nav drift"
  - "ProgramsDropdown is a 'use client' component boundary — SiteHeader remains a Server Component"
  - "Mobile nav renders programs as flat expanded list, not a hover dropdown — touch devices have no hover state"
  - "Programs index page uses PROGRAMS_INDEX_QUERY (name/slug/tagline only) instead of PROGRAMS_QUERY (full content) — lighter fetch for index view"

patterns-established:
  - "Pattern 1: Nav constants extracted to NavLinks.ts — import from there, never declare inline in header or menu"
  - "Pattern 2: Client component islands within Server Component nav — isolate interactivity at the dropdown level"
  - "Pattern 3: Mobile nav always uses flat list for expandable sections — no hover-dependent patterns"

requirements-completed: [METH-04]

# Metrics
duration: 8min
completed: 2026-04-19
---

# Phase 03 Plan 05: Programs Index + Nav Update Summary

**Programs nav dropdown with hover-triggered ProgramsDropdown client component, overview grid at /programs showing all 6 ADVANCE brands, and NavLinks.ts eliminating header/mobile nav duplication**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-19T23:16:10Z
- **Completed:** 2026-04-19T23:24:00Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments

- Created NavLinks.ts as single source of truth eliminating the anti-pattern of duplicate nav arrays in SiteHeader and MobileMenu
- Built ProgramsDropdown client component with hover trigger, data-testid="programs-dropdown", and "All Programs" overview link above the 6 individual program links
- Refactored /programs index from a flat ProgramCard layout (2 programs) to a 6-card branded overview grid with data-testid="programs-grid"
- Updated MobileMenu to show all 6 programs as an expanded flat list (no hover) with Methodology, Audience, and Resources added to mobile nav
- All 16 Playwright programs tests pass; 4 methodology tests pass; no regressions in 34-test suite

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract nav constants + create ProgramsDropdown + update SiteHeader and MobileMenu** - `8d65da9` (feat)
2. **Task 2: Refactor /programs index page to overview grid** - `089ab24` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/components/layout/NavLinks.ts` - Single source of truth for programLinks (6 entries) and mainNavLinks
- `src/components/layout/ProgramsDropdown.tsx` - 'use client' hover dropdown with data-testid="programs-dropdown"
- `src/components/layout/SiteHeader.tsx` - Updated desktop nav with ProgramsDropdown + Methodology/Audience/Resources links
- `src/components/layout/MobileMenu.tsx` - Updated mobile nav with expanded program flat list + new nav items
- `src/app/(site)/programs/page.tsx` - Refactored to overview grid using PROGRAMS_INDEX_QUERY with 6 branded fallback entries

## Decisions Made

- NavLinks.ts extracted as single source of truth — both MobileMenu and SiteHeader import from it, eliminating the nav drift anti-pattern identified in RESEARCH.md
- ProgramsDropdown is a separate 'use client' component boundary so SiteHeader remains a Server Component
- Mobile nav renders programs as flat expanded list, not a hover dropdown — touch devices have no hover state (RESEARCH.md Pitfall 6)
- Programs index page uses lighter PROGRAMS_INDEX_QUERY (name/slug/tagline) instead of full PROGRAMS_QUERY — correct separation for index vs. detail view

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all files compiled cleanly, build succeeded, and all 16 programs Playwright tests passed on first run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All METH-04 requirements satisfied: branded program names visible in /programs grid and in desktop/mobile nav
- Programs dropdown is accessible from every page via the sticky header
- Phase 03 Wave 4 complete — programs index, individual program pages, methodology page, and nav all updated
- Full launch readiness pending content delivery (Phase 02 content gate) and Vercel deployment verification

---
*Phase: 03-differentiator-and-launch-ready*
*Completed: 2026-04-19*
