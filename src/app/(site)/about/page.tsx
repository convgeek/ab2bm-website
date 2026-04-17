/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { TEAM_MEMBERS_QUERY } from '@/sanity/lib/queries'
import { CompanyStory } from '@/components/sections/CompanyStory'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { CgPartnership } from '@/components/sections/CgPartnership'

export const metadata: Metadata = {
  title: 'About | Advance B2B Media',
  description:
    'Learn about Advance B2B Media — who we are, our team, and our content partnership with Conversational Geek.',
}

interface TeamMember {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: {
    url: string
    alt?: string
  }
}

function extractTeamMembers(raw: any): TeamMember[] {
  if (!Array.isArray(raw) || raw.length === 0) return []
  return raw.map((m: any) => ({
    _id: m?._id ?? '',
    name: m?.name ?? '',
    role: m?.role ?? '',
    bio: m?.bio ?? undefined,
    photo: m?.photo?.asset?.url
      ? { url: m.photo.asset.url, alt: m?.photo?.alt ?? undefined }
      : undefined,
  }))
}

export default async function AboutPage() {
  let teamMembers: TeamMember[] = []

  try {
    const result = await sanityFetch({ query: TEAM_MEMBERS_QUERY })
    teamMembers = extractTeamMembers(result.data)
  } catch {
    // Sanity not configured yet — TeamGrid renders placeholder members
  }

  return (
    <main>
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About Advance B2B Media
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We connect technology vendors with the IT professionals who make real purchasing
            decisions — MSPs, MSSPs, and IT practitioners others miss.
          </p>
        </div>
      </div>

      <CompanyStory />
      <TeamGrid members={teamMembers} />
      <CgPartnership />
    </main>
  )
}
