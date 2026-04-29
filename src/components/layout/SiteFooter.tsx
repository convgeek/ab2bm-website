import Link from 'next/link'
import { programLinks } from './NavLinks'
import { ConcentricMark } from '@/components/ui/concentric-mark'

const companyLinks = [
  { href: '/about',       label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/audience',    label: 'Our Audience' },
  { href: '/blog',        label: 'Resources' },
]

const currentYear = new Date().getFullYear()

const monoLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.14em',
  color: 'rgba(255,255,255,0.4)',
  marginBottom: '16px',
  fontWeight: 500,
}

const footerLink = {
  fontSize: '14px',
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  transition: 'color 160ms var(--ease)',
  display: 'block',
}

export function SiteFooter() {
  return (
    <footer
      style={{
        background: 'var(--purple-900)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative mark — bottom-right */}
      <ConcentricMark
        style={{
          position: 'absolute',
          right: '-80px',
          bottom: '-80px',
          width: '480px',
          height: '480px',
          opacity: 0.05,
          color: '#fff',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Main grid */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '80px 56px 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: '48px',
          }}
        >
          {/* Brand col */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                letterSpacing: '-0.02em',
                color: '#fff',
                fontWeight: 400,
                marginBottom: '20px',
                lineHeight: 1,
              }}
            >
              Advance B<em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>2</em>B Media
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '260px',
                margin: '0 0 28px',
              }}
            >
              Demand generation programs connecting technology vendors with IT
              decision-makers, MSPs, and MSSPs across North America and EMEA.
            </p>
            <Link href="/contact" className="btn btn-accent btn-sm">
              Start a pilot
            </Link>
          </div>

          {/* Programs */}
          <div>
            <p style={monoLabel}>Programs</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/programs" style={footerLink}>
                  All Programs
                </Link>
              </li>
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p style={monoLabel}>Company</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p style={monoLabel}>Resources</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link href="/contact?type=media-kit" style={footerLink}>
                  Download Media Kit
                </Link>
              </li>
              <li>
                <Link href="/contact" style={footerLink}>
                  Request a Proposal
                </Link>
              </li>
            </ul>

            <div
              style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.08em',
                }}
              >
                Content strategy by{' '}
                <a
                  href="https://conversationalgeek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}
                >
                  Conversational Geek
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '20px 56px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              margin: 0,
            }}
          >
            &copy; {currentYear} Advance B2B Media. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['New York', 'London', 'Dubai'].map((city) => (
              <span
                key={city}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    background: 'var(--orange-400)',
                    borderRadius: '50%',
                    opacity: 0.6,
                  }}
                  aria-hidden="true"
                />
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
