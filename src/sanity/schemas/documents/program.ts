import { defineType, defineField } from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'name' },
    }),
    defineField({ name: 'tagline', type: 'string', title: 'Tagline' }),
    defineField({
      name: 'programType',
      type: 'string',
      title: 'Program Type',
      // IMPORTANT: These exact enum values are referenced by CONV-05 URL param pattern
      // and the server action in Plan 01-05. Do NOT change them.
      options: {
        list: [
          { title: 'Content Syndication', value: 'content-syndication' },
          { title: 'Webinar', value: 'webinar' },
        ],
      },
    }),
    defineField({ name: 'order', type: 'number', title: 'Order (for sorting)' }),
    defineField({
      name: 'mechanics',
      type: 'array',
      title: 'Mechanics (how the program works)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'deliverables',
      type: 'array',
      title: 'Deliverables',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'targetingOptions',
      type: 'array',
      title: 'Targeting Options',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
    defineField({ name: 'ctaHref', type: 'string', title: 'CTA URL' }),
  ],
})
