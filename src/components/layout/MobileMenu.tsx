'use client'
import { useState } from 'react'
import Link from 'next/link'
import { mainNavLinks, programLinks } from './NavLinks'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center p-2 rounded-[4px]"
        style={{
          color: 'rgba(255,255,255,0.78)',
          transition: 'color 160ms var(--ease)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.78)')}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50"
          style={{
            background: 'var(--purple-800)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            <div className="px-3 py-2">
              <Link
                href="/programs"
                onClick={() => setOpen(false)}
                className="block mb-2"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none',
                }}
              >
                Programs
              </Link>
              <div className="ml-3 flex flex-col gap-1">
                {programLinks.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="py-1.5 px-2 rounded-[2px] text-sm"
                    style={{
                      color: 'rgba(255,255,255,0.78)',
                      textDecoration: 'none',
                      transition: 'color 160ms var(--ease)',
                    }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {mainNavLinks
              .filter(l => l.href !== '/' && l.href !== '/contact')
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[2px] px-3 py-2 text-base font-medium"
                  style={{
                    color: 'rgba(255,255,255,0.78)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 mx-3 btn btn-accent btn-sm text-center justify-center"
            >
              Start a pilot
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
