export { viewport } from 'next-sanity/studio'
export const dynamic = 'force-dynamic'

import StudioClient from '@/components/studio/studio-client'

export default function StudioPage() {
  return <StudioClient />
}
