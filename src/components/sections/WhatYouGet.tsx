import type { LucideIcon } from 'lucide-react'
import {
  UserCheck,
  Monitor,
  Headset,
  SlidersHorizontal,
  Users,
  BarChart2,
  UserCog,
  FileText,
  Database,
  Wrench,
  PlusCircle,
  ShieldCheck,
  ClipboardList,
  MessageSquare,
  Megaphone,
  UserPlus,
  Briefcase,
  Layers,
} from 'lucide-react'

interface Card {
  Icon: LucideIcon
  title: string
  description: string
}

const CARDS: Record<string, Card[]> = {
  'advance-engage': [
    {
      Icon: UserCheck,
      title: 'Opt-In Engaged Contacts',
      description:
        'Receive top-of-funnel, opt-in contacts who have actively engaged with your content and meet your specific buyer criteria.',
    },
    {
      Icon: Monitor,
      title: 'Branded Landing Page',
      description:
        'Get a dedicated landing page built and aligned to your brand standards — ready to capture and convert your target audience.',
    },
    {
      Icon: Headset,
      title: 'Turnkey Program Management',
      description:
        'Benefit from consultative, full-service campaign management including reporting dashboards and ROI optimization guidance.',
    },
    {
      Icon: SlidersHorizontal,
      title: 'Custom Targeting Add-Ons',
      description:
        'Enhance your campaign with custom profiling questions, 2-touch engagement sequences, email nurture, SIC/NAICS codes, and intent data overlays.',
    },
  ],
  'advance-abm': [
    {
      Icon: Users,
      title: 'Buying Committee Leads',
      description:
        'Receive 1- or 2-touch verified buying committee leads generated from your specific target account list.',
    },
    {
      Icon: BarChart2,
      title: 'Account & Buyer Intelligence',
      description:
        'Gain account-level and buyer-level intelligence captured during campaign outreach and engagement activities.',
    },
    {
      Icon: UserCog,
      title: 'Dedicated Program Manager',
      description:
        'Work with a dedicated program manager who owns your campaign from kickoff through final delivery.',
    },
    {
      Icon: FileText,
      title: 'Engagement Reporting',
      description:
        'Access detailed campaign reporting including account-level and individual buyer engagement data and trends.',
    },
  ],
  'advance-install': [
    {
      Icon: Database,
      title: 'Install-Verified Leads',
      description:
        'Receive opt-in leads at companies with your specified technology in use — matched to your target buyer profile criteria.',
    },
    {
      Icon: Monitor,
      title: 'Install-Base Landing Page',
      description:
        'Get a dedicated landing page with built-in installed-base qualification questions to validate technology fit during engagement.',
    },
    {
      Icon: Wrench,
      title: 'Full-Service Delivery',
      description:
        'Access complete program management including campaign execution, performance reporting, and lead delivery to your system of choice.',
    },
    {
      Icon: PlusCircle,
      title: 'Flexible Enhancements',
      description:
        'Add custom profiling questions, 2-touch outreach sequences, account-level questions, and email nurture for deeper engagement.',
    },
  ],
  'advance-bant': [
    {
      Icon: ShieldCheck,
      title: 'BANT-Qualified Leads',
      description:
        'Receive verified leads that match your ideal ICP criteria, profiled for budget, role in the purchase process, and purchase timing.',
    },
    {
      Icon: ClipboardList,
      title: 'Custom Qualification Data',
      description:
        'Every lead has answered your specific BANT questions — Budget, Authority, Need, and Timeframe — with validated responses.',
    },
    {
      Icon: MessageSquare,
      title: 'Open-Field Intel',
      description:
        'Capture free-text intelligence delivered with each lead — designed for detailed BDR and sales follow-up conversations.',
    },
    {
      Icon: Megaphone,
      title: 'Coaching & Scripting',
      description:
        'Receive communications scripting and outreach coaching provided for optimal BDR/sales follow-up and conversion.',
    },
  ],
  'advance-expand': [
    {
      Icon: UserPlus,
      title: 'Customer Expansion Leads',
      description:
        'Receive opt-in, verified leads who work within your current customer organizations and fit your specific target profile criteria.',
    },
    {
      Icon: Monitor,
      title: 'Targeted Landing Page',
      description:
        'Get a dedicated landing page with customer-specific outreach aligned to your brand standards and expansion messaging.',
    },
    {
      Icon: Briefcase,
      title: 'Full-Service Program Management',
      description:
        'Access complete campaign management including reporting, lead delivery to your systems, and ongoing optimization guidance.',
    },
    {
      Icon: Layers,
      title: 'Engagement Enhancements',
      description:
        'Add 2-touch engagement, custom profiling questions, installed-base targeting, and additional qualification layers as needed.',
    },
  ],
}

export function WhatYouGet({ programType }: { programType: string }) {
  const cards = CARDS[programType]
  if (!cards) return null

  return (
    <section data-testid="what-you-get" className="py-16 md:py-24 border-b border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">What You Get</h2>
        <p className="text-muted-foreground mb-10">
          Everything you need to run a high-performing, compliant program.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg border border-border bg-card p-6 flex gap-4"
            >
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
  )
}
