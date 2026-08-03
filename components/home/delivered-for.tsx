import { Scale, ServerCog } from 'lucide-react'

const deliveries = [
  {
    icon: Scale,
    audience: 'Enterprise Legal team',
    detail:
      'A practical AI enablement program tailored to legal workflows — prompting, document work, and responsible use.',
  },
  {
    icon: ServerCog,
    audience: 'Enterprise IT Operations team',
    detail:
      'Delivered to a mixed-seniority cohort — participants from 7 to 20 years of experience, learning together.',
  },
]

export function DeliveredForSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Proven in delivery
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Already delivered to enterprise teams
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            Real programs, for real teams — across seniority levels. Named case studies and
            participant testimonials to follow.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {deliveries.map((d) => (
            <div
              key={d.audience}
              className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <d.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{d.audience}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.detail}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Programs run for <strong className="text-foreground">mixed-seniority teams</strong> — from
          mid-level engineers to 20-year veterans — so everyone learns and applies it together.
        </p>
      </div>
    </section>
  )
}
