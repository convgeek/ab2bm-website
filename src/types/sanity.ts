/**
 * TypeScript interfaces for Sanity document types.
 * These are manually maintained to match the schema definitions in src/sanity/schemas/documents/.
 * Run `npx sanity@latest typegen generate` after Sanity project is provisioned to auto-generate.
 */

// Common Sanity types
export interface SanitySlug {
  current: string
  _type: 'slug'
}

export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
  url?: string
}

export interface SanityImage {
  _type: 'image'
  asset?: SanityImageAsset
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

// Portable Text block
export interface SanityBlock {
  _type: 'block'
  _key: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks: string[]
  }>
  markDefs: unknown[]
  style: string
}

// Document types
export interface HomepageDocument {
  _type: 'homepage'
  _id: string
  heroHeadline?: string
  heroSubheadline?: string
  heroCta?: string
  heroCtaHref?: string
  clientLogos?: SanityImage[]
  programsOverview?: ProgramDocument[]
  audienceStats?: Array<{
    label: string
    value: string
    footnote?: string
  }>
  testimonialHighlight?: TestimonialDocument
  blogPreviewHeadline?: string
  footerCtaHeadline?: string
  footerCtaBody?: string
  footerCtaLabel?: string
}

export interface ProgramDocument {
  _type: 'program'
  _id: string
  name: string
  slug: SanitySlug
  tagline?: string
  /**
   * IMPORTANT: These exact values are used in CONV-05 URL param pattern and the
   * server action in Plan 01-05. Do NOT change these enum values.
   */
  programType: 'content-syndication' | 'webinar'
  order?: number
  mechanics?: SanityBlock[]
  deliverables?: SanityBlock[]
  targetingOptions?: SanityBlock[]
  ctaLabel?: string
  ctaHref?: string
}

export interface TeamMemberDocument {
  _type: 'teamMember'
  _id: string
  name?: string
  role?: string
  bio?: string
  photo?: SanityImage
  order?: number
}

export interface TestimonialDocument {
  _type: 'testimonial'
  _id: string
  quote?: string
  attribution?: string
  role?: string
  company?: string
  logo?: SanityImage
}

export interface SiteSettingsDocument {
  _type: 'siteSettings'
  _id: string
  siteTitle?: string
  siteDescription?: string
  twitterHandle?: string
  defaultOgImage?: SanityImage
}
