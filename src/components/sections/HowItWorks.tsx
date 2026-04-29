interface Step {
  name: string
  body: string
}

const STEPS: Record<string, Step[]> = {
  'advance-engage': [
    {
      name: 'Activate Your Content',
      body: 'Deploy your high-value, educational content assets to engage B2B professionals who match your target buyer profile and business criteria.',
    },
    {
      name: 'Engage Across Channels',
      body: 'Reach your ideal buyers through multiple communication channels — meeting them where they research and consume content, on their terms.',
    },
    {
      name: 'Manage & Optimize',
      body: 'Receive full-service program management from the Advance team, including content strategy guidance, outreach execution, and ongoing campaign optimization.',
    },
  ],
  'advance-abm': [
    {
      name: 'Assess Account List',
      body: 'Evaluate and activate your target or named account list — regardless of its size — to establish precise campaign targeting from day one.',
    },
    {
      name: 'Expand Targeting',
      body: 'Augment your account list using look-a-like modeling and intent data signals to identify additional high-fit accounts showing active buying behavior.',
    },
    {
      name: 'Engage Buying Committees',
      body: 'Target and engage key buying committee roles and titles within each account through precise, multi-touch outreach campaigns.',
    },
    {
      name: 'Advise & Optimize',
      body: 'Receive strategic guidance from the Advance team on ABM campaign targeting, messaging, and ongoing optimization to maximize account penetration.',
    },
  ],
  'advance-install': [
    {
      name: 'Identify Install Base',
      body: 'Leverage technographic data to pinpoint organizations with your specified technologies currently installed and in use across their environment.',
    },
    {
      name: 'Target & Engage',
      body: 'Execute targeted outreach to companies with confirmed installed technology that also match your ideal buyer profile and firmographic criteria.',
    },
    {
      name: 'Deliver & Report',
      body: 'Rely on the Advance team to handle all aspects of program execution, campaign reporting, and lead delivery to meet your KPIs.',
    },
  ],
  'advance-bant': [
    {
      name: 'Define BANT Criteria',
      body: 'Collaborate with the Advance team to co-create your BANT qualification criteria and custom questions — optimized for your specific targeting and outreach goals.',
    },
    {
      name: 'Qualify Prospects',
      body: 'Screen and qualify prospective buyers against your BANT framework using a combination of digital engagement and tele-touch within our opted-in audience universe.',
    },
    {
      name: 'Execute & Deliver',
      body: 'Rely on the Advance team to manage all aspects of campaign setup, prospect outreach, and program delivery — tuned to hit your success metrics.',
    },
  ],
  'advance-expand': [
    {
      name: 'Establish Targeting',
      body: 'Review, build, and apply appropriate inclusion and suppression lists to enable precision targeting within your existing customer organizations.',
    },
    {
      name: 'Activate Content',
      body: 'Deploy your high-value, educational content to engage new B2B decision-makers within your current customer base who match your expansion buyer profile.',
    },
    {
      name: 'Manage & Expand',
      body: 'Receive full-service program management from the Advance team, including content strategy advice, outreach execution, and ongoing campaign optimization.',
    },
  ],
}

export function HowItWorks({ programType }: { programType: string }) {
  const steps = STEPS[programType]
  if (!steps) return null

  return (
    <section data-testid="how-it-works" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          How the Program Works
        </h2>
        <p className="text-muted-foreground mb-12">
          A clear, managed process from kickoff to delivery.
        </p>

        {/* Desktop: horizontal stepped progression */}
        <div className="hidden md:flex">
          {steps.map((step, i) => (
            <div key={i} className="relative flex-1 flex flex-col items-center">
              {i > 0 && (
                <div className="absolute top-5 right-1/2 left-0 h-px bg-border" aria-hidden="true" />
              )}
              {i < steps.length - 1 && (
                <div className="absolute top-5 left-1/2 right-0 h-px bg-border" aria-hidden="true" />
              )}
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <div className="mt-5 text-center px-3">
                <p className="text-sm font-semibold text-foreground mb-2">{step.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="relative flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-primary bg-background text-primary text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px bg-border mt-2 min-h-8" aria-hidden="true" />
                )}
              </div>
              <div className="pb-8 pt-2">
                <p className="text-sm font-semibold text-foreground mb-1">{step.name}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
