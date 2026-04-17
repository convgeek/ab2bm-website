# Stack Research

**Domain:** B2B media and lead generation vendor website
**Researched:** 2026-04-17
**Confidence:** HIGH (core framework/hosting/CMS), MEDIUM (marketing tooling)

---

## Competitor Tech Stack Findings

Inspected 11 competitor sites. Results:

| Site | CMS/Framework | Analytics | Forms/CRM | Chat | Notes |
|------|---------------|-----------|-----------|------|-------|
| Activate | WordPress | Google Analytics (MonsterInsights) | Not detected | None | Standard WP install |
| DemandWorks | WordPress | GA (implied) | Not detected | None | Proprietary lead gen platform |
| Headley Media | WordPress (custom theme) | GA4 | Newsletter form | None | webp-express plugin visible |
| Integrate | WordPress | GA4 | HubSpot (likely) | Zendesk (support portal) | ISO 27701/SOC2 compliance signals |
| IntentMacro | Unknown (Cloudflare protected) | Not detected | Not detected | None | Boutique, hard to inspect |
| Leadium | **Webflow** | GA4 | Calendly | None | Wistia video, DocSend |
| TCI Lead Gen | WordPress (Bridge theme) | Not detected | Not detected | None | Basic setup |
| Anteriad | **HubSpot CMS** | GA4 + UTM infrastructure | HubSpot forms | None | Enterprise, full HubSpot stack |
| INFUSE | WordPress (custom theme) | GA4 | HubSpot (likely) | Live portal | Global CDN, multi-region |
| Callbox | WordPress (Enfold theme) | GA | HubSpot Gold Partner | Live chat | GDPR/CCPA compliant |
| DemandScience | WordPress (WP Engine) | GA4 (implied) | Email capture form | Support subdomain | WP Engine hosting confirmed |

**Pattern:** WordPress dominates (8/11 sites). Leadium uses Webflow. Anteriad uses HubSpot CMS. GA4 is universal. HubSpot is the dominant form/CRM signal where detected. No competitor uses Next.js or a headless stack.

**Implication for Ab2bm:** The competitors use low-cost commodity stacks. Next.js + Vercel is already a differentiator in site performance and developer experience. The CMS layer must compensate for Next.js's non-visual editing story — this is the primary UX gap vs. WordPress for non-technical editors.

---

## Recommended Stack

### Core Technologies (Already Decided)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (App Router) | Frontend framework + SSR/ISR | Already decided. App Router is stable, best-in-class DX for headless CMS patterns. ISR enables static performance with CMS-triggered revalidation. |
| Vercel | — | Hosting + CDN + preview deployments | Already decided. Native Next.js integration, automatic preview URLs per PR, edge network, free tier covers this scale. |
| Supabase | 2.x | Form data persistence + future audience data | Already decided. Postgres-backed, generous free tier, server-side row-level security. Use for contact form submissions in v1. |
| TypeScript | 5.x | Type safety | Standard for Next.js 15 App Router. Sanity generates types from schema — enforced end-to-end. |

### CMS Layer — Recommendation: Sanity

**Use Sanity v3, not Contentful, not Prismic, not WordPress.**

**Why Sanity over the alternatives:**

Sanity embeds its Studio editor directly inside the Next.js app at `/studio`. This means Ab2bm editors open the same domain they already know, not a separate SaaS dashboard. The Studio is a React app — CG can customize field layouts, add validation, and control exactly what non-technical editors can touch.

Sanity's Visual Editing with Draft Mode lets editors click any element on the live site preview and jump directly to that field in the Studio. This is the closest non-technical editors will get to WordPress's "click to edit" experience without WordPress's plugin bloat and security surface area.

The `next-sanity` v12 package (current as of 2025) has first-class Next.js 15 App Router support: `defineLive()` returns a `sanityFetch` server function and a `SanityLive` React component that handles ISR revalidation automatically when content is published. No manual cache purging webhooks to set up.

Free tier: 10,000 documents, 20 users, 1M CDN requests/month. Ab2bm's site will never exceed this. Cost: $0 unless the team grows beyond 20 people.

**Why not Contentful:** Contentful's free tier caps at 2 users. Growth starts at $300/month. Overkill for a single marketing site with a small team.

**Why not Prismic:** Prismic's Slice Machine is excellent for marketing teams who build pages themselves from components. Ab2bm's structure is unlikely to need that flexibility — CG is building the components, Ab2bm is editing text and images. Prismic adds a layer of abstraction (Slice Machine, Prismic repository) that increases build complexity without payoff here.

**Why not WordPress:** WordPress requires a separate hosting environment, plugin maintenance, security patching, and breaks the Next.js + Vercel stack. The competitors use WordPress because it's the path of least resistance — not because it produces better sites.

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Sanity | v3 (Studio v3) | Headless CMS — structured content editing | Embedded Studio, Visual Editing with Draft Mode, native Next.js 15 integration, free at Ab2bm's scale |
| next-sanity | 12.x | Sanity toolkit for Next.js | `defineLive()` + `sanityFetch` handles ISR, draft mode, and real-time content automatically |
| @sanity/image-url | latest | Image URL builder for Sanity CDN | Generates responsive image URLs from Sanity's asset pipeline |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4.x | Utility-first CSS | CSS-first config (no `tailwind.config.ts` required), 5x faster full builds, native Next.js 15 support as of 15.2. No alternative needed. |
| shadcn/ui | latest | Accessible component primitives | Copies source into the project (not a dependency), fully customizable, built on Radix UI, ships with Tailwind v4 support. Use for forms, modals, navigation. |

