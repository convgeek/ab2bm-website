import { defineQuery } from 'groq'

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0]{
    heroHeadline,
    heroSubheadline,
    heroCta,
    heroCtaHref,
    clientLogos[]{
      asset->{ url },
      alt
    },
    programsOverview[]->{
      _id,
      name,
      slug,
      tagline,
      ctaLabel
    },
    audienceStats[]{
      label,
      value,
      footnote
    },
    testimonialHighlight->{
      quote,
      attribution,
      role,
      company
    },
    blogPreviewHeadline,
    footerCtaHeadline,
    footerCtaBody,
    footerCtaLabel
  }
`)

export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program"] | order(order asc) {
    _id,
    name,
    slug,
    tagline,
    programType,
    order,
    mechanics,
    deliverables,
    targetingOptions,
    ctaLabel,
    ctaHref
  }
`)

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    order
  }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] {
    _id,
    quote,
    attribution,
    role,
    company,
    logo
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    siteDescription,
    twitterHandle,
    defaultOgImage
  }
`)

// Phase 2 queries

export const BLOG_LISTING_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author
  }
`)

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    featuredImage{ asset->{ url }, alt },
    body
  }
`)

export const BLOG_PREVIEW_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) [0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt
  }
`)

export const CASE_STUDIES_QUERY = defineQuery(`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    clientName,
    industry,
    companySize,
    summary,
    metrics[]{ label, value },
    featured
  }
`)

export const CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    clientName,
    industry,
    companySize,
    summary,
    metrics[]{ label, value },
    featuredImage{ asset->{ url }, alt },
    body
  }
`)

export const FEATURED_CASE_STUDY_QUERY = defineQuery(`
  *[_type == "caseStudy" && featured == true] | order(_createdAt desc) [0]{
    _id,
    title,
    "slug": slug.current,
    clientName,
    industry,
    summary,
    metrics[0...3]{ label, value }
  }
`)

export const AUDIENCE_PAGE_QUERY = defineQuery(`
  *[_type == "audiencePage"][0]{
    pageHeadline,
    pageSubheadline,
    methodologyNote,
    totalAudienceStats[]{ label, value, footnote },
    industryBreakdown[]{ vertical, percentage },
    companySizeDistribution[]{ tier, percentage },
    personas[]{
      segmentName,
      description,
      jobTitles,
      companyProfile
    }
  }
`)

// Phase 3 queries

export const PROGRAM_BY_SLUG_QUERY = defineQuery(`
  *[_type == "program" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    tagline,
    programType,
    solutionOverview,
    howItWorks,
    whatYouGet,
    bestFor,
    ctaLabel
  }
`)

export const ALL_PROGRAM_SLUGS_QUERY = defineQuery(`
  *[_type == "program"]{ "slug": slug.current }
`)

export const PROGRAMS_INDEX_QUERY = defineQuery(`
  *[_type == "program"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    programType
  }
`)

export const METHODOLOGY_PAGE_QUERY = defineQuery(`
  *[_type == "methodologyPage"][0]{
    pageHeadline,
    pageSubheadline,
    audienceBuilding,
    contentSyndicationProcess,
    webinarProcess
  }
`)
