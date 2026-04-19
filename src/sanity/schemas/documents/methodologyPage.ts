import { defineType, defineField } from 'sanity'

export const methodologyPage = defineType({
  name: 'methodologyPage',
  title: 'Methodology Page',
  type: 'document',
  // @ts-expect-error — runtime-only property, excluded from public Sanity types (same pattern as audiencePage)
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'pageHeadline', type: 'string', title: 'Page Headline', validation: (Rule) => Rule.required() }),
    defineField({ name: 'pageSubheadline', type: 'text', title: 'Page Subheadline' }),
    defineField({
      name: 'audienceBuilding',
      type: 'array',
      title: 'Audience Building',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'contentSyndicationProcess',
      type: 'array',
      title: 'ADVANCE ENGAGE / Content Syndication Process',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'webinarProcess',
      type: 'array',
      title: 'Webinar Program Process',
      of: [{ type: 'block' }],
    }),
  ],
})