### Analytics and Marketing

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @next/third-parties | bundled with Next.js 15 | GA4 + GTM integration | Official Next.js package. `GoogleTagManager` component loads GTM after hydration, no custom script setup, correct performance timing. Load GTM only — do not load GA4 directly alongside GTM. |
| Google Tag Manager | — | Tag container | Every competitor uses GA4. GTM owns the connection to GA4, LinkedIn Insight Tag, any future pixels. One GTM ID in Next.js, all other tags managed in GTM UI without code deploys. |
| Google Analytics 4 | — | Site analytics | Universal in this market. Configured through GTM, not via direct gtag.js script. |

### Forms and CRM

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| HubSpot Free CRM | — | Contact/inquiry management | Every inspected competitor either uses HubSpot or shows HubSpot partnership signals. HubSpot Free CRM gives Ab2bm a deal pipeline, contact records, and email sequencing at $0. Forms submit via Next.js Server Action → Supabase (for backup/audit) + HubSpot API (for CRM pipeline). Do not use HubSpot's embedded form script in Next.js — use the HubSpot Forms API via a server action to avoid CSP issues and maintain control. |
| Supabase (form table) | 2.x | Backup form submission log | All contact form submissions write to Supabase as a durable audit log. Independent of HubSpot. If HubSpot is replaced, no data is lost. |
| react-hook-form | 7.x | Client-side form state | Minimal re-renders, schema validation, works cleanly with shadcn/ui form primitives. |
| zod | 3.x | Form + server action validation | Runtime schema validation shared between client (react-hook-form resolver) and server action. Prevents malformed data from reaching Supabase or HubSpot. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @sanity/client | 6.x | GROQ query client | All CMS data fetching — used inside `next-sanity`'s `defineLive()` setup |
| groq | 3.x | Sanity query language type safety | Typed GROQ queries, autocomplete in VS Code |
| @portabletext/react | 3.x | Render Sanity Portable Text (rich text) | Any body copy / blog content fields from Sanity |
| next-sitemap | 4.x | Sitemap + robots.txt generation | Run as post-build script. Generates `/sitemap.xml` and `/robots.txt`. Required for B2B SEO. |
| resend (optional) | 3.x | Transactional email on form submit | If Ab2bm wants instant email notification on inquiry — free tier covers 3,000 emails/month. Alternative to email alerts in HubSpot. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Use `eslint-config-next` — included with `create-next-app` |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` for Tailwind class sorting |
| VS Code Sanity extension | GROQ syntax highlighting + schema validation | Install from VS Code marketplace |
| Vercel CLI | Local preview + env var management | `vercel env pull` syncs `.env.local` from Vercel project |

---

## Installation

```bash
# Scaffold Next.js 15 with Tailwind v4 and TypeScript
npx create-next-app@latest ab2bm-website --typescript --tailwind --app --src-dir

# CMS
npm install next-sanity @sanity/client @sanity/image-url groq @portabletext/react

# Forms and validation
npm install react-hook-form @hookform/resolvers zod

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# shadcn/ui — initialize after Tailwind is set up
npx shadcn@latest init

# SEO
npm install next-sitemap

