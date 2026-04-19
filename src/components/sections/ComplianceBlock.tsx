const COMPLIANCE_PILLARS = [
  {
    title: 'Global Compliance',
    description:
      'Every lead delivered is collected in full compliance with GDPR, CASL, and CCPA regulations — ensuring your campaigns meet legal requirements across North America and Europe.',
  },
  {
    title: 'Opting In / Permissioning',
    description:
      'Our audience members actively opt in to receive relevant content from technology vendors. No cold outreach, no scraped lists — only genuinely interested, permissioned contacts.',
  },
  {
    title: 'Opt-In Recording',
    description:
      'We maintain documented records of every opt-in, including timestamp, source, and consent language. Full audit trail available upon request for compliance verification.',
  },
]

export function ComplianceBlock() {
  return (
    <section data-testid="compliance-block" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          Compliance-First by Design
        </h2>
        <p className="text-muted-foreground mb-10">
          Lawyers and audiences love our diligence, so will yours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMPLIANCE_PILLARS.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="text-base font-semibold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
