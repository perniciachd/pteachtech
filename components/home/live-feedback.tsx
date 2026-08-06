import { Star, Quote } from 'lucide-react'
import { getSql } from '@/lib/db'

type Featured = { training_name: string; location: string | null; liked_most: string | null; overall: number | null }

async function getData(): Promise<{ featured: Featured[]; avg: number; count: number } | null> {
  try {
    const sql = getSql()
    const [feat, agg] = await Promise.all([
      sql`
        select training_name, location, liked_most, overall
        from training_feedback
        where featured = true and liked_most is not null
        order by created_at desc
        limit 9
      `,
      sql`
        select avg(overall)::float as avg, count(overall)::int as count
        from training_feedback
        where overall is not null
      `,
    ])
    return {
      featured: feat as Featured[],
      avg: (agg[0]?.avg as number) ?? 0,
      count: (agg[0]?.count as number) ?? 0,
    }
  } catch {
    // The wall is decorative — never let a DB hiccup break the homepage.
    return null
  }
}

export async function LiveFeedbackSection() {
  const data = await getData()
  if (!data || data.featured.length === 0) return null

  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">What participants say</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Real feedback from real sessions
          </h2>
          {data.count > 0 && (
            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
              <span className="inline-flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`h-5 w-5 ${n <= Math.round(data.avg) ? 'fill-accent text-accent' : 'text-muted'}`} />
                ))}
              </span>
              <span className="text-sm">
                <strong className="text-foreground">{data.avg.toFixed(1)}/5</strong> from {data.count} participant{data.count === 1 ? '' : 's'}
              </span>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.featured.map((f, i) => (
            <figure key={i} className="rounded-2xl border bg-card p-6 shadow-sm">
              <Quote className="h-6 w-6 text-accent" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">“{f.liked_most}”</blockquote>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                {f.training_name}{f.location ? ` · ${f.location}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
