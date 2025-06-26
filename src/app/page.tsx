import type { Metadata } from 'next'
import ServicesCarousel from '@/components/sections/ServicesCarousel'
import ContactSection from '@/components/sections/ContactSection'
import {
  ThermographyIcon,
  EnergyDiagnosticIcon,
} from '@/components/icons/ServiceIcons'
import { ThermoCard } from '@/components/effects/ThermoScroll'
import ScrollIndicator from '@/components/common/ScrollIndicator'
import { generatePageMetadata, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { generateServiceKeywords } from '@/utils/seo'
import HeroCarousel from '@/components/sections/HeroCarousel'

export const metadata: Metadata = generatePageMetadata({
  title: 'Termografia Industrial e Diagnósticos Elétricos | Manutenção Preditiva',
  description:
    'Engenheiros CRE A especialistas em termografia industrial, diagnósticos elétricos e eficiência energética. Detecte falhas antes que aconteçam, reduza downtime e garanta conformidade NR-10/12. Orçamento em 24h.',
  keywords: generateServiceKeywords('termografia industrial'),
  canonical: '/',
  ogTitle: 'Ôluna Engenharia - Termografia Industrial Rio de Janeiro',
  ogDescription:
    'Detecte falhas antes que aconteçam com nossa expertise em termografia industrial e diagnósticos elétricos. Engenheiros CRE A atuando no Rio de Janeiro e região.',
  twitterTitle: 'Termografia Industrial RJ - Diagnósticos Elétricos',
  twitterDescription:
    'Engenheiros especialistas em termografia industrial. Laudos NR-10, análise preditiva e eficiência energética no Rio de Janeiro.',
})

export default function HomePage() {
  // Enhanced structured data for homepage
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'Início', url: '/' }])

  const faqSchema = generateFAQSchema([
    {
      question: 'O que é termografia industrial?',
      answer:
        'A termografia industrial é uma técnica de inspeção não destrutiva que utiliza câmeras térmicas para detectar variações de temperatura em equipamentos elétricos e mecânicos, permitindo identificar problemas antes que causem falhas.',
    },
    {
      question: 'Qual a importância dos laudos NR-10?',
      answer:
        'Os laudos NR-10 são obrigatórios por lei e garantem a segurança das instalações elétricas. Eles identificam riscos, avaliam conformidades e propõem medidas corretivas para prevenir acidentes.',
    },
    {
      question: 'Com que frequência devo fazer inspeção termográfica?',
      answer:
        'Recomendamos inspeções termográficas semestrais para equipamentos críticos e anuais para equipamentos de menor criticidade, seguindo as normas técnicas e o plano de manutenção preditiva.',
    },
    {
      question: 'A Ôluna atende em quais regiões?',
      answer:
        'Atendemos Rio de Janeiro, Grande Rio, Região dos Lagos (Cabo Frio, Búzios, Arraial), Serra Carioca (Petrópolis, Teresópolis, Nova Friburgo) e toda a região metropolitana.',
    },
    {
      question: 'Quanto tempo leva para receber o relatório?',
      answer:
        'Nossos relatórios técnicos são entregues em até 48 horas após a inspeção, incluindo análise detalhada, fotos termográficas, diagnósticos e recomendações de ações corretivas.',
    },
  ])

  const homePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Ôluna Engenharia - Termografia Industrial Rio de Janeiro',
    description:
      'Engenheiros CRE A especialistas em termografia industrial, diagnósticos elétricos e eficiência energética no Rio de Janeiro',
    url: 'https://oluna-engenharia.com.br',
    mainEntity: {
      '@type': 'ProfessionalService',
      name: 'Ôluna Engenharia',
      description: 'Serviços especializados em termografia industrial e diagnósticos elétricos',
      serviceType: [
        'Termografia Industrial',
        'Diagnóstico Elétrico',
        'Inspeção Termográfica',
        'Laudos NR-10',
        'Laudos NR-12',
        'Monitoramento Contínuo',
        'Análise de Qualidade Energética',
        'Consultoria Energética',
        'Manutenção Preditiva',
      ],
      provider: {
        '@type': 'Organization',
        name: 'Ôluna Engenharia',
        url: 'https://oluna-engenharia.com.br',
        telephone: '+55-21-99999-9999',
        email: 'contato@oluna-engenharia.com.br',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BR',
          addressRegion: 'RJ',
          addressLocality: 'Rio de Janeiro',
        },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'CRE A',
          recognizedBy: {
            '@type': 'Organization',
            name: 'CREA',
          },
        },
      },
      areaServed: [
        'Rio de Janeiro',
        'Niterói',
        'Cabo Frio',
        'Búzios',
        'Arraial do Cabo',
        'Petrópolis',
        'Teresópolis',
        'Nova Friburgo',
      ],
      offers: [
        {
          '@type': 'Offer',
          name: 'Orçamento de Termografia',
          description: 'Orçamento completo em 24 horas',
          price: '0',
          priceCurrency: 'BRL',
        },
        {
          '@type': 'Offer',
          name: 'Termografia Industrial Completa',
          description: 'Inspeção termográfica completa com relatório técnico',
          category: 'Termografia',
        },
        {
          '@type': 'Offer',
          name: 'Laudos NR-10',
          description: 'Laudos técnicos para conformidade NR-10',
          category: 'Segurança',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
        bestRating: '5',
      },
    },
  }

  // Combine all schemas for this page
  const combinedPageSchema = {
    '@context': 'https://schema.org',
    '@graph': [homePageSchema, breadcrumbSchema, faqSchema],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedPageSchema, null, 2),
        }}
      />
      <div className="min-h-screen">
        {/* Hero Carousel Section */}
        <HeroCarousel />

        {/* Seção de Serviços - Carrossel Avançado */}
        <ServicesCarousel />

        {/* Seção Sobre */}
        <section
          id="sobre"
          className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
          aria-label="Sobre a Ôluna Engenharia"
        >
          {/* Simplified Thermal Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                background: `
                radial-gradient(circle at 20% 30%, var(--heat-orange) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, var(--cool-teal) 0%, transparent 50%)
              `,
              }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Engenharia Carioca</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Sobre a{' '}
                <span
                  className="transition-all duration-1000"
                  style={{
                    color: 'var(--heat-orange)',
                    textShadow: '0 0 30px var(--heat-orange)40',
                  }}
                >
                  Ôluna
                </span>
              </h2>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Contamos com corpo técnico de engenheiros e técnicos especializados, com experiência em grandes indústrias do Brasil.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Texto principal */}
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Somos uma empresa carioca especializada em soluções energéticas inovadoras. 
                  Nossa expertise técnica consolidada permite entregar soluções de engenharia de 
                  precisão com qualidade e confiabilidade.
                </p>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  Vivemos o momento de modernização da sociedade durante a{' '}
                  <strong className="text-white">transição energética</strong>, e sabemos da
                  importância de ter parceiros que forneçam serviços e informações de qualidade.
                </p>
              </div>

              {/* Estatísticas e credenciais */}
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                    <div className="text-3xl font-bold text-white mb-2">ART</div>
                    <div className="text-white font-medium mb-1">CREA RJ</div>
                    <div className="text-gray-300 text-sm">Emitimos</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
                    <div className="text-3xl font-bold text-white mb-2">RJ</div>
                    <div className="text-white font-medium mb-1">Empresa</div>
                    <div className="text-gray-300 text-sm">Carioca</div>
                  </div>
                </div>

                {/* Áreas de atuação */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-4 text-center">
                    Áreas de Atuação
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-gray-300">Rio de Janeiro e Grande Rio</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-gray-300">
                        Região dos Lagos (Cabo Frio, Búzios, Arraial)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                      <span className="text-gray-300">
                        Serra Carioca (Petrópolis, Teresópolis, Nova Friburgo)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Cases */}
        <section
          id="cases"
          className="py-20 bg-gray-50 relative overflow-hidden"
          aria-label="Cases de sucesso"
        >
          {/* Thermal Background for Cases */}
          <div className="absolute inset-0">
            {/* Animated background waves */}
            <div className="absolute inset-0 opacity-8">
              <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="casesThermal1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="casesThermal2" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="var(--cool-teal)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--heat-orange)" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="casesGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Diagonal thermal flows */}
                <path
                  d="M0,0 Q300,100 600,0 T1200,0 L1200,200 Q900,150 600,200 T0,200 Z"
                  fill="url(#casesThermal1)"
                  filter="url(#casesGlow)"
                  className="animate-pulse"
                  style={{ animationDuration: '8s' }}
                />

                <path
                  d="M0,600 Q300,500 600,600 T1200,600 L1200,800 L0,800 Z"
                  fill="url(#casesThermal2)"
                  filter="url(#casesGlow)"
                  className="animate-pulse"
                  style={{ animationDuration: '10s', animationDelay: '2s' }}
                />

                {/* Thermal success indicators */}
                {[...Array(6)].map((_, i) => (
                  <g key={i}>
                    <circle
                      cx={200 + i * 160}
                      cy={300 + (i % 2) * 100}
                      r="3"
                      fill="var(--heat-orange)"
                      opacity="0.3"
                      className="animate-ping"
                      style={{
                        animationDuration: `${3 + (i % 2)}s`,
                        animationDelay: `${i * 0.8}s`,
                      }}
                    />
                    <circle
                      cx={200 + i * 160}
                      cy={300 + (i % 2) * 100}
                      r="1"
                      fill="var(--heat-orange)"
                      opacity="0.6"
                    />
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Cases de Sucesso
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Resultados reais que transformaram operações e reduziram custos para nossos
                clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Case 1 - Hotel Resort */}
              <ThermoCard
                delay={0}
                className="shadow-card hover:shadow-card-hover transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <ThermographyIcon className="w-6 h-6 text-gray-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900">
                      Hotel Resort - Cabo Frio
                    </h3>
                    <p className="text-gray-500">Região dos Lagos • Termografia de Painéis</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Desafio</h4>
                    <p className="text-gray-600">
                      Falhas recorrentes no sistema elétrico durante alta temporada, comprometendo a
                      experiência dos hóspedes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solução</h4>
                    <p className="text-gray-600">
                      Inspeção termográfica da subestação de 500kVA e 12 painéis elétricos
                      principais com câmera termográfica calibrada.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Resultado</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">8</div>
                        <div className="text-sm text-gray-600">Pontos Quentes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">500kVA</div>
                        <div className="text-sm text-gray-600">Subestação</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  aria-label="Ver relatório do case Hotel Resort - Cabo Frio"
                >
                  Ver Relatório
                </button>
              </ThermoCard>

              {/* Case 2 - Condomínio Empresarial */}
              <ThermoCard
                delay={300}
                className="shadow-card hover:shadow-card-hover transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <EnergyDiagnosticIcon className="w-6 h-6 text-gray-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-gray-900">
                      Condomínio Empresarial
                    </h3>
                    <p className="text-gray-500">
                      Rio de Janeiro • Análise de Qualidade de Energia
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Desafio</h4>
                    <p className="text-gray-600">
                      Equipamentos de ar condicionado apresentando falhas e multas por baixo fator
                      de potência.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Solução</h4>
                    <p className="text-gray-600">
                      Medição de qualidade energética com analisador trifásico, análise de
                      harmônicas e THD durante 7 dias consecutivos.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Resultado</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">0.95</div>
                        <div className="text-sm text-gray-600">Fator Potência</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">24</div>
                        <div className="text-sm text-gray-600">Circuitos Analisados</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                  aria-label="Ver relatório do case Condomínio Empresarial"
                >
                  Ver Relatório
                </button>
              </ThermoCard>
            </div>

          </div>
        </section>

        {/* Seção de Contato/Leads */}
        <ContactSection />
      </div>
    </>
  )
}
