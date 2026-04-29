import { PageHeader } from '@/components/layout/PageHeader'

interface MethodologyPageProps {
  pageHeadline: string
  pageSubheadline: string | null
}

interface MethodologySectionProps {
  number: string
  title: string
  children: React.ReactNode
  alt?: boolean
  testId: string
}

function MethodologySection({ number, title, children, alt, testId }: MethodologySectionProps) {
  return (
    <section
      data-testid={testId}
      className={`py-20 border-b border-border ${alt ? 'bg-secondary/30' : 'bg-background'}`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-5 mb-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {number}
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl pt-1">{title}</h2>
        </div>
        <div className="ml-[3.75rem]">{children}</div>
      </div>
    </section>
  )
}

export function MethodologyPage({ pageHeadline, pageSubheadline }: MethodologyPageProps) {
  return (
    <div>
      <PageHeader
        eyebrow="Methodology"
        headline={pageHeadline}
        subheadline={pageSubheadline ?? undefined}
      />

      <MethodologySection
        number="01"
        title="Audience Building"
        testId="methodology-audience-building"
      >
          <div className="space-y-4 text-muted-foreground">
            <p>
              Ab2bm&apos;s audience is built — not bought. The foundation is a decade of opt-in
              relationship building with B2B professionals across the IT ecosystem.
            </p>
            <p>The audience-building methodology centers on six interconnected activities:</p>
            <ul className="space-y-2 ml-4">
              {[
                ['Account Coverage', 'ensuring the right companies are represented across target markets'],
                ['Key Contacts, Roles & Titles', 'mapping decision-makers and buying committee members'],
                ['Opt-In Outreach', 'putting the B2B professional in control of the engagement'],
                ['Info Validation & Verification', 'confirming professional information is current and accurate'],
                ['Data/Record Enhancement', 'adding data and intelligence as professionals engage'],
                ['Audience Segmentation', 'enabling precise targeting for every program'],
              ].map(([term, def]) => (
                <li key={term} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    <strong className="text-foreground">{term}</strong> — {def}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              Every audience member has explicitly opted in and granted permission for marketing
              outreach. Opt-in records are captured and retained for verification and audit purposes.
            </p>
          </div>
      </MethodologySection>

      <MethodologySection
        number="02"
        title="ADVANCE ENGAGE / Content Syndication Process"
        testId="methodology-content-syndication"
        alt
      >
          <div className="space-y-4 text-muted-foreground">
            <p>
              ADVANCE ENGAGE works by putting high-value, educational content to work engaging B2B
              professionals who meet your target profile. Here is how a campaign runs from start to
              lead delivery:
            </p>
            <ol className="space-y-2 ml-4">
              {[
                ['Campaign Brief', 'The Ab2bm team works with you to define the target buyer profile, ICP criteria, and content assets to promote.'],
                ['Audience Targeting', 'Target accounts and buyer roles are matched against the opt-in audience using your criteria: geography, job function, company size, industry, and installed tech.'],
                ['Multi-Channel Outreach', 'Ab2bm uses multiple communications channels to engage buyers on their terms — delivering your content to the right professionals at the right time.'],
                ['Lead Capture & Qualification', 'Professionals who engage with the content opt in, confirm their business information, and answer any required profiling questions.'],
                ['Quality Review', 'Every lead is reviewed by the Ab2bm quality team before delivery. Leads that do not meet criteria are replaced.'],
                ['Lead Delivery', 'Verified leads are delivered to your system of choice with full contact data, engagement details, and any profiling answers collected.'],
              ].map(([step, desc], i) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-foreground">{step}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
      </MethodologySection>

      <MethodologySection
        number="03"
        title="ADVANCE CONTENT Program Process"
        testId="methodology-advance-content"
      >
          <div className="space-y-4 text-muted-foreground">
            <p>
              ADVANCE CONTENT connects your subject matter experts directly with senior
              IT buyers via co-branded virtual events. Here is how an ADVANCE CONTENT program runs:
            </p>
            <ol className="space-y-2 ml-4">
              {[
                ['Program Setup', 'Ab2bm works with you to define the event topic, format, speaker lineup, and target audience.'],
                ['Co-Branded Promotion', 'Ab2bm promotes the event to its opt-in audience using email, multi-channel outreach, and targeted engagement — driving qualified registrations.'],
                ['Registration & Confirmation', 'Registrants confirm their attendance, validate their contact information, and are reminded in the lead-up to the event.'],
                ['Event Delivery', 'The event runs on a platform selected in the program brief. Ab2bm supports with promotion, audience management, and registration logistics.'],
                ['Lead Delivery', 'Post-event, Ab2bm delivers the full registrant and attendee list with contact data, registration details, and engagement indicators.'],
              ].map(([step, desc], i) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-foreground">{step}</strong> — {desc}
                  </span>
                </li>
              ))}
            </ol>
          </div>
      </MethodologySection>
    </div>
  )
}
