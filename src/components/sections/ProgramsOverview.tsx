import Link from 'next/link'

interface Program {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  ctaLabel: string
  href?: string
}

interface ProgramsOverviewProps {
  programs: Program[]
}

const PLACEHOLDER_PROGRAMS: Program[] = [
  {
    _id: 'placeholder-content-syndication',
    name: 'Lead and Demand Programs',
    slug: { current: 'programs' },
    href: '/programs',
    tagline:
      'From top-of-funnel engagement and ABM to install-base targeting, BANT-qualified leads, and customer expansion — flexible programs built around the way your team sells and the pipeline you need.',
    ctaLabel: 'Learn about our programs',
  },
  {
    _id: 'placeholder-webinar',
    name: 'Custom Content That Powers Every Program',
    slug: { current: 'advance-content' },
    href: '/programs/advance-content',
    tagline:
      'Co-branded virtual events, thought leadership, and custom content built to fuel your campaigns — giving every program the assets it needs to engage, qualify, and convert B2B buyers.',
    ctaLabel: 'Learn about Advance Content',
  },
]

export function ProgramsOverview({ programs }: ProgramsOverviewProps) {
  const displayPrograms = programs && programs.length > 0 ? programs : PLACEHOLDER_PROGRAMS

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            Lead and Demand Programs
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            B2B Lead and Demand Gen, Engineered Around How You Sell
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven lead and demand generation programs delivering B2B buyers who are actively evaluating solutions — not just browsing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayPrograms.map((program) => {
            const slugCurrent = program.slug?.current ?? program._id
            const href = program.href ?? `/programs#${slugCurrent}`
            return (
              <div
                key={program._id}
                className="group relative flex flex-col rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Orange top accent */}
                <div className="h-1 w-full bg-accent" />
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="mt-3 flex-1 text-muted-foreground leading-relaxed">
                    {program.tagline}
                  </p>
                  <div className="mt-6 flex items-center gap-1">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      {program.ctaLabel || 'Learn more'}
                      <span aria-hidden="true" className="text-accent">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:bg-muted hover:-translate-y-0.5 hover:shadow-md"
          >
            View all 6 programs →
          </Link>
        </div>
      </div>
    </section>
  )
}
