/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_LISTING_QUERY } from '@/sanity/lib/queries'

type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  author?: string
}

function extractPosts(raw: any): BlogPost[] {
  if (!Array.isArray(raw)) return []
  return raw.map((p: any) => ({
    _id: p?._id ?? '',
    title: p?.title ?? '',
    slug: p?.slug ?? '',
    excerpt: typeof p?.excerpt === 'string' ? p.excerpt : undefined,
    publishedAt: typeof p?.publishedAt === 'string' ? p.publishedAt : undefined,
    author: typeof p?.author === 'string' ? p.author : undefined,
  }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  let posts: BlogPost[] = []

  try {
    const result = await sanityFetch({ query: BLOG_LISTING_QUERY })
    posts = extractPosts(result.data)
  } catch {
    // Sanity not configured yet — render empty state gracefully
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights and strategies for B2B technology marketers.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-lg text-muted-foreground">Content coming soon.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back shortly — new articles are on the way.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              data-testid="blog-card"
              className="rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <div className="flex-1">
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold leading-snug hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>

                {post.excerpt && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <footer className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                )}
                {post.author && <span>{post.author}</span>}
              </footer>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
