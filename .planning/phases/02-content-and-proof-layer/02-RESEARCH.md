# Phase 2: Content and Proof Layer — Research

**Researched:** 2026-04-17
**Domain:** Sanity v3 content schemas + Next.js 15 dynamic routing — blog, case studies, audience page, trust signals
**Confidence:** HIGH (stack fully established in Phase 1; patterns confirmed from live codebase)

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| AUDN-01 | Audience page names MSPs and MSSPs as distinct segments with own persona cards | New `/audience` route under `(site)` group; Sanity `audiencePage` singleton schema with `personas` array |
| AUDN-02 | Persona cards for IT practitioner, IT exec, MSP, MSSP with job titles and company profiles | Sanity object type `personaCard` with title, description, job titles array, company profile fields |
| AUDN-03 | Quantified audience size claims with methodology note | `audiencePage` singleton fields: `stats` array (reuses stat object), `methodologyNote` text |
| AUDN-04 | Industry/vertical breakdown and company size distribution | Additional stat arrays in `audiencePage` singleton — vertical breakdown + size tiers |
| BLOG-01 | Blog section at `/resources` or `/blog` with listing and individual post pages | Next.js dynamic route `(site)/blog/[slug]/page.tsx` + listing at `(site)/blog/page.tsx`; Sanity `post` document type |
| BLOG-02 | Blog posts authored and managed through Sanity CMS by CG team | `post` document type with author, publishedAt, body (Portable Text), featuredImage fields |
| BLOG-03 | At least 6 CG-authored posts at launch | Content delivery dependency — no code work; Sanity content publishing |
| BLOG-04 | Blog posts target IT pros, not demand gen buyers | Content strategy constraint enforced via Sanity field descriptions and author guidance |
| CASE-01 | At least 3 case studies at launch (named/anonymized with industry + outcome metrics) | Content delivery dependency — Sanity content publishing; 3 documents authored |
| CASE-02 | Case studies managed through Sanity CMS | `caseStudy` document type with client/industry, challenge, solution, results (metrics array), Portable Text body |
| CASE-03 | Case studies in dedicated section; homepage highlight | `(site)/case-studies/page.tsx` listing + `(site)/case-studies/[slug]/page.tsx`; homepage query extended to fetch featured case study |
| TRST-01 | Client/partner logo strip on homepage and at least one other page | `LogoStrip` component already built — Phase 2 populates it with real logos in Sanity Studio |
| TRST-02 | Logos have explicit client permission before display | Process/governance requirement — no code; Ab2bm must confirm permission before uploading logos to Sanity |
| TRST-03 | At least one attributed testimonial (real name, title, company) on site | `testimonial` schema already built — Phase 2 populates it with real data in Sanity Studio |
</phase_requirements>

---

## Summary

Phase 2 is almost entirely a **content and schema work phase** built on the infrastructure Phase 1 established. The stack (Next.js 15, Sanity v3, `next-sanity` `defineLive()`, `@portabletext/react`, `@sanity/image-url`) is unchanged. No new npm dependencies are expected. The primary technical work is:

1. **New Sanity schemas:** `post` (blog), `caseStudy`, and `audiencePage` (singleton) document types — plus associated object types (`personaCard`, `metricResult`)
2. **New Next.js routes:** `/blog` listing + `/blog/[slug]` individual posts; `/case-studies` listing + `/case-studies/[slug]` individual case studies; `/audience` page
3. **Homepage query extension:** GROQ query update to surface the featured case study and enable the `BlogPreview` section (currently returns `null` due to empty posts)
4. **Logo strip and testimonial population:** Both components exist and are data-driven — Phase 2 work is uploading real logos/testimonials to Sanity Studio with client permission confirmed

The only external-content blockers are: Ab2bm delivering verified audience stats + client logo permissions + case study data, and CG delivering 6+ authored blog posts. Code work can proceed in parallel with content delivery up to the point where real data is needed.

