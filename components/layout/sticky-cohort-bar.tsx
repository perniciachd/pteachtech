'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getOpenCohorts } from '@/lib/data/cohorts'

export function StickyCohortBar() {
  const [dismissed, setDismissed] = useState(false)
  const openCohorts = getOpenCohorts()

  // Prefer a status:'open' cohort over an 'upcoming' one
  const nextCohort = openCohorts.find((c) => c.status === 'open') ?? openCohorts[0]

  if (dismissed || !nextCohort) return null

  const isOpen = nextCohort.status === 'open'
  const seatsLabel = isOpen
    ? `${nextCohort.availableSeats} of ${nextCohort.totalSeats} founding seats`
    : 'Waitlist open'

  return (
    <div className="sticky top-16 z-40 border-b bg-accent/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm min-w-0">
          <span className="hidden font-medium text-foreground sm:inline whitespace-nowrap">
            {isOpen ? 'Now open:' : 'Coming next:'}
          </span>
          <span className="font-semibold text-primary truncate">
            {nextCohort.name}
          </span>
          <span className="hidden text-muted-foreground sm:inline whitespace-nowrap">
            starts {nextCohort.startDate}
          </span>
          <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary md:inline whitespace-nowrap">
            {seatsLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button size="sm" asChild>
            <Link href={`/cohorts/${nextCohort.slug}`}>
              {isOpen ? 'Reserve seat' : 'View details'}
            </Link>
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
