import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'

interface MethodologyPageProps {
  pageHeadline: string
  pageSubheadline: string | null
  audienceBuilding: PortableTextBlock[] | null
  contentSyndicationProcess: PortableTextBlock[] | null
  webinarProcess: PortableTextBlock[] | null
}

export function MethodologyPage({
  pageHeadline,
  pageSubheadline,
  audienceBuilding,
  contentSyndicationProcess,
  webinarProcess,
}: MethodologyPageProps) {
  return (
    <div>
      {/* Page header */}
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {pageHeadline}
          </h1>
          {pageSubheadline && (
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {pageSubheadline}
            </p>
          )}
        </div>
      </div>

      {/* Section 1: Audience Building */}
      <section
        data-testid="methodology-audience-building"
        className="py-16 border-b border-border"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Audience Building</h2>
          {audienceBuilding ? (
            <div className="prose prose-neutral max-w-none">
              <PortableText value={audienceBuilding} />
            </div>
          ) : (
            // Fallback content — always renders so data-testid locator works in tests
            <div className="space-y-4 text-muted-foreground">
              <p>Ab2bm&apos;s audience is built — not bought. The foundation is a decade of opt-in relationship building with B2B professionals across the IT ecosystem.</p>
              <p>The audience-building methodology centers on six interconnected activities:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Coverage</strong> — ensuring the right companies are represented across target markets</li>
                <li><strong>Key Contacts, Roles &amp; Titles</strong> — mapping decision-makers and buying committee members</li>
                <li><strong>Opt-In Outreach</strong> — putting the B2B professional in control of the engagement</li>
                <li><strong>Info Validation &amp; Verification</strong> — confirming professional information is current and accurate</li>
                <li><strong>Data/Record Enhancement</strong> — adding data and intelligence as professionals engage</li>
                <li><strong>Audience Segmentation</strong> — enabling precise targeting for every program</li>
              </ul>
              <p>Every audience member has explicitly opted in and granted permission for marketing outreach. Opt-in records are captured and retained for verification and audit purposes.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Content Syndication Process (ADVANCE ENGAGE) */}
      <section
        data-testid="methodology-content-syndication"
        className="py-16 border-b border-border bg-muted/30"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">ADVANCE ENGAGE / Content Syndication Process</h2>
          {contentSyndicationProcess ? (
            <div className="prose prose-neutral max-w-none">
              <PortableText value={contentSyndicationProcess} />
            </div>
          ) : (
            // Fallback content
            <div className="space-y-4 text-muted-foreground">
              <p>ADVANCE ENGAGE works by putting high-value, educational content to work engaging B2B professionals who meet your target profile. Here is how a campaign runs from start to lead delivery:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>Campaign Brief</strong> — The Ab2bm team works with you to define the target buyer profile, ICP criteria, and content assets to promote.</li>
                <li><strong>Audience Targeting</strong> — Target accounts and buyer roles are matched against the opt-in audience using your criteria: geography, job function, company size, industry, and installed tech.</li>
                <li><strong>Multi-Channel Outreach</strong> — Ab2bm uses multiple communications channels to engage buyers on their terms — delivering your content to the right professionals at the right time.</li>
                <li><strong>Lead Capture &amp; Qualification</strong> — Professionals who engage with the content opt in, confirm their business information, and answer any required profiling questions.</li>
                <li><strong>Quality Review</strong> — Every lead is reviewed by the Ab2bm quality team before delivery. Leads that do not meet criteria are replaced.</li>
                <li><strong>Lead Delivery</strong> — Verified leads are delivered to your system of choice with full contact data, engagement details, and any profiling answers collected.</li>
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Webinar Program Process */}
      <section
        data-testid="methodology-webinar"
        className="py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Webinar Program Process</h2>
          {webinarProcess ? (
            <div className="prose prose-neutral max-w-none">
              <PortableText value={webinarProcess} />
            </div>
          ) : (
            // Fallback content
            <div className="space-y-4 text-muted-foreground">
              <p>Ab2bm&apos;s webinar program connects your subject matter experts directly with senior IT buyers via co-branded virtual events. Here is how a webinar program runs:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>Program Setup</strong> — Ab2bm works with you to define the webinar topic, format, speaker lineup, and target audience.</li>
                <li><strong>Co-Branded Promotion</strong> — Ab2bm promotes the event to its opt-in audience using email, multi-channel outreach, and targeted engagement — driving qualified registrations.</li>
                <li><strong>Registration &amp; Confirmation</strong> — Registrants confirm their attendance, validate their contact information, and are reminded in the lead-up to the event.</li>
                <li><strong>Event Delivery</strong> — The webinar runs on a platform selected in the program brief. Ab2bm supports with promotion, audience management, and registration logistics.</li>
                <li><strong>Lead Delivery</strong> — Post-event, Ab2bm delivers the full registrant and attendee list with contact data, registration details, and engagement indicators (attended, did not attend).</li>
              </ol>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
