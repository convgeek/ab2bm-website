import Image from 'next/image'

interface TeamMember {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: {
    url: string
    alt?: string
  }
}

interface TeamGridProps {
  members: TeamMember[]
}

const PLACEHOLDER_MEMBERS: TeamMember[] = [
  {
    _id: 'placeholder-mark-patton',
    name: 'Mark Patton',
    role: 'Founder & Publisher',
    bio: 'Team bio coming soon.',
  },
  {
    _id: 'placeholder-team-member',
    name: 'Team Member',
    role: 'Content Strategy',
    bio: 'Team bio coming soon.',
  },
]

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="w-full aspect-square bg-primary/10 flex items-center justify-center">
      <span className="text-5xl font-bold text-primary/40 select-none">{initials}</span>
    </div>
  )
}

export function TeamGrid({ members }: TeamGridProps) {
  const displayMembers = members.length > 0 ? members : PLACEHOLDER_MEMBERS

  return (
    <section className="bg-secondary/30 py-20 md:py-28 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
            The Team
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member) => (
            <div
              key={member._id}
              data-testid="team-card"
              className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:shadow-md"
            >
              {member.photo?.url ? (
                <div className="relative w-full aspect-square">
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt ?? member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <AvatarPlaceholder name={member.name} />
              )}
              <div className="p-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
