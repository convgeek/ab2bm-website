const INGREDIENTS = [
  'LinkedIn Profiles',
  'Native Language Campaigns',
  'SIC & NAICS Codes',
  'Buyer Profiling Questions',
  'Programmatic Advertising',
  'Suppression & Exclusion Lists',
  'Intent Data Signals',
  'ABM Look-a-Like Modeling',
]

export function OptionalIngredients() {
  return (
    <section data-testid="optional-ingredients" className="py-16 md:py-24 border-b border-border bg-muted/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          Optional Program Ingredients
        </h2>
        <p className="text-muted-foreground mb-10">
          Enhance any program with additional targeting and delivery options.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INGREDIENTS.map((ingredient) => (
            <div
              key={ingredient}
              className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-card-foreground"
            >
              {ingredient}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
