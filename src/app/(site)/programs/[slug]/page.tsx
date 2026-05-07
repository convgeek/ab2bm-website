import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookOpen, Microscope, Presentation, Compass, ExternalLink, Users } from 'lucide-react'
import { ProgramHero } from '@/components/sections/ProgramHero'
import { ProgramDetail } from '@/components/sections/ProgramDetail'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { WhatYouGet } from '@/components/sections/WhatYouGet'
import { ProgramFoundation } from '@/components/sections/ProgramFoundation'
import { ProgramInquiryCta } from '@/components/sections/ProgramInquiryCta'

const CONTENT_FORMATS = [
  {
    Icon: BookOpen,
    title: 'eBooks & Whitepapers',
    description: 'Long-form assets that establish authority and generate engaged leads at the top and middle of funnel.',
  },
  {
    Icon: Microscope,
    title: 'Original Research & Survey-Based Reports',
    description: 'Proprietary data and benchmarking reports that give your buyers a reason to engage and share.',
  },
  {
    Icon: Presentation,
    title: 'Branded Webinars & Podcasts',
    description: 'Audio and video programs that build audience relationships and drive pipeline through consistent engagement.',
  },
  {
    Icon: Compass,
    title: 'Maturity Models & Buyer\'s Guides',
    description: 'Frameworks and decision tools that position your brand as the trusted guide in your category.',
  },
  {
    Icon: Users,
    title: 'Live Events',
    description: 'In-person gatherings — roundtables, executive dinners, and hosted forums — where Advance B2B drives attendance from target prospects, service provider partners, and key community voices so your brand owns the room.',
  },
]

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
    tagline: 'Fill your funnel with opt-in leads who engage with your content.',
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
    tagline: 'Engage with buying committees inside your target accounts',
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
    tagline: 'Reach buyers at the exact accounts running the technology you displace or complement.',
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
    tagline: 'Hand your sales team leads who have confirmed budget, authority, need, and timing — ready to act now.',
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
    tagline: 'Grow revenue inside your existing accounts by engaging decision-makers you haven\'t reached yet.',
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
    tagline: 'Empower every campaign with custom content and co-branded virtual events.',
    solutionOverview:
      'ADVANCE CONTENT gives B2B vendors the impactful content their campaigns need — from short-form thought leadership and eBooks to original research, buyer\'s guides, branded podcasts, and co-branded virtual events. Every asset is built to engage your buyers and amplify the lead and demand programs that put it in front of them.',
    bestFor:
      'Marketing teams that need technical-depth, buyer-ready content to power their lead and demand programs — without standing up an in-house production engine.',
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
      <HowItWorks programType={program.programType} />
      <WhatYouGet programType={program.programType} />
      {program.slug === 'advance-content' && (
        <section className="py-16 md:py-24 border-b border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              Powered by Conversational Geek
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              ADVANCE CONTENT is delivered in partnership with{' '}
              <a
                href="https://conversationalgeek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary underline underline-offset-4 hover:text-primary/80 font-medium transition-colors"
              >
                Conversational Geek
                <ExternalLink size={14} className="shrink-0" />
              </a>
              , a Content Marketing Agency and B2B content studio whose technical writers, editors, and producers have been
              creating content for technology B2B audiences for over a decade. Together, we brief, produce,
              and distribute content that your buyers actually read — and that your campaigns
              actually need.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CONTENT_FORMATS.map(({ Icon, title, description }, i) => (
                <div key={title} className={`rounded-lg border border-border bg-card p-6 flex gap-4${i === CONTENT_FORMATS.length - 1 ? ' sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}`}>
                  <div className="shrink-0 mt-0.5">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {program.slug !== 'advance-content' && <ProgramFoundation />}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ProgramInquiryCta
            programType={program.programType}
            ctaLabel="GET STARTED"
          />
        </div>
      </section>
    </main>
  )
}
