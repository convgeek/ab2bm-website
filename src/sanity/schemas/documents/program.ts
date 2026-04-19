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
      // content-syndication removed in Phase 3 (pre-launch); replaced by advance-engage
      // IMPORTANT: These exact enum values are referenced by CONV-05 URL param pattern
      // and the server action in Plan 01-05. Do NOT change them.
      options: {
        list: [
          { title: 'ADVANCE ENGAGE',  value: 'advance-engage' },
          { title: 'ADVANCE ABM',     value: 'advance-abm' },
          { title: 'ADVANCE INSTALL', value: 'advance-install' },
          { title: 'ADVANCE BANT',    value: 'advance-bant' },
          { title: 'ADVANCE EXPAND',  value: 'advance-expand' },
          { title: 'Webinar',         value: 'webinar' },
        ],
      },
    }),
    defineField({ name: 'order', type: 'number', title: 'Order (for sorting)' }),
    defineField({ name: 'solutionOverview', type: 'text', title: 'Solution Overview (1-2 paragraphs)' }),
    defineField({
      name: 'howItWorks',
      type: 'array',
      title: 'How the Program Works (bullets)',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'whatYouGet',
      type: 'array',
      title: 'What You Get (bullets)',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'bestFor', type: 'text', title: 'Best For (paragraph)' }),
    defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
    defineField({ name: 'ctaHref', type: 'string', title: 'CTA URL' }),
  ],
})
