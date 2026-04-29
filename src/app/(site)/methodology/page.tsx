import type { Metadata } from 'next'
import { MethodologyPage } from '@/components/sections/MethodologyPage'

export const metadata: Metadata = {
  title: 'Methodology | Advance B2B Media',
  description:
    'How Ab2bm builds, engages, and qualifies its opt-in audience — and how content syndication and webinar programs deliver leads.',
}

export default function MethodologyPageRoute() {
  return (
    <main>
      <MethodologyPage
        pageHeadline="How We Deliver Results"
        pageSubheadline="Ab2bm's lead and demand programs are built on a first-party, opt-in audience developed over more than a decade — across technology, finance, HR, sales, marketing, and lines of business. Here is exactly how the audience is built, how programs run, and how leads are qualified and delivered."
      />
    </main>
  )
}
