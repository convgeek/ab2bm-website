'use client'

import { useState } from 'react'

type Segment = {
  id: string
  name: string
  pct: number
  color: string
}

const SEGMENTS: Segment[] = [
  { id: 'tech',      name: 'Technology',       pct: 30, color: 'var(--purple-900)' },
  { id: 'finance',   name: 'Finance',          pct: 20, color: 'var(--orange-500)' },
  { id: 'hr',        name: 'HR',               pct: 15, color: 'var(--purple-700)' },
  { id: 'lob',       name: 'Line of Business', pct: 15, color: 'var(--purple-500)' },
  { id: 'sales',     name: 'Sales',            pct: 10, color: 'var(--orange-400)' },
  { id: 'marketing', name: 'Marketing',        pct: 10, color: 'var(--purple-300)' },
]

const CELLS: string[] = SEGMENTS.flatMap((s) => Array<string>(s.pct).fill(s.id))

const A11Y_LABEL =
  'Audience composition by function: ' +
  SEGMENTS.map((s) => `${s.name} ${s.pct}%`).join(', ') +
  ', totaling 48.5 million opt-in contacts.'

export function AudienceWaffle() {
  const [active, setActive] = useState<string | null>(null)

  const segmentById = (id: string) => SEGMENTS.find((s) => s.id === id)!

  return (
    <div
      data-testid="audience-stats"
      className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20"
    >
      {/* Left column: legend */}
      <div>
        <ul role="list" className="divide-y divide-rule border-y border-rule">
          {SEGMENTS.map((seg) => {
            const isActive = active === seg.id
            const dimmed = active !== null && !isActive
            return (
              <li key={seg.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(seg.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(seg.id)}
                  onBlur={() => setActive(null)}
                  aria-pressed={isActive}
                  className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-purple-050 focus:bg-purple-050 focus:outline-none"
                >
                  <span
                    aria-hidden="true"
                    className="block h-3.5 w-3.5 shrink-0 rounded-[2px] transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: seg.color,
                      opacity: dimmed ? 0.35 : 1,
                    }}
                  />
                  <span
                    className="flex-1 text-[15px] font-medium tracking-[-0.005em] text-purple-900 transition-opacity"
                    style={{ opacity: dimmed ? 0.45 : 1 }}
                  >
                    {seg.name}
                  </span>
                  <span
                    className="font-display text-[34px] leading-none tracking-[-0.02em] text-purple-900 transition-opacity"
                    style={{ opacity: dimmed ? 0.45 : 1 }}
                  >
                    {seg.pct}
                    <em className="not-italic text-[20px] text-stone-500">%</em>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Right column: waffle */}
      <div className="flex flex-col items-center lg:items-end">
        <div
          role="img"
          aria-label={A11Y_LABEL}
          className="grid w-full max-w-[440px] grid-cols-10 gap-[6px]"
        >
          {CELLS.map((segId, i) => {
            const seg = segmentById(segId)
            const dimmed = active !== null && active !== segId
            return (
              <div
                key={i}
                aria-hidden="true"
                onMouseEnter={() => setActive(segId)}
                onMouseLeave={() => setActive(null)}
                className="aspect-square rounded-[2px] transition-opacity duration-200 ease-out"
                style={{
                  background: seg.color,
                  opacity: dimmed ? 0.12 : 1,
                }}
              />
            )
          })}
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-stone-500">
          1 square = 1% of the database
        </p>
      </div>
    </div>
  )
}
