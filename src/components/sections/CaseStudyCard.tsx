import Link from 'next/link'

interface CaseStudyCardProps {
  _id: string
  title: string
  slug: string
  clientName?: string
  industry: string
  companySize?: string
  summary?: string
  metrics?: { label: string; value: string }[]
}

export function CaseStudyCard({
  title,
  slug,
  clientName,
  industry,
  summary,
  metrics,
}: CaseStudyCardProps) {
  const displayName = clientName || industry

  return (
    <article
      data-testid="case-study-card"
      className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Orange top accent */}
      <div className="h-1 w-full bg-accent" />
      <div className="flex flex-col flex-1 gap-4 p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">
            {displayName}
          </p>
          <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
            <Link href={`/case-studies/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
        </div>

        {summary && (
          <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
        )}

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-secondary/40 p-4">
            {metrics.slice(0, 2).map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl font-bold text-accent tabular-nums">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link
            href={`/case-studies/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Read case study <span className="text-accent">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
