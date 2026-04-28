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
        subheadline="We connect technology vendors with the IT professionals who make real purchasing decisions — MSPs, MSSPs, and IT practitioners others miss."
      />
      <CompanyStory />
      <TeamGrid members={[]} />
      <CgPartnership />
    </main>
  )
}
