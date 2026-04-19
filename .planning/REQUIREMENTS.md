# Requirements: Advance B2B Media Website

**Defined:** 2026-04-17
**Core Value:** Tech vendor marketers land on the site, immediately understand who Ab2bm reaches and how, and feel confident enough to start a conversation — whether they found Ab2bm organically or a sales rep sent them here to validate.

## v1 Requirements

### Infrastructure

- [x] **INFRA-01**: Site is built on Next.js 15 with App Router deployed to Vercel
- [x] **INFRA-02**: Sanity v3 CMS is integrated with Next.js via `next-sanity` and `defineLive()` for live content preview
- [x] **INFRA-03**: Non-technical Ab2bm staff can edit all site content through Sanity Studio UI without touching code
- [x] **INFRA-04**: Google Tag Manager is installed in the root layout via `@next/third-parties` for analytics/pixel management
- [x] **INFRA-05**: Supabase is configured with an `inquiries` table as an audit log for form submissions
- [x] **INFRA-06**: Site passes Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms) on Vercel production

### Homepage

- [x] **HOME-01**: Homepage has a hero section with a specific headline covering IT decision-makers AND MSPs/MSSPs (both audiences named, neither primary) and a clear primary CTA
- [x] **HOME-02**: Homepage has a client/partner logo strip below the hero as an immediate credibility signal
- [x] **HOME-03**: Homepage has a programs overview section summarizing content syndication and webinar programs with CTAs to program detail pages
- [x] **HOME-04**: Homepage has an audience statistics section with quantified claims (persona breakdown, total reach, MSP/MSSP count)
- [x] **HOME-05**: Homepage has a case study or testimonial highlight (at minimum one result with attribution)
- [x] **HOME-06**: Homepage has a blog/resources preview section showing the 3 most recent posts
- [x] **HOME-07**: Homepage ends with a conversion section (inquiry CTA + media kit download option)

### Programs Page

- [x] **PROG-01**: Programs page describes content syndication program with deliverables, audience targeting options, and what a typical campaign looks like
- [x] **PROG-02**: Programs page describes webinar/virtual event program with deliverables, co-hosting options, and what a typical campaign looks like
- [x] **PROG-03**: Each program has a dedicated inquiry CTA that pre-identifies the program type in the HubSpot deal
- [x] **PROG-04**: Program descriptions avoid generic jargon — they describe mechanics, not just outcomes

### Audience Page

- [x] **AUDN-01**: Audience page explicitly names and describes MSPs and MSSPs as distinct audience segments (no competitor does this — key differentiator)
- [x] **AUDN-02**: Audience page includes IT practitioner, IT decision-maker/exec, MSP, and MSSP persona cards with job titles and company profiles
- [x] **AUDN-03**: Audience page includes quantified audience size claims with a methodology note explaining how audience is built and verified
- [x] **AUDN-04**: Audience page includes industry/vertical breakdown and company size distribution

### About Page

- [x] **ABUT-01**: About page tells the Ab2bm company story and mission
- [x] **ABUT-02**: About page includes team section with real names and photos
- [x] **ABUT-03**: About page surfaces the Conversational Geek content partnership and what it means for audience quality

### Methodology Page

- [x] **METH-01**: Methodology page explains how Ab2bm's audience is built, engaged, and qualified (distinguishes from scraped databases)
- [x] **METH-02**: Methodology page explains content syndication mechanics — how a lead is qualified and delivered
- [x] **METH-03**: Methodology page explains webinar program mechanics — promotion, registration, attendance, lead delivery
- [x] **METH-04**: Programs are referred to with named/branded framework names (not just generic "content syndication")

### Blog / Resources

- [x] **BLOG-01**: Blog section exists at `/resources` or `/blog` with a listing page and individual post pages
- [x] **BLOG-02**: Blog posts are authored and managed through Sanity CMS by the CG team
- [x] **BLOG-03**: At least 6 CG-authored posts exist at launch
- [x] **BLOG-04**: Blog posts are full-funnel content targeting IT pros (the audience), not demand gen buyers

### Case Studies

- [x] **CASE-01**: At least 3 case studies exist at launch (named or anonymized with industry + outcome metrics)
- [x] **CASE-02**: Case studies are managed through Sanity CMS
- [x] **CASE-03**: Case studies appear in a dedicated section and as a homepage highlight

### Conversion

