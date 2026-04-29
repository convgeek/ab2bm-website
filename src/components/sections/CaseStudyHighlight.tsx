import Link from 'next/link'

interface CaseStudyHighlightProps {
  featuredCaseStudy: {
    _id: string
    title: string
    slug: string
    clientName?: string
    industry: string
    summary?: string
    metrics?: { label: string; value: string }[]
  } | null
}

function ProvenAtScaleFallback() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-5 p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Proven at Scale
              </p>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                A decade of audience development built for how B2B buyers actually buy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                B2B vendors across technology, financial services, HR tech, sales tech, and
                marketing tech rely on Advance B2B Media to reach buyers that other channels miss.
              </p>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-2"
              >
                View case studies
                <span aria-hidden="true" className="text-accent">→</span>
              </Link>
            </div>
            <div className="bg-primary/5 border-t lg:border-t-0 lg:border-l border-border/50 flex flex-col justify-center gap-8 p-10 lg:p-14">
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-accent tabular-nums">48M+</span>
                <span className="mt-1.5 text-sm font-medium text-muted-foreground">Opt-in B2B professionals reached</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-accent tabular-nums">10+</span>
                <span className="mt-1.5 text-sm font-medium text-muted-foreground">Years building engaged audiences</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-accent tabular-nums">100%</span>
                <span className="mt-1.5 text-sm font-medium text-muted-foreground">Quality commitment on every program</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CaseStudyHighlight({ featuredCaseStudy }: CaseStudyHighlightProps) {
  if (!featuredCaseStudy) {
    return <ProvenAtScaleFallback />
  }

  const displayName = featuredCaseStudy.clientName || featuredCaseStudy.industry
  const metrics = featuredCaseStudy.metrics ?? []

  return (
    <section data-testid="case-study-highlight" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
            {/* Text side */}
            <div className="flex flex-col justify-center gap-5 p-10 lg:p-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Featured Result
              </p>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                {featuredCaseStudy.title}
              </h2>
              <p className="text-sm font-medium text-muted-foreground">{displayName}</p>
              {featuredCaseStudy.summary && (
                <p className="text-muted-foreground leading-relaxed">{featuredCaseStudy.summary}</p>
              )}
              <Link
                href={`/case-studies/${featuredCaseStudy.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-2"
              >
                Read full case study
                <span aria-hidden="true" className="text-accent">→</span>
              </Link>
            </div>

            {/* Metrics side */}
            {metrics.length > 0 && (
              <div className="bg-primary/5 border-t lg:border-t-0 lg:border-l border-border/50 flex flex-col justify-center gap-8 p-10 lg:p-14">
                {metrics.slice(0, 3).map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-5xl font-bold text-accent tabular-nums">
                      {metric.value}
                    </span>
                    <span className="mt-1.5 text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
