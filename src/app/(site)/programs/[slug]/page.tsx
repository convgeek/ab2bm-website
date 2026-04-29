import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProgramHero } from '@/components/sections/ProgramHero'
import { ProgramDetail } from '@/components/sections/ProgramDetail'
import { OptionalIngredients } from '@/components/sections/OptionalIngredients'
import { ComplianceBlock } from '@/components/sections/ComplianceBlock'
import { ProgramManagement } from '@/components/sections/ProgramManagement'
import { ProgramInquiryCta } from '@/components/sections/ProgramInquiryCta'

interface ProgramData {
  _id: string
  name: string
  slug: string
  programType: string
  tagline: string
  solutionOverview: string | null
  bestFor: string | null
  ctaLabel: string | null
}

const PROGRAMS: ProgramData[] = [
  {
    _id: 'fb-engage',
    name: 'ADVANCE ENGAGE',
    slug: 'advance-engage',
    programType: 'advance-engage',
    tagline: 'Top-of-funnel opt-in lead generation built around your content.',
    solutionOverview:
      'ADVANCE ENGAGE is built for marketers who need to generate opt-in leads that engage and meet specific business and buyer criteria. It is the go-to program for content syndication and top-of-funnel demand.',
    bestFor:
      'Demand generation and content marketing teams that need to fill the top of the funnel with engaged, opt-in prospects.',
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fb-abm',
    name: 'ADVANCE ABM',
    slug: 'advance-abm',
    programType: 'advance-abm',
    tagline: 'Account-based engagement that fuels your ABM strategy.',
    solutionOverview:
      "ADVANCE ABM fuels account-based marketing strategies by generating opt-in, engaged buying committee leads within a client's target account list.",
    bestFor:
      'Marketing teams running account-based strategies who need to identify and engage buying committee members at target accounts.',
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fb-install',
    name: 'ADVANCE INSTALL',
    slug: 'advance-install',
    programType: 'advance-install',
    tagline: 'Leads at organizations with the specific installed technology you need.',
    solutionOverview:
      "ADVANCE INSTALL identifies organizations with specific installed technologies and generates engaged, opt-in leads that match the client's buyer profile at those organizations.",
    bestFor:
      'Brands that market and sell into organizations requiring specific installed technologies.',
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fb-bant',
    name: 'ADVANCE BANT',
    slug: 'advance-bant',
    programType: 'advance-bant',
    tagline: 'Sales-ready leads qualified on Budget, Authority, Need, and Timing.',
    solutionOverview:
      "ADVANCE BANT delivers leads that have confirmed Budget, Authority, Need, and Timing — actively looking for solutions in the client's market category within the next six months.",
    bestFor:
      'Sales-led organizations that need pipeline-ready leads and want to shorten the sales cycle.',
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fb-expand',
    name: 'ADVANCE EXPAND',
    slug: 'advance-expand',
    programType: 'advance-expand',
    tagline: 'Cross-sell, upsell, and expansion inside your current customer base.',
    solutionOverview:
      'ADVANCE EXPAND is for marketing teams charged with expanding, cross-selling, and upselling into their current customer bases — reaching new decision-makers within existing accounts.',
    bestFor:
      'Customer marketing and expansion-focused teams tasked with growing revenue inside the existing customer base.',
    ctaLabel: 'Start a Conversation',
  },
  {
    _id: 'fb-webinar',
    name: 'ADVANCE CONTENT',
    slug: 'advance-content',
    programType: 'advance-content',
    tagline: 'Connect your experts directly with senior IT buyers via co-branded virtual events.',
    solutionOverview:
      'ADVANCE CONTENT connects your subject matter experts directly with senior IT buyers actively evaluating solutions in your market through co-branded virtual events and custom content programs.',
    bestFor:
      'Tech vendors who want to engage senior IT buyers in a live, interactive format with direct Q&A and real-time qualification.',
    ctaLabel: 'Start a Conversation',
  },
]

export function generateStaticParams(): { slug: string }[] {
  return PROGRAMS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const program = PROGRAMS.find((p) => p.slug === slug)
  return {
    title: program ? `${program.name} | Advance B2B Media` : 'Program | Advance B2B Media',
    description: program?.tagline ?? undefined,
  }
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const program = PROGRAMS.find((p) => p.slug === slug)
  if (!program) notFound()

  return (
    <main>
      <ProgramHero
        name={program.name}
        tagline={program.tagline}
        programType={program.programType}
      />
      <ProgramDetail
        solutionOverview={program.solutionOverview}
        bestFor={program.bestFor}
      />
      <OptionalIngredients />
      <ComplianceBlock />
      <ProgramManagement />
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ProgramInquiryCta
            programType={program.programType}
            ctaLabel={program.ctaLabel ?? 'Start a Conversation'}
          />
        </div>
      </section>
    </main>
  )
}
