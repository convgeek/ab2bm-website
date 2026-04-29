import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { ProgramsDropdown } from './ProgramsDropdown'
import { mainNavLinks } from './NavLinks'

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'var(--purple-900)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="relative flex items-center justify-between w-full"
        style={{ padding: '22px 56px' }}
      >
        {/* Wordmark — Instrument Serif, "2" italic in orange-400 */}
        <Link
          href="/"
          className="shrink-0"
          aria-label="Advance B2B Media — home"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '26px',
            letterSpacing: '-0.02em',
            color: '#fff',
            fontWeight: 400,
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            lineHeight: 1,
          }}
        >
          Advance B<em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>2</em>B Media
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: '36px' }}
          aria-label="Main navigation"
        >
          <ProgramsDropdown />
          {mainNavLinks
            .filter((l) => l.href !== '/' && l.href !== '/contact')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-dark"
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/contact" className="btn btn-accent btn-sm">
            Start a pilot
          </Link>
        </div>

        {/* Mobile nav */}
        <MobileMenu />
      </div>
    </header>
  )
}
