interface PersonaCardProps {
  segmentName: string
  description: string
  jobTitles: string[]
  companyProfile: string
}

export function PersonaCard({ segmentName, description, jobTitles, companyProfile }: PersonaCardProps) {
  return (
    <div data-testid="persona-card" className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3">
      <h3 className="text-xl font-semibold">{segmentName}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div>
        <p className="text-sm font-medium mb-1">Typical Titles:</p>
        <ul className="list-disc list-inside space-y-1">
          {jobTitles.map((title, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Company Profile:</p>
        <p className="text-sm">{companyProfile}</p>
      </div>
    </div>
  )
}
