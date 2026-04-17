interface TestimonialProps {
  quote: string
  attribution: string
  role: string
  company: string
}

interface TestimonialHighlightProps {
  testimonial: TestimonialProps | null
}

export function TestimonialHighlight({ testimonial }: TestimonialHighlightProps) {
  if (!testimonial) {
    // Graceful fallback — never crash or show empty section
    return (
      <section className="bg-muted/50 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <blockquote>
            <p className="text-lg italic text-muted-foreground">
              Client testimonials coming soon.
            </p>
          </blockquote>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <blockquote className="relative">
          <svg
            className="mx-auto mb-6 h-8 w-8 text-primary/40"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-xl font-medium leading-8 text-foreground sm:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="mt-8">
            <p className="text-base font-semibold text-foreground">
              {testimonial.attribution}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
