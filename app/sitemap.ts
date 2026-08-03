import type { MetadataRoute } from 'next'
import { cohorts } from '@/lib/data/cohorts'

const BASE = 'https://pteachtech.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPaths: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/cohorts', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    { path: '/workshops', priority: 0.5 },
    { path: '/webinars', priority: 0.4 },
    { path: '/blog', priority: 0.4 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
    { path: '/refund', priority: 0.2 },
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority,
  }))

  // Only visible (non-hidden) cohorts are indexed.
  const cohortEntries: MetadataRoute.Sitemap = cohorts.map((c) => ({
    url: `${BASE}/cohorts/${c.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticEntries, ...cohortEntries]
}
