/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import type { PortableTextBlock } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { METHODOLOGY_PAGE_QUERY } from '@/sanity/lib/queries'
import { MethodologyPage } from '@/components/sections/MethodologyPage'

export const metadata: Metadata = {
  title: 'Methodology | Advance B2B Media',
  description:
    'How Ab2bm builds, engages, and qualifies its opt-in audience — and how content syndication and webinar programs deliver leads.',
}

interface MethodologyData {
  pageHeadline: string
  pageSubheadline: string | null
  audienceBuilding: PortableTextBlock[] | null
  contentSyndicationProcess: PortableTextBlock[] | null
  webinarProcess: PortableTextBlock[] | null
}

const FALLBACK_METHODOLOGY: MethodologyData = {
  pageHeadline: 'How We Deliver Results',
  pageSubheadline:
    "Ab2bm's demand programs are built on a first-party, opt-in audience built over more than a decade. Here is exactly how the audience is built, how programs run, and how leads are qualified and delivered.",
  audienceBuilding: null,
  contentSyndicationProcess: null,
  webinarProcess: null,
}

export default async function MethodologyPageRoute() {
  let methodologyData = FALLBACK_METHODOLOGY

  try {
    const result = await sanityFetch({ query: METHODOLOGY_PAGE_QUERY })
    if (result.data) {
      methodologyData = {
        pageHeadline: result.data.pageHeadline ?? FALLBACK_METHODOLOGY.pageHeadline,
        pageSubheadline: result.data.pageSubheadline ?? FALLBACK_METHODOLOGY.pageSubheadline,
        audienceBuilding: (result.data.audienceBuilding as PortableTextBlock[] | null) ?? null,
        contentSyndicationProcess:
          (result.data.contentSyndicationProcess as PortableTextBlock[] | null) ?? null,
        webinarProcess: (result.data.webinarProcess as PortableTextBlock[] | null) ?? null,
      }
    }
  } catch {
    // Sanity not configured — fallback renders placeholder content
  }

  return (
    <main>
      <MethodologyPage
        pageHeadline={methodologyData.pageHeadline}
        pageSubheadline={methodologyData.pageSubheadline}
        audienceBuilding={methodologyData.audienceBuilding}
        contentSyndicationProcess={methodologyData.contentSyndicationProcess}
        webinarProcess={methodologyData.webinarProcess}
      />
    </main>
  )
}
