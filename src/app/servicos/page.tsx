import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema, generateServiceSchema } from '@/lib/seo'
import { generateServiceKeywords } from '@/utils/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Serviços - Termografia e Diagnósticos Elétricos',
  description:
    'Termografia industrial, laudos NR-10, diagnósticos elétricos, análise de qualidade energética e monitoramento contínuo no Rio de Janeiro. Engenheiros CRE A especializados.',
  keywords: [
    ...generateServiceKeywords('termografia industrial'),
    ...generateServiceKeywords('laudos nr-10'),
    'serviços engenharia rj',
    'diagnóstico elétrico industrial',
    'análise qualidade energia',
    'monitoramento contínuo',
    'manutenção preditiva rj',
    'inspeção termográfica',
  ],
  canonical: '/servicos',
  ogTitle: 'Serviços de Termografia Industrial - Ôluna Engenharia RJ',
  ogDescription:
    'Serviços especializados em termografia industrial, laudos NR-10 e diagnósticos elétricos no Rio de Janeiro. Engenheiros CRE A com equipamentos calibrados.',
  twitterTitle: 'Termografia Industrial RJ - Serviços Especializados',
  twitterDescription:
    'Laudos NR-10, termografia industrial e diagnósticos elétricos. Atendimento no Rio de Janeiro, Região dos Lagos e Serra Carioca.',
})

