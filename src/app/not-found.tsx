import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import ThermalErrorDisplay from '@/components/errors/ThermalErrorDisplay'
import NavigationSuggestions from '@/components/errors/NavigationSuggestions'
import SearchWidget from '@/components/errors/SearchWidget'
import ErrorAnalytics from '@/components/errors/ErrorAnalytics'
import ThermalButton from '@/components/common/ThermalButton'
import { Hero, Heading, Body } from '@/components/common/Typography'

// SEO metadata for 404 page
export const metadata: Metadata = {
  title: 'Página Não Encontrada - Ôluna Engenharia',
  description:
    'A página que você está procurando não foi encontrada. Explore nossos serviços especializados em termografia industrial e diagnósticos elétricos.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  alternates: {
    canonical: null, // No canonical URL for 404 pages
  },
  openGraph: {
    title: 'Página Não Encontrada - Ôluna Engenharia',
    description: 'Página não encontrada. Explore nossos serviços de engenharia.',
    type: 'website',
    siteName: 'Ôluna Engenharia',
  },
  twitter: {
    card: 'summary',
    title: 'Página Não Encontrada - Ôluna Engenharia',
    description: 'Página não encontrada. Explore nossos serviços de engenharia.',
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand via-gray-50 to-primary-50/30 relative overflow-hidden">
      {/* Thermal Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-heat-orange via-heat-red to-transparent animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-cool-teal via-secondary-400 to-transparent animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Thermal Scanner Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-heat-orange to-transparent animate-scan-horizontal"></div>
        <div
          className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cool-teal to-transparent animate-scan-vertical"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Skip Links for Accessibility */}
        <a
          href="#main-error-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-primary-400 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Pular para o conteúdo do erro
        </a>
        <a
          href="#error-navigation"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-32 focus:bg-primary-400 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Pular para a navegação
        </a>

        {/* Main Error Content */}
        <main
          id="main-error-content"
          className="flex-1 flex items-center justify-center px-4 py-16"
          role="main"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Thermal Error Display */}
            <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-xl"></div>}>
              <ThermalErrorDisplay />
            </Suspense>

            {/* Error Message */}
            <div className="mt-8 space-y-4">
              <Hero className="text-graphite mb-4 font-display leading-tight">
                Sinal Térmico
                <span className="block text-heat-orange">Não Detectado</span>
              </Hero>

              <Body className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Nossa análise termográfica não conseguiu localizar a página solicitada. Mas não se
                preocupe! Nossos sensores especializados estão aqui para ajudá-lo a encontrar
                exatamente o que você precisa.
              </Body>
            </div>

            {/* Primary Action */}
            <div className="mt-8">
              <Link href="/" className="inline-block">
                <ThermalButton
                  variant="primary"
                  size="lg"
                  thermalEffect="glow"
                  className="shadow-lg hover:shadow-thermal transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Retornar ao Início
                  </span>
                </ThermalButton>
              </Link>
            </div>

            {/* Search Widget */}
            <div className="mt-8">
              <Heading as="h2" className="text-center text-graphite mb-6 font-display text-xl">
                Procure o que Você Precisa
              </Heading>
              <Suspense
                fallback={
                  <div className="animate-pulse h-12 bg-gray-200 rounded-xl max-w-lg mx-auto"></div>
                }
              >
                <SearchWidget placeholder="Buscar termografia, diagnósticos, projetos..." />
              </Suspense>
            </div>

            {/* Navigation Suggestions */}
            <div
              id="error-navigation"
              className="mt-12"
              role="navigation"
              aria-label="Navegação de recuperação de erro"
            >
              <Suspense
                fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                      ))}
                    </div>
                  </div>
                }
              >
                <NavigationSuggestions />
              </Suspense>
            </div>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg">
              <Heading as="h2" className="text-graphite mb-4 font-display">
                Precisa de Ajuda Especializada?
              </Heading>
              <Body className="text-gray-600 mb-6">
                Nossa equipe de engenharia está sempre disponível para diagnósticos precisos.
              </Body>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contato" className="flex-1 max-w-xs">
                  <ThermalButton
                    variant="secondary"
                    size="md"
                    thermalEffect="wave"
                    className="w-full"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Entrar em Contato
                    </span>
                  </ThermalButton>
                </Link>

                <a
                  href="tel:+5521999999999"
                  className="flex-1 max-w-xs"
                  aria-label="Ligar para Ôluna Engenharia"
                >
                  <ThermalButton
                    variant="outline"
                    size="md"
                    thermalEffect="pulse"
                    className="w-full"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      (21) 99999-9999
                    </span>
                  </ThermalButton>
                </a>
              </div>
            </div>

            {/* Technical Information for Developers */}
            <details className="mt-8 text-left max-w-2xl mx-auto">
              <summary className="cursor-pointer text-gray-500 hover:text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded">
                Informações Técnicas (Clique para expandir)
              </summary>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm font-mono text-gray-700">
                <p>
                  <strong>Status HTTP:</strong> 404 Not Found
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date().toISOString()}
                </p>
                <p>
                  <strong>User Agent:</strong> Navegador do usuário
                </p>
                <p>
                  <strong>URL Solicitada:</strong> Página não encontrada
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Esta informação pode ser útil ao reportar problemas para nossa equipe técnica.
                </p>
              </div>
            </details>
          </div>
        </main>

        {/* Analytics Tracking */}
        <Suspense>
          <ErrorAnalytics errorType="404" />
        </Suspense>
      </div>
    </div>
  )
}
