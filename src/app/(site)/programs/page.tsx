/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { PROGRAMS_QUERY } from '@/sanity/lib/queries'
import { ProgramCard } from '@/components/sections/ProgramCard'
import type { PortableTextBlock } from '@portabletext/react'

export const metadata: Metadata = {
  title: 'Programs | Advance B2B Media',
  description:
    'Content syndication and webinar programs reaching IT decision-makers, MSPs, and MSSPs.',
}

interface ProgramData {
  _id: string
  name: string
  tagline: string
  programType: string
  mechanics: PortableTextBlock[] | null
  deliverables: PortableTextBlock[] | null
  targetingOptions: PortableTextBlock[] | null
  ctaLabel: string
}

// Fallback programs rendered when Sanity is not yet provisioned.
// Phase 1 seed content — the page is never blank.
const FALLBACK_PROGRAMS: ProgramData[] = [
  {
    _id: 'fallback-content-syndication',
    name: 'Content Syndication',
    tagline:
      'Distribute your thought leadership content to our verified audience of IT decision-makers, MSPs, and MSSPs — driving qualified pipeline at scale.',
    programType: 'content-syndication',
    mechanics: null,
    deliverables: null,
    targetingOptions: null,
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fallback-webinar',
    name: 'Webinar Programs',
    tagline:
      'Host co-branded webinars with Advance B2B Media, connecting your subject matter experts directly with senior IT buyers actively evaluating solutions.',
    programType: 'webinar',
    mechanics: null,
    deliverables: null,
    targetingOptions: null,
    ctaLabel: 'Start a Conversation',
  },
]

// Helper to extract programs from untyped Sanity GROQ result
// (Typed via `npx sanity@latest typegen generate` — Phase 1 uses manual helpers)
function extractPrograms(raw: any): ProgramData[] {
  if (!Array.isArray(raw) || raw.length === 0) return FALLBACK_PROGRAMS
  return raw.map((p: any) => ({
    _id: p?._id ?? '',
    name: p?.name ?? '',
    tagline: p?.tagline ?? '',
    programType: p?.programType ?? '',
    mechanics: (p?.mechanics as PortableTextBlock[] | null) ?? null,
    deliverables: (p?.deliverables as PortableTextBlock[] | null) ?? null,
    targetingOptions: (p?.targetingOptions as PortableTextBlock[] | null) ?? null,
    ctaLabel: p?.ctaLabel ?? 'Start a Conversation',
  }))
}

export default async function ProgramsPage() {
  let programs: ProgramData[] = FALLBACK_PROGRAMS

  try {
    const result = await sanityFetch({ query: PROGRAMS_QUERY })
    programs = extractPrograms(result.data)
  } catch {
    // Sanity not configured yet — fallback programs render placeholder content
  }

  return (
    <main>
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Programs
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Two proven demand generation programs built specifically for technology vendors
            targeting IT decision-makers, MSPs, and MSSPs.
          </p>
        </div>
      </div>

      {programs.map((program) => (
        <ProgramCard
          key={program._id}
          id={program._id}
          name={program.name}
          tagline={program.tagline}
          programType={program.programType}
          mechanics={program.mechanics}
          deliverables={program.deliverables}
          targetingOptions={program.targetingOptions}
          ctaLabel={program.ctaLabel}
        />
      ))}
    </main>
  )
}
