import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'

interface HeroProps {
  headline: string
  subheadline: string
  ctaLabel: string
  ctaHref: string
}

const PLACEHOLDER_HEADLINE =
  'Reaching the IT Buyers Competitors Miss'
const PLACEHOLDER_SUBHEADLINE =
  'Advance B2B Media connects technology vendors with the IT buyers who actually evaluate and purchase — a curated, opt-in audience of IT decision-makers, MSPs, and MSSPs across North America.'
const PLACEHOLDER_CTA_LABEL = 'Start a Conversation'
const PLACEHOLDER_CTA_HREF = '/contact'

export function Hero({ headline, subheadline, ctaLabel, ctaHref }: HeroProps) {
  const cleanHref = stegaClean(ctaHref) || PLACEHOLDER_CTA_HREF

  return (
    <section className="relative overflow-hidden bg-primary py-24 md:py-32 lg:py-40">
      {/* Decorative background: radial glow top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 0%, oklch(0.35 0.20 303 / 0.5), transparent)',
        }}
      />
      {/* Orange glow blob bottom-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">
            B2B Demand Generation for Technology Vendors
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
          {headline || PLACEHOLDER_HEADLINE}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg leading-8 text-primary-foreground/80 max-w-3xl mx-auto sm:text-xl">
          {subheadline || PLACEHOLDER_SUBHEADLINE}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={cleanHref}
            className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all hover:bg-primary-foreground/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            {ctaLabel || PLACEHOLDER_CTA_LABEL}
          </Link>
          <Link
            href="/contact?type=media-kit"
            className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            Download Media Kit
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-16 border-t border-primary-foreground/15 pt-10">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div>
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">50,000+</p>
              <p className="mt-1.5 text-sm text-primary-foreground/65">Opt-In IT Professionals</p>
            </div>
            <div className="border-x border-primary-foreground/15 px-4">
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">12,000+</p>
              <p className="mt-1.5 text-sm text-primary-foreground/65">MSPs &amp; MSSPs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-foreground sm:text-4xl">18,000+</p>
              <p className="mt-1.5 text-sm text-primary-foreground/65">IT Decision-Makers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
