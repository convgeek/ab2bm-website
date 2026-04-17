import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      type: 'string',
      title: 'Client Name',
      description:
        "Leave blank for anonymized case studies — use a descriptive title instead, e.g. 'Enterprise Security Vendor — Webinar Lead Generation'",
    }),
    defineField({
      name: 'industry',
      type: 'string',
      title: 'Industry / Vertical',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companySize',
      type: 'string',
      title: 'Company Size',
      description: 'e.g. "Mid-market (200–500 employees)"',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      title: 'Summary',
      description: '2-3 sentences for listing page card',
    }),
    defineField({
      name: 'metrics',
      type: 'array',
      title: 'Outcome Metrics',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Metric Label' }),
            defineField({ name: 'value', type: 'string', title: 'Metric Value' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Full Case Study Body',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featured',
      type: 'boolean',
      title: 'Feature on Homepage?',
      initialValue: false,
    }),
  ],
})
