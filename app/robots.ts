import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api/',
        '/apply',
        '/auth/',
        '/feedback',
        // Per-session feedback QR links
        '/f/',
        // Personal contact card (phone/email — kept out of search & scrapers)
        '/connect',
        // Retired / hidden B2C cohorts
        '/cohorts/ai-engineering',
        '/cohorts/aws-cloud',
        '/cohorts/ai-deployment',
      ],
    },
    sitemap: 'https://pteachtech.in/sitemap.xml',
    host: 'https://pteachtech.in',
  }
}
