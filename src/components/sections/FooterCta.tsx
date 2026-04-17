import Link from 'next/link'

interface FooterCtaProps {
  headline: string
  body: string
  ctaLabel: string
}

const PLACEHOLDER_HEADLINE = 'Ready to Reach IT Decision-Makers?'
const PLACEHOLDER_BODY =
  'Connect with our team to discuss your demand generation goals. Whether you need content syndication reach or a targeted webinar program, we build the right engagement strategy for your audience.'
const PLACEHOLDER_CTA_LABEL = 'Start a Conversation'

export function FooterCta({ headline, body, ctaLabel }: FooterCtaProps) {
  return (
    <section className="bg-foreground py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-background sm:text-4xl">
          {headline || PLACEHOLDER_HEADLINE}
        </h2>
        <p className="mt-6 text-lg leading-8 text-background/70 max-w-2xl mx-auto">
          {body || PLACEHOLDER_BODY}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Primary CTA — inquiry path */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-background px-8 py-3 text-base font-semibold text-foreground shadow-sm transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {ctaLabel || PLACEHOLDER_CTA_LABEL}
          </Link>
          {/* Secondary CTA — media kit download path */}
          <Link
            href="/contact?type=media-kit"
            className="inline-flex items-center justify-center rounded-lg border border-background/30 px-8 py-3 text-base font-semibold text-background transition-colors hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Download Media Kit
          </Link>
        </div>
      </div>
    </section>
  )
}
