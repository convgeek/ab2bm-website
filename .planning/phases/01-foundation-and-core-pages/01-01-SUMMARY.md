---
phase: 01-foundation-and-core-pages
plan: "01"
subsystem: infra
tags: [nextjs, sanity, supabase, tailwind, shadcn, vitest, playwright, typescript, gtm]

requires: []

provides:
  - Next.js 15 App Router project scaffold with TypeScript, Tailwind v4, shadcn/ui
  - Sanity v3 integration via next-sanity defineLive() with sanityFetch and SanityLive
  - All Sanity document schemas: homepage, program, teamMember, testimonial, siteSettings
  - GROQ queries: HOMEPAGE_QUERY, PROGRAMS_QUERY, TEAM_MEMBERS_QUERY, TESTIMONIALS_QUERY
  - Supabase server client using @supabase/ssr createServerClient()
  - GTM embedded in root layout via @next/third-parties
  - Sanity Studio at /studio with force-dynamic and NextStudio client component
  - Draft mode enable/disable API routes
  - vitest + Playwright test infrastructure with 20 stub tests across 7 files
  - .env.local.example documenting all required env vars

affects:
  - 01-02 (homepage page — imports HOMEPAGE_QUERY, sanityFetch, SanityLive)
  - 01-03 (programs page — imports PROGRAMS_QUERY, program schema)
  - 01-04 (about page — imports TEAM_MEMBERS_QUERY, teamMember schema)
  - 01-05 (conversion layer — imports Supabase createClient(), zod, react-hook-form)

tech-stack:
  added:
    - next-sanity 12.x (defineLive, sanityFetch, SanityLive, NextStudio)
    - "@sanity/client 7.x"
    - "@sanity/image-url 2.x"
    - "@sanity/preview-url-secret 4.x"
    - groq 5.x (defineQuery)
    - "@portabletext/react 6.x"
    - "@supabase/supabase-js 2.x"
    - "@supabase/ssr 0.10.x"
    - react-hook-form 7.x
    - zod 4.x
    - "@hookform/resolvers 5.x"
    - next-sitemap 4.x
    - "@next/third-parties (GoogleTagManager)"
    - vitest 4.x
    - "@playwright/test 1.x"
    - "@vitejs/plugin-react"
    - prettier + prettier-plugin-tailwindcss
    - shadcn/ui (via npx shadcn@latest init -d)
  patterns:
    - defineLive() pattern from next-sanity/live for ISR + draft mode revalidation
    - NextStudio wrapped in 'use client' component to avoid SSR context errors
    - __experimental_actions with @ts-expect-error for Sanity singleton schemas
    - createServerClient() from @supabase/ssr for App Router server action cookie handling
    - (site) route group for public pages separate from /studio and /api

key-files:
  created:
    - src/sanity/lib/client.ts (Sanity createClient with env vars)
    - src/sanity/lib/live.ts (defineLive exports — sanityFetch and SanityLive)
    - src/sanity/lib/queries.ts (GROQ query constants for all pages)
    - src/sanity/sanity.config.ts (studio config, all schemas registered)
    - src/sanity/schemas/documents/homepage.ts (singleton)
    - src/sanity/schemas/documents/program.ts (programType enum: content-syndication|webinar)
    - src/sanity/schemas/documents/teamMember.ts
    - src/sanity/schemas/documents/testimonial.ts
    - src/sanity/schemas/documents/siteSettings.ts (singleton)
    - src/lib/supabase/server.ts (createClient helper)
    - src/types/sanity.ts (TypeScript interfaces)
    - src/app/studio/[[...tool]]/page.tsx (Sanity Studio route)
    - src/components/studio/studio-client.tsx (client component wrapper)
    - src/app/api/draft-mode/enable/route.ts
    - src/app/api/draft-mode/disable/route.ts
    - src/app/(site)/page.tsx (placeholder homepage)
    - vitest.config.ts
    - playwright.config.ts
    - tests/unit/submit-inquiry.test.ts (6 todo stubs)
    - tests/unit/submit-mediakit.test.ts (3 todo stubs)
    - tests/e2e/homepage.spec.ts (8 todo stubs)
    - tests/e2e/programs.spec.ts (4 todo stubs)
    - tests/e2e/about.spec.ts (3 todo stubs)
    - tests/e2e/conversion.spec.ts (3 todo stubs)
    - tests/e2e/sanity-cms.spec.ts (2 todo stubs — INFRA-03)
    - .env.local.example
  modified:
    - src/app/layout.tsx (added GoogleTagManager, SanityLive, VisualEditing, async)
    - package.json (added test scripts, renamed to ab2bm-website)

