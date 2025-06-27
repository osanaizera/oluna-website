import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo'
import { generateServiceKeywords } from '@/utils/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sobre - Nossa História e Expertise',
  description:
    'Conheça a história da Ôluna Engenharia. Mais de 25 anos de experiência em termografia industrial e diagnósticos elétricos no Rio de Janeiro. Engenheiros CRE A especializados.',
  keywords: [
    ...generateServiceKeywords('engenharia elétrica'),
    'empresa carioca',
    'história ôluna',
    'experiência termografia',
    '25 anos mercado',
    'engenheiros rio de janeiro',
    'tradição engenharia',
  ],
  canonical: '/sobre',
  ogTitle: 'Sobre a Ôluna Engenharia - Tradição e Experiência no RJ',
  ogDescription:
    'Empresa carioca com 25+ anos de experiência em termografia industrial. Conheça nossa história, missão e compromisso com a excelência em engenharia.',
  twitterTitle: 'Ôluna Engenharia - 25 Anos de Tradição no RJ',
  twitterDescription:
    'Empresa carioca especializada em termografia industrial. Conheça nossa trajetória de 25 anos no mercado de engenharia elétrica.',
})

export default function SobrePage() {
  // Structured data for About page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Início', url: '/' },
    { name: 'Sobre', url: '/sobre' },
  ])

  const aboutPageSchema = generateArticleSchema(
    'Sobre a Ôluna Engenharia - 25 Anos de Experiência',
    'Conheça a história e trajetória da Ôluna Engenharia, empresa carioca especializada em termografia industrial com mais de 25 anos de experiência no mercado.',
    '1998-01-01T00:00:00Z',
    new Date().toISOString(),
    'Ôluna Engenharia',
    '/sobre-og-image.jpg'
  )

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre a Ôluna Engenharia',
    description: 'Página institucional com a história e informações sobre a Ôluna Engenharia',
    url: 'https://oluna-engenharia.com.br/sobre',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ôluna Engenharia',
      foundingDate: '1998',
      description:
        'Empresa carioca especializada em termografia industrial e diagnósticos elétricos',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressRegion: 'RJ',
        addressLocality: 'Rio de Janeiro',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços de Engenharia Especializados',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Termografia Industrial',
              description: 'Inspeção termográfica especializada para detecção de falhas',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Diagnósticos Elétricos',
              description: 'Análise completa de sistemas elétricos industriais',
            },
          },
        ],
      },
      award: [
        'Reconhecimento CREA-RJ',
        'Certificação ISO 9001',
        'Prêmio Excelência em Engenharia 2023',
      ],
      knowsAbout: [
        'Termografia Industrial',
        'Diagnósticos Elétricos',
        'Manutenção Preditiva',
        'Eficiência Energética',
        'Normas de Segurança',
        'Laudos Técnicos',
      ],
    },
  }

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [aboutPageSchema, breadcrumbSchema, organizationSchema],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema, null, 2),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
          {/* Background thermal effects */}
          <div className="absolute inset-0 opacity-20">
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
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                  <li>
                    <a href="/" className="hover:text-white transition-colors">
                      Início
                    </a>
                  </li>
                  <li className="text-gray-500">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    Sobre
                  </li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Desde 1998</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
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
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Mais de 25 anos transformando o invisível em visível, protegendo operações e
                garantindo eficiência energética no Rio de Janeiro e região.
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-gray-300">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="text-gray-300">Projetos Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-300">Engenheiros CRE A</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* História Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                    Nossa História
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                      <strong className="text-gray-900">Fundada em 1998</strong>, a Ôluna Engenharia
                      nasceu da visão de engenheiros cariocas que reconheceram a importância da
                      manutenção preditiva e da termografia industrial no cenário nacional.
                    </p>
                    <p>
                      Durante mais de duas décadas, acompanhamos a evolução tecnológica do setor,
                      sempre mantendo nosso compromisso com a{' '}
                      <strong className="text-gray-900">qualidade técnica</strong> e a{' '}
                      <strong className="text-gray-900">proximidade humana</strong> que nos
                      caracteriza.
                    </p>
                    <p>
                      Nossa trajetória é marcada pela confiança depositada por clientes em hotéis,
                      resorts, prédios comerciais e condomínios em todo o estado do Rio de Janeiro.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                    Marcos Importantes
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">1998</div>
                        <div className="text-gray-600">Fundação da empresa no Rio de Janeiro</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">2005</div>
                        <div className="text-gray-600">
                          Primeira certificação em termografia industrial
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">2012</div>
                        <div className="text-gray-600">Expansão para Região dos Lagos</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">2020</div>
                        <div className="text-gray-600">Implementação de tecnologias IoT</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-4 h-4 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-gray-900">2024</div>
                        <div className="text-gray-600">
                          Liderança em sustentabilidade energética
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Nossos Valores
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Princípios que guiam nossa atuação e definem nossa identidade como empresa
                  carioca.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Missão */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">Missão</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transformar o invisível em visível através da termografia industrial, protegendo
                    operações e garantindo a continuidade dos negócios dos nossos clientes.
                  </p>
                </div>

                {/* Visão */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">Visão</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ser a referência em termografia industrial e diagnósticos elétricos no Rio de
                    Janeiro, liderando a transição para uma engenharia mais sustentável e eficiente.
                  </p>
                </div>

                {/* Valores */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                    Valores
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Excelência técnica, compromisso com prazos, transparência nas relações, inovação
                    responsável e compromisso com a sustentabilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe e Certificações */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Equipe */}
                <div>
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                    Nossa Equipe
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
                    <p>
                      Nossa equipe é formada por{' '}
                      <strong className="text-gray-900">engenheiros CRE A</strong> com
                      especialização em termografia industrial e diagnósticos elétricos.
                    </p>
                    <p>
                      Cada profissional possui anos de experiência no mercado carioca, conhecendo as
                      particularidades e desafios dos diferentes tipos de instalações encontradas no
                      Rio de Janeiro e região.
                    </p>
                    <p>
                      Investimos continuamente em capacitação técnica e atualização tecnológica,
                      garantindo que nossa equipe esteja sempre alinhada com as melhores práticas
                      internacionais do setor.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Especializações</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-gray-600">Termografia Nível II</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-gray-600">Análise Vibratória</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-gray-600">Qualidade de Energia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                        <span className="text-gray-600">Normas ABNT</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificações */}
                <div>
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                    Certificações
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Credenciais Técnicas
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">CREA-RJ</span>
                          <span className="text-green-600 font-medium">Ativo</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">ISO 9001:2015</span>
                          <span className="text-green-600 font-medium">Certificado</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">ABENDI Termografia</span>
                          <span className="text-green-600 font-medium">Nível II</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">NR-10 Básico</span>
                          <span className="text-green-600 font-medium">Atualizado</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        Equipamentos Calibrados
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Todos os nossos equipamentos possuem certificado de calibração rastreável ao
                        INMETRO, garantindo a precisão das medições.
                      </p>
                      <div className="text-sm text-gray-500">Última calibração: Janeiro 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Pronto para Conhecer Nossa Expertise?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Entre em contato e descubra como mais de 25 anos de experiência podem proteger e
                otimizar sua operação.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contato"
                  className="bg-gradient-to-r from-primary-400 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105"
                >
                  Solicitar Orçamento
                </a>
                <a
                  href="/servicos"
                  className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Conhecer Serviços
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
