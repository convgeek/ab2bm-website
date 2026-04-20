/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { AUDIENCE_PAGE_QUERY } from '@/sanity/lib/queries'
import { PersonaCard } from '@/components/sections/PersonaCard'
import { PageHeader } from '@/components/layout/PageHeader'

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
      <PageHeader
        eyebrow="Audience"
        headline={page?.pageHeadline ?? 'Our Audience'}
        subheadline={
          page?.pageSubheadline ??
          'The IT professionals and channel partners Ab2bm reaches — opt-in, verified, and actively engaged.'
        }
      />

      {/* Audience Segments */}
      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Segments
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-3">
              Audience Segments
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Ab2bm reaches four distinct segments: IT Practitioners, IT Decision-Makers and
              Executives, Managed Service Providers (MSPs), and Managed Security Service Providers
              (MSSPs). Each represents a separate buying role.
            </p>
          </div>
          {personas.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Audience Stats */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              By the Numbers
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Audience by the Numbers
            </h2>
          </div>
          <div data-testid="audience-stats">
            {stats.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border bg-background p-6 flex flex-col gap-1 shadow-sm"
                  >
                    <span className="text-4xl font-bold text-foreground tabular-nums">
                      {stat.value}
                    </span>
                    <span className="text-sm font-semibold text-primary mt-1">{stat.label}</span>
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
          <div
            data-testid="methodology-note"
            className="rounded-xl border border-border bg-background p-5 text-sm text-muted-foreground"
          >
            <span className="font-semibold text-foreground">Methodology: </span>
            {methodologyNote ??
              'Audience data sourced from first-party subscription records and verified engagement metrics. Full methodology note coming soon.'}
          </div>
        </div>
      </section>

      {/* Industry & Company Size */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Industry Breakdown */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Verticals
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Industry Breakdown</h2>
              <div data-testid="industry-breakdown">
                {industryBreakdown.length > 0 ? (
                  <ul className="space-y-3">
                    {industryBreakdown.map((item, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <span className="text-sm text-foreground">{item.vertical}</span>
                        <span className="text-sm font-semibold text-accent">{item.percentage}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">Data coming soon.</p>
                )}
              </div>
            </div>

            {/* Company Size */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                Company Size
              </p>
              <h2 className="text-2xl font-bold text-foreground mb-6">Company Size Distribution</h2>
              <div data-testid="company-size-distribution">
                {companySizeDistribution.length > 0 ? (
                  <ul className="space-y-3">
                    {companySizeDistribution.map((item, index) => (
                      <li key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <span className="text-sm text-foreground">{item.tier}</span>
                        <span className="text-sm font-semibold text-accent">{item.percentage}</span>
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
