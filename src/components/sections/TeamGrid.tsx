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

export function TeamGrid({ members }: TeamGridProps) {
  const displayMembers = members.length > 0 ? members : PLACEHOLDER_MEMBERS

  return (
    <section className="bg-muted/30 py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayMembers.map((member) => (
            <div
              key={member._id}
              data-testid="team-card"
              className="bg-background rounded-xl overflow-hidden shadow-sm border border-border"
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
                <div className="w-full aspect-square bg-gray-200 rounded-lg" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{member.role}</p>
                {member.bio && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
