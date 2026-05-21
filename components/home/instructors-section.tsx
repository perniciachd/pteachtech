import { Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const instructors = [
  {
    name: 'Lead Instructor',
    title: 'Senior AI Engineer',
    company: 'Tech Company',
    bio: 'Instructor bio will be added here. Years of experience building production AI systems.',
    image: null,
    linkedin: '#',
  },
  {
    name: 'Cloud Expert',
    title: 'Principal Cloud Architect',
    company: 'Tech Company',
    bio: 'Instructor bio will be added here. Specialized in scalable cloud infrastructure.',
    image: null,
    linkedin: '#',
  },
  {
    name: 'MLOps Specialist',
    title: 'Staff MLOps Engineer',
    company: 'Tech Company',
    bio: 'Instructor bio will be added here. Expert in deploying ML systems at scale.',
    image: null,
    linkedin: '#',
  },
]

export function InstructorsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Learn from the Best
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
            Our instructors are industry practitioners who&apos;ve built and shipped real systems at scale
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <div
              key={instructor.name}
              className="group relative rounded-2xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-background shadow-md">
                  <AvatarImage src={instructor.image || undefined} alt={instructor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{instructor.name}</h3>
                  <p className="text-sm text-muted-foreground">{instructor.title}</p>
                  <p className="text-sm font-medium text-primary">{instructor.company}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {instructor.bio}
              </p>
              {instructor.linkedin && (
                <Button asChild variant="ghost" size="sm" className="mt-4 gap-2">
                  <Link href={instructor.linkedin}>
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
