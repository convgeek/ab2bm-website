import Link from 'next/link'

interface FooterCtaProps {
  headline: string
  body: string
  ctaLabel: string
}

const PLACEHOLDER_HEADLINE = 'Ready to Reach B2B Decision-Makers?'
const PLACEHOLDER_BODY =
  'Connect with our team to discuss your lead and demand generation goals. Whether you need top-of-funnel reach, account-based engagement, sales-ready leads, or custom content to power your campaigns, we build the right program for your audience.'
const PLACEHOLDER_CTA_LABEL = 'Start a Conversation'

export function FooterCta({ headline, body, ctaLabel }: FooterCtaProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Decorative gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 100%, oklch(0.63 0.16 50 / 0.15), transparent 60%), radial-gradient(ellipse 60% 80% at 80% 0%, oklch(0.35 0.20 303 / 0.5), transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4">
          Get Started
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          {headline || PLACEHOLDER_HEADLINE}
        </h2>
        <p className="mt-6 text-lg leading-8 text-primary-foreground/75 max-w-2xl mx-auto">
          {body || PLACEHOLDER_BODY}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary-foreground px-8 py-4 text-base font-semibold text-primary shadow-lg transition-all hover:bg-primary-foreground/90 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            {ctaLabel || PLACEHOLDER_CTA_LABEL}
          </Link>
          <Link
            href="/contact?type=media-kit"
            className="inline-flex items-center justify-center rounded-lg border border-primary-foreground/25 bg-primary-foreground/10 px-8 py-4 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50"
          >
            Download Media Kit
          </Link>
        </div>

        {/* Trust signal */}
        <p className="mt-8 text-sm text-primary-foreground/45">
          We respond within one business day.
        </p>
      </div>
    </section>
  )
}
