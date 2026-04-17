import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'

interface Program {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  ctaLabel: string
}

interface ProgramsOverviewProps {
  programs: Program[]
}

const PLACEHOLDER_PROGRAMS: Program[] = [
  {
    _id: 'placeholder-content-syndication',
    name: 'Content Syndication',
    slug: { current: 'content-syndication' },
    tagline:
      'Distribute your thought leadership content to our verified audience of IT decision-makers, MSPs, and MSSPs — driving qualified pipeline at scale.',
    ctaLabel: 'Learn about Content Syndication',
  },
  {
    _id: 'placeholder-webinar',
    name: 'Webinar Programs',
    slug: { current: 'webinar' },
    tagline:
      'Host co-branded webinars with Advance B2B Media, connecting your subject matter experts directly with senior IT buyers actively evaluating solutions.',
    ctaLabel: 'Learn about Webinars',
  },
]

export function ProgramsOverview({ programs }: ProgramsOverviewProps) {
  const displayPrograms = programs && programs.length > 0 ? programs : PLACEHOLDER_PROGRAMS

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Two proven demand generation programs built specifically for technology vendors targeting IT buyers.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {displayPrograms.map((program) => {
            // stegaClean() — prevents Visual Editing encoding from corrupting string comparisons
            const slugCurrent = stegaClean(program.slug?.current) ?? program._id
            return (
              <div
                key={program._id}
                className="flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-card-foreground">
                  {program.name}
                </h3>
                <p className="mt-3 flex-1 text-muted-foreground leading-relaxed">
                  {program.tagline}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/programs#${slugCurrent}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
                  >
                    {program.ctaLabel || 'Learn more'} &rarr;
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
          >
            View all programs
          </Link>
        </div>
      </div>
    </section>
  )
}
