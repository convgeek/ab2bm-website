interface ProgramHeroProps {
  name: string
  tagline: string
  programType: string
}

// Map programType to a brand accent color class
const PROGRAM_ACCENT: Record<string, string> = {
  'advance-engage':  'border-brand-purple',
  'advance-abm':     'border-brand-orange',
  'advance-install': 'border-brand-purple',
  'advance-bant':    'border-brand-orange',
  'advance-expand':  'border-brand-purple',
  webinar:           'border-brand-silver',
}

function getAccentClass(programType: string): string {
  return PROGRAM_ACCENT[programType] ?? 'border-primary'
}

export function ProgramHero({ name, tagline, programType }: ProgramHeroProps) {
  const accentClass = getAccentClass(programType)

  return (
    <section
      data-testid="program-hero"
      className="relative bg-background py-20 md:py-28 border-b border-border"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`inline-block border-l-4 ${accentClass} pl-6`}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {name}
          </h1>
          {tagline && (
            <p className="mt-4 text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {tagline}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