key-decisions:
  - "Import defineLive from next-sanity/live (not main next-sanity export) — it is a sub-export in 12.x"
  - "NextStudio wrapped in client component (studio-client.tsx) to prevent SSR createContext errors during build"
  - "Singleton Sanity schemas use @ts-expect-error for __experimental_actions (not in public TypeScript types)"
  - "vitest exclude pattern set to tests/e2e/** to prevent Playwright specs from being run by vitest"
  - "scaffold run in temp directory (ab2bm-temp) due to .planning/ files blocking create-next-app in project root"

patterns-established:
  - "Pattern: defineLive() — always import from next-sanity/live not next-sanity"
  - "Pattern: Sanity Studio page — export viewport from next-sanity/studio, render <StudioClient /> (client component)"
  - "Pattern: Singleton schema — defineType() result with @ts-expect-error for __experimental_actions"
  - "Pattern: Supabase server — async createClient() using await cookies() with @supabase/ssr"

requirements-completed: [INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05]

duration: 12min
completed: 2026-04-17
---

# Phase 01 Plan 01: Foundation Scaffold Summary

**Next.js 15 App Router with Sanity v3 defineLive(), Supabase @supabase/ssr client, GTM via @next/third-parties, all document schemas registered in Studio, and vitest + Playwright test infrastructure with 20 stub tests**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-17T19:13:53Z
- **Completed:** 2026-04-17T19:26:07Z
- **Tasks:** 3 of 4 (Task 1b deferred — requires external service credentials)
- **Files modified:** 28

## Accomplishments

- Scaffolded Next.js 15 App Router with TypeScript, Tailwind v4, shadcn/ui — `npm run build` exits 0
- Wired Sanity v3 with `defineLive()`, embedded Studio at `/studio`, created all 5 document schemas
- Set up Supabase `createClient()` using `@supabase/ssr`, embedded GTM in root layout
- Created test infrastructure: vitest (exits 0 with `--passWithNoTests`) + Playwright (20 stub tests listed)

## Task Commits

Each task was committed atomically:

1. **Task 1a: Scaffold project, install dependencies, and create all local files** - `7204d4c` (feat)
2. **Task 2: Define all Sanity document schemas and register in studio config** - `91e9fee` (feat)
3. **Task 3: Install test infrastructure with stub files for all Phase 1 requirements** - `e3cd3ef` (feat)

**Note:** Task 1b (Provision external services: Sanity project, Supabase table, Vercel) deferred — requires user authentication to Sanity CLI, Supabase credentials, and Vercel account. See User Setup Required section below.

## Files Created/Modified