export default function ServicosPage() {
  // Structured data for Services page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Início', url: '/' },
    { name: 'Serviços', url: '/servicos' },
  ])

  const servicesData = [
    {
      name: 'Termografia Industrial',
      description:
        'Inspeção termográfica completa para detecção de falhas em equipamentos elétricos e mecânicos antes que causem paradas não programadas.',
      benefits: [
        'Detecção precoce de falhas',
        'Redução de downtime',
        'Aumento da vida útil dos equipamentos',
        'Maior segurança operacional',
      ],
    },
    {
      name: 'Laudos NR-10',
      description:
        'Elaboração de laudos técnicos conforme Norma Regulamentadora 10 para garantir a segurança em instalações elétricas.',
      benefits: [
        'Conformidade legal',
        'Identificação de riscos',
        'Medidas de proteção',
        'Segurança dos colaboradores',
      ],
    },
    {
      name: 'Diagnósticos Elétricos',
      description:
        'Análise completa de sistemas elétricos industriais com medições especializadas e relatórios técnicos detalhados.',
      benefits: [
        'Análise de qualidade de energia',
        'Detecção de harmônicas',
        'Otimização do fator de potência',
        'Redução de custos energéticos',
      ],
    },
  ]

  const servicesSchemas = servicesData.map((service) =>
    generateServiceSchema(service.name, service.description, service.benefits)
  )

  const servicesPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Serviços de Termografia Industrial - Ôluna Engenharia',
    description:
      'Catálogo completo de serviços especializados em termografia industrial e diagnósticos elétricos',
    url: 'https://oluna-engenharia.com.br/servicos',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Serviços de Engenharia',
      description: 'Lista completa de serviços oferecidos pela Ôluna Engenharia',
      itemListElement: servicesData.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: {
            '@type': 'Organization',
            name: 'Ôluna Engenharia',
            url: 'https://oluna-engenharia.com.br',
          },
          areaServed: {
            '@type': 'State',
            name: 'Rio de Janeiro',
          },
        },
      })),
    },
  }

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [servicesPageSchema, breadcrumbSchema, ...servicesSchemas],
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
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 25% 25%, var(--heat-orange) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, var(--cool-teal) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, var(--heat-red) 0%, transparent 40%)
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
                    Serviços
                  </li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Serviços Especializados</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Nossos{' '}
                <span
                  className="transition-all duration-1000"
                  style={{
                    color: 'var(--heat-orange)',
                    textShadow: '0 0 30px var(--heat-orange)40',
                  }}
                >
                  Serviços
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Soluções completas em termografia industrial, diagnósticos elétricos e laudos
                técnicos para proteger sua operação e garantir eficiência energética.
              </p>
            </div>
          </div>
        </section>

        {/* Serviços Principais */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Serviços Especializados
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Cada serviço é executado por engenheiros CRE A com equipamentos calibrados e
                  metodologia técnica comprovada.
                </p>
              </div>

              <div className="space-y-16">
                {/* Termografia Industrial */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Serviço Principal
                      </div>
                      <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">
                        Termografia Industrial
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Inspeção termográfica completa para detecção de falhas em equipamentos
                        elétricos e mecânicos antes que causem paradas não programadas. Utilizamos
                        câmeras termográficas calibradas e metodologia técnica avançada.
                      </p>

                      <div className="space-y-4 mb-8">
                        <h4 className="text-xl font-semibold text-gray-900">Benefícios:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Detecção precoce de falhas',
                            'Redução de downtime',
                            'Aumento da vida útil',
                            'Maior segurança operacional',
                            'Relatórios técnicos detalhados',
                            'Conformidade com normas',
                          ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                              <span className="text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">Aplicações Principais:</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>• Painéis elétricos</div>
                          <div>• Subestações</div>
                          <div>• Motores elétricos</div>
                          <div>• Transformadores</div>
                          <div>• Sistemas HVAC</div>
                          <div>• Instalações industriais</div>
                        </div>
                      </div>

                      <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-700 transition-all duration-300">
                        Solicitar Orçamento
                      </button>
                    </div>

                    <div className="relative bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 text-center overflow-hidden">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-20">
                        <img
                          src="/images/services/termografia.png"
                          alt="Termografia Industrial"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-6xl mb-6">🔥</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">Análise Gratuita</h4>
                        <p className="text-gray-600 mb-6">
                          Oferecemos análise termográfica inicial gratuita para avaliar suas
                          necessidades e demonstrar nosso expertise.
                        </p>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
                          <div className="text-sm text-gray-600">Prazo para análise inicial</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laudos NR-10 */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 text-center order-2 lg:order-1 overflow-hidden">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-15">
                        <img
                          src="/images/services/SPDA.png"
                          alt="Sistema SPDA"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-6xl mb-6">📋</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">Conformidade Legal</h4>
                        <p className="text-gray-600 mb-6">
                          Laudos técnicos elaborados conforme exigências legais e normas técnicas
                          vigentes, garantindo total conformidade.
                        </p>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4">
                          <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                          <div className="text-sm text-gray-600">Aprovados em fiscalizações</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-3xl font-bold text-blue-600 mb-2">48h</div>
                          <div className="text-sm text-gray-600">Prazo para entrega</div>
                        </div>
                      </div>
                    </div>

                    <div className="order-1 lg:order-2">
                      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Obrigatório por Lei
                      </div>
                      <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">
                        Laudos NR-10
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Elaboração de laudos técnicos conforme Norma Regulamentadora 10 para
                        garantir a segurança em instalações elétricas. Documentação completa para
                        atender fiscalizações e auditorias.
                      </p>

                      <div className="space-y-4 mb-8">
                        <h4 className="text-xl font-semibold text-gray-900">O que inclui:</h4>
                        <div className="space-y-3">
                          {[
                            'Avaliação de riscos elétricos',
                            'Análise de conformidade',
                            'Medidas de proteção coletiva',
                            'Procedimentos de segurança',
                            'Relatório técnico detalhado',
                            'ART (Anotação de Responsabilidade Técnica)',
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          Tipos de Estabelecimentos:
                        </h5>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>• Hotéis e resorts</div>
                          <div>• Prédios comerciais</div>
                          <div>• Shopping centers</div>
                          <div>• Condomínios</div>
                          <div>• Indústrias</div>
                          <div>• Hospitais</div>
                        </div>
                      </div>

                      <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300">
                        Solicitar Laudo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Diagnósticos Elétricos */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        Eficiência Energética
                      </div>
                      <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">
                        Diagnósticos Elétricos
                      </h3>
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Análise completa de sistemas elétricos industriais com medições
                        especializadas, identificação de distúrbios e otimização da qualidade de
                        energia para redução de custos operacionais.
                      </p>

                      <div className="space-y-4 mb-8">
                        <h4 className="text-xl font-semibold text-gray-900">
                          Análises Realizadas:
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            'Qualidade de energia elétrica',
                            'Análise de harmônicas (THD)',
                            'Fator de potência',
                            'Desequilíbrio de tensões',
                            'Flutuações de tensão',
                            'Interrupções e afundamentos',
                          ].map((analysis, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span className="text-gray-600">{analysis}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-teal-50 rounded-2xl p-6 mb-6">
                        <h5 className="font-semibold text-gray-900 mb-3">Benefícios da Análise:</h5>
                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                          <div>• Redução de custos com energia</div>
                          <div>• Eliminação de multas por baixo FP</div>
                          <div>• Aumento da vida útil dos equipamentos</div>
                          <div>• Melhoria da estabilidade do sistema</div>
                          <div>• Identificação de equipamentos problemáticos</div>
                        </div>
                      </div>

                      <button className="bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-300">
                        Solicitar Análise
                      </button>
                    </div>

                    <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-8 text-center overflow-hidden">
                      {/* Background Image */}
                      <div className="absolute inset-0 opacity-15">
                        <img
                          src="/images/services/diagnostico.png"
                          alt="Diagnóstico Elétrico"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="text-6xl mb-6">⚡</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">
                          Monitoramento 7 Dias
                        </h4>
                        <p className="text-gray-600 mb-6">
                          Instalamos equipamentos de medição por 7 dias consecutivos para capturar
                          todas as variações do sistema.
                        </p>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-4">
                          <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
                          <div className="text-sm text-gray-600">Monitoramento contínuo</div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-3xl font-bold text-teal-600 mb-2">15%</div>
                          <div className="text-sm text-gray-600">Economia média alcançada</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Complementares */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Serviços Complementares
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Soluções adicionais para completar a proteção e otimização da sua operação.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Monitoramento Contínuo',
                    description: 'Sistema de monitoramento online 24/7 com alertas automáticos.',
                    features: [
                      'Sensores IoT',
                      'Dashboard online',
                      'Alertas por WhatsApp',
                      'Relatórios automáticos',
                    ],
                  },
                  {
                    title: 'Laudos NR-12',
                    description: 'Laudos técnicos para caldeiras e vasos de pressão.',
                    features: [
                      'Inspeção completa',
                      'Relatório técnico',
                      'ART incluída',
                      'Conformidade legal',
                    ],
                  },
                  {
                    title: 'Consultoria Energética',
                    description: 'Consultoria especializada para otimização do consumo energético.',
                    features: [
                      'Análise de consumo',
                      'Plano de eficiência',
                      'ROI calculado',
                      'Acompanhamento',
                    ],
                  },
                  {
                    title: 'Análise Vibratória',
                    description: 'Detecção de falhas mecânicas em equipamentos rotativos.',
                    features: [
                      'Equipamentos calibrados',
                      'Análise FFT',
                      'Tendências',
                      'Prognóstico',
                    ],
                  },
                  {
                    title: 'Ultrassom Industrial',
                    description: 'Detecção de vazamentos e falhas em equipamentos.',
                    features: [
                      'Detecção de vazamentos',
                      'Análise de rolamentos',
                      'Lubrificação',
                      'Relatórios',
                    ],
                  },
                  {
                    title: 'Treinamentos Técnicos',
                    description: 'Capacitação da sua equipe em manutenção preditiva.',
                    features: [
                      'NR-10 básico',
                      'Termografia básica',
                      'Certificados',
                      'Material didático',
                    ],
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <button className="w-full bg-gray-800 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300">
                      Saber Mais
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Pronto para Proteger Sua Operação?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Entre em contato e receba uma análise gratuita das suas necessidades. Nossos
                especialistas estão prontos para atender você.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contato"
                  className="bg-gradient-to-r from-primary-400 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105"
                >
                  Análise Gratuita
                </a>
                <a
                  href="tel:+5521973498376"
                  className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Ligar Agora
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
