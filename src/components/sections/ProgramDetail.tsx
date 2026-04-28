interface ProgramDetailProps {
  solutionOverview: string | null
  bestFor: string | null
}

export function ProgramDetail({ solutionOverview, bestFor }: ProgramDetailProps) {
  if (!solutionOverview && !bestFor) return null

  return (
    <section data-testid="program-detail" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {solutionOverview && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              Solution Overview
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{solutionOverview}</p>
          </div>
        )}

        {bestFor && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">Best For</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{bestFor}</p>
          </div>
        )}
      </div>
    </section>
  )
}
