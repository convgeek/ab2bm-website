import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/programs', label: 'Programs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company */}
          <div className="md:col-span-1">
            <p className="text-base font-bold text-foreground">Advance B2B Media</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Demand generation programs for technology vendors targeting IT decision-makers, MSPs, and MSSPs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Navigation</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Get in touch
                </Link>
              </li>
              <li>
                <Link href="/contact?type=media-kit" className="hover:text-foreground">
                  Download media kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Partnership</p>
            <p className="text-sm text-muted-foreground">
              Content strategy by{' '}
              <a
                href="https://conversationalgeek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                Conversational Geek
              </a>
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {currentYear} Advance B2B Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