**Primary recommendation:** Build schemas and page routes first (no external dependency). Wire homepage to show blog preview and case study highlight once schemas are registered. Content population is the last wave — publish after all real data is confirmed and delivered.

---

## Standard Stack

### Core (Unchanged from Phase 1)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.4 (installed) | App Router + dynamic routes + ISR | Already in use. `generateStaticParams` + `sanityFetch` is the correct pattern for blog/case study slug pages. |
| Sanity Studio v3 | embedded | CMS for all new content types | Already integrated. New schemas register in `sanity.config.ts`. |
| next-sanity | 12.3.0 (installed) | `sanityFetch`, `defineLive`, GROQ typed queries | Already wired. All new page data fetching follows exact same pattern as Phase 1 pages. |
| @portabletext/react | 6.0.3 (installed) | Render blog post and case study body copy | Already a dependency. `<PortableText value={body} />` is the render pattern for all rich text fields. |
| @sanity/image-url | 2.1.1 (installed) | Responsive image URLs from Sanity CDN | Already a dependency. All featured images (blog, case study) go through `urlFor()`. |
| groq | 5.21.0 (installed) | Typed GROQ queries | Already in use. New queries follow `defineQuery()` pattern established in `src/sanity/lib/queries.ts`. |

### No New Installations Required

Phase 2 introduces no new npm dependencies. All tooling is in place.

---

## Architecture Patterns

### Recommended Project Structure Additions

```
src/
├── app/(site)/
│   ├── audience/
│   │   └── page.tsx              # AUDN-01/02/03/04 — Audience page
│   ├── blog/
│   │   ├── page.tsx              # BLOG-01 — Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # BLOG-01 — Individual post page
│   └── case-studies/
│       ├── page.tsx              # CASE-03 — Case studies listing
│       └── [slug]/
│           └── page.tsx          # CASE-01/02/03 — Individual case study
├── components/sections/
│   ├── PersonaCard.tsx           # AUDN-02 — Reusable persona card component
│   ├── CaseStudyHighlight.tsx    # CASE-03 — Homepage case study section
│   └── CaseStudyCard.tsx         # CASE-03 — Card for listing page
├── sanity/schemas/documents/
│   ├── post.ts                   # BLOG-01/02 — Blog post document type
│   ├── caseStudy.ts              # CASE-02 — Case study document type
│   └── audiencePage.ts           # AUDN-01/02/03/04 — Audience singleton
└── sanity/schemas/objects/
    ├── personaCard.ts            # AUDN-02 — Persona card object
    └── metricResult.ts           # CASE-01 — Outcome metric object
```

### Pattern 1: Sanity Dynamic Slug Route (Blog Post + Case Study)

**What:** A Next.js dynamic route `[slug]` that fetches a specific document by slug from Sanity using `sanityFetch`. `generateStaticParams` pre-builds all known slugs at build time; ISR handles newly published posts via `defineLive()`.

**When to use:** `/blog/[slug]` and `/case-studies/[slug]` pages.

**Critical note from AGENTS.md:** This Next.js version may differ from training data. Confirmed from `/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`: `params` is a **Promise** in Next.js 15 App Router and must be awaited.

```typescript
// Source: /node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md
// src/app/(site)/blog/[slug]/page.tsx

import { sanityFetch } from '@/sanity/lib/live'
import { defineQuery } from 'groq'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    publishedAt,
    author,
    body,
    featuredImage{ asset->{ url }, alt }
  }
`)

const ALL_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post"]{ "slug": slug.current }
`)

export async function generateStaticParams() {
  const { data: posts } = await sanityFetch({ query: ALL_POST_SLUGS_QUERY })
  return (posts ?? []).map((post: { slug: string }) => ({ slug: post.slug }))
}

// CRITICAL: params is a Promise in Next.js 15 — must be awaited
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } })
  if (!post) notFound()

  return (
    <article>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  )
}
```

