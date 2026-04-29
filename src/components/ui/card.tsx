import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'
import { ConcentricMark } from '@/components/ui/concentric-mark'

type CardVariant = 'default' | 'stat' | 'accent'

interface CardProps {
  variant?: CardVariant
  eyebrow?: string
  title?: ReactNode
  body?: ReactNode
  footer?: ReactNode
  statNum?: ReactNode
  showMark?: boolean
  className?: string
  children?: ReactNode
}

export function Card({
  variant = 'default',
  eyebrow,
  title,
  body,
  footer,
  statNum,
  showMark = true,
  className,
  children,
}: CardProps) {
  const baseClass = variant === 'default'
    ? 'card-concentric'
    : `card-concentric card-concentric--${variant}`

  return (
    <div className={cn(baseClass, className)}>
      {eyebrow && <div className="card-concentric__eyebrow">{eyebrow}</div>}
      {statNum && <div className="card-concentric__stat-num">{statNum}</div>}
      {title && <h3 className="card-concentric__title">{title}</h3>}
      {body && <p className="card-concentric__body">{body}</p>}
      {children}
      {footer && <div className="card-concentric__footer">{footer}</div>}
      {showMark && (
        <ConcentricMark className="card-concentric__mark" aria-hidden="true" />
      )}
    </div>
  )
}
