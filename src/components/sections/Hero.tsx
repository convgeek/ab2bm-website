import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'

interface HeroProps {
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
}

const PLACEHOLDER_HEADLINE =
  'Reaching the IT Buyers Competitors Miss: Decision-Makers, MSPs, and MSSPs'
const PLACEHOLDER_SUBHEADLINE =
  'Advance B2B Media connects technology vendors with the IT buyers who actually evaluate and purchase — a curated audience of IT decision-makers, MSPs, and MSSPs across North America.'
const PLACEHOLDER_CTA_LABEL = 'Start a Conversation'
const PLACEHOLDER_CTA_HREF = '/contact'

export function Hero({ headline, subheadline, ctaLabel, ctaHref }: HeroProps) {
  // stegaClean() — prevents Visual Editing encoding from corrupting string comparisons
  const cleanHref = stegaClean(ctaHref) || PLACEHOLDER_CTA_HREF

  return (
    <section className="relative bg-background py-20 md:py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {headline || PLACEHOLDER_HEADLINE}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
          {subheadline || PLACEHOLDER_SUBHEADLINE}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href={cleanHref}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {ctaLabel || PLACEHOLDER_CTA_LABEL}
          </Link>
        </div>
      </div>
    </section>
  )
}
