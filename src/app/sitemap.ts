import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const { company } = seoConfig
  const baseUrl = company.url

  // Static pages with their priorities and change frequencies
  const staticPages = [
    {
      url: '',
      priority: 1.0,
      changeFrequency: 'daily' as const,
      lastModified: new Date(),
    },
    {
      url: '/sobre',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/servicos',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: new Date(),
    },
    {
      url: '/projetos',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/contato',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
  ]

  // Service-specific pages (for future implementation)
  const servicePages = [
    {
      url: '/servicos/termografia-industrial',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/servicos/laudos-nr-10',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/servicos/diagnosticos-eletricos',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/servicos/monitoramento-continuo',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
  ]

  // Location-based pages (for local SEO)
  const locationPages = [
    {
      url: '/rio-de-janeiro',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/cabo-frio',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/buzios',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
    {
      url: '/petropolis',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
    },
  ]

  // Combine all pages
  const allPages = [...staticPages, ...servicePages, ...locationPages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
