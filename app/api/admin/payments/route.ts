import { NextResponse } from 'next/server'
import { listRazorpayPayments } from '@/lib/payments/razorpay-admin'
import { cohorts } from '@/lib/data/cohorts'

export const runtime = 'nodejs'

// Auth is already enforced in middleware for /api/admin/*
// (returns 401 if cookie missing/invalid).

export async function GET() {
  const result = await listRazorpayPayments({ count: 100 })

  if (!result.ok) {
    if ('skipped' in result) {
      return NextResponse.json(
        { error: 'Razorpay not configured.', payments: [], summary: emptySummary() },
        { status: 503 }
      )
    }
    return NextResponse.json(
      { error: result.error, payments: [], summary: emptySummary() },
      { status: 500 }
    )
  }

  const payments = result.payments

  // Compute summary: counts + revenue by status + per-cohort seat counts
  const capturedPayments = payments.filter((p) => p.status === 'captured')
  const totalRevenueInr = capturedPayments.reduce((sum, p) => sum + p.amountInr, 0)

  // Filter to this month for MTD revenue
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const mtdRevenueInr = capturedPayments
    .filter((p) => p.createdAt >= monthStart)
    .reduce((sum, p) => sum + p.amountInr, 0)

  const cohortSummary = cohorts.map((c) => {
    const captured = capturedPayments.filter((p) => p.cohortSlug === c.slug)
    return {
      slug: c.slug,
      name: c.name,
      totalSeats: c.totalSeats,
      capturedCount: captured.length,
      capturedRevenueInr: captured.reduce((sum, p) => sum + p.amountInr, 0),
    }
  })

  return NextResponse.json({
    payments,
    summary: {
      total: payments.length,
      captured: capturedPayments.length,
      failed: payments.filter((p) => p.status === 'failed').length,
      authorized: payments.filter((p) => p.status === 'authorized').length,
      refunded: payments.filter((p) => p.status === 'refunded').length,
      totalRevenueInr,
      mtdRevenueInr,
      cohorts: cohortSummary,
    },
    fetchedAt: new Date().toISOString(),
  })
}

function emptySummary() {
  return {
    total: 0,
    captured: 0,
    failed: 0,
    authorized: 0,
    refunded: 0,
    totalRevenueInr: 0,
    mtdRevenueInr: 0,
    cohorts: [],
  }
}
