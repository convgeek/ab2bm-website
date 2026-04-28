import { ProgramInquiryCta } from './ProgramInquiryCta'

const FALLBACK_MECHANICS: Record<string, string> = {
  'content-syndication':
    'Reach verified IT decision-makers, MSPs, and MSSPs through our opt-in content network. Your white paper, case study, or sponsored content is distributed to our audience by topic and persona interest. Leads are delivered as name, title, company, and email — matched against your ICP criteria.',
  webinar:
    'Co-host a live virtual event with Ab2bm to a pre-built audience of IT pros. We handle promotion to our engaged list, manage registration, run the platform, and deliver attendee leads post-event — with attendance confirmation data included.',
}

interface ProgramCardProps {
  id: string
  name: string
  tagline: string
  programType: string
  ctaLabel: string
}

export function ProgramCard({ id, name, tagline, programType, ctaLabel }: ProgramCardProps) {
  const anchorId = programType || id
  const fallbackMechanics = FALLBACK_MECHANICS[anchorId] ?? ''

  return (
    <section id={anchorId} className="py-16 md:py-24 border-b border-border last:border-b-0">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{name}</h2>
        {tagline && (
          <p className="mt-4 text-xl text-muted-foreground leading-relaxed">{tagline}</p>
        )}

        <div className="mt-12 space-y-10">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">How It Works</h3>
            <p className="text-muted-foreground leading-relaxed">{fallbackMechanics}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">What You Get</h3>
            <p className="text-muted-foreground leading-relaxed">Deliverables details coming soon.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Audience Targeting</h3>
            <p className="text-muted-foreground leading-relaxed">Targeting options details coming soon.</p>
          </div>
        </div>

        <ProgramInquiryCta programType={programType} ctaLabel={ctaLabel} />
      </div>
    </section>
  )
}
