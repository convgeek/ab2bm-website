const STATS = [
  { label: 'Time to Launch', value: '24–48 hrs' },
  { label: 'First Lead Delivered', value: 'Within 3 Days' },
  { label: 'Coverage', value: 'Global Time Zones' },
  { label: 'Quality Assurance', value: 'Dedicated QA Team' },
]

export function ProgramManagement() {
  return (
    <section data-testid="program-management" className="py-16 md:py-24 border-b border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          Full-Service Program Management
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Accountable, experienced program managers to deliver your KPIs — working for and with you
          as coaches and consultants.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-5 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
