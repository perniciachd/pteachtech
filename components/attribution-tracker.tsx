'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { captureAttribution } from '@/lib/attribution'

/**
 * Records first-touch attribution on every navigation.
 *
 * Renders nothing. Mounted once in the root layout, inside <Suspense> —
 * useSearchParams opts the tree into client-side rendering, and without a
 * Suspense boundary that would deopt every static page to dynamic rendering.
 */
function AttributionTrackerInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureAttribution()
    // Re-run on client-side navigation: the UTM'd URL may not be the first
    // route React renders, and App Router keeps this component mounted.
  }, [pathname, searchParams])

  return null
}

export function AttributionTracker() {
  return <AttributionTrackerInner />
}
