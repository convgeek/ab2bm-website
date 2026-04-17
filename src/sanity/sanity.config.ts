import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { homepage } from './schemas/documents/homepage'
import { program } from './schemas/documents/program'
import { teamMember } from './schemas/documents/teamMember'
import { testimonial } from './schemas/documents/testimonial'
import { siteSettings } from './schemas/documents/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'Advance B2B Media',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [homepage, program, teamMember, testimonial, siteSettings],
  },
})
