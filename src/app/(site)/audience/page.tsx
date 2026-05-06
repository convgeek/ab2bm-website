import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageHeader } from '@/components/layout/PageHeader'
import { AudienceWaffle } from '@/components/sections/AudienceWaffle'
import { IndustryCloud } from '@/components/sections/IndustryCloud'

export const metadata: Metadata = {
  title: 'Our Audience | Advance B2B Media',
  description:
    'Reach IT practitioners, IT decision-makers, MSPs, and MSSPs — the distinct audience segments Ab2bm delivers for technology vendors.',
}

export default function AudiencePage() {
  return (
    <main>
      <PageHeader
        headline="Over 48 Million B2B Contacts. All Within Reach."
        subheadline="Our audience of decision-makers and practitioners across six B2B functions are all opted-in, verified, and actively engaged."
      />

      {/* Audience Segments */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 lg:mb-16 mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">
              Connecting you To <em>Every</em> Decision-Maker
            </h2>
            <p className="text-muted-foreground">
              Our audience includes roles and titles representing every aspect of your
              prospective customer&apos;s buying committee.
            </p>
          </div>
          <AudienceWaffle />
        </div>
      </section>

      {/* Verticals — Industry Breakdown (word cloud with centered title) */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <IndustryCloud />
        </div>
      </section>

      {/* Geography — Geographic Disbursement */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 lg:mb-16 mx-auto max-w-xl text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Extend Your Reach to the Ends of the Earth
            </h2>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Reach the right prospect, no matter where they are on the globe.
            </p>
          </div>
          <div data-testid="geographic-disbursement">
            <Image
              src="/images/ab2bm-world-map-v2.svg"
              alt="World map showing the geographic distribution of the Ab2bm audience database"
              width={1200}
              height={624}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/contact" className="btn btn-accent btn-lg">
            Get the Media Kit
          </Link>
        </div>
      </section>
    </main>
  )
}
