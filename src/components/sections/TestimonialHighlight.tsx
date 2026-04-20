interface TestimonialProps {
  quote: string
  attribution: string
  role: string
  company: string
}

interface TestimonialHighlightProps {
  testimonial: TestimonialProps | null
}

function GuaranteeFallback() {
  return (
    <section className="bg-secondary/40 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-background px-8 py-12 shadow-sm sm:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">
            Our Guarantee
          </p>
          <p className="text-xl font-medium leading-8 text-foreground sm:text-2xl">
            Every program is delivered on time, on budget, and to the quality standard agreed —
            or we make it right.
          </p>
          <div className="mt-8 h-px w-12 bg-accent mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">
            Advance B2B Media — 100% Quality Commitment since 2013
          </p>
        </div>
      </div>
    </section>
  )
}

export function TestimonialHighlight({ testimonial }: TestimonialHighlightProps) {
  if (!testimonial) {
    return <GuaranteeFallback />
  }

  return (
    <section className="bg-secondary/40 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl border border-border bg-background px-8 py-12 shadow-sm sm:px-12">
          {/* Large decorative quote mark */}
          <div
            aria-hidden="true"
            className="absolute -top-5 left-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-2xl font-black leading-none shadow"
          >
            &ldquo;
          </div>

          <blockquote className="text-center">
            <p className="text-xl font-medium leading-8 text-foreground sm:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-8 flex flex-col items-center gap-1">
              <div className="h-px w-12 bg-accent mb-4" />
              <p className="text-base font-semibold text-foreground">
                {testimonial.attribution}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}, {testimonial.company}
              </p>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
