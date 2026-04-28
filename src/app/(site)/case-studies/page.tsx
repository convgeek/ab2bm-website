import { PageHeader } from '@/components/layout/PageHeader'

export default function CaseStudiesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Proof Points"
        headline="Case Studies"
        subheadline="Real results for technology vendors reaching MSP and MSSP audiences."
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-secondary/30 p-16 text-center">
            <p className="text-lg font-semibold text-foreground">Case studies coming soon.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Client success stories are in preparation and will be published shortly.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
