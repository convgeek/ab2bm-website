import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProgramInquiryCtaProps {
  programType: string
  ctaLabel?: string
}

export function ProgramInquiryCta({ programType, ctaLabel }: ProgramInquiryCtaProps) {
  return (
    <div className="mt-8">
      <Link
        href={`/contact?program=${programType}`}
        className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
      >
        {ctaLabel ?? 'Start a Conversation'}
      </Link>
    </div>
  )
}
