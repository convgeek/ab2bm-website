import type { Metadata } from 'next'
import { PersonaCard } from '@/components/sections/PersonaCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { ConcentricMark } from '@/components/ui/concentric-mark'

const SEGMENTS = [
  { name: 'Technology',       value: '14.5', suffix: 'M' },
  { name: 'Finance',          value: '9.7',  suffix: 'M' },
  { name: 'HR',               value: '7.2',  suffix: 'M' },
  { name: 'Line of Business', value: '7.2',  suffix: 'M' },
  { name: 'Sales',            value: '4.8',  suffix: 'M' },
  { name: 'Marketing',        value: '4.8',  suffix: 'M' },
]

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
        subheadline="Opt-in. Verified. Actively engaged. Across the six B2B functions where buying decisions actually get made."
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
              Ab2bm reaches decision-makers and practitioners across six B2B functions — all
              opt-in, verified, and actively engaged.
            </p>
          </div>
          {/* Total DB tab box — sits centered above the frame; z-index keeps it on top */}
          <div className="flex justify-center">
            <div
              className="relative z-10"
              style={{
                background: 'var(--orange-400)',
                borderRadius: '14px',
                padding: '28px 48px 24px',
                textAlign: 'center',
              }}
            >
              <p
                className="font-mono text-[15px] uppercase tracking-[0.14em] mb-2"
                style={{ color: 'var(--purple-900)' }}
              >
                Total Database
              </p>
              <p
                className="font-display text-[64px] leading-none tracking-[-0.03em]"
                style={{ color: 'var(--purple-900)' }}
              >
                48.5<em className="not-italic" style={{ color: 'rgba(42,10,74,0.45)' }}>M</em>
              </p>
              <p
                className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em]"
                style={{ color: 'rgba(42,10,74,0.55)' }}
              >
                names in database
              </p>
            </div>
          </div>

          {/*
            Frame: -20px top margin pulls it up so its slim top strip sits flush
            with the box bottom. The box's border-radius bottom corners are filled
            by the frame's orange, creating smooth convex rounded turns where the
            slim strip meets the box walls.
          */}
          <div style={{ background: 'var(--orange-400)', padding: '20px', marginTop: '-20px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SEGMENTS.map(({ name, value, suffix }) => (
                <div
                  key={name}
                  className="relative overflow-hidden flex flex-col gap-4 p-8"
                  style={{
                    background: 'var(--purple-900)',
                    border: '1px solid var(--purple-900)',
                  }}
                >
                  <p
                    className="font-mono text-[15px] uppercase tracking-[0.14em]"
                    style={{ color: 'var(--orange-400)' }}
                  >
                    {name}
                  </p>
                  <p
                    className="font-display text-[64px] leading-none tracking-[-0.03em] text-white"
                  >
                    {value}
                    <em className="not-italic" style={{ color: 'var(--orange-400)' }}>{suffix}</em>
                  </p>
                  <p
                    className="mt-auto font-mono text-[11px] uppercase tracking-[0.1em]"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    names in database
                  </p>
                  <ConcentricMark
                    className="absolute -right-10 -bottom-10 w-40 h-40 pointer-events-none text-white"
                    style={{ opacity: 0.12 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry & Geography */}
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
                Geography
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Geographic Disbursement</h2>
              <div data-testid="geographic-disbursement">
                <p className="text-muted-foreground italic">Data coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
