// TODO(CG+Ab2bm): Replace with final CG partnership copy and CG logo before launch

export function CgPartnership() {
  return (
    <section
      data-testid="cg-partnership"
      className="bg-secondary/30 py-20 md:py-28 border-b border-border"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left visual column */}
            <div className="relative overflow-hidden bg-primary/5 flex flex-col items-center justify-center gap-6 p-10 md:p-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.24 0.18 303 / 0.06), transparent)',
                }}
              />
              <span className="relative inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Content Partnership
              </span>
              <div className="relative w-48 h-24 rounded-xl bg-secondary flex items-center justify-center border border-border shadow-sm">
                <span className="text-muted-foreground text-sm font-medium">CG Logo</span>
              </div>
            </div>

            {/* Right text column */}
            <div className="flex flex-col justify-center gap-4 p-10 md:p-14">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Editorial Partnership
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Content Strategy by Conversational Geek
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Our editorial content is developed in partnership with{' '}
                <a
                  href="https://conversationalgeek.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4 hover:text-primary/80 font-medium transition-colors"
                >
                  Conversational Geek
                </a>{' '}
                — a B2B technology content studio. CG authors the resources, guides, and insights
                that keep our IT pro audience engaged and reading. When your message reaches our
                audience, they&apos;re active readers with real intent — not passive names on a list.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
