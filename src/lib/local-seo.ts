import { seoConfig } from './seo'
import { getServiceAreaCoordinates } from '@/utils/seo'

/**
 * Local Business SEO Configuration for Rio de Janeiro Region
 */

// Service areas with detailed information
export const serviceAreas = {
  'rio-de-janeiro': {
    name: 'Rio de Janeiro',
    state: 'RJ',
    region: 'Grande Rio',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    population: '6.7 milhões',
    highlights: ['Capital do estado', 'Centro financeiro', 'Maior concentração de empresas'],
    keyWords: ['termografia rio de janeiro', 'laudos nr-10 rj', 'engenharia elétrica rio'],
    description: 'Termografia industrial e diagnósticos elétricos na capital do Rio de Janeiro',
  },
  'cabo-frio': {
    name: 'Cabo Frio',
    state: 'RJ',
    region: 'Região dos Lagos',
    coordinates: { lat: -22.8794, lng: -42.0187 },
    population: '230 mil',
    highlights: [
      'Principal cidade da Região dos Lagos',
      'Polo turístico',
      'Setor hoteleiro desenvolvido',
    ],
    keyWords: ['termografia cabo frio', 'laudos nr-10 região dos lagos', 'engenharia hotéis'],
    description: 'Serviços especializados em termografia para hotéis e resorts em Cabo Frio',
  },
  buzios: {
    name: 'Búzios',
    state: 'RJ',
    region: 'Região dos Lagos',
    coordinates: { lat: -22.7469, lng: -41.8819 },
    population: '35 mil',
    highlights: ['Destino turístico internacional', 'Resorts de luxo', 'Alta temporada intensa'],
    keyWords: ['termografia búzios', 'laudos hotéis búzios', 'engenharia resorts'],
    description: 'Termografia industrial especializada para resorts e hotéis de luxo em Búzios',
  },
  petropolis: {
    name: 'Petrópolis',
    state: 'RJ',
    region: 'Serra Carioca',
    coordinates: { lat: -22.505, lng: -43.1786 },
    population: '300 mil',
    highlights: ['Cidade imperial', 'Clima serrano', 'Indústria desenvolvida'],
    keyWords: ['termografia petrópolis', 'laudos nr-10 serra', 'engenharia industrial serra'],
    description: 'Diagnósticos elétricos e termografia industrial na região serrana de Petrópolis',
  },
  niteroi: {
    name: 'Niterói',
    state: 'RJ',
    region: 'Grande Rio',
    coordinates: { lat: -22.8838, lng: -43.1044 },
    population: '515 mil',
    highlights: ['Cidade universitária', 'Setor de serviços desenvolvido', 'Ponte Rio-Niterói'],
    keyWords: ['termografia niterói', 'laudos nr-10 niterói', 'engenharia elétrica niterói'],
    description: 'Serviços de termografia e diagnósticos elétricos em Niterói e região',
  },
}