### Pattern 2: Sanity Singleton — Audience Page

**What:** A singleton document type for the audience page, preventing duplicate creation. Uses the same `__experimental_actions` pattern as `homepage.ts`. Fetched in the audience page server component via `sanityFetch`.

**When to use:** The `/audience` page — its content (stats, methodology note, persona cards) is editor-managed but there is only ever one audience page document.

```typescript
// src/sanity/schemas/documents/audiencePage.ts
import { defineType, defineField } from 'sanity'

export const audiencePage = defineType({
  name: 'audiencePage',
  title: 'Audience Page',
  type: 'document',
  // @ts-expect-error — __experimental_actions is runtime-only (see homepage.ts for precedent)
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'pageHeadline', type: 'string', title: 'Page Headline' }),
    defineField({ name: 'pageSubheadline', type: 'text', title: 'Page Subheadline' }),
    defineField({ name: 'methodologyNote', type: 'text', title: 'Methodology Note' }),
    defineField({
      name: 'totalAudienceStats',
      type: 'array',
      title: 'Audience Size Stats',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'footnote', type: 'string', title: 'Footnote' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'industryBreakdown',
      type: 'array',
      title: 'Industry / Vertical Breakdown',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'vertical', type: 'string', title: 'Vertical' }),
            defineField({ name: 'percentage', type: 'string', title: 'Percentage' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'companySizeDistribution',
      type: 'array',
      title: 'Company Size Distribution',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tier', type: 'string', title: 'Size Tier' }),
            defineField({ name: 'percentage', type: 'string', title: 'Percentage' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'personas',
      type: 'array',
      title: 'Persona Cards',
      of: [{ type: 'personaCard' }],
    }),
  ],
})
```

### Pattern 3: Portable Text for Blog/Case Study Body

**What:** Blog posts and case studies use Sanity Portable Text (`array` of `block`) for their body copy. `@portabletext/react` `<PortableText>` renders it.

**When to use:** Any rich-text body field — blog post `body`, case study `body`.

```typescript
// Source: @portabletext/react v6.0.3 — PortableText component API confirmed from type defs
import { PortableText } from '@portabletext/react'

// Minimal usage — renders headings, paragraphs, lists, bold/italic out of the box
<PortableText value={post.body} />

// Custom components for extended block types
<PortableText
  value={post.body}
  components={{
    block: {
      h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-4 italic">{children}</blockquote>
      ),
    },
  }}
/>
```

### Pattern 4: Blog Post Sanity Schema

**What:** A `post` document type in Sanity representing a CG-authored blog post. Fields: title, slug (auto-generated), excerpt (for listing/SEO), publishedAt, author, featuredImage, body (Portable Text).

```typescript
// src/sanity/schemas/documents/post.ts
import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: '1-2 sentences for listing page and SEO meta description',
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'author', type: 'string', title: 'Author Name' }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
```

### Pattern 5: Case Study Sanity Schema

**What:** A `caseStudy` document type with structured outcome metrics. Must support both named clients and anonymized entries (industry + size + outcome only).

```typescript
// src/sanity/schemas/documents/caseStudy.ts
import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      type: 'string',
      title: 'Client Name',
      description: 'Leave blank for anonymized case studies',
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry / Vertical',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companySize',
      type: 'string',
      title: 'Company Size',
      description: 'e.g. "Mid-market (200–500 employees)"',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: '2-3 sentences for listing page card',
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'Outcome Metrics',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Metric Label' }),
            defineField({ name: 'value', type: 'string', title: 'Metric Value' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Full Case Study Body',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Feature on Homepage?',
      initialValue: false,
    }),
  ],
})
```

### Pattern 6: Homepage Query Extension for Case Study Highlight

**What:** The homepage currently fetches `testimonialHighlight` but has no case study section. CASE-03 requires a case study highlight on the homepage. The cleanest approach is a dedicated GROQ query for the featured case study, not bundling it into `HOMEPAGE_QUERY` (avoids breaking the existing homepage data shape).

