'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { submitInquiry } from '@/lib/actions/submit-inquiry'
import { FormConfirmation } from '@/components/forms/FormConfirmation'

const InquiryFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(1, 'Company is required'),
  programType: z.enum(['advance-engage', 'advance-abm', 'advance-install', 'advance-bant', 'advance-expand', 'webinar', 'general']),
  message: z.string().optional(),
  hutk: z.string().optional(),
})

type InquiryFormValues = z.infer<typeof InquiryFormSchema>

interface InquiryFormProps {
  defaultProgram?: string
}

function isValidProgramType(value: string): value is 'advance-engage' | 'advance-abm' | 'advance-install' | 'advance-bant' | 'advance-expand' | 'webinar' | 'general' {
  return ['advance-engage', 'advance-abm', 'advance-install', 'advance-bant', 'advance-expand', 'webinar', 'general'].includes(value)
}

export function InquiryForm({ defaultProgram }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const resolvedDefault =
    defaultProgram && isValidProgramType(defaultProgram) ? defaultProgram : 'general'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(InquiryFormSchema),
    defaultValues: {
      programType: resolvedDefault,
    },
  })

  // Read HubSpot tracking cookie (hutk) from document.cookie on mount
  useEffect(() => {
    const hutk = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hubspotutk='))
      ?.split('=')[1]
    if (hutk) setValue('hutk', hutk)
  }, [setValue])

  async function onSubmit(values: InquiryFormValues) {
    setServerError(null)
    const result = await submitInquiry(values)
    if ('error' in result && typeof result.error === 'string') {
      setServerError(result.error)
    } else if ('success' in result && result.success) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return <FormConfirmation type="inquiry" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="inquiry-firstName"
            className="block text-sm font-medium text-foreground mb-1"
          >
            First Name <span className="text-destructive">*</span>
          </label>
          <input
            id="inquiry-firstName"
            type="text"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'inquiry-firstName-error' : undefined}
            className={cn(
              'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
              errors.firstName ? 'border-destructive' : 'border-input'
            )}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p id="inquiry-firstName-error" className="mt-1 text-xs text-destructive">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry-lastName"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Last Name <span className="text-destructive">*</span>
          </label>
          <input
            id="inquiry-lastName"
            type="text"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'inquiry-lastName-error' : undefined}
            className={cn(
              'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
              errors.lastName ? 'border-destructive' : 'border-input'
            )}
            {...register('lastName')}
          />
          {errors.lastName && (
            <p id="inquiry-lastName-error" className="mt-1 text-xs text-destructive">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="inquiry-email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="inquiry-email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
          className={cn(
            'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
            errors.email ? 'border-destructive' : 'border-input'
          )}
          {...register('email')}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="mt-1 text-xs text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="inquiry-company"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Company <span className="text-destructive">*</span>
        </label>
        <input
          id="inquiry-company"
          type="text"
          autoComplete="organization"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'inquiry-company-error' : undefined}
          className={cn(
            'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
            errors.company ? 'border-destructive' : 'border-input'
          )}
          {...register('company')}
        />
        {errors.company && (
          <p id="inquiry-company-error" className="mt-1 text-xs text-destructive">
            {errors.company.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="inquiry-programType"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Program Interest
        </label>
        <select
          id="inquiry-programType"
          aria-invalid={!!errors.programType}
          aria-describedby={errors.programType ? 'inquiry-programType-error' : undefined}
          className={cn(
            'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors',
            errors.programType ? 'border-destructive' : 'border-input'
          )}
          {...register('programType')}
        >
          <option value="general">Select a program…</option>
          <option value="advance-engage">ADVANCE ENGAGE</option>
          <option value="advance-abm">ADVANCE ABM</option>
          <option value="advance-install">ADVANCE INSTALL</option>
          <option value="advance-bant">ADVANCE BANT</option>
          <option value="advance-expand">ADVANCE EXPAND</option>
          <option value="webinar">Webinar</option>
        </select>
        {errors.programType && (
          <p id="inquiry-programType-error" className="mt-1 text-xs text-destructive">
            {errors.programType.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="inquiry-message"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Message <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
          placeholder="Tell us about your target audience, campaign goals, or timeline..."
          {...register('message')}
        />
      </div>

      {/* Hidden hutk field */}
      <input type="hidden" {...register('hutk')} />

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
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  )
}
