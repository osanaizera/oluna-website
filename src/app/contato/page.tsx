import type { Metadata } from 'next'
import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import { generateServiceKeywords, generateContactSchema } from '@/utils/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contato - Fale com Nossos Especialistas',
  description:
    'Entre em contato com a Ôluna Engenharia. Termografia industrial, laudos NR-10 e diagnósticos elétricos no Rio de Janeiro. Análise gratuita em 24h. Telefone: (21) 99999-9999.',
  keywords: [
    ...generateServiceKeywords('contato'),
    'termografia rj telefone',
    'contato engenharia elétrica',
    'orçamento termografia',
    'ôluna engenharia contato',
    'telefone termografia industrial',
    'email engenharia rj',
    'endereço ôluna',
    'contato laudos nr-10',
  ],
  canonical: '/contato',
  ogTitle: 'Contato Ôluna Engenharia - Termografia Industrial RJ',
  ogDescription:
    'Fale com nossos especialistas em termografia industrial. Atendimento no Rio de Janeiro, Região dos Lagos e Serra Carioca. Análise gratuita em 24h.',
  twitterTitle: 'Contato Ôluna Engenharia - Especialistas em Termografia',
  twitterDescription:
    'Entre em contato para termografia industrial e laudos NR-10 no Rio de Janeiro. Telefone: (21) 99999-9999. Análise gratuita.',
})

