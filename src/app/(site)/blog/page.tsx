/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_LISTING_QUERY } from '@/sanity/lib/queries'
import { PageHeader } from '@/components/layout/PageHeader'

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
    <main>
      <PageHeader
        eyebrow="Resources"
        headline="Latest Insights"
        subheadline="Strategies, benchmarks, and perspectives for B2B technology marketers reaching IT buyers."
      />

      <div className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-secondary/30 p-16 text-center">
              <p className="text-lg font-semibold text-foreground">Content coming soon.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Check back shortly — new articles are on the way.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  data-testid="blog-card"
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="h-1 w-full bg-accent" />
                  <div className="flex flex-col flex-1 p-6">
                    {post.publishedAt && (
                      <time
                        dateTime={post.publishedAt}
                        className="text-xs font-medium text-accent uppercase tracking-wide"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                    <h2 className="mt-3 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors flex-1">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                      >
                        Read more <span className="text-accent">→</span>
                      </Link>
                      {post.author && (
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
