import type { Metadata } from 'next'
import ServicesCarousel from '@/components/sections/ServicesCarousel'
import ContactSection from '@/components/sections/ContactSection'
import { ThermographyIcon, EnergyDiagnosticIcon, SecurityIcon, ConsultingIcon, IndustryIcon, ROIIcon, MonitoringIcon, NR10ReportIcon, ThermographyReportIcon, CalibratedEquipmentIcon, ARTCreaIcon } from '@/components/icons/ServiceIcons'
import { ThermoCard } from '@/components/effects/ThermoScroll'
import DashboardDemo from '@/components/demo/DashboardDemo'

export const metadata: Metadata = {
  title: 'Ôluna Engenharia - Termografia Industrial e Diagnósticos Elétricos | Manutenção Preditiva',
  description: 'Engenheiros CRE A especialistas em termografia industrial, diagnósticos elétricos e eficiência energética. Detecte falhas antes que aconteçam, reduza downtime e garanta conformidade NR-10/12. Análise gratuita em 24h.',
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
    'São Paulo',
    'Rio de Janeiro'
  ].join(', '),
  authors: [{ name: 'Ôluna Engenharia' }],
  creator: 'Ôluna Engenharia',
  publisher: 'Ôluna Engenharia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://oluna-engenharia.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ôluna Engenharia - Termografia Industrial e Diagnósticos Elétricos',
    description: 'Engenheiros CRE A especialistas em termografia industrial e diagnósticos elétricos. Detecte falhas antes que aconteçam e garanta a continuidade operacional.',
    url: 'https://oluna-engenharia.com.br',
    siteName: 'Ôluna Engenharia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ôluna Engenharia - Termografia Industrial',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ôluna Engenharia - Termografia Industrial',
    description: 'Detecte falhas antes que aconteçam com nossa expertise em termografia industrial e diagnósticos elétricos.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Ôluna Engenharia",
    "description": "Engenheiros especialistas em termografia industrial, diagnósticos elétricos e eficiência energética",
    "url": "https://oluna-engenharia.com.br",
    "logo": "https://oluna-engenharia.com.br/logo.png",
    "image": "https://oluna-engenharia.com.br/og-image.jpg",
    "telephone": "+55-11-99999-9999",
    "email": "contato@oluna-engenharia.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "SP"
    },
    "serviceType": [
      "Termografia Industrial",
      "Diagnóstico Elétrico", 
      "Laudos NR-10",
      "Laudos NR-12",
      "Monitoramento Contínuo",
      "Consultoria Energética"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "CRE A",
      "recognizedBy": {
        "@type": "Organization",
        "name": "CREA"
      }
    },
    "offers": {
      "@type": "Offer",
      "description": "Análise gratuita em 24 horas",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "Clientes Ôluna"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Advanced Thermal Background */}
        <div className="absolute inset-0">
          {/* Animated Thermal Waves */}
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="thermalHero1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D5577A" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="thermalHero2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--cool-teal)" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#D5577A" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--heat-orange)" stopOpacity="0.4" />
                </linearGradient>
                <filter id="heroGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              {/* Multiple animated thermal layers */}
              <path d="M0,300 Q200,250 400,300 T800,300 Q1000,280 1200,300 L1200,800 L0,800 Z" 
                    fill="url(#thermalHero1)" 
                    filter="url(#heroGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '4s' }} />
              
              <path d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z" 
                    fill="url(#thermalHero2)" 
                    filter="url(#heroGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '1s' }} />
              
              {/* Floating thermal particles */}
              {[...Array(15)].map((_, i) => (
                <circle 
                  key={i}
                  cx={100 + (i * 80)}
                  cy={200 + (i % 3) * 150}
                  r="3"
                  fill="var(--heat-orange)"
                  opacity="0.6"
                  className="animate-bounce"
                  style={{ 
                    animationDuration: `${2 + (i % 3)}s`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Dynamic heat map simulation */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0 animate-pulse"
              style={{
                background: `
                  radial-gradient(circle at 15% 25%, var(--heat-orange) 0%, transparent 40%),
                  radial-gradient(circle at 85% 20%, var(--heat-red) 0%, transparent 45%),
                  radial-gradient(circle at 30% 75%, var(--cool-teal) 0%, transparent 35%),
                  radial-gradient(circle at 75% 80%, var(--heat-orange) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, var(--heat-red) 0%, transparent 30%)
                `,
                animationDuration: '8s'
              }}
            />
          </div>

          {/* Scanning line effect */}
          <div className="absolute inset-0 opacity-30">
            <div 
              className="w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-pulse"
              style={{
                position: 'absolute',
                top: '30%',
                boxShadow: '0 0 20px var(--heat-orange)',
                animationDuration: '3s'
              }}
            />
            <div 
              className="w-full h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent animate-pulse"
              style={{
                position: 'absolute',
                top: '60%',
                boxShadow: '0 0 20px var(--heat-red)',
                animationDuration: '4s',
                animationDelay: '1s'
              }}
            />
          </div>
        </div>

        <div className="relative container mx-auto px-6 text-center text-white z-10 pt-20">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-12">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Engenharia de Precisão</span>
            </div>

            {/* Headline Principal */}
            <h1 className="text-5xl md:text-7xl font-display font-semibold mb-6 leading-tight">
              Veja o{' '}
              <span 
                className="bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500 bg-clip-text text-transparent"
              >
                Invisível
              </span>
              <br />
              Antes da Falha
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transformamos dados termográficos em ações preventivas. 
              <strong className="text-white"> Detecte problemas elétricos, evite paradas não programadas</strong> e 
              garanta a segurança da sua operação.
            </p>

            {/* Diferenciais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400 mb-2">Hotéis & Resorts</div>
                <div className="text-sm text-gray-400">Especialização em<br />Grandes Complexos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-500 mb-2">Prédios Comerciais</div>
                <div className="text-sm text-gray-400">Shopping Centers<br />& Corporativos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-500 mb-2">Condomínios</div>
                <div className="text-sm text-gray-400">Residenciais<br />& Empresariais</div>
              </div>
            </div>


            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
              <button className="bg-gradient-to-r from-primary-400 to-accent-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105">
                Solicitar Orçamento
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Ver Cases de Sucesso
              </button>
            </div>

          </div>
          
          {/* Indicador de scroll */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm">Descubra nossos serviços</span>
              <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Seção de Serviços - Carrossel Avançado */}
      <ServicesCarousel />

      {/* Seção Sobre */}
      <section id="sobre" className="py-20 bg-white relative overflow-hidden">
        {/* Advanced Background with Thermal Waves */}
        <div className="absolute inset-0">
          {/* Animated Thermal Waves Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
              <defs>
                <linearGradient id="aboutThermal1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="aboutThermal2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--cool-teal)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--heat-orange)" stopOpacity="0.2" />
                </linearGradient>
                <filter id="aboutGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              {/* Flowing thermal waves */}
              <path d="M0,150 Q300,100 600,150 T1200,150" 
                    stroke="url(#aboutThermal1)" 
                    strokeWidth="3" 
                    fill="none" 
                    filter="url(#aboutGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '4s' }} />
              
              <path d="M0,250 Q400,200 800,250 T1200,250" 
                    stroke="url(#aboutThermal2)" 
                    strokeWidth="2" 
                    fill="none" 
                    filter="url(#aboutGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '1s' }} />
              
              <path d="M0,350 Q200,300 400,350 T800,350 Q1000,320 1200,350" 
                    stroke="url(#aboutThermal1)" 
                    strokeWidth="1.5" 
                    fill="none" 
                    className="animate-pulse"
                    style={{ animationDuration: '8s', animationDelay: '2s' }} />
              
              {/* Thermal particles */}
              {[...Array(8)].map((_, i) => (
                <circle 
                  key={i}
                  cx={150 + (i * 130)}
                  cy={200 + (i % 2) * 100}
                  r="2"
                  fill="var(--heat-orange)"
                  opacity="0.4"
                  className="animate-bounce"
                  style={{ 
                    animationDuration: `${3 + (i % 2)}s`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Subtle radial gradients */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 10% 20%, var(--heat-orange) 0%, transparent 50%),
                  radial-gradient(circle at 90% 80%, var(--cool-teal) 0%, transparent 50%)
                `
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-semibold text-gray-900 mb-6">
                Quem Somos
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto mb-8"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Texto institucional */}
              <div>
                <p className="text-xl text-gray-700 leading-relaxed mb-8">
                  Somos a <strong className="text-primary-400">Ôluna</strong> — engenheiros apaixonados por 
                  <strong className="text-accent-500"> descobrir o invisível</strong> e transformar dados em ações. 
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Usamos a ciência da termografia e diagnósticos elétricos para garantir 
                  <strong> segurança, continuidade operacional e economia de energia</strong> em 
                  indústrias de médio e grande porte.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Equipe Familiar & Sênior</h4>
                      <p className="text-gray-600">Combinação de proximidade humana com expertise técnica CRE A</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Abordagem 360°</h4>
                      <p className="text-gray-600">Desde inspeções e laudos NR-10 até monitoramento contínuo e planos de ação</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Tecnologia Própria</h4>
                      <p className="text-gray-600">Relatórios digitais interativos e dashboard para acompanhamento histórico</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Área visual */}
              <div className="relative">
                <div className="bg-gray-50 rounded-3xl p-8 relative overflow-hidden">
                  {/* Enhanced Thermal Pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
                      <defs>
                        <radialGradient id="thermal-pattern-main" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="var(--heat-orange)" />
                          <stop offset="50%" stopColor="var(--heat-red)" />
                          <stop offset="100%" stopColor="var(--cool-teal)" />
                        </radialGradient>
                        <radialGradient id="thermal-pattern-accent" cx="50%" cy="50%" r="40%">
                          <stop offset="0%" stopColor="var(--cool-teal)" />
                          <stop offset="50%" stopColor="var(--heat-red)" />
                          <stop offset="100%" stopColor="var(--heat-orange)" />
                        </radialGradient>
                        <filter id="thermalGlow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/> 
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Main thermal blobs with animation */}
                      <circle cx="80" cy="80" r="45" fill="url(#thermal-pattern-main)" opacity="0.4" 
                              className="animate-pulse" style={{ animationDuration: '3s' }} />
                      <circle cx="300" cy="150" r="60" fill="url(#thermal-pattern-accent)" opacity="0.3" 
                              className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                      <circle cx="150" cy="280" r="50" fill="url(#thermal-pattern-main)" opacity="0.5" 
                              className="animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
                      
                      {/* Thermal waves connecting the blobs */}
                      <path d="M80,80 Q200,100 300,150 Q250,200 150,280" 
                            stroke="url(#thermal-pattern-main)" 
                            strokeWidth="2" 
                            fill="none" 
                            opacity="0.3" 
                            filter="url(#thermalGlow)"
                            className="animate-pulse" 
                            style={{ animationDuration: '6s' }} />
                      
                      {/* Floating thermal particles */}
                      {[...Array(12)].map((_, i) => (
                        <circle 
                          key={i}
                          cx={50 + (i * 30) % 350}
                          cy={50 + Math.floor(i / 6) * 150}
                          r="1.5"
                          fill={i % 3 === 0 ? 'var(--heat-orange)' : i % 3 === 1 ? 'var(--heat-red)' : 'var(--cool-teal)'}
                          opacity="0.4"
                          className="animate-bounce"
                          style={{ 
                            animationDuration: `${2 + (i % 3)}s`,
                            animationDelay: `${i * 0.3}s`
                          }}
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="relative text-center">
                    <div className="text-6xl font-bold text-primary-400 mb-4">Ô</div>
                    <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                      Visão Termográfica<br />Exclusiva
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Gradientes únicos que simulam ondas de calor como nossa assinatura visual
                    </p>
                    
                    {/* Estatísticas em destaque */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent-500">100%</div>
                        <div className="text-sm text-gray-500">Engenheiros CRE A</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary-500">24/7</div>
                        <div className="text-sm text-gray-500">Monitoramento</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Depoimento/Missão */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary-400/10 via-accent-500/10 to-secondary-500/10 rounded-3xl p-8 max-w-3xl mx-auto">
                <div className="text-4xl text-primary-400 mb-4">"</div>
                <p className="text-xl text-gray-700 leading-relaxed italic mb-4">
                  Nossa missão é transformar o invisível em visível, protegendo suas operações 
                  antes que problemas se tornem prejuízos.
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Cases */}
      <section id="cases" className="py-20 bg-gray-50 relative overflow-hidden">
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
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              {/* Diagonal thermal flows */}
              <path d="M0,0 Q300,100 600,0 T1200,0 L1200,200 Q900,150 600,200 T0,200 Z" 
                    fill="url(#casesThermal1)" 
                    filter="url(#casesGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '8s' }} />
              
              <path d="M0,600 Q300,500 600,600 T1200,600 L1200,800 L0,800 Z" 
                    fill="url(#casesThermal2)" 
                    filter="url(#casesGlow)"
                    className="animate-pulse"
                    style={{ animationDuration: '10s', animationDelay: '2s' }} />
              
              {/* Thermal success indicators */}
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <circle 
                    cx={200 + (i * 160)}
                    cy={300 + (i % 2) * 100}
                    r="3"
                    fill="var(--heat-orange)"
                    opacity="0.3"
                    className="animate-ping"
                    style={{ 
                      animationDuration: `${3 + (i % 2)}s`,
                      animationDelay: `${i * 0.8}s`
                    }}
                  />
                  <circle 
                    cx={200 + (i * 160)}
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
              Resultados reais que transformaram operações e reduziram custos 
              para nossos clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case 1 - Fábrica de Alimentos */}
            <ThermoCard delay={0} className="shadow-card hover:shadow-card-hover transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center">
                  <IndustryIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-900">
                    Fábrica de Alimentos
                  </h3>
                  <p className="text-gray-500">Rio de Janeiro • Indústria Alimentícia</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🚨 Desafio</h4>
                  <p className="text-gray-600">
                    Paradas não programadas frequentes no CCM A causavam perdas significativas 
                    na produção e comprometiam prazos de entrega.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⚡ Solução Ôluna</h4>
                  <p className="text-gray-600">
                    Inspeção termográfica completa revelou disjuntor crítico com sobreaquecimento. 
                    Substituição programada durante manutenção preventiva.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-primary-400/10 to-accent-500/10 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🎯 Resultado</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">30%</div>
                      <div className="text-sm text-gray-600">↓ Downtime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-500">4</div>
                      <div className="text-sm text-gray-600">Meses ROI</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-primary-400 to-accent-500 text-white py-3 rounded-xl font-semibold hover:shadow-thermal transition-all duration-300 group-hover:scale-105">
                Ver Case Completo
              </button>
            </ThermoCard>

            {/* Case 2 - Shopping Center */}
            <ThermoCard delay={300} className="shadow-card hover:shadow-card-hover transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-primary-400 rounded-xl flex items-center justify-center">
                  <EnergyDiagnosticIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-gray-900">
                    Shopping Center
                  </h3>
                  <p className="text-gray-500">São Paulo • Varejo e Serviços</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🚨 Desafio</h4>
                  <p className="text-gray-600">
                    Contas de energia excessivamente altas impactavam a margem operacional 
                    e competitividade do empreendimento.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⚡ Solução Ôluna</h4>
                  <p className="text-gray-600">
                    Diagnóstico energético profissional identificou baixo fator de potência 
                    e harmônicas. Implementação de correção FP e filtros.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-secondary-500/10 to-primary-400/10 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🎯 Resultado</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary-500">12%</div>
                      <div className="text-sm text-gray-600">↓ Consumo</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">6</div>
                      <div className="text-sm text-gray-600">Meses Payback</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-secondary-500 to-primary-400 text-white py-3 rounded-xl font-semibold hover:shadow-thermal transition-all duration-300 group-hover:scale-105">
                Ver Case Completo
              </button>
            </ThermoCard>
          </div>

          {/* Credenciais e Diferenciais Técnicos */}
          <div className="mt-16">
            <div className="bg-white rounded-3xl p-8 shadow-card relative overflow-hidden">
              {/* Thermal background effect */}
              <div className="absolute inset-0 opacity-3">
                <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="credentialsThermal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <path d="M0,80 Q100,60 200,80 T400,80 L400,220 Q300,200 200,220 T0,220 Z" 
                        fill="url(#credentialsThermal)" 
                        className="animate-pulse"
                        style={{ animationDuration: '8s' }} />
                </svg>
              </div>
              <h3 className="text-2xl font-display font-semibold text-gray-900 text-center mb-8 relative z-10">
                Credenciais e Diferenciais Técnicos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <NR10ReportIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-primary-400 mb-2">Relatórios</div>
                  <div className="text-gray-600 text-sm">Conforme<br />NR-10</div>
                  <div className="mt-2 text-xs text-gray-500">Documentação técnica completa</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ThermographyReportIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-secondary-500 mb-2">Laudos</div>
                  <div className="text-gray-600 text-sm">Termografia<br />Certificados</div>
                  <div className="mt-2 text-xs text-gray-500">Análise termográfica profissional</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CalibratedEquipmentIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-accent-500 mb-2">Equipamentos</div>
                  <div className="text-gray-600 text-sm">Calibrados<br />RBC</div>
                  <div className="mt-2 text-xs text-gray-500">Precisão e confiabilidade garantidas</div>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ARTCreaIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">ART</div>
                  <div className="text-gray-600 text-sm">CREA<br />RJ</div>
                  <div className="mt-2 text-xs text-gray-500">Responsabilidade técnica assegurada</div>
                </div>
              </div>
              
              {/* Detalhes adicionais */}
              <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong className="text-gray-900">Engenheiros CRE A certificados</strong> com experiência comprovada em 
                    <strong className="text-primary-400"> termografia industrial</strong> e 
                    <strong className="text-secondary-500"> diagnósticos elétricos</strong>. 
                    Todos os nossos serviços são executados com equipamentos calibrados e documentados 
                    conforme <strong className="text-accent-500">normas técnicas vigentes</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Demo */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                Relatórios Interativos
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dashboard em tempo real com análises termográficas, KPIs de performance e monitoramento contínuo das suas instalações
              </p>
            </div>
            <DashboardDemo />
          </div>

          {/* CTA para mais cases */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-thermal transition-all duration-300">
              Ver Mais Cases de Sucesso
            </button>
          </div>
        </div>
      </section>

      {/* Seção de Contato/Leads */}
      <ContactSection />
      </div>
    </>
  )
}