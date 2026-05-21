import { NextResponse } from 'next/server'
import { cohorts } from '@/lib/data/cohorts'

/**
 * Public cohorts API.
 *
 * Returns the active list of cohorts from the locked source-of-truth in
 * lib/data/cohorts.ts (which mirrors PERNICIA_*_COHORT_*.md planning docs).
 *
 * Lightweight surface only — full cohort detail (curriculum, FAQs, pricing tiers)
 * is exposed on the page route /cohorts/[slug]. This endpoint returns just the
 * summary fields useful for index pages, navigation, and external integrations.
 */
export async function GET() {
  const summary = cohorts.map((cohort) => ({
    id: cohort.id,
    slug: cohort.slug,
    name: cohort.name,
    tagline: cohort.tagline,
    description: cohort.description,
    duration: cohort.duration,
    startDate: cohort.startDate,
    totalSeats: cohort.totalSeats,
    availableSeats: cohort.availableSeats,
    status: cohort.status,
    highlights: cohort.highlights,
    icon: cohort.icon,
  }))

  return NextResponse.json(
    { cohorts: summary },
    {
      headers: {
        // Cache for 5 minutes at the edge; cohort data is static-ish
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    }
  )
}
