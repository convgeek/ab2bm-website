/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityFetch } from '@/sanity/lib/live'
import { CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'

type CaseStudy = {
  _id: string
  title: string
  slug: string
  clientName?: string
  industry: string
  companySize?: string
  summary?: string
  metrics?: { label: string; value: string }[]
}

function extractCaseStudies(raw: any): CaseStudy[] {
  if (!Array.isArray(raw)) return []
  return raw.map((cs: any) => ({
    _id: cs?._id ?? '',
    title: cs?.title ?? '',
    slug: cs?.slug ?? '',
    clientName: typeof cs?.clientName === 'string' ? cs.clientName : undefined,
    industry: cs?.industry ?? '',
    companySize: typeof cs?.companySize === 'string' ? cs.companySize : undefined,
    summary: typeof cs?.summary === 'string' ? cs.summary : undefined,
    metrics: Array.isArray(cs?.metrics) ? cs.metrics : undefined,
  }))
}

export default async function CaseStudiesPage() {
  let caseStudies: CaseStudy[] = []

  try {
    const result = await sanityFetch({ query: CASE_STUDIES_QUERY })
    caseStudies = extractCaseStudies(result.data)
  } catch {
    // Sanity not configured yet — render empty state
  }

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Real results for tech vendors reaching MSP and MSSP audiences.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="text-muted-foreground">Case studies coming soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs._id} {...cs} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
