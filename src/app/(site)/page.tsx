import { Hero } from '@/components/sections/Hero'
import { LogoStrip } from '@/components/sections/LogoStrip'
import { ProgramsOverview } from '@/components/sections/ProgramsOverview'
import { AudienceStats } from '@/components/sections/AudienceStats'
import { TestimonialHighlight } from '@/components/sections/TestimonialHighlight'
import { CaseStudyHighlight } from '@/components/sections/CaseStudyHighlight'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { FooterCta } from '@/components/sections/FooterCta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <ProgramsOverview programs={[]} />
      <AudienceStats stats={[]} />
      <TestimonialHighlight testimonial={null} />
      <CaseStudyHighlight featuredCaseStudy={null} />
      <BlogPreview posts={[]} />
      <FooterCta headline="" body="" ctaLabel="" />
    </main>
  )
}
