import { defineType, defineField } from 'sanity'

export const personaCard = defineType({
  name: 'personaCard',
  title: 'Persona Card',
  type: 'object',
  fields: [
    defineField({
      name: 'segmentName',
      type: 'string',
      title: 'Segment Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'jobTitles',
      type: 'array',
      title: 'Job Titles',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'companyProfile',
      type: 'text',
      title: 'Company Profile',
      description: 'Typical company type and size for this persona segment',
    }),
  ],
})
