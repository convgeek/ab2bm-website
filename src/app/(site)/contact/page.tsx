import type { Metadata } from 'next'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { MediaKitForm } from '@/components/forms/MediaKitForm'
import { PageHeader } from '@/components/layout/PageHeader'

export const metadata: Metadata = {
  title: 'Contact | Advance B2B Media',
  description:
    'Get in touch to learn about content syndication and webinar programs reaching IT decision-makers, MSPs, and MSSPs.',
}

interface ContactPageProps {
  searchParams: Promise<{ program?: string | string[] }>
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams
  const programParam = Array.isArray(params.program) ? params.program[0] : params.program

  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        headline="Start a Conversation"
        subheadline="Ready to reach IT decision-makers, MSPs, and MSSPs? Tell us about your goals and we'll follow up within one business day."
      />

      {/* Forms section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            {/* Inquiry form — wider column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-2">Send an Inquiry</h2>
                <p className="text-muted-foreground mb-8">
                  Tell us about your program interests and we&apos;ll be in touch.
                </p>
                <InquiryForm defaultProgram={programParam} />
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Media kit card */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-8">
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    Free Resource
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Download the Media Kit</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Get audience stats, program details, and pricing examples sent to your inbox.
                </p>
                <MediaKitForm />
              </div>

              {/* Trust signals */}
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  What to Expect
                </p>
                <ul className="space-y-3">
                  {[
                    'Response within one business day',
                    'No obligation, no hard sell',
                    'Custom program recommendations for your goals',
                    'Audience data and sample deliverables available on request',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-accent/20 flex items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
