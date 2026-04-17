interface Stat {
  label: string
  value: string
  footnote?: string
}

interface AudienceStatsProps {
  stats: Stat[]
}

// Placeholder stats are labeled "(estimate)" to be honest with visitors
// until real numbers are available from Phase 2
const PLACEHOLDER_STATS: Stat[] = [
  { label: 'Total Audience', value: '50,000+', footnote: 'Verified opt-in (estimate)' },
  { label: 'MSPs', value: '12,000+', footnote: 'Managed Service Providers (estimate)' },
  { label: 'MSSPs', value: '4,000+', footnote: 'Managed Security Service Providers (estimate)' },
  { label: 'IT Decision-Makers', value: '18,000+', footnote: 'Senior IT roles (estimate)' },
]

export function AudienceStats({ stats }: AudienceStatsProps) {
  const displayStats = stats && stats.length > 0 ? stats : PLACEHOLDER_STATS

  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Audience Reach
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            A curated, opt-in audience of qualified IT buyers
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary-foreground sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-base font-medium text-primary-foreground/90">
                {stat.label}
              </p>
              {stat.footnote && (
                <p className="mt-1 text-xs text-primary-foreground/60">
                  {stat.footnote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
