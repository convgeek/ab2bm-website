import Image from 'next/image'

interface Logo {
  url: string
  alt: string
}

interface LogoStripProps {
  logos: Logo[]
}

export function LogoStrip({ logos }: LogoStripProps) {
  // If no logos, render nothing — expected until client provides logos in Phase 2
  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by leading technology vendors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div key={index} className="relative h-10 w-32 grayscale hover:grayscale-0 transition-all">
              <Image
                src={logo.url}
                alt={logo.alt}
                fill
                sizes="128px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
