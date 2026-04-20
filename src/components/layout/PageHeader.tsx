interface PageHeaderProps {
  eyebrow?: string
  headline: string
  subheadline?: string
}

export function PageHeader({ eyebrow, headline, subheadline }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 0% 100%, oklch(0.35 0.20 303 / 0.4), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/50 mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
          {headline}
        </h1>
        {subheadline && (
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/75 max-w-2xl">
            {subheadline}
          </p>
        )}
      </div>
    </div>
  )
}
