/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { PROGRAMS_INDEX_QUERY } from '@/sanity/lib/queries'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Demand Programs | Advance B2B Media',
  description:
    'Six demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs — from top-of-funnel content syndication to BANT-qualified pipeline.',
}

interface ProgramIndexEntry {
  _id: string
  name: string
  slug: string
  programType: string
  tagline: string
}

const FALLBACK_PROGRAM_INDEX: ProgramIndexEntry[] = [
  { _id: 'fb-engage',  name: 'ADVANCE ENGAGE',  slug: 'advance-engage',  programType: 'advance-engage',  tagline: 'Top-of-funnel opt-in lead generation built around your content.' },
  { _id: 'fb-abm',    name: 'ADVANCE ABM',      slug: 'advance-abm',     programType: 'advance-abm',     tagline: 'Account-based engagement that fuels your ABM strategy.' },
  { _id: 'fb-install',name: 'ADVANCE INSTALL',  slug: 'advance-install', programType: 'advance-install', tagline: 'Leads at organizations with the specific installed technology you need.' },
  { _id: 'fb-bant',   name: 'ADVANCE BANT',     slug: 'advance-bant',    programType: 'advance-bant',    tagline: 'Sales-ready leads qualified on Budget, Authority, Need, and Timing.' },
  { _id: 'fb-expand', name: 'ADVANCE EXPAND',   slug: 'advance-expand',  programType: 'advance-expand',  tagline: 'Cross-sell, upsell, and expansion inside your current customer base.' },
  { _id: 'fb-webinar',name: 'Webinar',           slug: 'webinar',         programType: 'webinar',         tagline: 'Connect your experts directly with senior IT buyers via co-branded virtual events.' },
]

export default async function ProgramsPage() {
  let programs: ProgramIndexEntry[] = FALLBACK_PROGRAM_INDEX

  try {
    const result = await sanityFetch({ query: PROGRAMS_INDEX_QUERY })
    if (Array.isArray(result.data) && result.data.length > 0) {
      programs = result.data.map((p: any) => ({
        _id: p?._id ?? '',
        name: p?.name ?? '',
        slug: p?.slug ?? '',
        programType: p?.programType ?? '',
        tagline: p?.tagline ?? '',
      }))
    }
  } catch {
    // Sanity not configured — fallback programs render
  }

  return (
    <main>
      <PageHeader
        eyebrow="Demand Generation"
        headline="Demand Programs"
        subheadline="Six programs built for technology vendors targeting IT decision-makers, MSPs, and MSSPs — from top-of-funnel content syndication to sales-ready BANT leads."
      />

      <div className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            data-testid="programs-grid"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {programs.map((program) => (
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
