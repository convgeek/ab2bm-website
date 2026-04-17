import type { Metadata } from 'next'
import { InquiryForm } from '@/components/forms/InquiryForm'
import { MediaKitForm } from '@/components/forms/MediaKitForm'

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
      {/* Page header */}
      <div className="bg-background py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Start a Conversation
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Ready to reach IT decision-makers, MSPs, and MSSPs? Tell us about your goals and
            we&apos;ll follow up within one business day.
          </p>
        </div>
      </div>

      {/* Forms section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
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

            {/* Media kit form — narrower card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-muted/40 p-8">
                <div className="mb-4">
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    Free Resource
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Download the Media Kit</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Get audience stats, program details, and pricing examples sent to your inbox.
                </p>
                <MediaKitForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