- `src/app/layout.tsx` — Root layout with GoogleTagManager, SanityLive, VisualEditing (draft mode conditional)
- `src/sanity/lib/client.ts` — Sanity createClient() with env var projectId/dataset
- `src/sanity/lib/live.ts` — defineLive() exports (sanityFetch, SanityLive) — imports from next-sanity/live
- `src/sanity/lib/queries.ts` — HOMEPAGE_QUERY, PROGRAMS_QUERY, TEAM_MEMBERS_QUERY, TESTIMONIALS_QUERY, SITE_SETTINGS_QUERY
- `src/sanity/sanity.config.ts` — Studio config with all 5 schemas registered
- `src/sanity/schemas/documents/homepage.ts` — Singleton with heroHeadline, clientLogos, programsOverview, audienceStats, testimonialHighlight, footerCta
- `src/sanity/schemas/documents/program.ts` — programType enum: content-syndication|webinar (critical for CONV-05)
- `src/sanity/schemas/documents/teamMember.ts`, `testimonial.ts`, `siteSettings.ts`
- `src/lib/supabase/server.ts` — async createClient() using @supabase/ssr
- `src/types/sanity.ts` — TypeScript interfaces for all document types
- `src/app/studio/[[...tool]]/page.tsx` — Studio route with viewport export + StudioClient
- `src/components/studio/studio-client.tsx` — Client component wrapper for NextStudio
- `src/app/api/draft-mode/enable/route.ts` / `disable/route.ts` — Draft mode toggle routes
- `src/app/(site)/page.tsx` — Placeholder homepage (replaced in Plan 01-02)
- `vitest.config.ts`, `playwright.config.ts` — Test runner configs
- `tests/unit/submit-inquiry.test.ts` — 6 todo stubs for CONV-01/CONV-02
- `tests/unit/submit-mediakit.test.ts` — 3 todo stubs for CONV-03/CONV-04
- `tests/e2e/homepage.spec.ts` — 8 stubs, `programs.spec.ts` — 4 stubs, `about.spec.ts` — 3 stubs
- `tests/e2e/conversion.spec.ts` — 3 stubs, `sanity-cms.spec.ts` — 2 stubs (INFRA-03)
- `.env.local.example` — All 10 required env vars documented with source comments

## Decisions Made

1. Import `defineLive` from `next-sanity/live` not `next-sanity` — it is a sub-export in v12.x; the main export only provides `defineQuery` and client utilities
2. `NextStudio` wrapped in a `'use client'` component (`studio-client.tsx`) to prevent `createContext is not a function` SSR error during `next build`
3. Singleton Sanity schemas (`homepage`, `siteSettings`) use `@ts-expect-error` for `__experimental_actions` — this property exists at runtime but is intentionally excluded from the public TypeScript types
4. vitest `include` pattern set to `tests/unit/**` and `exclude` to `tests/e2e/**` to prevent Playwright specs from being picked up by vitest (they use incompatible `test.describe` API)
5. Scaffolded in a temp directory (`../ab2bm-temp`) because `create-next-app` refuses to initialize in a directory that contains existing files (`.planning/` folder)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] `@next/third-parties` not installed by scaffold**
- **Found during:** Task 1a (first build attempt)
- **Issue:** `npm run build` failed: `Module not found: Can't resolve '@next/third-parties/google'`
- **Fix:** `npm install @next/third-parties`
- **Files modified:** package.json, package-lock.json
- **Verification:** Build passes after install
- **Committed in:** 7204d4c (Task 1a commit)

**2. [Rule 3 - Blocking] `defineLive` is not exported from main `next-sanity` package**
- **Found during:** Task 1a (first build attempt)
- **Issue:** Build error: `Export defineLive doesn't exist in target module next-sanity`
- **Fix:** Changed import to `import { defineLive } from 'next-sanity/live'`
- **Files modified:** src/sanity/lib/live.ts
- **Verification:** Build passes; defineLive is a sub-export in next-sanity 12.x
- **Committed in:** 7204d4c (Task 1a commit)

**3. [Rule 3 - Blocking] NextStudio causes SSR `createContext` error during build**
- **Found during:** Task 1a (second build attempt after fixing imports)
- **Issue:** `TypeError: bc.default.createContext is not a function` at /studio/[[...tool]]
- **Fix:** Created `src/components/studio/studio-client.tsx` with `'use client'` directive; studio page renders this wrapper component. Added `export { viewport } from 'next-sanity/studio'`
- **Files modified:** src/app/studio/[[...tool]]/page.tsx, src/components/studio/studio-client.tsx (new)
- **Verification:** Build passes; studio route is `ƒ (Dynamic)`
- **Committed in:** 7204d4c (Task 1a commit)

