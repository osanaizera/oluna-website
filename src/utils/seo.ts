import { seoConfig } from '@/lib/seo'

/**
 * Generate canonical URL for a given path
 */
export function generateCanonicalUrl(path: string = ''): string {
  const { company } = seoConfig
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${company.url}${cleanPath}`
}

/**
 * Generate Open Graph image URL with dynamic parameters
 */
export function generateOGImageUrl(title: string, subtitle?: string, service?: string): string {
  const params = new URLSearchParams()
  params.set('title', title)
  if (subtitle) params.set('subtitle', subtitle)
  if (service) params.set('service', service)

  return `/api/og?${params.toString()}`
}

/**
 * Clean and optimize text for SEO
 */
export function cleanTextForSEO(text: string, maxLength: number = 160): string {
  return text
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .trim()
    .substring(0, maxLength)
    .trim()
}

/**
 * Generate meta description from content
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags and extra whitespace
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces
    .trim()

  if (cleanContent.length <= maxLength) {
    return cleanContent
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength)
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  )

  if (lastSentenceEnd > 80) {
    return truncated.substring(0, lastSentenceEnd + 1)
  }

  // If no sentence end found, find last complete word
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  return lastSpaceIndex > 80 ? `${truncated.substring(0, lastSpaceIndex)}...` : `${truncated}...`
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate keywords array for a specific service
 */
export function generateServiceKeywords(
  serviceName: string,
  location: string = 'Rio de Janeiro'
): string[] {
  const baseKeywords = seoConfig.defaults.keywords
  const serviceKeywords = [
    serviceName.toLowerCase(),
    `${serviceName.toLowerCase()} ${location.toLowerCase()}`,
    `${serviceName.toLowerCase()} rj`,
    `empresa ${serviceName.toLowerCase()}`,
    `serviços ${serviceName.toLowerCase()}`,
    `especialista ${serviceName.toLowerCase()}`,
    `profissional ${serviceName.toLowerCase()}`,
    `consultoria ${serviceName.toLowerCase()}`,
  ]

  return [...baseKeywords, ...serviceKeywords]
}

/**
 * Format Brazilian phone number for schema.org
 */
export function formatPhoneForSchema(phone: string): string {
  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Format as international number
  if (digits.length === 11 && digits.startsWith('55')) {
    return `+${digits}`
  } else if (digits.length === 11) {
    return `+55${digits}`
  } else if (digits.length === 10) {
    return `+5521${digits}`
  }

  return phone
}

/**
 * Generate rich snippets for services
 */
export function generateServiceRichSnippet(service: {
  name: string
  description: string
  price?: string
  duration?: string
  provider: string
}) {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider,
      url: company.url,
    },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: 'BRL',
      },
    }),
    ...(service.duration && {
      duration: service.duration,
    }),
  }
}

/**
 * Validate and clean URLs for sitemap
 */
export function validateUrlForSitemap(url: string): boolean {
  try {
    const urlObj = new URL(url, seoConfig.company.url)
    return urlObj.hostname === new URL(seoConfig.company.url).hostname
  } catch {
    return false
  }
}

/**
 * Generate hreflang attributes for multilingual support (future use)
 */
export function generateHreflangUrls(
  currentPath: string,
  languages: string[] = ['pt-BR']
): Array<{ hreflang: string; href: string }> {
  const { company } = seoConfig

  return languages.map((lang) => ({
    hreflang: lang,
    href: `${company.url}${currentPath}`,
  }))
}

/**
 * Extract and clean text content from HTML
 */
export function extractTextFromHTML(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

/**
 * Calculate reading time for content
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200 // Average reading speed
  const words = extractTextFromHTML(content).split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Generate social media share URLs
 */
export function generateShareUrls(url: string, title: string, description?: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description || '')

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  }
}

/**
 * Generate structured data for contact information
 */
export function generateContactSchema(contactInfo: {
  telephone?: string
  email?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    postalCode?: string
  }
}) {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    telephone: formatPhoneForSchema(contactInfo.telephone || company.phone),
    email: contactInfo.email || company.email,
    contactType: 'customer service',
    areaServed: 'BR',
    availableLanguage: 'Portuguese',
    ...(contactInfo.address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: contactInfo.address.street,
        addressLocality: contactInfo.address.city,
        addressRegion: contactInfo.address.state,
        addressCountry: contactInfo.address.country || 'BR',
        postalCode: contactInfo.address.postalCode,
      },
    }),
  }
}

/**
 * Generate performance optimization hints for SEO
 */
export function generateResourceHints(): Array<{
  rel: string
  href: string
  as?: string
  type?: string
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}> {
  return [
    // DNS prefetch for external resources
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },

    // Preconnect to critical external resources
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },

    // Preload critical assets
    {
      rel: 'preload',
      href: '/fonts/inter-latin-400-normal.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/inter-latin-600-normal.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ]
}

/**
 * Validate schema.org structured data
 */
export function validateStructuredData(schema: Record<string, any>): boolean {
  // Basic validation for required fields
  if (!schema['@context'] || !schema['@type']) {
    return false
  }

  // Validate URL format if present
  if (schema.url && !validateUrlForSitemap(schema.url)) {
    return false
  }

  return true
}

/**
 * Generate geo-coordinates for service areas in Rio de Janeiro
 */
export function getServiceAreaCoordinates(city: string): { lat: number; lng: number } | null {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    'rio de janeiro': { lat: -22.9068, lng: -43.1729 },
    niterói: { lat: -22.8838, lng: -43.1044 },
    'cabo frio': { lat: -22.8794, lng: -42.0187 },
    búzios: { lat: -22.7469, lng: -41.8819 },
    'arraial do cabo': { lat: -22.9661, lng: -42.0278 },
    petrópolis: { lat: -22.505, lng: -43.1786 },
    teresópolis: { lat: -22.4125, lng: -42.9656 },
    'nova friburgo': { lat: -22.2817, lng: -42.5312 },
    'são gonçalo': { lat: -22.8267, lng: -43.0537 },
  }

  return coordinates[city.toLowerCase()] || null
}
