import { Rocket, ShieldCheck, Clock, IndianRupee } from 'lucide-react'

const pillars = [
  {
    icon: Rocket,
    title: 'Production-first',
    description:
      'One deployed, observable, defendable system on your GitHub beats six tutorial demos. Recruiters can open a live URL — they skim portfolios of slides.',
  },
  {
    icon: ShieldCheck,
    title: 'BFSI vertical depth',
    description:
      'RBI, SEBI, DPDP, GDPR built into every relevant module. Most cohorts skip regulated-industry context. For BFSI engineers, this is the unlock.',
  },
  {
    icon: Clock,
    title: 'Working-pro cadence',
    description:
      '2 hours per day, 5 evenings a week, for 6 weeks. 7–9 PM IST covers India and the Middle East. Designed for engineers who hold day jobs.',
  },
  {
    icon: IndianRupee,
    title: 'Accessible pricing',
    description:
      '₹30–40K vs ₹1+ Lakh premium bootcamps. Made possible by low-CAC funnels and lean ops — passed to learners as lower price, not lower quality.',
  },
]

export function FourPillarsSection() {
  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Four reasons we exist
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            We chose what to be sharp on. We&apos;ll tell you upfront what we don&apos;t do.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute -top-4 left-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                  <pillar.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="pt-8">
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-b-2xl">
                <div
                  className="h-full w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
