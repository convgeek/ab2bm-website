import type { Metadata } from 'next'
import { PageHeader } from '@/components/layout/PageHeader'
import { CompanyStory } from '@/components/sections/CompanyStory'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { CgPartnership } from '@/components/sections/CgPartnership'

export const metadata: Metadata = {
  title: 'About | Advance B2B Media',
  description:
    'Learn about Advance B2B Media — who we are, our team, and our content partnership with Conversational Geek.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About Us"
        headline="About Advance B2B Media"
        subheadline="We connect B2B vendors with the professionals who make real purchasing decisions — across technology, finance, HR, sales, marketing, and the lines of business that other media miss."
      />
      <CompanyStory />
      <TeamGrid members={[]} />
      <CgPartnership />
    </main>
  )
}
