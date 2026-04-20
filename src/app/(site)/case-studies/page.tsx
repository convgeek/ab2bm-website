/* eslint-disable @typescript-eslint/no-explicit-any */
import { sanityFetch } from '@/sanity/lib/live'
import { CASE_STUDIES_QUERY } from '@/sanity/lib/queries'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'
import { PageHeader } from '@/components/layout/PageHeader'

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
      <PageHeader
        eyebrow="Proof Points"
        headline="Case Studies"
        subheadline="Real results for technology vendors reaching MSP and MSSP audiences."
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="rounded-2xl border border-border bg-secondary/30 p-16 text-center">
              <p className="text-lg font-semibold text-foreground">Case studies coming soon.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Client success stories are in preparation and will be published shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs._id} {...cs} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
