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
