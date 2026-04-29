import { ProgramIcon } from '@/components/icons/ProgramIcons'

interface ProgramHeroProps {
  name: string
  tagline: string
  programType: string
}

// Program type → badge label
const PROGRAM_TYPE_LABEL: Record<string, string> = {
  'advance-engage':  'Lead Generation',
  'advance-abm':     'Account-Based Marketing',
  'advance-install': 'Install Base Targeting',
  'advance-bant':    'Sales-Ready Leads',
  'advance-expand':  'Customer Expansion',
  'advance-content': 'Virtual Events',
}

export function ProgramHero({ name, tagline, programType }: ProgramHeroProps) {
  const typeLabel = PROGRAM_TYPE_LABEL[programType] ?? 'Demand Program'

  return (
    <section
      data-testid="program-hero"
      className="relative overflow-hidden bg-primary py-20 md:py-28"
    >
      {/* Decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 80% 0%, oklch(0.35 0.20 303 / 0.5), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Program type badge */}
        <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent mb-6">
          {typeLabel}
        </span>
        <div className="flex items-center gap-4">
          <ProgramIcon type={programType} className="h-10 w-10 shrink-0 text-accent sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            {name}
          </h1>
        </div>
        {tagline && (
          <p className="mt-5 text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
            {tagline}
          </p>
        )}
      </div>
    </section>
  )
}