```typescript
// src/sanity/lib/queries.ts — add:
export const FEATURED_CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && featured == true] | order(_createdAt desc) [0]{
    _id,
    title,
    slug,
    clientName,
    industry,
    summary,
    metrics[0..2]{ label, value }
  }
`)

export const BLOG_LISTING_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author
  }
`)

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    featuredImage{ asset->{ url }, alt },
    body
  }
`)

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    industry,
    companySize,
    summary,
    metrics[]{ label, value },
    featured
  }
`)

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    clientName,
    industry,
    companySize,
    summary,
    metrics[]{ label, value },
    featuredImage{ asset->{ url }, alt },
    body
  }
`)

export const AUDIENCE_PAGE_QUERY = defineQuery(`
  *[_type == "audiencePage"][0]{
    pageHeadline,
    pageSubheadline,
    methodologyNote,
    totalAudienceStats[]{ label, value, footnote },
    industryBreakdown[]{ vertical, percentage },
    companySizeDistribution[]{ tier, percentage },
    personas[]{ 
      segmentName,
      description,
      jobTitles,
      companyProfile
    }
  }
`)

// Homepage blog preview — top 3 published posts
export const BLOG_PREVIEW_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`)
```

### Pattern 7: Schema Registration in `sanity.config.ts`

All new schemas must be imported and registered. The `personaCard` object type must be registered before `audiencePage` because `audiencePage` references it.

```typescript
// src/sanity/sanity.config.ts — updated schema registration
import { audiencePage } from './schemas/documents/audiencePage'
import { post } from './schemas/documents/post'
import { caseStudy } from './schemas/documents/caseStudy'
import { personaCard } from './schemas/objects/personaCard'

export default defineConfig({
  // ...
  schema: {
    types: [
      // Existing
      homepage, program, teamMember, testimonial, siteSettings,
      // Phase 2 additions
      audiencePage,
      post,
      caseStudy,
      personaCard,  // object type — must be listed before documents that reference it
    ],
  },
})
```

### Pattern 8: Homepage `BlogPreview` Wire-Up

The `BlogPreview` component already handles the empty case correctly (returns `null`). Phase 2 just needs to pass real posts from Sanity to it. The homepage page component needs to fetch `BLOG_PREVIEW_QUERY` and pass the result.

```typescript
// src/app/(site)/page.tsx — add blog preview fetch
const { data: blogPosts } = await sanityFetch({ query: BLOG_PREVIEW_QUERY })
// ...
<BlogPreview posts={blogPosts ?? []} />
```

### Anti-Patterns to Avoid

- **Bundling all new fields into `HOMEPAGE_QUERY`:** The homepage GROQ query already returns a complex object. Adding case study and blog preview fields to it risks breaking the existing `extractStats`, `extractLogos`, etc. helpers. Fetch separately and pass as independent props.
- **Using `export const dynamic = 'force-dynamic'` on blog/case study pages:** These pages are content that changes infrequently. Prefer `generateStaticParams` + `defineLive()` ISR. Force-dynamic disables static generation and increases server load.
- **Forgetting `@ts-expect-error` on `audiencePage` singleton:** The `__experimental_actions` pattern (established in `homepage.ts`) requires a `@ts-expect-error` comment. Do not remove it — TypeScript will error on build.
- **Storing logos in Next.js public/ folder:** All client logos must be managed through Sanity image assets (the `homepage.clientLogos` field already set up for this). This ensures non-technical staff can update logos without code deploys.
- **Publishing logos without confirmed permission:** `TRST-02` is a process requirement. Logos must not go live until Ab2bm explicitly confirms client permission. Planner must make this a blocking checklist item before logo content is published.
- **Hard-coding audience stats instead of using Sanity:** Stats will need updating as Ab2bm's audience grows. Hard-coded values in components (the current Phase 1 `PLACEHOLDER_STATS`) should be replaced by Sanity data — not replaced with new hard-coded values.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich text rendering | Custom markdown/HTML renderer | `@portabletext/react` `<PortableText>` | Already installed. Handles all Sanity block types, marks, embedded images, links, custom types. |
| Blog RSS feed | Custom XML generator | `next-sitemap` already handles sitemap; RSS can be a Route Handler using standard Web API `Response` | Minor scope — only needed if explicitly in requirements (it is not in v1) |
| Image optimization | Direct `<img src={sanityUrl}>` | `@sanity/image-url` `urlFor()` + Next.js `<Image>` | `urlFor()` generates CDN URLs with width/format params; Next.js `<Image>` handles lazy loading and LCP |
| Slug uniqueness | Custom validation logic | Sanity `slug` field type with `isUnique` option | Built-in uniqueness enforcement via Sanity's `isUnique` validator |
| Draft/preview workflow | Custom preview route | `defineLive()` + Draft Mode (already wired in Phase 1) | Phase 1 already sets up `api/draft-mode/enable` and `SanityLive` — all new content types get live preview automatically |

