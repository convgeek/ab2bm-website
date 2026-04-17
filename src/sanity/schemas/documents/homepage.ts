import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  // @ts-expect-error — __experimental_actions is not in the public type but is the supported
  // way to create singleton documents in Sanity Studio v3 (prevents duplicate creation).
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'heroHeadline', type: 'string', title: 'Hero Headline' }),
    defineField({ name: 'heroSubheadline', type: 'text', title: 'Hero Subheadline' }),
    defineField({ name: 'heroCta', type: 'string', title: 'Hero CTA Label' }),
    defineField({
      name: 'heroCtaHref',
      type: 'string',
      title: 'Hero CTA URL',
      initialValue: '/contact',
    }),
    defineField({
      name: 'clientLogos',
      type: 'array',
      title: 'Client Logos',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'programsOverview',
      type: 'array',
      title: 'Programs Overview',
      of: [{ type: 'reference', to: [{ type: 'program' }] }],
    }),
    defineField({
      name: 'audienceStats',
      type: 'array',
      title: 'Audience Stats',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
            defineField({ name: 'footnote', type: 'string', title: 'Footnote' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonialHighlight',
      type: 'reference',
      title: 'Testimonial Highlight',
      to: [{ type: 'testimonial' }],
    }),
    defineField({ name: 'blogPreviewHeadline', type: 'string', title: 'Blog Preview Headline' }),
    defineField({ name: 'footerCtaHeadline', type: 'string', title: 'Footer CTA Headline' }),
    defineField({ name: 'footerCtaBody', type: 'text', title: 'Footer CTA Body' }),
    defineField({ name: 'footerCtaLabel', type: 'string', title: 'Footer CTA Label' }),
  ],
})
