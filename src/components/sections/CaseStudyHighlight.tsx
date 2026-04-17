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

export function CaseStudyHighlight({ featuredCaseStudy }: CaseStudyHighlightProps) {
  if (!featuredCaseStudy) {
    return null
  }

  const displayName = featuredCaseStudy.clientName || featuredCaseStudy.industry
  const metrics = featuredCaseStudy.metrics ?? []

  return (
    <section data-testid="case-study-highlight" className="py-16 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">
          Featured Result
        </p>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-foreground">{featuredCaseStudy.title}</h2>
            <p className="text-base font-medium text-muted-foreground">{displayName}</p>
            {featuredCaseStudy.summary && (
              <p className="text-muted-foreground leading-relaxed">{featuredCaseStudy.summary}</p>
            )}
            <Link
              href={`/case-studies/${featuredCaseStudy.slug}`}
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline mt-2"
            >
              Read full case study &rarr;
            </Link>
          </div>

          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-8">
              {metrics.slice(0, 3).map((metric, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-4xl font-bold text-foreground">{metric.value}</span>
                  <span className="text-sm text-muted-foreground mt-1">{metric.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
