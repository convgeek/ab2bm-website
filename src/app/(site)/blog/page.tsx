import { PageHeader } from '@/components/layout/PageHeader'

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Resources"
        headline="Latest Insights"
        subheadline="Strategies, benchmarks, and perspectives for B2B technology marketers reaching IT buyers."
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-secondary/30 p-16 text-center">
            <p className="text-lg font-semibold text-foreground">Content coming soon.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Check back shortly — new articles are on the way.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
