'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { submitMediaKit } from '@/lib/actions/submit-mediakit'
import { FormConfirmation } from '@/components/forms/FormConfirmation'

const MediaKitFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Valid email required'),
})

type MediaKitFormValues = z.infer<typeof MediaKitFormSchema>

export function MediaKitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MediaKitFormValues>({
    resolver: zodResolver(MediaKitFormSchema),
  })

  async function onSubmit(values: MediaKitFormValues) {
    setServerError(null)
    const result = await submitMediaKit(values)
    if ('error' in result && typeof result.error === 'string') {
      setServerError(result.error)
    } else if ('success' in result && result.success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return <FormConfirmation type="media-kit" />
  }

  return (
    <div data-testid="mediakit-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="mediakit-firstName"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="mediakit-firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'mediakit-firstName-error' : undefined}
            className={cn(
              'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
              errors.firstName ? 'border-destructive' : 'border-input'
            )}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p id="mediakit-firstName-error" className="mt-1 text-xs text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="mediakit-email"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="mediakit-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'mediakit-email-error' : undefined}
            className={cn(
              'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
              errors.email ? 'border-destructive' : 'border-input'
            )}
            {...register('email')}
          />
          {errors.email && (
            <p id="mediakit-email-error" className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        {serverError && (
          <p role="alert" className="text-sm text-destructive">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Sending...' : 'Download Media Kit'}
        </button>
      </form>
    </div>
  )
}
