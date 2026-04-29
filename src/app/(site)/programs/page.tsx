import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Lead and Demand Programs | Advance B2B Media',
  description:
    'Six demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs — from top-of-funnel content syndication to BANT-qualified pipeline.',
}

interface ProgramIndexEntry {
  _id: string
  name: string
  slug: string
  tagline: string
}

const PROGRAMS: ProgramIndexEntry[] = [
  { _id: 'fb-engage',  name: 'ADVANCE ENGAGE',  slug: 'advance-engage',  tagline: 'Top-of-funnel opt-in lead generation built around your content.' },
  { _id: 'fb-abm',    name: 'ADVANCE ABM',      slug: 'advance-abm',     tagline: 'Account-based engagement that fuels your ABM strategy.' },
  { _id: 'fb-install',name: 'ADVANCE INSTALL',  slug: 'advance-install', tagline: 'Leads at organizations with the specific installed technology you need.' },
  { _id: 'fb-bant',   name: 'ADVANCE BANT',     slug: 'advance-bant',    tagline: 'Sales-ready leads qualified on Budget, Authority, Need, and Timing.' },
  { _id: 'fb-expand', name: 'ADVANCE EXPAND',   slug: 'advance-expand',  tagline: 'Cross-sell, upsell, and expansion inside your current customer base.' },
  { _id: 'fb-webinar',name: 'ADVANCE CONTENT',  slug: 'advance-content', tagline: 'Co-branded virtual events and custom assets that power every demand program.' },
]

export default function ProgramsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Lead and Demand Generation"
        headline="Lead and Demand Programs"
        subheadline="Six programs built for B2B vendors targeting decision-makers across technology, finance, HR, sales, marketing, and lines of business — from top-of-funnel engagement through sales-ready BANT leads, customer expansion, and the custom content that powers them all."
        illustration={
          <Image
            src="/images/ab2bm-programs-hero.svg"
            alt="Advance B2B Media demand programs overview"
            width={700}
            height={500}
            className="w-full h-auto"
            priority
          />
        }
      />

      <div className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            data-testid="programs-grid"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PROGRAMS.map((program) => (
              <a
                key={program._id}
                href={`/programs/${program.slug}`}
                className="group relative flex flex-col rounded-2xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Orange top accent */}
                <div className="h-1 w-full bg-accent" />
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-base font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {program.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                    {program.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Learn more <span className="text-accent">→</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
