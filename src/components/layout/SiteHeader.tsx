import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { ProgramsDropdown } from './ProgramsDropdown'
import { mainNavLinks } from './NavLinks'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-foreground hover:text-foreground/80"
          aria-label="Advance B2B Media — home"
        >
          {/* Real logo provided by client — text fallback until then */}
          <span>Advance B2B Media</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <ProgramsDropdown />
          {mainNavLinks
            .filter(l => l.href !== '/' && l.href !== '/contact')
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </Link>
        </nav>

        {/* Mobile navigation */}
        <MobileMenu />
      </div>
    </header>
  )
}