export default function ContatoPage() {
  // Structured data for Contact page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Início', url: '/' },
    { name: 'Contato', url: '/contato' },
  ])

  const contactSchema = generateContactSchema({
    telephone: '+55-21-99999-9999',
    email: 'contato@oluna-engenharia.com.br',
    address: {
      city: 'Rio de Janeiro',
      state: 'RJ',
      country: 'BR',
    },
  })

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contato - Ôluna Engenharia',
    description:
      'Página de contato da Ôluna Engenharia para solicitação de serviços de termografia industrial',
    url: 'https://oluna-engenharia.com.br/contato',
    mainEntity: {
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
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+55-21-99999-9999',
          contactType: 'customer service',
          areaServed: 'BR',
          availableLanguage: 'Portuguese',
        },
        {
          '@type': 'ContactPoint',
          email: 'contato@oluna-engenharia.com.br',
          contactType: 'customer service',
          areaServed: 'BR',
        },
      ],
    },
  }

  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [contactPageSchema, breadcrumbSchema, contactSchema],
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
                  radial-gradient(circle at 25% 30%, var(--heat-orange) 0%, transparent 50%),
                  radial-gradient(circle at 75% 70%, var(--cool-teal) 0%, transparent 50%),
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
                    Contato
                  </li>
                </ol>
              </nav>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Fale Conosco</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Entre em{' '}
                <span
                  className="transition-all duration-1000"
                  style={{
                    color: 'var(--heat-orange)',
                    textShadow: '0 0 30px var(--heat-orange)40',
                  }}
                >
                  Contato
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Fale com nossos especialistas e receba uma análise gratuita das suas necessidades.
                Estamos prontos para proteger sua operação com nossa expertise em termografia
                industrial.
              </p>

              {/* Contact Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24h</div>
                  <div className="text-gray-300">Análise Gratuita</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-gray-300">Anos de Experiência</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-300">Engenheiros CRE A</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                    Solicite seu Orçamento
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Preencha o formulário abaixo e nossa equipe entrará em contato para discutir
                    suas necessidades e elaborar uma proposta personalizada.
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="nome"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="empresa"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="telefone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="(21) 99999-9999"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cidade"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Cidade
                      </label>
                      <select
                        id="cidade"
                        name="cidade"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Selecione sua cidade</option>
                        <option value="rio-de-janeiro">Rio de Janeiro</option>
                        <option value="niteroi">Niterói</option>
                        <option value="cabo-frio">Cabo Frio</option>
                        <option value="buzios">Búzios</option>
                        <option value="arraial-do-cabo">Arraial do Cabo</option>
                        <option value="petropolis">Petrópolis</option>
                        <option value="teresopolis">Teresópolis</option>
                        <option value="nova-friburgo">Nova Friburgo</option>
                        <option value="sao-goncalo">São Gonçalo</option>
                        <option value="outra">Outra cidade</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="servico"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Serviço de Interesse
                      </label>
                      <select
                        id="servico"
                        name="servico"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Selecione o serviço</option>
                        <option value="termografia-industrial">Termografia Industrial</option>
                        <option value="laudos-nr-10">Laudos NR-10</option>
                        <option value="diagnosticos-eletricos">Diagnósticos Elétricos</option>
                        <option value="monitoramento-continuo">Monitoramento Contínuo</option>
                        <option value="consultoria-energetica">Consultoria Energética</option>
                        <option value="multiplos-servicos">Múltiplos Serviços</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="mensagem"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Descreva suas necessidades, tipo de instalação, urgência, etc."
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="termos"
                        name="termos"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <label htmlFor="termos" className="ml-2 block text-sm text-gray-700">
                        Aceito receber contato por e-mail e WhatsApp para orçamento e informações
                        técnicas *
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105"
                    >
                      Enviar Solicitação
                    </button>
                  </form>

                  <p className="text-sm text-gray-500 mt-4">
                    * Campos obrigatórios. Seus dados são protegidos conforme nossa política de
                    privacidade.
                  </p>
                </div>

                {/* Contact Information */}
                <div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
                    Informações de Contato
                  </h2>

                  <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📞</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
                        <p className="text-gray-600 mb-2">
                          <a
                            href="tel:+5521973498376"
                            className="text-orange-600 font-medium hover:underline"
                          >
                            (21) 99999-9999
                          </a>
                        </p>
                        <p className="text-sm text-gray-500">
                          Segunda a sexta: 8h às 18h
                          <br />
                          Emergências: 24h (WhatsApp)
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📧</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">E-mail</h3>
                        <p className="text-gray-600 mb-2">
                          <a
                            href="mailto:contato@oluna-engenharia.com.br"
                            className="text-blue-600 font-medium hover:underline"
                          >
                            contato@oluna-engenharia.com.br
                          </a>
                        </p>
                        <p className="text-sm text-gray-500">Resposta em até 4 horas úteis</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">📍</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Localização</h3>
                        <p className="text-gray-600 mb-2">Rio de Janeiro, RJ</p>
                        <p className="text-sm text-gray-500">
                          Atendemos: Rio de Janeiro, Região dos Lagos,
                          <br />
                          Serra Carioca e Grande Rio
                        </p>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">💬</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                        <p className="text-gray-600 mb-2">
                          <a
                            href="https://wa.me/5521973498376?text=Olá! Gostaria de solicitar um orçamento para termografia industrial."
                            className="text-green-600 font-medium hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            (21) 99999-9999
                          </a>
                        </p>
                        <p className="text-sm text-gray-500">Atendimento rápido por WhatsApp</p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-gray-100 rounded-2xl p-6 mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Horário de Atendimento
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Segunda a Sexta:</span>
                        <span className="font-medium text-gray-900">8h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sábados:</span>
                        <span className="font-medium text-gray-900">8h às 12h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domingos:</span>
                        <span className="font-medium text-gray-900">Fechado</span>
                      </div>
                      <div className="border-t pt-2 mt-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Emergências:</span>
                          <span className="font-medium text-orange-600">24h por WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Response Promise */}
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-8">
                    <h3 className="text-lg font-semibold text-orange-900 mb-3">
                      🚀 Resposta Rápida Garantida
                    </h3>
                    <div className="space-y-2 text-sm text-orange-800">
                      <div>• Análise inicial gratuita em 24h</div>
                      <div>• Orçamento detalhado em até 48h</div>
                      <div>• Atendimento emergencial disponível</div>
                      <div>• Visita técnica sem compromisso</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Áreas de Atendimento
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Prestamos serviços de termografia industrial e diagnósticos elétricos em todo o
                  estado do Rio de Janeiro.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏙️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Grande Rio</h3>
                  <div className="text-gray-600 space-y-1">
                    <div>Rio de Janeiro</div>
                    <div>Niterói</div>
                    <div>São Gonçalo</div>
                    <div>Duque de Caxias</div>
                    <div>Nova Iguaçu</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏖️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Região dos Lagos</h3>
                  <div className="text-gray-600 space-y-1">
                    <div>Cabo Frio</div>
                    <div>Búzios</div>
                    <div>Arraial do Cabo</div>
                    <div>São Pedro da Aldeia</div>
                    <div>Iguaba Grande</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⛰️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Serra Carioca</h3>
                  <div className="text-gray-600 space-y-1">
                    <div>Petrópolis</div>
                    <div>Teresópolis</div>
                    <div>Nova Friburgo</div>
                    <div>Cachoeiras de Macacu</div>
                    <div>Guapimirim</div>
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
                Pronto para Começar?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Entre em contato agora e receba uma análise gratuita das suas necessidades. Nossa
                equipe está pronta para atender você.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/5521973498376?text=Olá! Gostaria de solicitar um orçamento para termografia industrial."
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 WhatsApp
                </a>
                <a
                  href="tel:+5521973498376"
                  className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  📞 Ligar Agora
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
