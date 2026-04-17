import Link from 'next/link'
import { stegaClean } from '@sanity/client/stega'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProgramInquiryCtaProps {
  programType: string
  ctaLabel?: string
}

export function ProgramInquiryCta({ programType, ctaLabel }: ProgramInquiryCtaProps) {
  // stegaClean() — prevents Sanity Visual Editing stega encoding from corrupting the ?program=
  // query param value, which must match the programType enum exactly for the contact form
  const cleanProgramType = stegaClean(programType)

  return (
    <div className="mt-8">
      <Link
        href={`/contact?program=${cleanProgramType}`}
        className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
      >
        {ctaLabel ?? 'Start a Conversation'}
      </Link>
    </div>
  )
}
