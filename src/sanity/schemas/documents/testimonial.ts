import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', title: 'Quote' }),
    defineField({ name: 'attribution', type: 'string', title: 'Full Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
    defineField({ name: 'company', type: 'string', title: 'Company' }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Company Logo (optional)',
    }),
  ],
})
