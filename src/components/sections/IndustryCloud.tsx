import type { CSSProperties } from 'react'

const VERTICALS = [
  'Healthcare / Medical',
  'Manufacturing',
  'Retail and Consumer Goods',
  'Finance',
  'Computers and Technology',
  'Service Industry',
  'Government',
  'Corporate Services',
  'Education',
  'Telecommunications',
  'Insurance',
  'Travel / Hospitality / Entertainment',
  'Media',
  'Utility / Energy',
  'Construction',
  'Biotech and Pharmaceuticals',
  'Transportation and Logistics',
  'Advertising / Marketing',
  'Real Estate',
  'Aerospace / Aviation',
  'Automotive',
  'Non-Profit / Organizations',
  'Legal',
  'Agriculture',
] as const

const ROW_COUNT = 8

function rotate<T>(arr: readonly T[], offset: number): T[] {
  const n = ((offset % arr.length) + arr.length) % arr.length
  return [...arr.slice(n), ...arr.slice(0, n)]
}

export function IndustryCloud() {
  // 24 verticals, gcd(7, 24) = 1, so offsets cycle through unique starts
  const rows = Array.from({ length: ROW_COUNT }, (_, i) => {
    const offset = (i * 7) % VERTICALS.length
    const items = rotate(VERTICALS, offset)
    const duration = 70 + ((i * 13) % 55) // 70–124s spread, deterministic
    const reverse = i % 2 === 1
    const delay = -(i * 5.5) // negative delay desyncs the starting position
    return { items, duration, reverse, delay, key: i }
  })

  return (
    <div
      data-testid="industry-breakdown"
      className="relative isolate w-full overflow-hidden h-[400px] md:h-[440px] lg:h-[480px]"
    >
      {/* Marquee rows */}
      <div aria-hidden="true" className="absolute inset-0 flex flex-col py-4">
        {rows.map((row) => {
          const doubled = [...row.items, ...row.items]
          const animStyle: CSSProperties = {
            animationDuration: `${row.duration}s`,
            animationDirection: row.reverse ? 'reverse' : 'normal',
            animationDelay: `${row.delay}s`,
          }
          return (
            <div
              key={row.key}
              className="flex flex-1 items-center overflow-hidden"
            >
              <div
                className="flex w-max items-center motion-safe:animate-logo-marquee"
                style={animStyle}
              >
                {doubled.map((name, idx) => (
                  <span
                    key={idx}
                    className="flex shrink-0 items-center"
                  >
                    <span
                      className="whitespace-nowrap px-5 text-[14px] font-normal tracking-[-0.005em] text-stone-500 md:text-[15px]"
                      style={{ opacity: 0.6 }}
                    >
                      {name}
                    </span>
                    <span
                      className="text-stone-300"
                      style={{ opacity: 0.55 }}
                    >
                      ·
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Radial fog — fades the moving rows near the center so the title is legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 44% at center, var(--background) 0%, var(--background) 32%, color-mix(in srgb, var(--background) 70%, transparent) 58%, transparent 80%)',
        }}
      />

      {/* Centered title overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Every Industry. Represented.
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          With over 30 industry designations, we can target the right companies and
          individuals you want to engage with.
        </p>
      </div>
    </div>
  )
}