---

## Common Pitfalls

### Pitfall 1: `params` Is a Promise in Next.js 15

**What goes wrong:** Dynamic route page component uses `params.slug` directly instead of `await params`. TypeScript does not catch this at dev time — it fails at runtime or build.

**Why it happens:** Next.js 15 changed `params` to be a Promise (breaking change from v14). Confirmed from `/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`.

**How to avoid:** Always destructure after `await`:
```typescript
const { slug } = await params
```
And type the prop as `params: Promise<{ slug: string }>`.

**Warning signs:** TypeScript error `Property 'slug' does not exist on type 'Promise<...>'` or runtime crash on first slug access.

---

### Pitfall 2: `generateStaticParams` Must Return an Array

**What goes wrong:** `generateStaticParams` returns `undefined` or an empty array when Sanity has no posts yet (during development before content is published). Next.js throws `TypeError: Cannot read properties of undefined (reading 'map')` at build time.

**Why it happens:** Defensive `null` returns from `sanityFetch` when Sanity is not provisioned yet.

**How to avoid:** Always apply `?? []` to the `sanityFetch` result before mapping:
```typescript
return (posts ?? []).map((post) => ({ slug: post.slug }))
```

**Warning signs:** Build fails with `TypeError` during `generateStaticParams` execution.

---

### Pitfall 3: `notFound()` Required for Missing Slugs

**What goes wrong:** Visiting `/blog/nonexistent-slug` returns an empty page instead of a 404.

**Why it happens:** `sanityFetch` returns `null` when no document matches the query. Without an explicit `notFound()` call, Next.js renders the page with `null` data.

**How to avoid:**
```typescript
const { data: post } = await sanityFetch({ query: POST_QUERY, params: { slug } })
if (!post) notFound()
```

**Warning signs:** Blank pages at non-existent slug URLs; no 404 status in network tab.

---

### Pitfall 4: Object Types Must Be Registered Before Documents That Reference Them

**What goes wrong:** Sanity Studio fails to load with schema validation error when `personaCard` is used in `audiencePage` but not registered in `sanity.config.ts`.

**Why it happens:** Sanity schema resolution is order-sensitive for `type: 'object'` references.

**How to avoid:** Register `personaCard` (and any other object types) in the `types` array **before** the document types that reference them.

**Warning signs:** Sanity Studio console error: `Unknown type: personaCard`.

---

### Pitfall 5: Audience Page Stats Should Not Be Hard-Coded

**What goes wrong:** Developer puts real Ab2bm audience numbers directly in a component constant (as Phase 1 did with `PLACEHOLDER_STATS`). Numbers become stale and require a code deploy to update.

**Why it happens:** Convenience — it's faster than wiring through Sanity.

