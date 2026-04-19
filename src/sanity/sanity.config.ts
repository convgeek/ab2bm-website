import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { homepage } from './schemas/documents/homepage'
import { program } from './schemas/documents/program'
import { teamMember } from './schemas/documents/teamMember'
import { testimonial } from './schemas/documents/testimonial'
import { siteSettings } from './schemas/documents/siteSettings'
import { personaCard } from './schemas/objects/personaCard'
import { audiencePage } from './schemas/documents/audiencePage'
import { post } from './schemas/documents/post'
import { caseStudy } from './schemas/documents/caseStudy'
import { methodologyPage } from './schemas/documents/methodologyPage'

export default defineConfig({
  name: 'default',
  title: 'Advance B2B Media',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    // CRITICAL: personaCard (object type) must appear before audiencePage (which references it)
    // to avoid Sanity Studio schema validation error "Unknown type: personaCard".
    types: [homepage, program, teamMember, testimonial, siteSettings, personaCard, audiencePage, post, caseStudy, methodologyPage],
  },
})
