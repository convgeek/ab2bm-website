import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // @ts-expect-error — __experimental_actions is not in the public type but is the supported
  // way to create singleton documents in Sanity Studio v3 (prevents duplicate creation).
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title' }),
    defineField({ name: 'siteDescription', type: 'text', title: 'Site Description' }),
    defineField({ name: 'twitterHandle', type: 'string', title: 'Twitter / X Handle' }),
    defineField({
      name: 'defaultOgImage',
      type: 'image',
      title: 'Default OG Image',
    }),
  ],
})
