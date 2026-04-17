/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { defineQuery } from 'groq'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POST_QUERY } from '@/sanity/lib/queries'

// Inline query for generateStaticParams — only needs slugs
const ALL_POST_SLUGS_QUERY = defineQuery(`*[_type == "post"]{ "slug": slug.current }`)

type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  author?: string
  body?: any
}

function extractPost(raw: any): BlogPost | null {
  if (!raw) return null
  return {
    _id: raw._id ?? '',
    title: raw.title ?? '',
    slug: raw.slug ?? '',
    excerpt: typeof raw.excerpt === 'string' ? raw.excerpt : undefined,
    publishedAt: typeof raw.publishedAt === 'string' ? raw.publishedAt : undefined,
    author: typeof raw.author === 'string' ? raw.author : undefined,
    body: raw.body ?? undefined,
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">{children}</blockquote>
    ),
  },
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const result = await sanityFetch({ query: ALL_POST_SLUGS_QUERY })
    const slugs = (result.data ?? []) as { slug: string | null }[]
    return slugs
      .filter((item) => typeof item.slug === 'string' && item.slug)
      .map((item) => ({ slug: item.slug as string }))
  } catch {
    // Sanity not configured yet — return empty array, all routes rendered on demand
    return []
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post: BlogPost | null = null

  try {
    const result = await sanityFetch({ query: BLOG_POST_QUERY, params: { slug } })
    post = extractPost(result.data)
  } catch {
    // Sanity not configured — treat as not found
  }

  if (!post) {
    notFound()
  }

  return (
    <main>
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          &#8592; Back to Resources
        </Link>

        <h1 className="text-4xl font-bold tracking-tight leading-tight">{post.title}</h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          )}
          {post.author && <span>By {post.author}</span>}
        </div>

        {post.excerpt && (
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        )}

        {post.body && (
          <div className="mt-10 prose prose-neutral max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}
      </article>
    </main>
  )
}
