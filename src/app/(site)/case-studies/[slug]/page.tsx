import { notFound } from 'next/navigation'

export function generateStaticParams(): { slug: string }[] {
  return []
}

export default function CaseStudyPage() {
  notFound()
}