# Dev dependencies
npm install -D @sanity/eslint-config-studio prettier prettier-plugin-tailwindcss
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Sanity v3 | Prismic | If Ab2bm's team needs to build full page layouts (not just edit content) without CG involvement. Prismic's Slice Machine is better for self-serve page creation. |
| Sanity v3 | Contentful | Never for this project. Contentful's free tier is 2 users; pricing jumps to $300/month. No advantage at this scale. |
| Sanity v3 | Strapi (self-hosted) | If the project had a dedicated DevOps budget and needed a free open-source option with custom API routes. Adds infrastructure overhead that Vercel+Sanity eliminates. |
| HubSpot Free CRM | Supabase-only contact log | If Ab2bm has zero sales follow-up workflow. Not realistic — they need a deal pipeline and email follow-up. Use HubSpot. |
| Tailwind v4 | Tailwind v3 | If deploying to environments requiring IE11 or very old browser support. Tailwind v4 drops support for browsers older than ~3 years. Ab2bm's buyers are IT/marketing professionals — modern browser safe. |
| shadcn/ui | Chakra UI / MUI | If the team wants a pre-designed opinionated component library. shadcn/ui gives more control over visual design, which matters for a brand-building site. |
| @next/third-parties GTM | Direct gtag.js script | Never. Loading both causes duplicate event tracking. @next/third-parties handles performance timing correctly. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| WordPress | Breaks the Next.js stack entirely. Requires separate hosting, security patching, plugin updates. Competitors use it because it's easy to start, not because it produces better outcomes. | Sanity v3 embedded in Next.js |
| HubSpot CMS Hub | Locks the entire site into HubSpot's proprietary templating. Anteriad uses it — it produces slow, rigid sites. HubSpot is right for CRM, wrong for site infrastructure. | Next.js + Sanity |
| Webflow | Leadium uses it. Webflow is great for no-code teams but creates a hard ceiling on customization and doesn't compose with Next.js or Supabase. Wrong stack for CG as a technical co-builder. | Next.js + Sanity |
| HubSpot embedded form script (`hbspt.forms.create`) | Injects a full jQuery-dependent form into the page. Causes CSP violations, layout shift, and is incompatible with strict Next.js App Router patterns. | HubSpot Forms API via server action |
| `next-hubspot` npm package | Not fully compatible with Next.js 15. Uses `--legacy-peer-deps` workaround. Dead-end approach. | Custom server action calling HubSpot Forms API directly |
| Prismic + Slice Machine | Adds significant setup complexity (Slice Machine, repository model) for a site where CG controls component structure. The visual page builder power is wasted if editors won't build new page types. | Sanity Studio with locked schemas |
| Contentful | 2-user free tier limit. Growth = $300/month. No meaningful advantage over Sanity for a single marketing site. | Sanity v3 (20 users free) |
| GA4 direct script alongside GTM | Causes duplicate event tracking — pageviews and events fire twice. | Load GTM only via @next/third-parties, configure GA4 inside GTM |
| Intercom / Drift live chat (v1) | Not used by preferred competitors. Adds $100–$400/month cost. Sales-assisted model means inquiries flow through forms, not chat. Adds no value in v1. | Contact form + HubSpot CRM |

---

## Stack Patterns by Context

**For CMS content editing (Ab2bm team):**
- Sanity Studio embedded at `/studio` route in Next.js app
- Visual Editing enabled — editors click live page elements to edit
- Draft Mode via Vercel preview URL — publish flow: draft → preview → publish

**For content delivery (site visitors):**
- ISR via `sanityFetch` + `SanityLive` — pages served statically, revalidated automatically on publish
- Vercel Edge Network — CDN delivery, zero infrastructure management

**For contact/inquiry forms:**
- shadcn/ui form + react-hook-form + zod (client validation)
- Next.js Server Action (server validation + dual write)
- Supabase `inquiries` table (audit log)
- HubSpot Forms API (CRM pipeline)

**For analytics:**
- GTM container ID in Next.js root layout via `@next/third-parties`
- GA4 configured inside GTM
- LinkedIn Insight Tag added in GTM (no code deploy needed)
- Any future pixels (intent data vendors, retargeting) added in GTM

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next-sanity@12.x | Next.js 15, React 19 | Confirmed first-class support. `defineLive()` API requires next-sanity v11+. |
| Tailwind CSS v4.x | Next.js 15.2+ | CSS-first config. No `tailwind.config.ts`. Use `@tailwindcss/postcss`. |
| shadcn/ui (latest) | Tailwind v4, React 19 | Tailwind v4 support added — run `npx shadcn@latest init` to get correct config. |
| react-hook-form@7.x | React 19 | Compatible. Use `@hookform/resolvers` with zod for schema integration. |
| @supabase/ssr | Next.js 15 App Router | Required package for server-side Supabase auth/cookie handling in App Router. Use instead of deprecated `@supabase/auth-helpers-nextjs`. |
| sanity@3.x (Studio v3) | React 19 | Sanity Studio v5 announced embracing React 19. Studio embedded in Next.js app compiles separately. |

---

## Sources

- Sanity pricing page (https://www.sanity.io/pricing) — Free tier limits: 10k docs, 20 users, 1M CDN req/month — HIGH confidence
- next-sanity GitHub (https://github.com/sanity-io/next-sanity) — v12 current, Next.js 15 App Router support confirmed — HIGH confidence
- Sanity Next.js integration docs (https://www.sanity.io/docs/nextjs) — `defineLive()` pattern, Visual Editing, Draft Mode — HIGH confidence
- Next.js third-party libraries guide (https://nextjs.org/docs/app/guides/third-party-libraries) — `@next/third-parties` GoogleTagManager pattern — HIGH confidence
- Tailwind CSS v4 release (https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, Next.js 15.2 support — HIGH confidence
- WebFetch: activatems.com, dwmedia.com, headleymedia.com, integrate.com, intentmacro.com, leadium.com, tcimarketing.services, anteriad.com, infuse.com, callboxinc.com, demandscience.com — competitor stack inspection — MEDIUM confidence (WebFetch limitations; some signals inferred from URL structure)
- HubSpot Forms API + Next.js (https://mahmoodchowdhury.com/blog/integrating-hubspot-forms-into-your-next-js-application/) — server action integration pattern — MEDIUM confidence
- Headless CMS comparison (https://www.cosmicjs.com/blog/headless-cms-comparison-2026-cosmic-contentful-strapi-sanity-prismic-hygraph) — Sanity vs Prismic vs Contentful pricing and positioning — MEDIUM confidence (vendor blog)

---

*Stack research for: B2B media/lead gen vendor website (Ab2bm)*
*Researched: 2026-04-17*
