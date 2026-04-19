/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { PROGRAMS_INDEX_QUERY } from '@/sanity/lib/queries'

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
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Demand Programs
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Six demand generation programs built for technology vendors targeting IT decision-makers, MSPs, and MSSPs — from top-of-funnel content syndication to sales-ready BANT leads.
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            data-testid="programs-grid"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {programs.map((program) => (
              <a
                key={program._id}
                href={`/programs/${program.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {program.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {program.tagline}
                </p>
                <span className="mt-4 text-sm font-medium text-primary">
                  Learn more →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
