import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Blog',
  description: 'Insights, tutorials, and updates from the pTeachTech team.',
}

// Placeholder blog posts - will be replaced with CMS data
const blogPosts = [
  {
    title: 'Getting Started with AI Engineering',
    excerpt: 'A comprehensive guide to beginning your journey in AI engineering, from fundamentals to production systems.',
    category: 'AI Engineering',
    date: 'Coming Soon',
    slug: '#',
  },
  {
    title: 'Building Production RAG Systems',
    excerpt: 'Learn the architecture patterns and best practices for retrieval augmented generation in production.',
    category: 'AI Engineering',
    date: 'Coming Soon',
    slug: '#',
  },
  {
    title: 'AWS Cost Optimization Strategies',
    excerpt: 'Practical tips for reducing your AWS bill without sacrificing performance or reliability.',
    category: 'Cloud',
    date: 'Coming Soon',
    slug: '#',
  },
]

export default function BlogPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-8">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Blog
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
              Insights, tutorials, and updates from the pTeachTech team. 
              Deep dives into AI engineering, cloud architecture, and career development.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button asChild variant="ghost" className="gap-2 px-0">
                    <Link href={post.slug}>
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              More articles coming soon. Subscribe to our newsletter to get notified.
            </p>
            <Button asChild variant="outline" className="mt-4 gap-2">
              <Link href="/lens">
                Subscribe to Lens
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
