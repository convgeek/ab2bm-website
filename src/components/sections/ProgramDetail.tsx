/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from '@portabletext/react'

interface ProgramDetailProps {
  solutionOverview: string | null
  howItWorks: any[] | null
  whatYouGet: any[] | null
  bestFor: string | null
}

export function ProgramDetail({
  solutionOverview,
  howItWorks,
  whatYouGet,
  bestFor,
}: ProgramDetailProps) {
  const hasContent = solutionOverview || howItWorks || whatYouGet || bestFor

  if (!hasContent) return null

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

        {howItWorks && howItWorks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              How It Works
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <PortableText value={howItWorks} />
            </div>
          </div>
        )}

        {whatYouGet && whatYouGet.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
              What You Get
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <PortableText value={whatYouGet} />
            </div>
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
