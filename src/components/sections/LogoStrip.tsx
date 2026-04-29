import fs from 'fs'
import path from 'path'
import Image from 'next/image'

const LOGO_EXTENSIONS = /\.(png|jpg|jpeg|svg|webp)$/i

function getLogoFilenames(): string[] {
  const dir = path.join(process.cwd(), 'public', 'logos')
  try {
    return fs.readdirSync(dir).filter((f) => LOGO_EXTENSIONS.test(f)).sort()
  } catch {
    return []
  }
}

function altFromFilename(filename: string): string {
  return filename.replace(LOGO_EXTENSIONS, '').replace(/[-_]/g, ' ')
}

export function LogoStrip() {
  const filenames = getLogoFilenames()
  if (filenames.length === 0) return null

  // Duplicate for seamless infinite loop
  const loopItems = [...filenames, ...filenames]

  return (
    <section
      className="w-full bg-white py-8 border-y border-border overflow-hidden"
      aria-label="Partner logos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="font-body text-sm font-medium uppercase tracking-wider text-center text-stone-500">
          Trusted by leading B2B technology brands
        </p>
      </div>
      <div className="group relative overflow-hidden">
        <div className="flex items-center gap-16 w-max animate-logo-marquee group-hover:[animation-play-state:paused]">
          {loopItems.map((filename, idx) => (
            <div
              key={`${filename}-${idx}`}
              className="shrink-0 h-12 w-auto flex items-center justify-center"
            >
              <Image
                src={`/logos/${filename}`}
                alt={altFromFilename(filename)}
                width={200}
                height={48}
                unoptimized
                className="h-12 w-auto max-w-[200px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
