import { Metadata } from 'next'

// Base SEO configuration for Ôluna Engenharia
export const seoConfig = {
  // Company Information
  company: {
    name: 'Ôluna Engenharia',
    description:
      'Engenheiros CRE A especialistas em termografia industrial, diagnósticos elétricos e eficiência energética.',
    url: 'https://oluna.com.br',
    logo: '/logo.png',
    email: 'contato@oluna.com.br',
    phone: '+55-21-97349-8376',
    foundingYear: '1998',
    headquarters: 'Leme, Rio de Janeiro, RJ, Brasil',
  },

  // SEO Defaults
  defaults: {
    titleTemplate: '%s | Ôluna Engenharia',
    defaultTitle: 'Ôluna Engenharia - Termografia Industrial e Diagnósticos Elétricos',
    description:
      'Engenheiros CRE A especialistas em termografia industrial, diagnósticos elétricos e eficiência energética. Detecte falhas antes que aconteçam com manutenção preditiva.',
    keywords: [
      'termografia industrial',
      'diagnóstico elétrico',
      'inspeção termográfica',
      'manutenção preditiva',
      'eficiência energética',
      'laudos NR-10',
      'laudos NR-12',
      'monitoramento contínuo',
      'engenheiros CRE A',
      'análise de qualidade energética',
      'fator de potência',
      'harmônicas elétricas',
      'consultoria energética',
      'Rio de Janeiro',
      'Região dos Lagos',
      'Serra Carioca',
      'engenharia elétrica',
      'manutenção industrial',
      'inspeção elétrica',
      'segurança elétrica',
      'energia sustentável',
    ],
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Ôluna Engenharia',
  },

  // Social Media
  social: {
    twitter: '@olunaengenharia',
    facebook: 'olunaengenharia',
    linkedin: 'company/oluna-engenharia',
    instagram: '@olunaengenharia',
    youtube: '@olunaengenharia',
  },

  // Service Areas
  serviceAreas: [
    'Leme',
    'Rio de Janeiro',
    'Grande Rio',
    'Região dos Lagos',
    'Cabo Frio',
    'Búzios',
    'Arraial do Cabo',
    'Serra Carioca',
    'Petrópolis',
    'Teresópolis',
    'Nova Friburgo',
    'Niterói',
    'São Gonçalo',
  ],

  // Business Categories
  businessCategories: [
    'Professional Service',
    'Engineering Consultant',
    'Electrical Engineer',
    'Industrial Services',
    'Energy Consultant',
    'Maintenance Services',
  ],

  // Services Offered
  services: [
    'Termografia Industrial',
    'Diagnóstico Elétrico',
    'Laudos NR-10',
    'Laudos NR-12',
    'Monitoramento Contínuo',
    'Análise de Qualidade Energética',
    'Consultoria Energética',
    'Inspeção Termográfica',
    'Manutenção Preditiva',
    'Eficiência Energética',
  ],
}

// Image optimization for SEO
export const seoImages = {
  og: {
    width: 1200,
    height: 630,
    alt: 'Ôluna Engenharia - Termografia Industrial e Diagnósticos Elétricos',
  },
  twitter: {
    width: 1200,
    height: 600,
    alt: 'Ôluna Engenharia - Especialistas em Termografia',
  },
  favicon: {
    sizes: [16, 32, 96, 192, 512],
    formats: ['ico', 'png', 'svg'],
  },
}

