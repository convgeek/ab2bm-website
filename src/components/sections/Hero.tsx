import Link from 'next/link'
import { ConcentricMark } from '@/components/ui/concentric-mark'

/* Arrow SVG for CTA buttons */
function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="square"
      className="btn-arrow"
      aria-hidden="true"
    >
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  )
}

/* Stat row in the right-column stats card */
function StatRow({
  num,
  label,
  divider = true,
}: {
  num: React.ReactNode
  label: string
  divider?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: divider ? '18px' : 0,
        borderBottom: divider ? '1px dotted rgba(255,255,255,0.15)' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '64px',
          lineHeight: 1,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          color: '#fff',
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '140px',
          textAlign: 'right',
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <section
      style={{
        background: 'var(--purple-900)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative concentric mark — 720×720, opacity 0.09, vertically centred right */}
      <ConcentricMark
        style={{
          position: 'absolute',
          right: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '720px',
          height: '720px',
          opacity: 0.09,
          zIndex: 1,
          color: '#fff',
        }}
      />

      {/* ── Hero body: 2-column grid, z-index above the mark ── */}
      <div
        style={{
          padding: '96px 56px',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '64px',
          position: 'relative',
          zIndex: 2,
          alignItems: 'end',
        }}
      >
        {/* Left column */}
        <div>
          {/* Eyebrow: orange line + mono text */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--orange-400)',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <span
              style={{ width: '40px', height: '1px', background: 'var(--orange-400)', flexShrink: 0 }}
              aria-hidden="true"
            />
            B2B Demand · New York · London · Dubai
          </div>

          {/* Headline — italic orange <em> echoes the "2" in the logo */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 7vw, 104px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              color: '#fff',
              margin: '0 0 32px',
            }}
          >
            Reaching the B2B Buyers{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>
              Competitors
            </em>{' '}
            Miss
          </h1>

          {/* Lede */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px',
              lineHeight: 1.5,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '540px',
              margin: '0 0 40px',
            }}
          >
            Advance B2B Media connects B2B vendors with the buyers who actually
            evaluate and purchase — a curated, opt-in audience of decision-makers
            across technology, finance, HR, sales, marketing, and lines of business
            in North America, EMEA, and beyond.
          </p>

          {/* CTA pair */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-accent btn-lg">
              Start a pilot
              <Arrow />
            </Link>
            <Link href="/methodology" className="btn btn-secondary-dark btn-lg">
              See how we work
            </Link>
          </div>
        </div>

        {/* Right column — stats card, aligned to bottom */}
        <aside
          style={{
            padding: '32px',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            gap: '24px',
            alignSelf: 'end',
          }}
        >
          <StatRow
            num={
              <>
                4<em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>8</em>.5M+
              </>
            }
            label="Opt-in B2B professionals"
          />
          <StatRow
            num={
              <>
                <em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>8</em>K+
              </>
            }
            label="Successful campaigns"
          />
          <StatRow
            num={
              <>
                <em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>2</em>50K+
              </>
            }
            label="Leads delivered"
            divider={false}
          />
        </aside>
      </div>

      {/* ── Footer meta band ── */}
      <div
        style={{
          padding: '24px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Office locations */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {['New York', 'London', 'Dubai'].map((city) => (
            <span key={city} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  background: 'var(--orange-400)',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              {city}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          >
            <path d="M8 3 V13 M4 9 L8 13 L12 9" />
          </svg>
          Scroll
        </div>
      </div>
    </section>
  )
}
