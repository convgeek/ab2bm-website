/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { defineQuery } from 'groq'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { CASE_STUDY_QUERY } from '@/sanity/lib/queries'

// Inline query for generateStaticParams — only needs slugs
const ALL_CASE_STUDY_SLUGS_QUERY = defineQuery(
  `*[_type == "caseStudy"]{ "slug": slug.current }`
)

type CaseStudy = {
  _id: string
  title: string
  slug: string
  clientName?: string
  industry: string
  companySize?: string
  summary?: string
  metrics?: { label: string; value: string }[]
  body?: any
}

function extractCaseStudy(raw: any): CaseStudy | null {
  if (!raw) return null
  return {
    _id: raw._id ?? '',
    title: raw.title ?? '',
    slug: raw.slug ?? '',
    clientName: typeof raw.clientName === 'string' ? raw.clientName : undefined,
    industry: raw.industry ?? '',
    companySize: typeof raw.companySize === 'string' ? raw.companySize : undefined,
    summary: typeof raw.summary === 'string' ? raw.summary : undefined,
    metrics: Array.isArray(raw.metrics) ? raw.metrics : undefined,
    body: raw.body ?? undefined,
  }
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
    ),
  },
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const result = await sanityFetch({ query: ALL_CASE_STUDY_SLUGS_QUERY })
    const slugs = (result.data ?? []) as { slug: string | null }[]
    return slugs
      .filter((item) => typeof item.slug === 'string' && item.slug)
      .map((item) => ({ slug: item.slug as string }))
  } catch {
    // Sanity not configured yet — return empty array, all routes rendered on demand
    return []
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let caseStudy: CaseStudy | null = null

  try {
    const result = await sanityFetch({ query: CASE_STUDY_QUERY, params: { slug } })
    caseStudy = extractCaseStudy(result.data)
  } catch {
    // Sanity not configured — treat as not found
  }

  if (!caseStudy) {
    notFound()
  }

  const displayName = caseStudy.clientName || caseStudy.industry

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <Link
          href="/case-studies"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          &#8592; All Case Studies
        </Link>

        <h1 className="text-4xl font-bold tracking-tight leading-tight">{caseStudy.title}</h1>

        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <span>{displayName}</span>
          {caseStudy.companySize && (
            <>
              <span aria-hidden="true">&middot;</span>
              <span>{caseStudy.companySize}</span>
            </>
          )}
        </div>

        {caseStudy.summary && (
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{caseStudy.summary}</p>
        )}

        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <section
            data-testid="case-study-metrics"
            className="mt-10 p-6 rounded-xl bg-muted/40 border border-border"
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Outcomes
            </h2>
            <div className="flex flex-wrap gap-8">
              {caseStudy.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-4xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-sm text-muted-foreground mt-1">{metric.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {caseStudy.body && (
          <div className="mt-10 prose prose-neutral max-w-none">
            <PortableText value={caseStudy.body} components={portableTextComponents} />
          </div>
        )}
      </article>
    </main>
  )
}
