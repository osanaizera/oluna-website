'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ThermographyIcon,
  EnergyDiagnosticIcon,
  CertificationIcon,
  MonitoringIcon,
} from '@/components/icons/ServiceIcons'

const services = [
  {
    id: 'termografia-paineis',
    title: 'Termografia de Painéis Elétricos',
    subtitle: 'Detecte problemas antes que aconteçam',
    description:
      'Inspeção termográfica especializada em painéis elétricos para identificar pontos quentes, conexões soltas e sobrecargas em tempo real.',
    icon: ThermographyIcon,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    color: 'var(--heat-orange)',
    benefits: [
      'Inspeção sem parada de produção',
      'Relatórios com imagens termográficas HD',
      'Identificação de conexões críticas',
      'Priorização de manutenções',
    ],
    thermalPattern: 'hot',
  },
  {
    id: 'qualidade-energia',
    title: 'Análises de Qualidade de Energia',
    subtitle: 'Otimize sua eficiência energética',
    description:
      'Medições especializadas de qualidade energética com análise de harmônicas, fator de potência e distorções.',
    icon: EnergyDiagnosticIcon,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    color: 'var(--cool-teal)',
    benefits: [
      'Análise de harmônicas e THD',
      'Medição de fator de potência',
      'Identificação de perdas energéticas',
      'Relatórios de conformidade',
    ],
    thermalPattern: 'cool',
  },
  {
    id: 'relatorio-nr10',
    title: 'Relatório de Adequação NR-10',
    subtitle: 'Conformidade regulatória garantida',
    description:
      'Relatórios técnicos especializados para adequação às normas NR-10, com análise completa de instalações elétricas.',
    icon: CertificationIcon,
    gradient: 'from-purple-500 via-violet-500 to-pink-500',
    color: 'var(--heat-red)',
    benefits: [
      'Conformidade total NR-10',
      'Documentação técnica ART',
      'Planos de adequação detalhados',
      'Acompanhamento das melhorias',
    ],
    thermalPattern: 'warm',
  },
  {
    id: 'laudo-spda',
    title: 'Laudo SPDA',
    subtitle: 'Proteção contra descargas atmosféricas',
    description:
      'Laudos técnicos especializados em Sistemas de Proteção contra Descargas Atmosféricas (SPDA) conforme NBR 5419.',
    icon: CertificationIcon,
    gradient: 'from-yellow-500 via-amber-500 to-orange-500',
    color: 'var(--heat-orange)',
    benefits: [
      'Conformidade NBR 5419',
      'Medições de resistência',
      'Análise de eficiência do sistema',
      'Relatórios com ART',
    ],
    thermalPattern: 'hot',
  },
  {
    id: 'suporte-tecnologias',
    title: 'Suporte de Engenharia para Novas Tecnologias',
    subtitle: 'BESS, Carregadores Elétricos e mais',
    description:
      'Consultoria especializada para implementação de tecnologias emergentes como sistemas de armazenamento de energia e infraestrutura de recarga.',
    icon: MonitoringIcon,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    color: 'var(--forest-green)',
    benefits: [
      'Projetos de BESS (Battery Energy Storage)',
      'Infraestrutura para carregadores elétricos',
      'Integração com fontes renováveis',
      'Consultoria em eficiência energética',
    ],
    thermalPattern: 'medium',
  },
  {
    id: 'monitoramento-gestao',
    title: 'Monitoramento e Gestão de Energia',
    subtitle: 'Visibilidade 24/7 do seu consumo',
    description:
      'Sistema integrado de monitoramento energético com dashboards em tempo real, alertas inteligentes e relatórios automatizados.',
    icon: MonitoringIcon,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    color: 'var(--cool-teal)',
    benefits: [
      'Dashboard web em tempo real',
      'Alertas via WhatsApp e email',
      'Relatórios automatizados',
      'Análise de tendências de consumo',
    ],
    thermalPattern: 'cool',
  },
]

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length)
    }, 5000)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay])

  // Touch/Swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      setActiveIndex((prev) => (prev + 1) % services.length)
    } else if (isRightSwipe) {
      setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
    }

    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  // Navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const activeService = services[activeIndex]

  return (
    <section
      id="servicos"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Thermal Wave Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="thermalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeService.color} stopOpacity="0.6" />
                <stop offset="50%" stopColor={activeService.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={activeService.color} stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated Thermal Waves */}
            {[...Array(6)].map((_, i) => (
              <path
                key={i}
                d={`M0,${200 + i * 100} Q300,${150 + i * 100 + Math.sin(Date.now() * 0.001 + i) * 20} 600,${200 + i * 100} T1200,${200 + i * 100}`}
                stroke="url(#thermalGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                className={`transition-all duration-1000 ${
                  activeService.thermalPattern === 'hot'
                    ? 'animate-pulse'
                    : activeService.thermalPattern === 'warm'
                      ? 'animate-bounce'
                      : activeService.thermalPattern === 'medium'
                        ? 'animate-pulse'
                        : 'animate-ping'
                }`}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-30"
              style={{
                backgroundColor: activeService.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeService.color}15 0%, transparent 70%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: activeService.color }}
            ></div>
            <span className="text-white font-medium">Tecnologia Avançada</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Nossos{' '}
            <span
              className="transition-all duration-1000"
              style={{
                color: activeService.color,
                textShadow: `0 0 30px ${activeService.color}40`,
              }}
            >
              Serviços
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluções de engenharia com tecnologia de ponta para detectar o invisível e transformar
            dados em ações preventivas.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Service Card */}
          <div className="relative h-96 md:h-80 mb-8">
            <div
              className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 transition-all duration-700 overflow-hidden"
              style={{
                boxShadow: `0 25px 50px -12px ${activeService.color}40`,
              }}
            >
              {/* Card Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(circle at 20% 20%, ${activeService.color} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${activeService.color} 0%, transparent 50%)`,
                  }}
                />
              </div>

              <div className="relative p-8 md:p-12 h-full flex flex-col md:flex-row items-center gap-8">
                {/* Service Icon & Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-700 bg-gradient-to-br"
                      style={{
                        background: `linear-gradient(135deg, ${activeService.color}, ${activeService.color}80)`,
                      }}
                    >
                      <activeService.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-display font-bold text-white mb-2">
                        {activeService.title}
                      </h3>
                      <p className="text-lg font-medium" style={{ color: activeService.color }}>
                        {activeService.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {activeService.description}
                  </p>

                  <button
                    className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r"
                    style={{
                      background: `linear-gradient(45deg, ${activeService.color}, ${activeService.color}80)`,
                    }}
                  >
                    Solicitar {activeService.title}
                  </button>
                </div>

                {/* Benefits List */}
                <div className="flex-1 max-w-md">
                  <h4 className="text-white font-semibold mb-4 text-lg">Principais Benefícios:</h4>
                  <div className="space-y-4">
                    {activeService.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 text-gray-300 transition-all duration-500"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          opacity: 1,
                          transform: 'translateX(0)',
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: activeService.color }}
                        />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex items-center gap-3">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                  style={{
                    backgroundColor: index === activeIndex ? activeService.color : '#ffffff60',
                  }}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-400 hidden md:block">
                {isAutoPlaying ? 'Auto-play ativo' : 'Auto-play pausado'}
              </div>

              {/* Arrow Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 max-w-2xl mx-auto border border-white/10">
            <h3 className="text-2xl font-display font-semibold text-white mb-4">
              Precisa de uma Solução Personalizada?
            </h3>
            <p className="text-gray-300 mb-6">
              Nossa equipe desenvolve soluções sob medida para desafios específicos da sua operação.
            </p>
            <button className="bg-gradient-to-r from-white to-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes thermalWave {
          0%,
          100% {
            d: path('M0,200 Q300,150 600,200 T1200,200');
          }
          50% {
            d: path('M0,200 Q300,180 600,200 T1200,200');
          }
        }
      `}</style>
    </section>
  )
}
