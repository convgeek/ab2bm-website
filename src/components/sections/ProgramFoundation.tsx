const INGREDIENTS = [
  'LinkedIn Profiles',
  'Native Language Campaigns',
  'SIC & NAICS Codes',
  'Buyer Profiling Questions',
  'Programmatic Advertising',
  'Suppression & Exclusion Lists',
  'Intent Data Signals',
  'ABM Look-a-Like Modeling',
]

const COMPLIANCE_PILLARS = [
  {
    title: 'Global Compliance',
    description:
      'Every lead delivered is collected in full compliance with GDPR, CASL, and CCPA regulations — ensuring your campaigns meet legal requirements across North America and Europe.',
  },
  {
    title: 'Opting In / Permissioning',
    description:
      'Our audience members actively opt in to receive relevant content from B2B vendors. No cold outreach, no scraped lists — only genuinely interested, permissioned contacts.',
  },
  {
    title: 'Opt-In Recording',
    description:
      'We maintain documented records of every opt-in, including timestamp, source, and consent language. Full audit trail available upon request for compliance verification.',
  },
]

const MANAGEMENT_STATS = [
  { label: 'Time to Launch', value: '24–48 hrs' },
  { label: 'First Lead Delivered', value: 'Within 3 Days' },
  { label: 'Coverage', value: 'Global Time Zones' },
  { label: 'Quality Assurance', value: 'Dedicated QA Team' },
]

export function ProgramFoundation() {
  return (
    <section data-testid="program-foundation" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-4">
            Everything Included. Configured for You.
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Every ADVANCE program ships with full-service management and built-in global compliance
            as standard. From there, we configure targeting, channels, and enhancement options
            precisely to your buyer profile, goals, and go-to-market motion — so the program
            you run is the program you need.
          </p>
        </div>

        {/* Subsections */}
        <div className="divide-y divide-border">

          {/* Optional Program Ingredients */}
          <div className="py-10 first:pt-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Optional Program Ingredients
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Enhance any program with additional targeting and delivery options.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {INGREDIENTS.map((ingredient) => (
                <div
                  key={ingredient}
                  className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-card-foreground"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>

          {/* Compliance-First by Design */}
          <div className="py-10">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Compliance-First by Design
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Lawyers and audiences love our diligence, so will yours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {COMPLIANCE_PILLARS.map((pillar) => (
                <div key={pillar.title}>
                  <p className="text-sm font-semibold text-foreground mb-2">{pillar.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Service Program Management */}
          <div className="py-10">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Full-Service Program Management
            </h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Accountable, experienced program managers to deliver your KPIs — working for and with
              you as coaches and consultants.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {MANAGEMENT_STATS.map((stat) => (
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

        </div>
      </div>
    </section>
  )
}
