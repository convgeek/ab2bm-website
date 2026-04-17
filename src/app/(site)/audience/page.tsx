/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { AUDIENCE_PAGE_QUERY } from '@/sanity/lib/queries'
import { PersonaCard } from '@/components/sections/PersonaCard'

export const metadata: Metadata = {
  title: 'Our Audience | Advance B2B Media',
  description:
    'Reach IT practitioners, IT decision-makers, MSPs, and MSSPs — the distinct audience segments Ab2bm delivers for technology vendors.',
}

interface AudienceStat {
  label: string
  value: string
  footnote?: string
}

interface IndustryBreakdown {
  vertical: string
  percentage: string
}

interface CompanySizeItem {
  tier: string
  percentage: string
}

interface Persona {
  segmentName: string
  description: string
  jobTitles: string[]
  companyProfile: string
}

function extractStats(raw: any): AudienceStat[] {
  if (!Array.isArray(raw)) return []
  return raw.map((s: any) => ({
    label: s?.label ?? '',
    value: s?.value ?? '',
    footnote: s?.footnote ?? undefined,
  }))
}

function extractIndustryBreakdown(raw: any): IndustryBreakdown[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    vertical: item?.vertical ?? '',
    percentage: item?.percentage ?? '',
  }))
}

function extractCompanySize(raw: any): CompanySizeItem[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    tier: item?.tier ?? '',
    percentage: item?.percentage ?? '',
  }))
}

function extractPersonas(raw: any): Persona[] {
  if (!Array.isArray(raw)) return []
  return raw.map((p: any) => ({
    segmentName: p?.segmentName ?? '',
    description: p?.description ?? '',
    jobTitles: Array.isArray(p?.jobTitles) ? p.jobTitles : [],
    companyProfile: p?.companyProfile ?? '',
  }))
}

export default async function AudiencePage() {
  let page: any = null

  try {
    const result = await sanityFetch({ query: AUDIENCE_PAGE_QUERY })
    page = result.data
  } catch {
    // Sanity not configured yet — all sections render graceful fallback states
  }

  const personas = extractPersonas(page?.personas)
  const stats = extractStats(page?.totalAudienceStats)
  const industryBreakdown = extractIndustryBreakdown(page?.industryBreakdown)
  const companySizeDistribution = extractCompanySize(page?.companySizeDistribution)
  const methodologyNote = page?.methodologyNote ?? null

  return (
    <main>
      {/* Section 1 — Hero / Intro */}
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {page?.pageHeadline ?? 'Our Audience'}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {page?.pageSubheadline ??
              'The IT professionals and channel partners Ab2bm reaches'}
          </p>
        </div>
      </div>

      {/* Section 2 — Persona Cards (AUDN-01, AUDN-02) */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Audience Segments</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            Ab2bm reaches four distinct segments: IT Practitioners, IT Decision-Makers and
            Executives, Managed Service Providers (MSPs), and Managed Security Service Providers
            (MSSPs). Each represents a separate buying role.
          </p>
          {personas.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {personas.map((persona, index) => (
                <PersonaCard
                  key={index}
                  segmentName={persona.segmentName}
                  description={persona.description}
                  jobTitles={persona.jobTitles}
                  companyProfile={persona.companyProfile}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">Audience segment profiles coming soon.</p>
          )}
        </div>
      </section>

      {/* Section 3 — Audience Stats + Methodology Note (AUDN-03) */}
      <section className="py-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Audience by the Numbers</h2>
          <div data-testid="audience-stats">
            {stats.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-6 flex flex-col gap-1"
                  >
                    <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                    <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                    {stat.footnote && (
                      <span className="text-xs text-muted-foreground mt-1">{stat.footnote}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic mb-8">Verified audience data coming soon.</p>
            )}
          </div>
          {methodologyNote && (
            <div
              data-testid="methodology-note"
              className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <span className="font-medium text-foreground">Methodology: </span>
              {methodologyNote}
            </div>
          )}
          {!methodologyNote && (
            <div
              data-testid="methodology-note"
              className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground"
            >
              <span className="font-medium text-foreground">Methodology: </span>
              Audience data sourced from first-party subscription records and verified engagement
              metrics. Full methodology note coming soon.
            </div>
          )}
        </div>
      </section>

      {/* Section 4 — Industry Breakdown + Company Size Distribution (AUDN-04) */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Industry / Vertical Breakdown */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Industry Breakdown</h2>
              <div data-testid="industry-breakdown">
                {industryBreakdown.length > 0 ? (
                  <ul className="space-y-3">
                    {industryBreakdown.map((item, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.vertical}</span>
                        <span className="text-sm font-medium text-foreground">{item.percentage}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">Data coming soon.</p>
                )}
              </div>
            </div>

            {/* Company Size Distribution */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Company Size Distribution</h2>
              <div data-testid="company-size-distribution">
                {companySizeDistribution.length > 0 ? (
                  <ul className="space-y-3">
                    {companySizeDistribution.map((item, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.tier}</span>
                        <span className="text-sm font-medium text-foreground">{item.percentage}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">Data coming soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
