import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import { generateServiceKeywords } from '@/utils/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Cases de Sucesso e Projetos - Termografia Industrial Rio de Janeiro',
  description:
    'Conheça nossos cases de sucesso em termografia industrial, laudos NR-10 e diagnósticos elétricos no Rio de Janeiro. Projetos realizados em hotéis, condomínios e indústrias.',
  keywords: [
    ...generateServiceKeywords('cases de sucesso'),
    'projetos termografia rj',
    'portfolio engenharia',
    'cases hotéis',
    'projetos condomínios',
    'termografia industrial cases',
    'laudos nr-10 exemplos',
    'referências clientes',
  ],
  canonical: '/projetos',
  ogTitle: 'Cases de Sucesso - Projetos de Termografia Industrial RJ',
  ogDescription:
    'Descubra como a Ôluna Engenharia transformou operações com termografia industrial. Cases reais de hotéis, condomínios e indústrias no Rio de Janeiro.',
  twitterTitle: 'Portfolio Ôluna - Cases de Termografia Industrial',
  twitterDescription:
    'Cases de sucesso em termografia industrial e diagnósticos elétricos. Projetos no Rio de Janeiro, Região dos Lagos e Serra Carioca.',
})

export default function ProjetosPage() {
  // Structured data for Projects page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Início', url: '/' },
    { name: 'Projetos', url: '/projetos' },
  ])

  const projectsData = [
    {
      title: 'Hotel Resort 5 Estrelas - Cabo Frio',
      category: 'Hotelaria',
      location: 'Região dos Lagos',
      year: '2024',
      challenge: 'Falhas recorrentes no sistema elétrico durante alta temporada',
      solution: 'Inspeção termográfica completa da subestação de 500kVA e 12 painéis elétricos',
      results: [
        '8 pontos quentes identificados',
        '500kVA de capacidade protegida',
        '100% de disponibilidade na temporada',
      ],
    },
    {
      title: 'Condomínio Empresarial - Barra da Tijuca',
      category: 'Corporativo',
      location: 'Rio de Janeiro',
      year: '2024',
      challenge: 'Multas por baixo fator de potência e falhas em equipamentos de climatização',
      solution: 'Análise completa de qualidade energética com medição por 7 dias consecutivos',
      results: ['Fator de potência: 0.95', '24 circuitos analisados', '15% de economia energética'],
    },
    {
      title: 'Shopping Center - Nova Friburgo',
      category: 'Varejo',
      location: 'Serra Carioca',
      year: '2023',
      challenge: 'Paradas não programadas afetando operação comercial',
      solution: 'Programa de monitoramento contínuo com sensores IoT em equipamentos críticos',
      results: ['Zero paradas não programadas', 'Monitoramento 24/7', 'ROI de 180% em 12 meses'],
    },
  ]

  const projectsPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Cases de Sucesso - Ôluna Engenharia',
    description:
      'Portfolio de projetos de termografia industrial e diagnósticos elétricos realizados pela Ôluna Engenharia',
    url: 'https://oluna-engenharia.com.br/projetos',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Projetos Realizados',
      description: 'Lista de cases de sucesso e projetos de termografia industrial',
      itemListElement: projectsData.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Project',
          name: project.title,
          description: `${project.challenge} - ${project.solution}`,
          location: {
            '@type': 'Place',
            name: project.location,
          },
          dateCompleted: project.year,
          provider: {
            '@type': 'Organization',
            name: 'Ôluna Engenharia',
          },
        },
      })),
    },
  }

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [projectsPageSchema, breadcrumbSchema],
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
                  radial-gradient(circle at 30% 40%, var(--heat-orange) 0%, transparent 60%),
                  radial-gradient(circle at 70% 60%, var(--cool-teal) 0%, transparent 60%),
                  radial-gradient(circle at 50% 20%, var(--heat-red) 0%, transparent 50%)
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
                    Projetos
                  </li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Cases de Sucesso</span>
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
                  Projetos
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Resultados reais que transformaram operações, reduziram custos e garantiram a
                continuidade dos negócios dos nossos clientes.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">150+</div>
                  <div className="text-gray-300">Projetos Realizados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-gray-300">Taxa de Sucesso</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-gray-300">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cases de Sucesso */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Cases de Sucesso
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Conheça alguns dos nossos projetos mais significativos e os resultados alcançados
                  para nossos clientes.
                </p>
              </div>

              <div className="space-y-12">
                {projectsData.map((project, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Informações do Projeto */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                          <span className="text-gray-500 text-sm">📍 {project.location}</span>
                          <span className="text-gray-500 text-sm">📅 {project.year}</span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                          {project.title}
                        </h3>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Desafio</h4>
                            <p className="text-gray-600">{project.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Solução</h4>
                            <p className="text-gray-600">{project.solution}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Resultados</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {project.results.map((result, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center">
                                  <div className="text-lg font-bold text-gray-900 mb-1">
                                    {result.split(' ')[0]}
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    {result.split(' ').slice(1).join(' ')}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Imagem e CTA */}
                      <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 text-center h-full flex flex-col justify-between">
                          <div>
                            <div className="text-6xl mb-6">
                              {project.category === 'Hotelaria' && '🏨'}
                              {project.category === 'Corporativo' && '🏢'}
                              {project.category === 'Varejo' && '🛍️'}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-4">
                              Projeto Destaque
                            </h4>
                            <p className="text-gray-600 mb-6">
                              Case documentado com fotos termográficas, relatórios técnicos e
                              acompanhamento dos resultados.
                            </p>
                          </div>
                          <button className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300">
                            Ver Case Completo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Segmentos Atendidos */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Segmentos Atendidos
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Nossa experiência abrange diferentes setores, adaptando nossas soluções às
                  necessidades específicas de cada segmento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    segment: 'Hotelaria & Turismo',
                    icon: '🏨',
                    description: 'Hotéis, resorts, pousadas e complexos turísticos',
                    projects: '45+ projetos',
                    speciality: 'Alta disponibilidade durante temporadas',
                  },
                  {
                    segment: 'Corporativo',
                    icon: '🏢',
                    description: 'Prédios comerciais, escritórios e centros empresariais',
                    projects: '60+ projetos',
                    speciality: 'Eficiência energética e conformidade',
                  },
                  {
                    segment: 'Varejo',
                    icon: '🛍️',
                    description: 'Shopping centers, lojas e centros comerciais',
                    projects: '25+ projetos',
                    speciality: 'Continuidade operacional crítica',
                  },
                  {
                    segment: 'Residencial',
                    icon: '🏠',
                    description: 'Condomínios residenciais e edifícios habitacionais',
                    projects: '40+ projetos',
                    speciality: 'Segurança e economia para moradores',
                  },
                  {
                    segment: 'Industrial',
                    icon: '🏭',
                    description: 'Indústrias, fábricas e instalações produtivas',
                    projects: '30+ projetos',
                    speciality: 'Manutenção preditiva avançada',
                  },
                  {
                    segment: 'Saúde',
                    icon: '🏥',
                    description: 'Hospitais, clínicas e laboratórios',
                    projects: '15+ projetos',
                    speciality: 'Criticidade absoluta dos sistemas',
                  },
                ].map((segment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{segment.icon}</div>
                    <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
                      {segment.segment}
                    </h3>
                    <p className="text-gray-600 mb-4">{segment.description}</p>
                    <div className="bg-white rounded-xl p-3 mb-4">
                      <div className="text-lg font-bold text-gray-900">{segment.projects}</div>
                      <div className="text-sm text-gray-500">realizados</div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{segment.speciality}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  O que Dizem Nossos Clientes
                </h2>
                <p className="text-xl text-gray-600">
                  Depoimentos reais de clientes que confiaram na Ôluna Engenharia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    quote:
                      'A Ôluna identificou 8 pontos quentes críticos no nosso sistema elétrico antes da alta temporada. Graças ao trabalho deles, tivemos 100% de disponibilidade durante todo o verão.',
                    author: 'Carlos Silva',
                    position: 'Gerente de Manutenção',
                    company: 'Resort Cabo Frio',
                  },
                  {
                    quote:
                      'Com a análise de qualidade energética da Ôluna, conseguimos reduzir 15% da nossa conta de energia e eliminar as multas por baixo fator de potência. ROI excelente!',
                    author: 'Marina Santos',
                    position: 'Síndica',
                    company: 'Condomínio Empresarial Barra',
                  },
                  {
                    quote:
                      'O monitoramento contínuo implementado pela Ôluna nos deu total controle sobre nossos equipamentos. Zero paradas não programadas em 12 meses.',
                    author: 'Roberto Lima',
                    position: 'Gerente de Operações',
                    company: 'Shopping Nova Friburgo',
                  },
                  {
                    quote:
                      'Equipe extremamente técnica e profissional. Os relatórios são detalhados e as recomendações sempre certeiras. Parceria de longa data.',
                    author: 'Ana Costa',
                    position: 'Diretora Técnica',
                    company: 'Grupo Hoteleiro RJ',
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl text-gray-300 mb-4">"</div>
                    <p className="text-gray-600 italic mb-6 leading-relaxed">{testimonial.quote}</p>
                    <div className="border-t pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.position}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
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
                Seu Projeto Pode Ser o Próximo Case de Sucesso
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Entre em contato e vamos discutir como nossa experiência pode transformar sua
                operação e gerar resultados reais.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contato"
                  className="bg-gradient-to-r from-primary-400 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105"
                >
                  Iniciar Meu Projeto
                </a>
                <a
                  href="/servicos"
                  className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Ver Nossos Serviços
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
