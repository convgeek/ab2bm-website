// TODO(Ab2bm): Replace with final company story copy before launch

export function CompanyStory() {
  return (
    <section className="bg-background py-20 md:py-28 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Our Story
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for the B2B Buyer Others Miss
            </h2>
            <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                Advance B2B Media was founded to reach the buyers that mainstream B2B media
                overlooks — practitioners and decision-makers across the technology, finance,
                HR, sales, marketing, and operational functions where real purchasing decisions
                get made.
              </p>
              <p>
                Our audience-first model means your content lands in front of the right people,
                not just a large number of people. Every program is built on a decade of
                opt-in relationship building with B2B professionals across these six functions.
              </p>
            </div>
          </div>

          {/* Quote column */}
          <div className="relative">
            <div className="rounded-2xl border border-border bg-secondary/40 p-8 shadow-sm">
              {/* Orange accent */}
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-xl font-black leading-none">
                &ldquo;
              </div>
              <blockquote>
                <p className="text-lg font-medium text-foreground italic leading-relaxed">
                  Our mission is to connect B2B vendors with engaged, qualified professionals —
                  across every function where buying decisions are made — through media that
                  respects the audience&apos;s time and intelligence.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
