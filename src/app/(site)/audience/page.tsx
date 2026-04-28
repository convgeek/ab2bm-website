import type { Metadata } from 'next'
import { PersonaCard } from '@/components/sections/PersonaCard'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Our Audience | Advance B2B Media',
  description:
    'Reach IT practitioners, IT decision-makers, MSPs, and MSSPs — the distinct audience segments Ab2bm delivers for technology vendors.',
}

export default function AudiencePage() {
  return (
    <main>
      <PageHeader
        eyebrow="Audience"
        headline="Our Audience"
        subheadline="The IT professionals and channel partners Ab2bm reaches — opt-in, verified, and actively engaged."
      />

      {/* Audience Segments */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Segments
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">
              Audience Segments
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Ab2bm reaches four distinct segments: IT Practitioners, IT Decision-Makers and
              Executives, Managed Service Providers (MSPs), and Managed Security Service Providers
              (MSSPs). Each represents a separate buying role.
            </p>
          </div>
          <p className="text-muted-foreground italic">Audience segment profiles coming soon.</p>
        </div>
      </section>

      {/* Audience Stats */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              By the Numbers
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Audience by the Numbers
            </h2>
          </div>
          <div data-testid="audience-stats">
            <p className="text-muted-foreground italic mb-8">Verified audience data coming soon.</p>
          </div>
          <div
            data-testid="methodology-note"
            className="rounded-xl border border-border bg-background p-5 text-sm text-muted-foreground"
          >
            <span className="font-semibold text-foreground">Methodology: </span>
            Audience data sourced from first-party subscription records and verified engagement metrics. Full methodology note coming soon.
          </div>
        </div>
      </section>

      {/* Industry & Company Size */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Verticals
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Industry Breakdown</h2>
              <div data-testid="industry-breakdown">
                <p className="text-muted-foreground italic">Data coming soon.</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Company Size
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Company Size Distribution</h2>
              <div data-testid="company-size-distribution">
                <p className="text-muted-foreground italic">Data coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
