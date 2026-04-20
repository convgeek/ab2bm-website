import Link from 'next/link'
import { programLinks } from './NavLinks'

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/audience', label: 'Our Audience' },
  { href: '/blog', label: 'Resources' },
]

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="bg-foreground">
      {/* Main grid */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-base font-bold text-primary-foreground">Advance B2B Media</p>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/55 max-w-xs">
              Demand generation programs connecting technology vendors with IT decision-makers,
              MSPs, and MSSPs across North America.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/85"
              >
                Start a Conversation
              </Link>
            </div>
          </div>

          {/* Programs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-4">
              Programs
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/programs"
                  className="text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  All Programs
                </Link>
              </li>
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-4">
              Company
            </p>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/55 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-4">
              Resources
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact?type=media-kit"
                  className="text-sm text-primary-foreground/55 hover:text-primary-foreground transition-colors"
                >
                  Download Media Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-primary-foreground/55 hover:text-primary-foreground transition-colors"
                >
                  Request a Proposal
                </Link>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-primary-foreground/10">
              <p className="text-xs text-primary-foreground/40">
                Content strategy by{' '}
                <a
                  href="https://conversationalgeek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/60 underline underline-offset-2 hover:text-primary-foreground transition-colors"
                >
                  Conversational Geek
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-primary-foreground/35">
            &copy; {currentYear} Advance B2B Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
