// TODO(CG+Ab2bm): Replace with final CG partnership copy and CG logo before launch

export function CgPartnership() {
  return (
    <section
      data-testid="cg-partnership"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Visual / logo placeholder — left column on desktop */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Content Partnership
            </span>
            <div className="w-48 h-24 bg-muted rounded-xl flex items-center justify-center border border-border">
              <span className="text-muted-foreground text-sm font-medium">CG Logo</span>
            </div>
          </div>

          {/* Text — right column on desktop */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Content Strategy by Conversational Geek
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Our editorial content is developed in partnership with{' '}
              <a
                href="https://conversationalgeek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
              >
                Conversational Geek
              </a>{' '}
              — a B2B technology content studio. CG authors the resources, guides, and insights
              that keep our IT pro audience engaged. This means when your message reaches our
              audience, they&apos;re active readers with real intent — not passive names on a list.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
