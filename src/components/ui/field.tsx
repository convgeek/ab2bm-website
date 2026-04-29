import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface FieldProps {
  label: string
  hint?: string
  error?: string
  htmlFor?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function Field({
  label,
  hint,
  error,
  htmlFor,
  required,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn('field', className)}>
      <label className="field__label" htmlFor={htmlFor}>
        <span>
          {label}
          {required && <span className="text-[var(--danger)] ml-1" aria-hidden="true">*</span>}
        </span>
        {hint && <span className="field__hint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
