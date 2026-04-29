import { type ReactNode } from 'react'

interface AccentProps {
  children: ReactNode
}

/**
 * Italic orange emphasis — echoes the "2" in the B2B logo.
 * Use for single characters or short words inside display headlines and stat numbers.
 * On dark (purple) surfaces, renders in --orange-400.
 * On light surfaces at display size (≥24px), use AccentLight for --orange-500.
 */
export function Accent({ children }: AccentProps) {
  return (
    <em style={{ fontStyle: 'italic', color: 'var(--orange-400)' }}>
      {children}
    </em>
  )
}

/** Light-surface variant — --orange-500 (display-size only, ≥24px). */
export function AccentLight({ children }: AccentProps) {
  return (
    <em style={{ fontStyle: 'italic', color: 'var(--orange-500)' }}>
      {children}
    </em>
  )
}
