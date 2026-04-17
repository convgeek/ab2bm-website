import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Title' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio' }),
    defineField({
      name: 'photo',
      type: 'image',
      title: 'Photo',
      options: { hotspot: true },
    }),
    defineField({ name: 'order', type: 'number', title: 'Order (for sorting)' }),
  ],
})
