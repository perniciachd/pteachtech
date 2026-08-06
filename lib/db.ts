import { neon } from '@neondatabase/serverless'

/** Thrown when DATABASE_URL is missing, so callers can say what's wrong. */
export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('Database is not configured — set DATABASE_URL to your Neon connection string.')
    this.name = 'DatabaseNotConfiguredError'
  }
}

/**
 * Neon's HTTP driver — each query is a stateless request, so there are no
 * connections to pool or leak across serverless invocations.
 *
 * Always call queries as tagged templates (sql`... ${value} ...`): interpolated
 * values become bound parameters, never string-concatenated SQL.
 */
export function getSql() {
  const url = process.env.DATABASE_URL
  if (!url) throw new DatabaseNotConfiguredError()
  return neon(url)
}