// Generate default metadata for Next.js
export function generateDefaultMetadata(): Metadata {
  const { company, defaults, social } = seoConfig

  return {
    metadataBase: new URL(company.url),
    title: {
      default: defaults.defaultTitle,
      template: defaults.titleTemplate,
    },
    description: defaults.description,
    keywords: defaults.keywords,
    authors: [{ name: company.name, url: company.url }],
    creator: company.name,
    publisher: company.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: defaults.locale,
      url: company.url,
      siteName: defaults.siteName,
      title: defaults.defaultTitle,
      description: defaults.description,
      images: [
        {
          url: '/og-image.jpg',
          width: seoImages.og.width,
          height: seoImages.og.height,
          alt: seoImages.og.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaults.defaultTitle,
      description: defaults.description,
      images: ['/twitter-image.jpg'],
      creator: social.twitter,
      site: social.twitter,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#FF6A3D' }],
    },
    manifest: '/site.webmanifest',
    other: {
      'msapplication-TileColor': '#FF6A3D',
      'theme-color': '#FF6A3D',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  }
}

// Page-specific metadata generator
export interface PageSEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  noindex?: boolean
  nofollow?: boolean
  jsonLd?: Record<string, any>
}

export function generatePageMetadata(props: PageSEOProps): Metadata {
  const { company, defaults, social } = seoConfig
  const {
    title,
    description = defaults.description,
    keywords = [],
    canonical,
    ogTitle,
    ogDescription,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    twitterTitle,
    twitterDescription,
    twitterImage = '/twitter-image.jpg',
    noindex = false,
    nofollow = false,
  } = props

  const fullTitle = title ? `${title} | ${company.name}` : defaults.defaultTitle
  const allKeywords = [...defaults.keywords, ...keywords]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: ogTitle || fullTitle,
      description: ogDescription || description,
      url: canonical ? `${company.url}${canonical}` : company.url,
      siteName: defaults.siteName,
      images: [
        {
          url: ogImage,
          width: seoImages.og.width,
          height: seoImages.og.height,
          alt: ogTitle || fullTitle,
        },
      ],
      locale: defaults.locale,
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle || ogTitle || fullTitle,
      description: twitterDescription || ogDescription || description,
      images: [twitterImage],
      creator: social.twitter,
      site: social.twitter,
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

// JSON-LD structured data generators
export function generateOrganizationSchema() {
  const { company, services, serviceAreas } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${company.url}#organization`,
    name: company.name,
    alternateName: ['Ôluna', 'Oluna Engenharia'],
    description: company.description,
    url: company.url,
    logo: {
      '@type': 'ImageObject',
      url: `${company.url}/logo.png`,
      width: 400,
      height: 400,
    },
    image: `${company.url}/og-image.jpg`,
    telephone: company.phone,
    email: company.email,
    foundingDate: company.foundingYear,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'RJ',
      addressLocality: 'Rio de Janeiro',
    },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
      containedInPlace: {
        '@type': 'State',
        name: 'Rio de Janeiro',
        containedInPlace: {
          '@type': 'Country',
          name: 'Brasil',
        },
      },
    })),
    serviceType: services,
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'CRE A',
      recognizedBy: {
        '@type': 'Organization',
        name: 'CREA - Conselho Regional de Engenharia e Agronomia',
      },
    },
    sameAs: [
      `https://twitter.com/${seoConfig.social.twitter.replace('@', '')}`,
      `https://facebook.com/${seoConfig.social.facebook}`,
      `https://linkedin.com/company/${seoConfig.social.linkedin}`,
      `https://instagram.com/${seoConfig.social.instagram.replace('@', '')}`,
      `https://youtube.com/${seoConfig.social.youtube.replace('@', '')}`,
    ],
  }
}

export function generateProfessionalServiceSchema() {
  const { company, services, serviceAreas } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${company.url}#service`,
    name: company.name,
    description:
      'Serviços especializados em termografia industrial, diagnósticos elétricos e eficiência energética',
    url: company.url,
    logo: `${company.url}/logo.png`,
    image: `${company.url}/og-image.jpg`,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'RJ',
      addressLocality: 'Rio de Janeiro',
    },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -22.9068,
        longitude: -43.1729,
      },
      geoRadius: '200000', // 200km radius
    })),
    serviceType: services,
    provider: {
      '@id': `${company.url}#organization`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Engenharia',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          description: `Serviços profissionais de ${service.toLowerCase()}`,
        },
      })),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

export function generateLocalBusinessSchema() {
  const { company, services, serviceAreas } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${company.url}#localbusiness`,
    name: company.name,
    description: company.description,
    url: company.url,
    logo: `${company.url}/logo.png`,
    image: `${company.url}/og-image.jpg`,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'RJ',
      addressLocality: 'Rio de Janeiro',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.9068,
      longitude: -43.1729,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    serviceArea: serviceAreas.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Engenharia',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
        },
      })),
    },
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  }
}

export function generateWebSiteSchema() {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${company.url}#website`,
    url: company.url,
    name: company.name,
    description: company.description,
    publisher: {
      '@id': `${company.url}#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${company.url}/busca?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${company.url}${item.url}`,
    })),
  }
}

// FAQ Schema generator
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Service-specific schema generators
export function generateServiceSchema(
  serviceName: string,
  description: string,
  benefits: string[]
) {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@id': `${company.url}#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'Rio de Janeiro',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: benefits.map((benefit) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: benefit,
        },
      })),
    },
  }
}

// Article/Blog post schema
export function generateArticleSchema(
  title: string,
  description: string,
  publishDate: string,
  modifiedDate: string,
  authorName: string = 'Ôluna Engenharia',
  imageUrl: string = '/og-image.jpg'
) {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: `${company.url}${imageUrl}`,
    datePublished: publishDate,
    dateModified: modifiedDate,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: company.url,
    },
    publisher: {
      '@id': `${company.url}#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': company.url,
    },
  }
}
