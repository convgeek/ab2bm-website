import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn('input', className)}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn('input resize-y min-h-[120px]', className)}
      {...props}
    />
  )
}
