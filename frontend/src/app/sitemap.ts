import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com' // Temporary domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other static routes if they exist, e.g. /admin could be excluded or included with lower priority.
    // For a single page portfolio, just the base URL is fine for now.
  ]
}
