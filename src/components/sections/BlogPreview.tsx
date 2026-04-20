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
export function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
              Resources
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Insights
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              data-testid="blog-card"
              className="group flex flex-col rounded-2xl border border-border bg-background overflow-hidden shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Orange top accent */}
              <div className="h-1 w-full bg-accent" />
              <div className="flex flex-col flex-1 p-6">
                <time
                  dateTime={post.publishedAt}
                  className="text-xs font-medium text-accent uppercase tracking-wide"
                >
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="mt-3 text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Read more <span aria-hidden="true" className="text-accent">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
