'use client'
import { useState } from 'react'
import Link from 'next/link'
import { mainNavLinks, programLinks } from './NavLinks'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile nav drawer */}
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-border bg-background shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {/* Programs expanded list — no hover dropdown on mobile (RESEARCH.md Pitfall 6) */}
            <div className="px-3 py-2">
              <Link href="/programs" onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground">
                Programs
              </Link>
              <div className="mt-1 ml-3 flex flex-col gap-1">
                {programLinks.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Remaining nav items (exclude Home and Contact — handled separately) */}
            {mainNavLinks
              .filter(l => l.href !== '/' && l.href !== '/contact')
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}

            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
