# Phase 3: Differentiator and Launch-Ready - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the methodology page (audience-building + program mechanics), expand the programs section from 2 generic pages to 6 individual branded program landing pages (5 ADVANCE programs + Webinar), apply branded program names site-wide, update the nav to include all new pages, and validate Core Web Vitals on Vercel production before launch.

</domain>

<decisions>
## Implementation Decisions

### Branded Program Names
- The five core branded programs are: **ADVANCE ENGAGE**, **ADVANCE ABM**, **ADVANCE INSTALL**, **ADVANCE BANT**, **ADVANCE EXPAND**
- Webinar program is still actively offered — needs its own dedicated page alongside the 5 ADVANCE programs
- Source of truth for all program copy (taglines, How it Works, What You Get, Best For) is `docs/AB2B_Services_Portfolio.md`
- Seed Sanity with portfolio doc content directly — it is final copy; Ab2bm refines later in Studio

### Program Pages (scope expansion — was 2 programs, now 6)
- Build individual program landing pages for all 6 programs: ADVANCE ENGAGE, ADVANCE ABM, ADVANCE INSTALL, ADVANCE BANT, ADVANCE EXPAND, and Webinar
- URL structure: `/programs/advance-engage`, `/programs/advance-abm`, `/programs/advance-install`, `/programs/advance-bant`, `/programs/advance-expand`, `/programs/webinar`
- `/programs` index page becomes an overview grid of all 6 programs (cards/tiles with tagline), each linking to its individual page
- Individual page structure per portfolio doc: Hero (name + tagline) → Solution Overview → How the Program Works (bullets) → What You Get (bullets) → Best For → Optional Ingredients module (shared) → CTA
- Each program CTA routes to the inquiry form with program pre-selected (existing CONV-05 pattern)
- All program content managed through Sanity CMS

### Methodology Page
- Single page at `/methodology`
- Three distinct labeled sections: **Audience Building**, **ADVANCE ENGAGE / Content Syndication Process**, **Webinar Program Process**
- Tone: mechanics-first, plain English — step-by-step how things work, no marketing fluff (model: "How the Program Works" bullet format in portfolio doc)
- References ADVANCE program names directly within mechanics explanations (e.g., "ADVANCE ENGAGE works by...")
- Sanity-managed — Ab2bm can update without touching code
- Content sourced from portfolio doc's "Audience & Infrastructure" and per-program "How the Program Works" sections

### Navigation Update
- Programs becomes a **dropdown** listing all 6 programs by name (linking to individual pages)
- Final nav structure: **Home | Programs ▾ | Methodology | Audience | Resources | About | Contact**
- Audience (/audience) and Resources/Blog (/blog) added as top-level nav items — they exist as pages but are not currently in the header
- Mobile nav (MobileMenu client component) needs corresponding updates

### Core Web Vitals
- Validate LCP < 2.5s, CLS < 0.1, INP < 200ms across all pages on Vercel production
- Claude's discretion on tooling (Lighthouse CI, web-vitals library, Vercel Speed Insights)

### Claude's Discretion
- Optional Ingredients module design (shared across program pages) — reuse existing card/list patterns
- Compliance block (GDPR/CASL/CCPA) placement on program pages — include or link to methodology
- Program Management block placement — include on programs pages or methodology only
- Exact dropdown implementation for Programs nav item (hover vs click, animation style)
- Webinar program copy — no source in portfolio doc; use existing Phase 1 fallback content as base and structure it to match ADVANCE program page format

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/sections/ProgramCard.tsx`: Existing program card component — designed for the 2-program layout; may need adaptation for individual program pages or replacement with a per-program page layout
- `src/components/layout/SiteHeader.tsx`: Flat nav links array — needs dropdown support added for Programs
- `src/components/layout/MobileMenu.tsx`: Client component for mobile nav — needs updating for 6-program dropdown and new nav items
- `src/components/layout/SiteFooter.tsx`: May need program links added
- `src/components/ui/button.tsx`: Shadcn button for CTAs (already in use)
- `src/sanity/lib/queries.ts`: Existing GROQ queries — new program and methodology queries to be appended without modifying existing ones

### Established Patterns
- Sanity-managed content with `defineLive()` ISR — all new pages follow this pattern
- Fallback content rendered when Sanity not configured — each new page needs fallback data
- `data-testid` locators are the canonical Playwright selector strategy for Phase 2+ components
- Section components are pure presentational (props-only, no data fetching) — new sections should follow this
- `sanityFetch` wrapped in try/catch in page.tsx — required for build to pass without Sanity credentials
- Explicit `any` helper functions for GROQ result extraction (typed via typegen later)

### Integration Points
- New routes: `/programs/[slug]` dynamic route OR individual static routes per program
- `/programs` index page must be refactored from current single-page layout to overview grid
- Nav update: `navLinks` array in `SiteHeader.tsx` (line 4–9) must support nested items for Programs dropdown
- Sanity config (`sanity.config.ts`): New schemas for individual program documents and methodology page to be registered
- Existing program `programType` field in Sanity (used for CTA routing in CONV-05) — `advance-engage`, `advance-abm`, etc. as programType values

</code_context>

<specifics>
## Specific Ideas

- Portfolio doc recommends: "Shared components — Audience stats block, Compliance block (GDPR/CASL/CCPA), Program management block (24-48 hour launch, dedicated PM)" — these can be reusable section components shared across program pages
- Program management guarantee from the doc: "24 to 48 hours to launch, with first lead delivery within 3 days" — compelling for program pages
- The six-activity audience methodology from the doc (Account Coverage, Key Contacts, Opt-In Outreach, Info Validation, Data Enhancement, Audience Segmentation) should drive the Audience Building section of the methodology page
- Portfolio doc compliance positioning: "Lawyers and audiences love our diligence" — good hook for compliance block

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-differentiator-and-launch-ready*
*Context gathered: 2026-04-19*
