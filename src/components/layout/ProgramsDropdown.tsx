'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { programLinks } from './NavLinks'

export function ProgramsDropdown() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      data-testid="programs-dropdown"
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        className="nav-link-dark flex items-center gap-1"
      >
        Programs
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 z-50 mt-2 w-56 py-1"
          style={{
            background: 'var(--purple-800)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <Link
            href="/programs"
            className="block px-4 py-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              transition: 'color 160ms var(--ease)',
            }}
          >
            All Programs
          </Link>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
          {programLinks.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="block px-4 py-2 text-sm"
              style={{
                color: 'rgba(255,255,255,0.78)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 160ms var(--ease), background-color 160ms var(--ease)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.78)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {p.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
