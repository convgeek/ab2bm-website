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
      className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
    >
      <h3 className="text-lg font-semibold text-card-foreground leading-snug">
        <Link href={`/case-studies/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>

      <p className="text-sm font-medium text-muted-foreground">{displayName}</p>

      {summary && (
        <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
      )}

      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {metrics.slice(0, 2).map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl font-bold text-foreground">{metric.value}</span>
              <span className="text-xs text-muted-foreground">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pt-2">
        <Link
          href={`/case-studies/${slug}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          Read case study &rarr;
        </Link>
      </div>
    </article>
  )
}
