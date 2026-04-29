import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'

/** Concentric circles + bisecting lines — the brand's supporting device. */
export function ConcentricMark({
  className,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={cn(className)}
      aria-hidden="true"
      {...props}
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="72" />
      <circle cx="100" cy="100" r="48" />
      <circle cx="100" cy="100" r="24" />
      <line x1="100" y1="4"   x2="100" y2="196" />
      <line x1="4"   y1="100" x2="196" y2="100" />
      <line x1="28"  y1="28"  x2="172" y2="172" />
      <line x1="172" y1="28"  x2="28"  y2="172" />
    </svg>
  )
}
