import { Linkedin, Users } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const instructor = {
  name: 'Manan Jindal',
  title: 'Lead Trainer · pTeachTech',
  bio: 'Designs and delivers the AI Engineering, AWS Cloud, and AI Deployment cohorts end-to-end. Focuses on production patterns most courses skip — RAG observability, MLOps governance, IAM hardening, BFSI compliance. Hands-on instructor; answers your DMs himself.',
  image: null,
  linkedin: 'https://linkedin.com/in/manan-jindal',
}

export function InstructorsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            One instructor. Many guests.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Continuity over rotation — your instructor knows your code from Day 1. Plus 5–6 industry-connect sessions per cohort with senior practitioners.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Lead trainer card */}
          <div className="group relative rounded-2xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                <AvatarImage src={instructor.image || undefined} alt={instructor.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {instructor.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{instructor.name}</h3>
                <p className="text-sm font-medium text-primary">{instructor.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {instructor.bio}
            </p>
            <Button asChild variant="ghost" size="sm" className="mt-4 gap-2">
              <Link href={instructor.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </Link>
            </Button>
          </div>

          {/* Industry connect card */}
          <div className="group relative rounded-2xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-background bg-accent/20 shadow-md">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Industry Connect roster</h3>
                <p className="text-sm font-medium text-primary">5–6 senior practitioners per cohort</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Each cohort brings in senior engineers and leads from BFSI, fintech, and product
              companies — for live Q&amp;A, real production case studies, and hiring-perspective
              feedback. Speaker roster confirmed per batch.
            </p>
            <p className="mt-4 text-xs text-muted-foreground italic">
              Past topics: production RAG at scale · BFSI compliance posture · search &amp; retrieval
              lessons · agent-product engineering · eval and observability in production.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
