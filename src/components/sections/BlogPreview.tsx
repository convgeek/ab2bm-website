import Link from 'next/link'

interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
}

interface BlogPreviewProps {
  posts?: BlogPost[]
}

// Per RESEARCH.md Pitfall 6: if posts is empty or undefined, render NOTHING.
// Blog is Phase 2 — do NOT render "Coming soon" or an empty grid.
export function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Latest Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              data-testid="blog-card"
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <time
                dateTime={post.publishedAt}
                className="text-xs text-muted-foreground"
              >
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h3 className="mt-3 text-lg font-semibold text-card-foreground leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 text-sm font-semibold text-primary hover:underline"
              >
                Read more &rarr;
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
