import { defineType, defineField } from 'sanity'

export const audiencePage = defineType({
  name: 'audiencePage',
  title: 'Audience Page',
  type: 'document',
  // @ts-expect-error — __experimental_actions is not in the public type but is the supported
  // way to create singleton documents in Sanity Studio v3 (prevents duplicate creation).
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'pageHeadline', type: 'string', title: 'Page Headline' }),
    defineField({ name: 'pageSubheadline', type: 'text', title: 'Page Subheadline' }),
    defineField({
      name: 'methodologyNote',
      type: 'text',
      title: 'Methodology Note',
      description:
        "Explain how Ab2bm's audience is built and verified — readers are skeptical tech buyers",
    }),
    defineField({
      name: 'totalAudienceStats',
      type: 'array',
      title: 'Audience Size Stats',
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
      name: 'industryBreakdown',
      type: 'array',
      title: 'Industry / Vertical Breakdown',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'vertical', type: 'string', title: 'Vertical' }),
            defineField({ name: 'percentage', type: 'string', title: 'Percentage' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'companySizeDistribution',
      type: 'array',
      title: 'Company Size Distribution',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'tier', type: 'string', title: 'Size Tier' }),
            defineField({ name: 'percentage', type: 'string', title: 'Percentage' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'personas',
      type: 'array',
      title: 'Persona Cards',
      of: [{ type: 'personaCard' }],
    }),
  ],
})
