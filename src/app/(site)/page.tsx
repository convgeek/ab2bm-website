/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityFetch } from '@/sanity/lib/live'
import { HOMEPAGE_QUERY } from '@/sanity/lib/queries'
import { Hero } from '@/components/sections/Hero'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ProgramsOverview } from '@/components/sections/ProgramsOverview'
import { AudienceStats } from '@/components/sections/AudienceStats'
import { TestimonialHighlight } from '@/components/sections/TestimonialHighlight'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { FooterCta } from '@/components/sections/FooterCta'

// Helpers to extract typed data from untyped Sanity GROQ results
// (Types are generated after `npx sanity@latest typegen generate` — Phase 1 uses manual helpers)

function extractLogos(raw: any): { url: string; alt: string }[] {
  if (!Array.isArray(raw)) return []
  const result: { url: string; alt: string }[] = []
  for (const item of raw) {
    const url = item?.asset?.url
    if (typeof url === 'string' && url) {
      result.push({ url, alt: typeof item?.alt === 'string' ? item.alt : '' })
    }
  }
  return result
}

function extractPrograms(
  raw: any
): { _id: string; name: string; slug: { current: string }; tagline: string; ctaLabel: string }[] {
  if (!Array.isArray(raw)) return []
  return raw.map((p: any) => ({
    _id: p?._id ?? '',
    name: p?.name ?? '',
    slug: { current: p?.slug?.current ?? '' },
    tagline: p?.tagline ?? '',
    ctaLabel: p?.ctaLabel ?? '',
  }))
}

function extractStats(raw: any): { label: string; value: string; footnote?: string }[] {
  if (!Array.isArray(raw)) return []
  return raw.map((s: any) => ({
    label: s?.label ?? '',
    value: s?.value ?? '',
    footnote: s?.footnote ?? undefined,
  }))
}

function extractTestimonial(
  raw: any
): { quote: string; attribution: string; role: string; company: string } | null {
  if (!raw) return null
  return {
    quote: raw.quote ?? '',
    attribution: raw.attribution ?? '',
    role: raw.role ?? '',
    company: raw.company ?? '',
  }
}

export default async function HomePage() {
  // Graceful fallback when Sanity is not yet provisioned (placeholder project ID)
  let homepage: Awaited<ReturnType<typeof sanityFetch<typeof HOMEPAGE_QUERY>>>['data'] | null = null
  try {
    const result = await sanityFetch({ query: HOMEPAGE_QUERY })
    homepage = result.data
  } catch {
    // Sanity not configured yet — all section components handle null/empty data gracefully
  }

  return (
    <main>
      <Hero
        headline={homepage?.heroHeadline ?? ''}
        subheadline={homepage?.heroSubheadline ?? ''}
        ctaLabel={homepage?.heroCta ?? ''}
        ctaHref={homepage?.heroCtaHref ?? ''}
      />
      <LogoStrip logos={extractLogos(homepage?.clientLogos)} />
      <ProgramsOverview programs={extractPrograms(homepage?.programsOverview)} />
      <AudienceStats stats={extractStats(homepage?.audienceStats)} />
      <TestimonialHighlight testimonial={extractTestimonial(homepage?.testimonialHighlight)} />
      {/* BlogPreview is intentionally not shown in Phase 1 — blog posts are Phase 2 */}
      <BlogPreview posts={undefined} />
      <FooterCta
        headline={homepage?.footerCtaHeadline ?? ''}
        body={homepage?.footerCtaBody ?? ''}
        ctaLabel={homepage?.footerCtaLabel ?? ''}
      />
    </main>
  )
}
