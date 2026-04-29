import { cn } from '@/lib/utils'
import { type ComponentProps, type ReactNode } from 'react'

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label: ReactNode
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <div className="flex gap-[10px] items-center mb-3">
      <input
        type="checkbox"
        id={id}
        className={cn('check', className)}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-[var(--ink)] cursor-pointer whitespace-nowrap select-none"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export function Radio({ label, className, id, ...props }: CheckboxProps) {
  return (
    <div className="flex gap-[10px] items-center mb-3">
      <input
        type="radio"
        id={id}
        className={cn('check radio', className)}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-[var(--ink)] cursor-pointer whitespace-nowrap select-none"
        >
          {label}
        </label>
      )}
    </div>
  )
}
