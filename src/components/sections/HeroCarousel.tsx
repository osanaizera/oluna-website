'use client'

import { useState, useEffect, useRef } from 'react'
import ScrollIndicator from '@/components/common/ScrollIndicator'

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  badge: string
  highlights: string[]
  backgroundType: 'thermal' | 'engineering' | 'consulting'
  primaryCTA: string
  secondaryCTA: string
}

const heroSlides: HeroSlide[] = [
  {
    id: 'termografia',
    title: 'Veja o Invisível|Antes da Falha',
    subtitle: 'Termografia, Análise de Energia e Ultrassom',
    description: 'Transformamos dados termográficos em ações preventivas. Detecte problemas elétricos, evite paradas não programadas e garanta a segurança da sua operação.',
    badge: 'Análise Preditiva',
    highlights: ['Hotéis & Resorts', 'Prédios Comerciais', 'Condomínios'],
    backgroundType: 'thermal',
    primaryCTA: 'Solicitar Orçamento',
    secondaryCTA: 'Ver Cases de Sucesso'
  },
  {
    id: 'engenharia',
    title: 'Soluções de Engenharia|Inteligentes',
    subtitle: 'Estudos de Engenharia Elétrica',
    description: 'Análise de capacidade elétrica, projetos BESS, sistemas solares e estudos de viabilidade energética. Maximize eficiência e prepare-se para o futuro.',
    badge: 'Engenharia Especializada',
    highlights: ['Sistemas BESS', 'Energia Solar', 'Carregadores Elétricos'],
    backgroundType: 'engineering',
    primaryCTA: 'Solicitar Estudo',
    secondaryCTA: 'Ver Projetos'
  },
  {
    id: 'consultoria',
    title: 'Eficiência Energética|Sustentável',
    subtitle: 'Consultoria em Otimização Energética',
    description: 'Redução de custos energéticos, otimização de consumo e estratégias de sustentabilidade. Transforme sua operação em referência de eficiência.',
    badge: 'Consultoria Estratégica',
    highlights: ['Redução de Custos', 'Sustentabilidade', 'Conformidade'],
    backgroundType: 'consulting',
    primaryCTA: 'Solicitar Consultoria',
    secondaryCTA: 'Ver Resultados'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-advance slides
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 7000) // 7 seconds per slide
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  // Pause auto-play on user interaction
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentSlideData = heroSlides[currentSlide]

  const getBackgroundStyles = (type: string) => {
    switch (type) {
      case 'thermal':
        return {
          background: 'linear-gradient(135deg, #1e1e26 0%, #2d1b24 50%, #1a1a2e 100%)',
          thermal: {
            primary: 'var(--heat-orange)',
            secondary: 'var(--heat-red)',
            tertiary: 'var(--cool-teal)'
          }
        }
      case 'engineering':
        return {
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          thermal: {
            primary: '#0093FF',
            secondary: '#3b82f6',
            tertiary: '#1d4ed8'
          }
        }
      case 'consulting':
        return {
          background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
          thermal: {
            primary: '#10b981',
            secondary: '#059669',
            tertiary: '#047857'
          }
        }
      default:
        return {
          background: 'linear-gradient(135deg, #1e1e26 0%, #2d1b24 50%, #1a1a2e 100%)',
          thermal: {
            primary: 'var(--heat-orange)',
            secondary: 'var(--heat-red)',
            tertiary: 'var(--cool-teal)'
          }
        }
    }
  }

  const backgroundStyles = getBackgroundStyles(currentSlideData.backgroundType)

  return (
    <section
      id="hero"
      role="banner"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out"
      style={{ background: backgroundStyles.background }}
      aria-label="Seção principal - Ôluna Engenharia"
    >
      {/* Dynamic Thermal Background */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {/* Animated Thermal Waves */}
        <div className="absolute inset-0 opacity-15 transition-all duration-1000 ease-in-out">
          <svg className="w-full h-full transition-all duration-1000 ease-in-out" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`thermalHero1-${currentSlide}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={backgroundStyles.thermal.primary} stopOpacity="0.8" />
                <stop offset="50%" stopColor={backgroundStyles.thermal.secondary} stopOpacity="0.6" />
                <stop offset="100%" stopColor={backgroundStyles.thermal.tertiary} stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id={`thermalHero2-${currentSlide}`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={backgroundStyles.thermal.tertiary} stopOpacity="0.6" />
                <stop offset="50%" stopColor={backgroundStyles.thermal.secondary} stopOpacity="0.8" />
                <stop offset="100%" stopColor={backgroundStyles.thermal.primary} stopOpacity="0.4" />
              </linearGradient>
              <filter id={`heroGlow-${currentSlide}`}>
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Multiple animated thermal layers */}
            <path
              d="M0,300 Q200,250 400,300 T800,300 Q1000,280 1200,300 L1200,800 L0,800 Z"
              fill={`url(#thermalHero1-${currentSlide})`}
              filter={`url(#heroGlow-${currentSlide})`}
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />

            <path
              d="M0,400 Q300,350 600,400 T1200,400 L1200,800 L0,800 Z"
              fill={`url(#thermalHero2-${currentSlide})`}
              filter={`url(#heroGlow-${currentSlide})`}
              className="animate-pulse"
              style={{ animationDuration: '6s', animationDelay: '1s' }}
            />

            {/* Floating thermal particles */}
            {[...Array(15)].map((_, i) => (
              <circle
                key={i}
                cx={100 + i * 80}
                cy={200 + (i % 3) * 150}
                r="3"
                fill={backgroundStyles.thermal.primary}
                opacity="0.6"
                className="animate-bounce"
                style={{
                  animationDuration: `${2 + (i % 3)}s`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Dynamic heat map simulation */}
        <div className="absolute inset-0 opacity-20 transition-all duration-1000 ease-in-out">
          <div
            className="absolute inset-0 animate-pulse transition-all duration-1000 ease-in-out"
            style={{
              background: `
                radial-gradient(circle at 15% 25%, ${backgroundStyles.thermal.primary} 0%, transparent 40%),
                radial-gradient(circle at 85% 20%, ${backgroundStyles.thermal.secondary} 0%, transparent 45%),
                radial-gradient(circle at 30% 75%, ${backgroundStyles.thermal.tertiary} 0%, transparent 35%),
                radial-gradient(circle at 75% 80%, ${backgroundStyles.thermal.primary} 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, ${backgroundStyles.thermal.secondary} 0%, transparent 30%)
              `,
              animationDuration: '8s',
            }}
          />
        </div>

        {/* Scanning line effect */}
        <div className="absolute inset-0 opacity-30 transition-all duration-1000 ease-in-out">
          <div
            className="w-full h-1 bg-gradient-to-r from-transparent to-transparent animate-pulse transition-all duration-1000 ease-in-out"
            style={{
              position: 'absolute',
              top: '30%',
              background: `linear-gradient(to right, transparent, ${backgroundStyles.thermal.primary}, transparent)`,
              boxShadow: `0 0 20px ${backgroundStyles.thermal.primary}`,
              animationDuration: '3s',
            }}
          />
          <div
            className="w-full h-1 bg-gradient-to-r from-transparent to-transparent animate-pulse transition-all duration-1000 ease-in-out"
            style={{
              position: 'absolute',
              top: '60%',
              background: `linear-gradient(to right, transparent, ${backgroundStyles.thermal.secondary}, transparent)`,
              boxShadow: `0 0 20px ${backgroundStyles.thermal.secondary}`,
              animationDuration: '4s',
              animationDelay: '1s',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 text-center text-white z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 transition-all duration-700 ease-in-out">
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: backgroundStyles.thermal.primary }}
            ></div>
            <span className="text-sm font-medium">{currentSlideData.badge}</span>
          </div>

          {/* Headline Principal */}
          <h1 className="text-hero mb-6 text-white transition-all duration-700 ease-in-out">
            {(() => {
              const [firstLine, secondLine] = currentSlideData.title.split('|')
              
              // Definir degradês específicos para cada tema
              const getGradientClass = () => {
                switch (currentSlideData.backgroundType) {
                  case 'thermal':
                    return 'bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500'
                  case 'engineering':
                    return 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600'
                  case 'consulting':
                    return 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'
                  default:
                    return 'bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500'
                }
              }
              
              // Lógica específica para cada slide
              if (currentSlideData.id === 'termografia') {
                // "Veja o Invisível" - só "Invisível" em degradê
                const firstParts = firstLine.split(' ')
                const lastWord = firstParts[firstParts.length - 1] // "Invisível"
                const beforeLastWord = firstParts.slice(0, -1).join(' ') // "Veja o"
                
                return (
                  <>
                    {beforeLastWord}{' '}
                    <span className={`${getGradientClass()} bg-clip-text text-transparent transition-all duration-700 ease-in-out`}>
                      {lastWord}
                    </span>
                    <br />
                    {secondLine}
                  </>
                )
              } else if (currentSlideData.id === 'engenharia') {
                // "Soluções de Engenharia" - todo em degradê
                return (
                  <>
                    <span className={`${getGradientClass()} bg-clip-text text-transparent transition-all duration-700 ease-in-out`}>
                      {firstLine}
                    </span>
                    <br />
                    {secondLine}
                  </>
                )
              } else if (currentSlideData.id === 'consultoria') {
                // "Eficiência Energética" - todo em degradê
                return (
                  <>
                    <span className={`${getGradientClass()} bg-clip-text text-transparent transition-all duration-700 ease-in-out`}>
                      {firstLine}
                    </span>
                    <br />
                    {secondLine}
                  </>
                )
              }
              
              return (
                <>
                  {firstLine}
                  <br />
                  {secondLine}
                </>
              )
            })()}
          </h1>

          {/* Subtítulo */}
          <p className="text-2xl font-semibold mb-4 transition-all duration-700 ease-in-out" style={{ color: backgroundStyles.thermal.primary }}>
            {currentSlideData.subtitle}
          </p>

          {/* Descrição */}
          <p className="text-responsive-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ease-in-out">
            {currentSlideData.description}
          </p>

          {/* Diferenciais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto">
            {currentSlideData.highlights.map((highlight, index) => (
              <div key={highlight} className="text-center transition-all duration-700 ease-in-out">
                <div 
                  className="text-2xl font-bold mb-2"
                  style={{ color: backgroundStyles.thermal.primary }}
                >
                  {highlight}
                </div>
                <div className="text-sm text-gray-400 whitespace-pre-line">
                  {currentSlideData.backgroundType === 'thermal' && index === 0 && 'Especialização em\nGrandes Complexos'}
                  {currentSlideData.backgroundType === 'thermal' && index === 1 && 'Shopping Centers\n& Corporativos'}
                  {currentSlideData.backgroundType === 'thermal' && index === 2 && 'Residenciais\n& Empresariais'}
                  
                  {currentSlideData.backgroundType === 'engineering' && index === 0 && 'Armazenamento\nde Energia'}
                  {currentSlideData.backgroundType === 'engineering' && index === 1 && 'Sistemas\nFotovoltaicos'}
                  {currentSlideData.backgroundType === 'engineering' && index === 2 && 'Pontos de\nRecarga'}
                  
                  {currentSlideData.backgroundType === 'consulting' && index === 0 && 'Economia até\n30% na conta'}
                  {currentSlideData.backgroundType === 'consulting' && index === 1 && 'Certificações\nAmbientais'}
                  {currentSlideData.backgroundType === 'consulting' && index === 2 && 'Normas\nTécnicas'}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              type="button"
              className="px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-thermal transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 text-white"
              style={{
                background: `linear-gradient(to right, ${backgroundStyles.thermal.primary}, ${backgroundStyles.thermal.secondary})`
              }}
              aria-label="Solicitar orçamento - Ir para seção de contato"
            >
              {currentSlideData.primaryCTA}
            </button>
            <button
              type="button"
              className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              aria-label="Ver cases de sucesso - Ir para seção de casos"
            >
              {currentSlideData.secondaryCTA}
            </button>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mb-20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
                  index === currentSlide ? 'scale-125' : 'opacity-50 hover:opacity-80'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? backgroundStyles.thermal.primary : 'white'
                }}
                aria-label={`Ir para slide ${index + 1}: ${heroSlides[index].subtitle}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}