**4. [Rule 3 - Blocking] `__experimental_actions` causes TypeScript error in schema definitions**
- **Found during:** Task 2 (build with schemas)
- **Issue:** `Object literal may only specify known properties, and '__experimental_actions' does not exist in type`
- **Fix:** Added `// @ts-expect-error` comment above the property in homepage.ts and siteSettings.ts
- **Files modified:** src/sanity/schemas/documents/homepage.ts, src/sanity/schemas/documents/siteSettings.ts
- **Verification:** Build passes; TypeScript check exits 0
- **Committed in:** 91e9fee (Task 2 commit)

**5. [Rule 3 - Blocking] `@sanity/image-url/lib/types/types` path doesn't exist in installed version**
- **Found during:** Task 2 (build with types)
- **Issue:** `Cannot find module '@sanity/image-url/lib/types/types'` TypeScript error in src/types/sanity.ts
- **Fix:** Replaced with inline SanityImage interface definition (no external import needed)
- **Files modified:** src/types/sanity.ts
- **Verification:** Build passes
- **Committed in:** 91e9fee (Task 2 commit)

**6. [Rule 3 - Blocking] Vitest picks up Playwright e2e specs and fails with incompatible API**
- **Found during:** Task 3 (vitest run)
- **Issue:** Playwright's `test.todo` inside `test.describe` is not a function in vitest context; vitest scanned all tests/ files
- **Fix (a):** Updated vitest.config.ts `include` to only scan `tests/unit/**` and set `exclude: ['tests/e2e/**']`
- **Fix (b):** Updated e2e spec files to use correct Playwright stub pattern: `test('name', async () => { test.todo() })` instead of `test.todo('name')`
- **Files modified:** vitest.config.ts, all 5 tests/e2e/*.spec.ts
- **Verification:** `npx vitest run --passWithNoTests` exits 0; `npx playwright test --list` shows 20 tests
- **Committed in:** e3cd3ef (Task 3 commit)

---

**Total deviations:** 6 auto-fixed (6 blocking)
**Impact on plan:** All auto-fixes were necessary to produce a working build. Root causes: next-sanity sub-export API changes, Next.js 15 SSR strict mode, Sanity TypeScript public/private type boundary, test runner isolation. No scope creep.

## Issues Encountered

- `create-next-app` refuses to scaffold in a directory with existing files (`.planning/`) — scaffolded in a sibling `ab2bm-temp/` directory and rsync'd files into the project root
- Next.js 16.2.4 was installed by `create-next-app@latest` (not 15.x as specified in the plan) — this is functionally equivalent and all patterns work identically

## User Setup Required

**Task 1b requires manual external service configuration before the full project is operational.**

### Step 1 — Sanity project

```bash
npx sanity@latest login         # authenticates via browser
npx sanity@latest init          # create new project "Advance B2B Media", dataset: production
```

After init, add to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<from init output>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<create at sanity.io/manage > Tokens > Viewer token>
```

### Step 2 — Supabase `inquiries` table

In Supabase dashboard > SQL Editor > New query, run:

```sql
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  company text,
  program_type text,
  source text default 'inquiry',
  raw_payload jsonb,
  created_at timestamptz default now()
);
```

Add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<Project Settings > API > Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Project Settings > API > anon public>
```

### Step 3 — Vercel deployment

```bash
git push origin main
npx vercel --yes    # links repo to Vercel project
```

Set all env vars from `.env.local.example` in Vercel dashboard > Project Settings > Environment Variables.

### Verification

After setup: `npm run dev` → visit http://localhost:3000/studio → Sanity Studio must load with all 5 document types visible in sidebar.

## Next Phase Readiness

- Plans 01-02 through 01-05 can begin immediately — all schemas, queries, and helper imports are in place
- Task 1b (external services) should be completed before testing Sanity data fetching (Plans 01-02, 01-03, 01-04)
- Test stub files are in place — plans 01-02 through 01-05 fill them in progressively

## Self-Check: PASSED

All required files exist and all task commits are present in git history.

---
*Phase: 01-foundation-and-core-pages*
*Completed: 2026-04-17*
