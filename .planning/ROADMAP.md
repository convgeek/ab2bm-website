# Roadmap: Advance B2B Media Website

## Overview

Three phases build Ab2bm's website in dependency order. Phase 1 constructs the entire technical foundation and every page that can be built without waiting on external content — infrastructure, homepage, programs, about, and the full conversion layer. Phase 2 populates the pages that are gated on Ab2bm providing real data (audience stats, client permission for logos, case study metrics) and CG delivering 6+ blog posts. Phase 3 adds the methodology differentiator layer and confirms the site meets performance standards before launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Core Pages** - Build all infrastructure, homepage, programs, about, and conversion flow — everything that can be constructed before Ab2bm delivers audience data or client permissions (completed 2026-04-17)
- [x] **Phase 2: Content and Proof Layer** - Populate the audience page, blog/resources, case studies, and trust signals — all gated on Ab2bm delivering real stats, client permissions, and CG completing content (completed 2026-04-17)
- [ ] **Phase 3: Differentiator and Launch-Ready** - Build the methodology page with branded program frameworks, validate Core Web Vitals, and confirm the site is complete and launch-ready

## Phase Details

### Phase 1: Foundation and Core Pages
**Goal**: A working, deployable website with full infrastructure, homepage, programs page, about page, and a functioning inquiry/conversion flow — ready for content population and not blocked by any external dependency
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05, HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, PROG-01, PROG-02, PROG-03, PROG-04, ABUT-01, ABUT-02, ABUT-03, CONV-01, CONV-02, CONV-03, CONV-04, CONV-05
**Success Criteria** (what must be TRUE):
  1. A visitor landing on the homepage can see the hero with Ab2bm's audience named (IT pros, MSPs, MSSPs), a client logo strip, a programs overview section, audience stats, a case study or testimonial highlight, a blog preview, and a footer CTA — all in a single scroll
  2. A visitor can navigate to the Programs page and read distinct descriptions of the content syndication and webinar programs, with mechanics (not just outcomes) explained, and submit a program-specific inquiry that pre-identifies the program type in HubSpot
  3. A visitor can navigate to the About page and read the company story, team information, and the Conversational Geek content partnership
  4. A visitor can submit an inquiry form that writes to both HubSpot (creating a deal with program type, company, and contact) and Supabase as an audit log — and a separate media kit download path exists requiring only name and email
  5. An Ab2bm staff member can open Sanity Studio, edit any piece of site content (headline, body copy, image), and see changes reflected on the live site without touching code
**Plans**: 5 plans

Plans:
- [x] 01-01: Project scaffold — Next.js 15 App Router, Tailwind v4, shadcn/ui, Sanity v3, Supabase, GTM/analytics wiring, Vercel deployment
- [ ] 01-02: Homepage — all 7 sections (hero, logo strip, programs overview, audience stats, social proof, blog preview, footer CTA)
- [ ] 01-03: Programs page — content syndication and webinar program descriptions with mechanics, pricing signals, and program-specific CTAs
- [ ] 01-04: About page — company story, team section, CG partnership section
- [ ] 01-05: Conversion layer — inquiry form (HubSpot + Supabase dual-write), media kit download form, form confirmation with next-step messaging

### Phase 2: Content and Proof Layer
**Goal**: Every content-dependent page is fully populated with real data — the audience page has verified Ab2bm stats with MSP/MSSP specificity, the blog has 6+ CG-authored posts, case studies exist with quantified metrics, and trust signals (logos, testimonials) have explicit client permission
**Depends on**: Phase 1
**Requirements**: AUDN-01, AUDN-02, AUDN-03, AUDN-04, BLOG-01, BLOG-02, BLOG-03, BLOG-04, CASE-01, CASE-02, CASE-03, TRST-01, TRST-02, TRST-03
**Success Criteria** (what must be TRUE):
  1. A visitor lands on the Audience page and reads specific, verifiable audience stats (total size, MSP/MSSP count, job function breakdown, industry distribution, company size distribution) with a methodology note explaining how the numbers are sourced — and MSPs and MSSPs are named as distinct segments with their own persona cards
  2. The blog/resources section has at least 6 published CG-authored posts targeting IT pros at launch, managed and editable through Sanity CMS
  3. At least 3 case studies exist (named or anonymized with industry + outcome metrics), are accessible from a dedicated case studies section, and appear as a highlight on the homepage
  4. The client/partner logo strip on the homepage and at least one other page displays logos with confirmed client permission, and at least one attributed testimonial (real name, title, company) appears on the site
**Plans**: 6 plans

Plans:
- [ ] 02-01-PLAN.md — E2e test scaffolding: audience, blog, case-studies spec stubs + homepage.spec.ts todo implementations
- [ ] 02-02-PLAN.md — Sanity schemas (post, caseStudy, audiencePage, personaCard) + GROQ queries + sanity.config.ts registration
- [ ] 02-03-PLAN.md — Blog routes: /blog listing + /blog/[slug] individual post pages
- [ ] 02-04-PLAN.md — Audience page: /audience route + PersonaCard component
- [ ] 02-05-PLAN.md — Case studies: /case-studies routes + CaseStudyHighlight + homepage wiring for blog preview and featured case study
- [ ] 02-06-PLAN.md — Content publishing checkpoint: 6+ blog posts, 3+ case studies, logos with permissions, testimonial, audience stats

### Phase 3: Differentiator and Launch-Ready
**Goal**: The methodology page is built and makes Ab2bm's audience-building and lead delivery process concrete and credible; branded program names are applied site-wide across 6 individual program pages and the nav; and the site passes Core Web Vitals on Vercel production — clearing every checklist item for launch
**Depends on**: Phase 2
**Requirements**: METH-01, METH-02, METH-03, METH-04, INFRA-06
**Success Criteria** (what must be TRUE):
  1. A visitor who asks "how do you source and validate leads?" can navigate to the Methodology page and read a plain-English explanation of how Ab2bm's audience is built and engaged, how content syndication leads are qualified and delivered, and how webinar leads are captured and delivered — all described with mechanics, not marketing language
  2. Programs across the site are referred to by branded/named framework names (not just generic "content syndication"), consistent from homepage to programs page to methodology page
  3. The site passes Core Web Vitals on Vercel production (LCP < 2.5s, CLS < 0.1, INP < 200ms) across all pages
**Plans**: 6 plans

Plans:
- [ ] 03-01-PLAN.md — Wave 0 test scaffolding: methodology.spec.ts (METH-01/02/03) + programs.spec.ts rewrite (METH-04 branded names, 6 programs, nav dropdown)
- [ ] 03-02-PLAN.md — Data layer: expand program Sanity schema (6 programs + new fields) + methodologyPage singleton schema + GROQ queries + InquiryForm programType enum update
- [ ] 03-03-PLAN.md — Individual program pages: /programs/[slug] dynamic route + ProgramHero, ProgramDetail, OptionalIngredients, ComplianceBlock, ProgramManagement section components
- [ ] 03-04-PLAN.md — Methodology page: /methodology route + MethodologyPage 3-section component with Audience Building, ADVANCE ENGAGE process, Webinar process
- [ ] 03-05-PLAN.md — Programs index refactor (overview grid) + nav dropdown (ProgramsDropdown) + SiteHeader/MobileMenu update with full nav structure
- [ ] 03-06-PLAN.md — Speed Insights install + CWV audit + human Core Web Vitals checkpoint on Vercel production

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Core Pages | 5/5 | Complete   | 2026-04-17 |
| 2. Content and Proof Layer | 6/6 | Complete   | 2026-04-17 |
| 3. Differentiator and Launch-Ready | 0/6 | Not started | - |