**How to avoid:** All audience stats, methodology notes, industry breakdowns, and persona card content MUST flow through the `audiencePage` Sanity document. The component should fall back to `null`/empty gracefully if Sanity has no data, not to hard-coded "real" numbers.

**Warning signs:** Stats are hard-coded in a component file rather than coming from `sanityFetch`.

---

### Pitfall 6: Homepage Blog Preview Shows Before Minimum Posts Are Published

**What goes wrong:** The homepage `BlogPreview` component is wired to show posts. If only 1-2 posts are published (not the 6+ required at launch), visitors see an incomplete preview.

**Why it happens:** `BlogPreview` renders whenever any posts exist — even 1.

**How to avoid:** `BlogPreview` existing behavior already returns `null` for empty arrays. The question is whether to show it with fewer than 3 posts. The Phase 1 component already checks `posts.length === 0`. For Phase 2, the listing query fetches top 3; if there are fewer than 3, the component renders with however many exist. This is acceptable — the BLOG-03 "6+ posts" requirement is about the full blog listing, not the homepage preview count. Document this explicitly in the plan.

**Warning signs:** Unintended inconsistency between homepage preview count and full blog listing count.

---

### Pitfall 7: Case Study `featured` Flag Has No Default Content in Sanity

**What goes wrong:** The homepage case study highlight section always shows nothing because no case study has `featured: true` set in Sanity.

**Why it happens:** Even after 3 case studies are published, someone must manually set the `featured` flag in Studio.

**How to avoid:** Document in the plan that after publishing case studies, one must be marked as featured in Studio. The `CaseStudyHighlight` component should fall back gracefully (return `null` or a placeholder) when no featured case study exists — the same way `LogoStrip` and `BlogPreview` handle empty states.

**Warning signs:** Homepage shows no case study highlight section even after case studies are published.

---

## Code Examples

### Blog Listing Page

```typescript
// src/app/(site)/blog/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_LISTING_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function BlogPage() {
  let posts: any[] = []
  try {
    const result = await sanityFetch({ query: BLOG_LISTING_QUERY })
    posts = result.data ?? []
  } catch {
    // Sanity not configured yet — render empty state
  }

  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Resources</h1>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post._id} className="rounded-xl border border-border bg-card p-6">
                <time dateTime={post.publishedAt} className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
                <h2 className="mt-3 text-lg font-semibold">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
```

### Individual Blog Post Page

```typescript
// src/app/(site)/blog/[slug]/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

const ALL_POST_SLUGS_QUERY = defineQuery(`*[_type == "post"]{ "slug": slug.current }`)

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: ALL_POST_SLUGS_QUERY })
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }))
}

// params is a Promise in Next.js 15
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: post } = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug } })
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <div className="prose mt-8">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
```

### Audience Page (Static Fetch)

```typescript
// src/app/(site)/audience/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { AUDIENCE_PAGE_QUERY } from '@/sanity/lib/queries'
import { PersonaCard } from '@/components/sections/PersonaCard'

export default async function AudiencePage() {
  let page: any = null
  try {
    const result = await sanityFetch({ query: AUDIENCE_PAGE_QUERY })
    page = result.data
  } catch { /* Sanity not provisioned */ }

  return (
    <main>
      <section className="py-16">
        <h1>{page?.pageHeadline ?? 'Our Audience'}</h1>
        <p>{page?.methodologyNote}</p>
      </section>
      <section>
        {(page?.personas ?? []).map((persona: any, i: number) => (
          <PersonaCard key={i} {...persona} />
        ))}
      </section>
    </main>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params.slug` direct access | `const { slug } = await params` | Next.js 15 | Breaking change — must await params Promise |
| `@portabletext/react` v3 API | `@portabletext/react` v6 API | v6 release | Installed version is v6.0.3; API unchanged from v3 for `<PortableText value components>` — same usage pattern |
| Separate CMS deploy for content updates | `defineLive()` automatic ISR | next-sanity v11 (2024) | Publish in Sanity Studio → site updates automatically, no redeploy |

