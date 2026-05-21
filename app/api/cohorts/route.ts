import { NextResponse } from 'next/server'

export async function GET() {
  // Stub: Fetch cohorts from database
  // TODO: Connect to Supabase
  const cohorts = [
    {
      id: 'ai-engineering',
      slug: 'ai-engineering',
      name: 'AI Engineering',
      status: 'open',
      availableSeats: 12,
      startDate: 'August 2026',
    },
    {
      id: 'aws-cloud',
      slug: 'aws-cloud',
      name: 'AWS Cloud',
      status: 'upcoming',
      availableSeats: 18,
      startDate: 'September 2026',
    },
    {
      id: 'ai-deployment',
      slug: 'ai-deployment',
      name: 'AI Deployment',
      status: 'upcoming',
      availableSeats: 20,
      startDate: 'October 2026',
    },
  ]

  return NextResponse.json({ cohorts })
}
