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
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Programs
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-52 rounded-lg border border-border bg-background shadow-lg py-1">
          <Link
            href="/programs"
            className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted"
          >
            All Programs
          </Link>
          <div className="border-t border-border my-1" />
          {programLinks.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
            >
              {p.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
