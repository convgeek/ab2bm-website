import Image from 'next/image'
import { ProgramIcon } from '@/components/icons/ProgramIcons'

interface ProgramHeroProps {
  name: string
  tagline: string
  programType: string
}

const PROGRAM_TYPE_LABEL: Record<string, string> = {
  'advance-engage':  'Lead and Demand Generation',
  'advance-abm':     'Account-Based Marketing',
  'advance-install': 'Install Base Targeting',
  'advance-bant':    'Sales-Ready Leads',
  'advance-expand':  'Customer Expansion',
  'advance-content': 'Virtual Events',
}

const PROGRAM_HERO_IMAGE: Record<string, { src: string; alt: string }> = {
  'advance-engage':  { src: '/images/engage-hero.svg',       alt: 'Advance Engage illustration' },
  'advance-abm':     { src: '/images/abm-hero.svg',          alt: 'Advance ABM illustration' },
  'advance-install': { src: '/images/install-base-hero.svg', alt: 'Advance Install illustration' },
  'advance-bant':    { src: '/images/bant-hero.svg',         alt: 'Advance BANT illustration' },
  'advance-expand':  { src: '/images/expand-hero.svg',       alt: 'Advance Expand illustration' },
  'advance-content': { src: '/images/ab2bm-programs-hero.svg', alt: 'Advance Content illustration' },
}

export function ProgramHero({ name, tagline, programType }: ProgramHeroProps) {
  const typeLabel = PROGRAM_TYPE_LABEL[programType] ?? 'Demand Program'
  const heroImage = PROGRAM_HERO_IMAGE[programType]

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
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center gap-12">
        <div className="flex-1">
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
        {heroImage && (
          <div className="hidden lg:block flex-shrink-0 w-[420px]">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={700}
              height={500}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
