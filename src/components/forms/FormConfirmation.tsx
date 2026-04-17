import Link from 'next/link'

interface FormConfirmationProps {
  type: 'inquiry' | 'media-kit'
}

export function FormConfirmation({ type }: FormConfirmationProps) {
  if (type === 'inquiry') {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="rounded-xl border border-green-200 bg-green-50 p-6 text-center"
      >
        <div className="text-2xl mb-2">✓</div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">Message received</h3>
        <p className="text-green-800">
          Thanks — we&apos;ll be in touch within 1 business day. In the meantime, you can review our{' '}
          <Link
            href="/programs"
            className="underline underline-offset-4 hover:text-green-700 transition-colors"
          >
            Programs
          </Link>{' '}
          or{' '}
          <Link
            href="/contact"
            className="underline underline-offset-4 hover:text-green-700 transition-colors"
          >
            download the media kit
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className="rounded-xl border border-green-200 bg-green-50 p-6 text-center"
    >
      <div className="text-2xl mb-2">✓</div>
      <h3 className="text-lg font-semibold text-green-900 mb-2">Media kit on the way</h3>
      <p className="text-green-800">
        Check your email for the media kit. We&apos;ll follow up if there&apos;s a fit for one of
        our programs.
      </p>
    </div>
  )
}