// Generate local business schema for specific location
export function generateLocalBusinessSchemaForLocation(locationKey: keyof typeof serviceAreas) {
  const location = serviceAreas[locationKey]
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${company.url}#localbusiness-${locationKey}`,
    name: `${company.name} - ${location.name}`,
    description: location.description,
    url: `${company.url}/${locationKey}`,
    image: `${company.url}/images/locations/${locationKey}.jpg`,
    telephone: company.phone,
    email: company.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: location.state,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Rio de Janeiro',
      },
    },
    serviceType: seoConfig.services,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Serviços em ${location.name}`,
      itemListElement: seoConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service,
          areaServed: location.name,
        },
      })),
    },
    knowsAbout: location.keyWords,
    slogan: `Termografia Industrial em ${location.name} - ${location.region}`,
  }
}

// Generate local SEO keywords for specific location and service
export function generateLocalKeywords(
  service: string,
  locationKey: keyof typeof serviceAreas,
  includeVariations: boolean = true
): string[] {
  const location = serviceAreas[locationKey]
  const baseKeywords = [
    `${service} ${location.name.toLowerCase()}`,
    `${service} ${location.state.toLowerCase()}`,
    `${service} ${location.region.toLowerCase()}`,
  ]

  if (includeVariations) {
    const variations = [
      `empresa ${service} ${location.name.toLowerCase()}`,
      `serviços ${service} ${location.name.toLowerCase()}`,
      `especialista ${service} ${location.name.toLowerCase()}`,
      `profissional ${service} ${location.name.toLowerCase()}`,
      `consultoria ${service} ${location.name.toLowerCase()}`,
      `${service} próximo ${location.name.toLowerCase()}`,
      `${service} região ${location.region.toLowerCase()}`,
    ]
    baseKeywords.push(...variations)
  }

  return baseKeywords
}

// Generate location-specific page metadata
export function generateLocationMetadata(locationKey: keyof typeof serviceAreas) {
  const location = serviceAreas[locationKey]
  const { company } = seoConfig

  return {
    title: `Termografia Industrial ${location.name} - ${company.name}`,
    description: `${location.description}. Atendemos ${location.name} e toda região ${location.region}. Engenheiros CRE A com equipamentos calibrados.`,
    keywords: [
      ...location.keyWords,
      ...generateLocalKeywords('termografia industrial', locationKey),
      ...generateLocalKeywords('laudos nr-10', locationKey),
      ...generateLocalKeywords('diagnósticos elétricos', locationKey),
    ],
    canonical: `/${locationKey}`,
    ogTitle: `Termografia Industrial ${location.name} - ${company.name}`,
    ogDescription: `Serviços especializados de termografia industrial em ${location.name}. ${location.highlights.join(', ')}.`,
    ogImage: `/images/locations/${locationKey}-og.jpg`,
  }
}

// Generate FAQ schema for location-specific questions
export function generateLocationFAQSchema(locationKey: keyof typeof serviceAreas) {
  const location = serviceAreas[locationKey]

  const commonFAQs = [
    {
      question: `Vocês atendem em ${location.name}?`,
      answer: `Sim! Atendemos ${location.name} e toda a região ${location.region}. Nossa equipe está preparada para atender suas necessidades com rapidez e qualidade técnica.`,
    },
    {
      question: `Qual o prazo para atendimento em ${location.name}?`,
      answer: `Para ${location.name}, o prazo de atendimento é de 24 a 48 horas para casos normais. Para emergências, temos atendimento prioritário via WhatsApp.`,
    },
    {
      question: `Quais serviços prestam em ${location.name}?`,
      answer: `Em ${location.name} oferecemos termografia industrial completa, laudos NR-10, diagnósticos elétricos, análise de qualidade energética e monitoramento contínuo.`,
    },
  ]

  // Add location-specific FAQs based on the region
  if (location.region === 'Região dos Lagos') {
    commonFAQs.push({
      question: `Vocês têm experiência com hotéis em ${location.name}?`,
      answer: `Sim! Temos ampla experiência com o setor hoteleiro em ${location.name}. Já atendemos diversos resorts e hotéis, garantindo disponibilidade total durante a alta temporada.`,
    })
  }

  if (location.region === 'Grande Rio') {
    commonFAQs.push({
      question: `Atendem prédios comerciais em ${location.name}?`,
      answer: `Sim! Temos grande experiência com prédios comerciais, shopping centers e condomínios empresariais em ${location.name}. Nossos laudos são aceitos em todas as fiscalizações.`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: commonFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate review schema for location
export function generateLocationReviewSchema(locationKey: keyof typeof serviceAreas) {
  const location = serviceAreas[locationKey]
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: `${company.name} - ${location.name}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.name,
        addressRegion: location.state,
      },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
    author: {
      '@type': 'Person',
      name: `Cliente ${location.name}`,
    },
    reviewBody: `Excelente atendimento da ${company.name} em ${location.name}. Profissionais altamente qualificados e equipamentos de primeira linha. Recomendo!`,
  }
}

// Service area radius calculation (in kilometers)
export const serviceRadiusKm = {
  'rio-de-janeiro': 50, // Covers most of Grande Rio
  'cabo-frio': 30, // Covers Região dos Lagos
  buzios: 25, // Covers nearby beach towns
  petropolis: 35, // Covers Serra Carioca
  niteroi: 25, // Covers eastern region
}

// Generate service area schema
export function generateServiceAreaSchema() {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${company.url}#service-areas`,
    name: 'Área de Atendimento - Termografia Industrial',
    description: 'Áreas de atendimento para serviços de termografia industrial no Rio de Janeiro',
    provider: {
      '@id': `${company.url}#organization`,
    },
    areaServed: Object.entries(serviceAreas).map(([key, area]) => ({
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: area.coordinates.lat,
        longitude: area.coordinates.lng,
      },
      geoRadius: `${serviceRadiusKm[key as keyof typeof serviceRadiusKm] * 1000}`, // Convert to meters
    })),
  }
}

// Emergency contact schema for critical services
export function generateEmergencyContactSchema() {
  const { company } = seoConfig

  return {
    '@context': 'https://schema.org',
    '@type': 'EmergencyService',
    name: `${company.name} - Atendimento Emergencial`,
    description: 'Atendimento emergencial 24h para falhas críticas em sistemas elétricos',
    telephone: company.phone,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceType: 'WhatsApp',
      availableLanguage: 'Portuguese',
    },
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: Object.values(serviceAreas).map((area) => ({
      '@type': 'City',
      name: area.name,
    })),
  }
}
