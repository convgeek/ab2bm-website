import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

type ChipVariant = 'default' | 'accent' | 'stone' | 'solid'

interface ChipProps {
  children: ReactNode
  variant?: ChipVariant
  dot?: boolean
  className?: string
}

const variantClasses: Record<ChipVariant, string> = {
  default: 'chip',
  accent:  'chip chip--accent',
  stone:   'chip chip--stone',
  solid:   'chip chip--solid',
}

export function Chip({ children, variant = 'default', dot, className }: ChipProps) {
  return (
    <span className={cn(variantClasses[variant], className)}>
      {dot && <span className="chip-dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
