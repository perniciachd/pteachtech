import { Star, Quote } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

type Featured = { training_name: string; location: string | null; liked_most: string | null; overall: number | null }

async function getData(): Promise<{ featured: Featured[]; avg: number; count: number } | null> {
  try {
    const supabase = createAdminClient()
    const [{ data: feat }, { data: all }] = await Promise.all([
      supabase
        .from('training_feedback')
        .select('training_name, location, liked_most, overall')
        .eq('featured', true)
        .not('liked_most', 'is', null)
        .order('created_at', { ascending: false })
        .limit(9),
      supabase.from('training_feedback').select('overall').not('overall', 'is', null),
    ])
    const featured = (feat ?? []) as Featured[]
    const vals = (all ?? []).map((r) => r.overall as number).filter((n) => typeof n === 'number')
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0
    return { featured, avg, count: vals.length }
  } catch {
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
