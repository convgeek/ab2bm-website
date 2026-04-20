interface Stat {
  label: string
  value: string
  footnote?: string
}

interface AudienceStatsProps {
  stats: Stat[]
}

const PLACEHOLDER_STATS: Stat[] = [
  { label: 'Total Audience', value: '50,000+', footnote: 'Verified opt-in (estimate)' },
  { label: 'MSPs', value: '12,000+', footnote: 'Managed Service Providers (estimate)' },
  { label: 'MSSPs', value: '4,000+', footnote: 'Managed Security Service Providers (estimate)' },
  { label: 'IT Decision-Makers', value: '18,000+', footnote: 'Senior IT roles (estimate)' },
]

export function AudienceStats({ stats }: AudienceStatsProps) {
  const displayStats = stats && stats.length > 0 ? stats : PLACEHOLDER_STATS

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Decorative radial highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 120%, oklch(0.35 0.20 303 / 0.4), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-3">
            Verified Audience
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            The IT Buyers You Need to Reach
          </h2>
          <p className="mt-3 text-primary-foreground/70 max-w-xl mx-auto">
            A curated, opt-in audience of qualified IT professionals — not rented lists.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-px bg-primary-foreground/10 overflow-hidden rounded-2xl lg:grid-cols-4">
          {displayStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-primary px-6 py-10"
            >
              <p className="text-4xl font-bold text-primary-foreground sm:text-5xl tabular-nums">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-primary-foreground/90 uppercase tracking-wide">
                {stat.label}
              </p>
              {stat.footnote && (
                <p className="mt-2 text-xs text-primary-foreground/45 leading-snug">
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