**No deprecated patterns introduced in Phase 2.** All Phase 2 code follows the exact same conventions established in Phase 1.

---

## Open Questions

1. **Audience stats: verified numbers not yet delivered**
   - What we know: Ab2bm must deliver verified total audience size, MSP/MSSP counts, job function breakdown, industry distribution, company size distribution before AUDN-03/04 can be completed.
   - What's unclear: Timeline for delivery. Are the numbers ready?
   - Recommendation: Plan the audience page schema and page route without the real numbers. Planner should flag that content publishing is a Wave N task gated on Ab2bm delivery, not a code task.

2. **Client logo permissions: confirmed or pending?**
   - What we know: TRST-02 requires explicit client permission before displaying any logo. The Sanity `homepage.clientLogos` field is already built and waiting.
   - What's unclear: Which clients have confirmed permission. Are logos ready to upload?
   - Recommendation: Planner should create a checklist item requiring Ab2bm to confirm permissions for each logo before the logo is published in Studio. This is a human process step, not a code task.

3. **Case study anonymization: field design decision**
   - What we know: CASE-01 allows "named or anonymized with industry + outcome metrics." The `caseStudy` schema above has `clientName` as optional.
   - What's unclear: For anonymized studies, what is the display title? "Enterprise Security Vendor (Fortune 500)"? A placeholder?
   - Recommendation: The `title` field (required) is the display name — for anonymized studies, Ab2bm provides a descriptive title like "Enterprise Security Vendor — Webinar Lead Generation." The `clientName` field is left blank. Planner should document this convention.

4. **Blog URL: `/blog` vs `/resources`**
   - What we know: BLOG-01 specifies `/resources` or `/blog`. The `BlogPreview` component currently links to `/blog/${post.slug}`.
   - What's unclear: Which URL path was intended?
   - Recommendation: Use `/blog` — the existing `BlogPreview` component already uses `/blog/` hrefs. Changing to `/resources` would require updating `BlogPreview`. Unless Ab2bm has a strong preference, `/blog` is the path of least resistance.

5. **Testimonial attribution: is a real testimonial ready?**
   - What we know: TRST-03 requires at least one attributed testimonial with real name, title, company. The `testimonial` schema is already built.
   - What's unclear: Whether Ab2bm has a real testimonial ready to publish.
   - Recommendation: Plan for this as a content publishing task. The testimonial schema is ready; it just needs real data from Ab2bm.

---

## Validation Architecture

> `nyquist_validation` is `true` in `.planning/config.json` — this section is included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.4 (unit) + Playwright 1.59.1 (e2e) |
| Config file | `vitest.config.ts` (unit) + `playwright.config.ts` (e2e) |
| Quick run command | `npm run test` (unit only — runs in < 10s) |
| Full suite command | `npm run test && npm run test:e2e` |

Both frameworks already configured. Unit tests live in `tests/unit/`. E2e tests live in `tests/e2e/`.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDN-01 | Audience page renders MSP and MSSP named as distinct segments | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ Wave 0 |
| AUDN-02 | Persona cards render for IT practitioner, IT exec, MSP, MSSP | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ Wave 0 |
| AUDN-03 | Audience stats section renders with methodology note | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ Wave 0 |
| AUDN-04 | Industry breakdown and company size distribution render | e2e | `npx playwright test tests/e2e/audience.spec.ts` | ❌ Wave 0 |
| BLOG-01 | Blog listing page exists at `/blog`; individual post pages render | e2e | `npx playwright test tests/e2e/blog.spec.ts` | ❌ Wave 0 |
| BLOG-02 | Blog posts are Sanity-managed (schema existence + data-testid on cards) | e2e | `npx playwright test tests/e2e/blog.spec.ts` | ❌ Wave 0 |
| BLOG-03 | At least 6 posts are present on the listing page | e2e | `npx playwright test tests/e2e/blog.spec.ts` | ❌ Wave 0 |
| CASE-01 | At least 3 case studies present on listing page | e2e | `npx playwright test tests/e2e/case-studies.spec.ts` | ❌ Wave 0 |
| CASE-02 | Individual case study pages render with metrics | e2e | `npx playwright test tests/e2e/case-studies.spec.ts` | ❌ Wave 0 |
| CASE-03 | Case study highlight appears on homepage | e2e | `npx playwright test tests/e2e/homepage.spec.ts` (update existing) | ✅ exists (needs update) |
| TRST-01 | Logo strip appears on homepage and at least one other page | e2e | `npx playwright test tests/e2e/homepage.spec.ts` | ✅ exists (logo test is `test.todo()`) |
| TRST-03 | Testimonial with attribution renders on site | e2e | `npx playwright test tests/e2e/homepage.spec.ts` | ✅ exists (social proof test is `test.todo()`) |

