interface PersonaCardProps {
  segmentName: string
  description: string
  jobTitles: string[]
  companyProfile: string
}

export function PersonaCard({ segmentName, description, jobTitles, companyProfile }: PersonaCardProps) {
  return (
    <div
      data-testid="persona-card"
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Orange top accent */}
      <div className="h-1 w-full bg-accent" />
      <div className="flex flex-col flex-1 gap-4 p-6">
        <h3 className="text-lg font-bold text-foreground">{segmentName}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Typical Titles
          </p>
          <ul className="space-y-1">
            {jobTitles.map((title, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {title}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-secondary/50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
            Company Profile
          </p>
          <p className="text-sm text-foreground">{companyProfile}</p>
        </div>
      </div>
    </div>
  )
}