- [x] **CONV-01**: Contact/inquiry form submits to HubSpot Free CRM via HubSpot Forms API (Next.js Server Action — no client-side hbspt embed)
- [x] **CONV-02**: Inquiry form creates a deal in a HubSpot pipeline with program type, company, and contact captured
- [x] **CONV-03**: Media kit (audience data PDF) is available for download via a low-friction form (name + email only)
- [x] **CONV-04**: Media kit download form submits to HubSpot as a separate deal/contact with "media kit" source tag
- [x] **CONV-05**: Every program page has a program-specific CTA that routes to the inquiry form with program pre-selected

### Trust Signals

- [x] **TRST-01**: Client/partner logo strip is present on homepage and at least one other high-traffic page
- [x] **TRST-02**: Logos have explicit client permission before display
- [x] **TRST-03**: At least one testimonial with real attribution (name, title, company) appears on the site

---

## v2 Requirements

### Conversion (advanced)

- **CONV-V2-01**: ROI calculator — input campaign budget and target audience, get estimated leads output
- **CONV-V2-02**: Self-serve program intake form (more detail than inquiry form, pre-qualifies campaign parameters)

### Content

- **BLOG-V2-01**: Newsletter signup for CG content digest
- **BLOG-V2-02**: Content gating — some resources require email capture

### Client Portal

- **PORT-V2-01**: Authenticated portal for active clients to view campaign dashboards
- **PORT-V2-02**: Lead delivery reporting in client portal

### Technical

- **TECH-V2-01**: Regional/vertical-specific audience pages (e.g., dedicated MSSP audience page)
- **TECH-V2-02**: Intent data program page (once Ab2bm actively sells this)

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / self-serve purchasing | Sales-assisted model only; buyers need to talk to a human |
| Audience member login / portal (v1) | Not serving IT pro leads through the site directly |
| Full CRM integration beyond HubSpot Free | Overkill for current sales volume; upgrade later |
| ABM / intent data program pages (v1) | Not yet actively sold — aspirational, deferred to v2 |
| Real-time chat / chatbot | No preferred competitor uses it; adds complexity without proven conversion lift at this stage |
| Video content / webinar recordings | Storage/bandwidth cost, out of scope for launch |
| Pricing page | Industry-wide practice is no public pricing; sales-assisted model requires discovery call |
| Mobile app | Web-first |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| INFRA-06 | Phase 3 | Complete |
| HOME-01 | Phase 1 | Complete |
| HOME-02 | Phase 1 | Complete |
| HOME-03 | Phase 1 | Complete |
| HOME-04 | Phase 1 | Complete |
| HOME-05 | Phase 1 | Complete |
| HOME-06 | Phase 1 | Complete |
| HOME-07 | Phase 1 | Complete |
| PROG-01 | Phase 1 | Complete |
| PROG-02 | Phase 1 | Complete |
| PROG-03 | Phase 1 | Complete |
| PROG-04 | Phase 1 | Complete |
| AUDN-01 | Phase 2 | Complete |
| AUDN-02 | Phase 2 | Complete |
| AUDN-03 | Phase 2 | Complete |
| AUDN-04 | Phase 2 | Complete |
| ABUT-01 | Phase 1 | Complete |
| ABUT-02 | Phase 1 | Complete |
| ABUT-03 | Phase 1 | Complete |
| METH-01 | Phase 3 | Complete |
| METH-02 | Phase 3 | Complete |
| METH-03 | Phase 3 | Complete |
| METH-04 | Phase 3 | Complete |
| BLOG-01 | Phase 2 | Complete |
| BLOG-02 | Phase 2 | Complete |
| BLOG-03 | Phase 2 | Complete |
| BLOG-04 | Phase 2 | Complete |
| CASE-01 | Phase 2 | Complete |
| CASE-02 | Phase 2 | Complete |
| CASE-03 | Phase 2 | Complete |
| CONV-01 | Phase 1 | Complete |
| CONV-02 | Phase 1 | Complete |
| CONV-03 | Phase 1 | Complete |
| CONV-04 | Phase 1 | Complete |
| CONV-05 | Phase 1 | Complete |
| TRST-01 | Phase 2 | Complete |
| TRST-02 | Phase 2 | Complete |
| TRST-03 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 43 total
- Mapped to phases: 43
- Unmapped: 0 ✓

Note: Initial traceability table showed 38 requirements; actual count is 43. The discrepancy was in the original draft traceability groupings.

---
*Requirements defined: 2026-04-17*
*Last updated: 2026-04-17 — traceability updated after roadmap creation*