**Note on TRST-02 (logo permissions):** This is a process/governance requirement with no automated test. The plan must include a manual checklist item confirmed by Ab2bm before logos are published.

**Note on BLOG-03 and CASE-01 (content counts):** These e2e tests require real Sanity content to be published. They will fail until content is populated in Sanity Studio. These tests should run against the Vercel preview URL after content publishing, not against localhost.

### Sampling Rate

- **Per task commit:** `npm run build` (confirms TypeScript and schema changes compile)
- **Per wave merge:** `npm run build && npm run test` (unit tests + build check)
- **Phase gate:** Full suite (`npm run test && npm run test:e2e` against Vercel preview URL with real Sanity content) before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/e2e/audience.spec.ts` — covers AUDN-01/02/03/04
- [ ] `tests/e2e/blog.spec.ts` — covers BLOG-01/02/03
- [ ] `tests/e2e/case-studies.spec.ts` — covers CASE-01/02/03

*(Existing `tests/e2e/homepage.spec.ts` covers CASE-03/TRST-01/TRST-03 but has `test.todo()` placeholders — those must be implemented, not just created)*

---

## Sources

### Primary (HIGH confidence)

- Live codebase inspection — `src/sanity/schemas/documents/homepage.ts`, `testimonial.ts`, `program.ts`, `src/sanity/sanity.config.ts`, `src/sanity/lib/queries.ts`, `src/sanity/lib/live.ts`, `src/sanity/lib/client.ts` — Phase 1 established patterns directly observed
- `/node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md` — `generateStaticParams` API + `params` as Promise confirmed
- `/node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md` — Dynamic route segment `[slug]` convention confirmed
- `/node_modules/next/dist/docs/01-app/02-guides/incremental-static-regeneration.md` — ISR pattern for blog/case study pages
- `/node_modules/@portabletext/react/dist/index.d.ts` — `PortableText` component API confirmed (v6.0.3)
- `.planning/phases/01-foundation-and-core-pages/01-RESEARCH.md` — Phase 1 research patterns (sanityFetch, defineLive, singleton schema, stegaClean)
- `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` — Phase 2 requirements and blockers

### Secondary (MEDIUM confidence)

- `package.json` installed versions — next-sanity@12.3.0, @portabletext/react@6.0.3, @sanity/image-url@2.1.1, groq@5.21.0 — all confirmed present

### Tertiary (LOW confidence)

- None for this phase. All patterns are derived from the live codebase and official Next.js docs in `node_modules`.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all tools established in Phase 1 with installed versions confirmed
- Architecture patterns: HIGH — dynamic routes, generateStaticParams, Sanity singleton all confirmed from Next.js docs in node_modules and existing Phase 1 code
- Pitfalls: HIGH — `params` as Promise is a confirmed Next.js 15 breaking change from official docs; other pitfalls derived from Phase 1 established patterns

**Research date:** 2026-04-17
**Valid until:** 2026-05-17 (stable stack — same as Phase 1 estimate)
