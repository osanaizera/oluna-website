'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/utils/cn'

const getIcon = (iconName: string) => {
  const iconProps = {
    className: "w-full h-full",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }

  switch (iconName) {
    case 'thermometer':
      return (
        <svg {...iconProps} strokeWidth="1.5" stroke="currentColor" fill="none">
          {/* Câmera termográfica base */}
          <rect x="4" y="8" width="12" height="8" rx="2" fill="currentColor" fillOpacity="0.1"/>
          {/* Lente da câmera */}
          <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
          {/* Display/tela */}
          <rect x="14" y="9" width="3" height="2" rx="0.5" fill="currentColor" fillOpacity="0.3"/>
          {/* Ondas de calor */}
          <path d="M6 4 Q7 2 8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 3 Q11 1 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 4 Q15 2 16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Grip/empunhadura */}
          <rect x="8" y="16" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.2"/>
        </svg>
      )
    
    case 'zap':
      return (
        <svg {...iconProps}>
          <path d="M13 3L4 14h6l-2 7 9-11h-6l2-7z"/>
        </svg>
      )
    
    case 'activity':
      return (
        <svg {...iconProps}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    
    case 'clipboard-check':
      return (
        <svg {...iconProps} strokeWidth="1.5" stroke="currentColor" fill="none">
          {/* Documento principal */}
          <rect x="6" y="3" width="12" height="18" rx="2" fill="currentColor" fillOpacity="0.05" stroke="currentColor"/>
          {/* Cabeçalho do documento */}
          <rect x="8" y="1" width="8" height="3" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor"/>
          {/* Símbolo NR-10 */}
          <text x="12" y="8" textAnchor="middle" fontSize="6" fill="currentColor" fontWeight="bold">NR</text>
          <text x="12" y="10.5" textAnchor="middle" fontSize="4" fill="currentColor">10</text>
          {/* Linhas de texto */}
          <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <line x1="8" y1="15" x2="14" y2="15" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          <line x1="8" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          {/* Selo de aprovação */}
          <circle cx="15" cy="19" r="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor"/>
          <path d="M14 19 L15 20 L16.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    
    case 'shield':
      return (
        <svg {...iconProps}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    
    case 'lightbulb':
      return (
        <svg {...iconProps}>
          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1z"/>
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
      )
    
    case 'battery':
      return (
        <svg {...iconProps} strokeWidth="1.5" stroke="currentColor" fill="none">
          {/* Sistema BESS principal */}
          <rect x="3" y="6" width="16" height="12" rx="2" fill="currentColor" fillOpacity="0.05" stroke="currentColor"/>
          {/* Módulos de bateria */}
          <rect x="5" y="8" width="3" height="8" rx="0.5" fill="currentColor" fillOpacity="0.2"/>
          <rect x="9" y="8" width="3" height="8" rx="0.5" fill="currentColor" fillOpacity="0.3"/>
          <rect x="13" y="8" width="3" height="8" rx="0.5" fill="currentColor" fillOpacity="0.4"/>
          {/* Indicadores de carga */}
          <rect x="5.5" y="9" width="2" height="1.5" rx="0.2" fill="currentColor"/>
          <rect x="9.5" y="9" width="2" height="1.5" rx="0.2" fill="currentColor"/>
          <rect x="13.5" y="9" width="2" height="1.5" rx="0.2" fill="currentColor"/>
          {/* Terminal positivo */}
          <rect x="19" y="10" width="2" height="4" rx="1" fill="currentColor" fillOpacity="0.3"/>
          {/* Conexões elétricas */}
          <path d="M5 6 Q5 4 7 4 Q9 4 9 6" stroke="currentColor" strokeWidth="1" fill="none"/>
          <path d="M13 6 Q13 4 15 4 Q17 4 17 6" stroke="currentColor" strokeWidth="1" fill="none"/>
          {/* Indicador de energia */}
          <path d="M10 12 L12 10 L11 11 L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      )
  }
}

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  groupLabel: string
  isHighlighted?: boolean
  color: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  icon: string
  image: string
}

const services: Service[] = [
  {
    id: 'termografia',
    title: 'Termografia',
    subtitle: 'Nosso Produto Principal - Detecção Precoce de Falhas',
    description: 'Análise térmica avançada para identificar problemas antes que se tornem custosos. Nosso serviço mais especializado com tecnologia de ponta.',
    features: [
      'Equipamentos calibrados FLIR',
      'Análise em tempo real',
      'Relatórios técnicos detalhados',
      'Termografista certificado Nível II',
      'Análise de tendências',
      'Prognóstico de falhas'
    ],
    groupLabel: 'Medições e Análises',
    isHighlighted: true,
    color: {
      primary: '#FF6A3D',
      secondary: '#FF4500',
      accent: '#FFA07A',
      background: 'from-orange-900 to-red-900'
    },
    icon: 'thermometer',
    image: 'termografia.png'
  },
  {
    id: 'diagnosticos-eletricos',
    title: 'Diagnósticos Elétricos',
    subtitle: 'Análise Completa de Qualidade Energética',
    description: 'Medições especializadas para otimização do consumo energético e identificação de distúrbios elétricos.',
    features: [
      'Qualidade de energia',
      'Análise de harmônicas',
      'Fator de potência',
      'Dimensionamento de expansões',
      'Análise de contratos',
      'Potência disponível'
    ],
    groupLabel: 'Medições e Análises',
    color: {
      primary: '#FF6A3D',
      secondary: '#D5577A',
      accent: '#FFA07A',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'zap',
    image: 'diagnostico.png'
  },
  {
    id: 'monitoramento',
    title: 'Monitoramento Contínuo',
    subtitle: 'IoT e Alertas em Tempo Real',
    description: 'Sistema de monitoramento 24/7 com sensores IoT inteligentes e alertas automáticos via WhatsApp.',
    features: [
      'Sensores IoT inteligentes',
      'Dashboard online',
      'Alertas por WhatsApp',
      'Histórico completo',
      'Relatórios automáticos',
      'Análise de tendências'
    ],
    groupLabel: 'Medições e Análises',
    color: {
      primary: '#FF6A3D',
      secondary: '#D5577A',
      accent: '#FFA07A',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'activity',
    image: 'monitoring.png'
  },
  {
    id: 'laudos-nr10',
    title: 'Laudos NR-10',
    subtitle: 'Conformidade em Segurança Elétrica',
    description: 'Laudos técnicos obrigatórios conforme Norma Regulamentadora 10 para garantir segurança em instalações elétricas.',
    features: [
      'Conformidade legal',
      'ART incluída',
      'Análise de riscos',
      'Prazo de 48h',
      'Medidas de proteção',
      'Procedimentos de segurança'
    ],
    groupLabel: 'Laudos e Conformidade',
    color: {
      primary: '#0093FF',
      secondary: '#4FC3F7',
      accent: '#81D4FA',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'clipboard-check',
    image: 'nr10.png'
  },
  {
    id: 'laudos-spda',
    title: 'Laudos SPDA',
    subtitle: 'Proteção contra Descargas Atmosféricas',
    description: 'Laudos especializados em Sistemas de Proteção contra Descargas Atmosféricas conforme NBR 5419.',
    features: [
      'Conformidade NBR 5419',
      'Medições de resistência',
      'Análise de eficiência',
      'ART incluída',
      'Inspeção visual',
      'Relatórios fotográficos'
    ],
    groupLabel: 'Laudos e Conformidade',
    color: {
      primary: '#0093FF',
      secondary: '#4FC3F7',
      accent: '#81D4FA',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'shield',
    image: 'SPDA.png'
  },
  {
    id: 'eficiencia-energetica',
    title: 'Eficiência Energética',
    subtitle: 'Estratégias de Economia e Sustentabilidade',
    description: 'Consultoria para otimização do consumo energético e implementação de soluções sustentáveis.',
    features: [
      'Análise de consumo',
      'Plano de eficiência',
      'ROI calculado',
      'Acompanhamento contínuo',
      'Certificações verdes',
      'Relatórios de economia'
    ],
    groupLabel: 'Consultoria Energética',
    color: {
      primary: '#00E676',
      secondary: '#4CAF50',
      accent: '#81C784',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'lightbulb',
    image: 'consultoria.png'
  },
  {
    id: 'projetos-bess',
    title: 'Projetos BESS',
    subtitle: 'Sistemas de Armazenamento de Energia',
    description: 'Consultoria especializada para implementação de sistemas BESS (Battery Energy Storage Systems).',
    features: [
      'Dimensionamento BESS',
      'Integração renovável',
      'Análise de viabilidade',
      'Projeto executivo',
      'Estudos de payback',
      'Gerenciamento de projeto'
    ],
    groupLabel: 'Consultoria Energética',
    color: {
      primary: '#00E676',
      secondary: '#4CAF50',
      accent: '#81C784',
      background: 'from-gray-800 to-slate-900'
    },
    icon: 'battery',
    image: 'bess.png'
  }
]

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Auto-advance carousel
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % services.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentService = services[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  }

  return (
    <motion.section
      ref={containerRef}
      className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"
      style={{ opacity }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${currentService.color.primary} 0%, transparent 70%)`,
            y
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${currentService.color.secondary} 0%, transparent 70%)`,
            y: useTransform(scrollYProgress, [0, 1], [-30, 30])
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: currentService.color.primary }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-white font-semibold">Nossos Serviços</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Soluções{' '}
            <motion.span
              style={{ color: currentService.color.primary }}
              animate={{ 
                textShadow: [`0 0 20px ${currentService.color.primary}40`, `0 0 40px ${currentService.color.primary}20`, `0 0 20px ${currentService.color.primary}40`]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Especializadas
            </motion.span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Especialistas em Energia
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Service Cards */}
          <div className="relative h-[500px] mb-6">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.5 }
                }}
                className="absolute inset-0"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className={cn(
                    "h-full rounded-3xl shadow-2xl overflow-hidden",
                    "bg-gradient-to-br",
                    currentService.color.background,
                    currentService.isHighlighted && "ring-4 ring-orange-500/50 ring-offset-4 ring-offset-gray-900"
                  )}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 25px 50px -12px ${currentService.color.primary}25`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Content Side */}
                    <div className="p-4 lg:p-6 flex flex-col justify-between">
                      
                      {/* Group Label - Sutil */}
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                          {currentService.groupLabel}
                        </span>
                      </motion.div>

                      {/* Service Header - Principal */}
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <motion.div
                            className={cn(
                              "text-white",
                              currentService.isHighlighted ? "w-12 h-12" : "w-10 h-10"
                            )}
                            style={{ color: currentService.color.primary }}
                            animate={{
                              scale: currentService.isHighlighted ? [1, 1.1, 1] : [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          >
                            {getIcon(currentService.icon)}
                          </motion.div>
                          
                          {currentService.isHighlighted && (
                            <motion.div
                              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                              animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: ['0 0 0 0 rgba(255, 106, 61, 0.7)', '0 0 0 10px rgba(255, 106, 61, 0)', '0 0 0 0 rgba(255, 106, 61, 0)']
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                            >
                              PRODUTO PRINCIPAL
                            </motion.div>
                          )}
                        </div>

                        <h3 className={cn(
                          "font-display font-bold text-white mb-3",
                          currentService.isHighlighted ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"
                        )}>
                          {currentService.title}
                        </h3>

                        <p 
                          className={cn(
                            "font-semibold mb-3",
                            currentService.isHighlighted ? "text-lg" : "text-base"
                          )}
                          style={{ color: currentService.color.primary }}
                        >
                          {currentService.subtitle}
                        </p>

                        <p className={cn(
                          "text-gray-300 leading-relaxed",
                          currentService.isHighlighted ? "text-base mb-6" : "text-sm mb-4"
                        )}>
                          {currentService.description}
                        </p>
                      </motion.div>

                      {/* Features */}
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className={cn(
                          "grid gap-2",
                          currentService.isHighlighted ? "grid-cols-2" : "grid-cols-3"
                        )}>
                          {currentService.features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                            >
                              <motion.div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: currentService.color.primary }}
                                whileHover={{ scale: 1.5 }}
                              />
                              <span className="text-xs text-gray-300 font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.button
                          className={cn(
                            "rounded-xl font-semibold text-white shadow-lg w-full",
                            currentService.isHighlighted ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
                          )}
                          style={{ backgroundColor: currentService.color.primary }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: `0 15px 40px ${currentService.color.primary}40`
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {currentService.isHighlighted ? `Solicitar ${currentService.title} - Principal` : `Solicitar ${currentService.title}`}
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Image Side */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-gray-900">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        {/* Service Image */}
                        <div className="relative w-full h-full">
                          <Image
                            src={`/images/services/${currentService.image}`}
                            alt={currentService.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={currentService.isHighlighted}
                          />
                          {/* Overlay with service color */}
                          <div 
                            className="absolute inset-0 opacity-60 mix-blend-multiply"
                            style={{
                              background: `linear-gradient(135deg, ${currentService.color.primary}60 0%, ${currentService.color.secondary}40 100%)`
                            }}
                          />
                        </div>

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        />
                      </motion.div>

                      {/* Floating Stats */}
                      <motion.div
                        className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg"
                        initial={{ opacity: 0, scale: 0, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 1, type: "spring" }}
                      >
                        <div className="text-center">
                          <div 
                            className="text-2xl font-bold"
                            style={{ color: currentService.color.primary }}
                          >
                            {currentService.isHighlighted ? '#1' : '24h'}
                          </div>
                          <div className="text-xs text-gray-600">
                            {currentService.isHighlighted ? 'Produto' : 'Resposta'}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white hover:text-white"
              whileHover={{
                backgroundColor: currentService.color.primary,
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Indicators */}
            <div className="flex items-center gap-3">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative overflow-hidden rounded-full"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  title={service.title}
                >
                  <div className={cn(
                    "rounded-full bg-white/30 transition-all duration-300",
                    service.isHighlighted ? "w-6 h-6" : "w-4 h-4"
                  )} />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: currentService.color.primary }}
                    initial={false}
                    animate={{
                      scale: index === currentIndex ? 1 : 0,
                      opacity: index === currentIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: currentService.color.primary }}
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  {service.isHighlighted && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white hover:text-white"
              whileHover={{
                backgroundColor: currentService.color.primary,
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentService.color.primary }}
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                transition={{ duration: isAutoPlaying ? 5 : 0, ease: "linear" }}
                onAnimationComplete={() => {
                  if (isAutoPlaying) {
                    nextSlide()
                  }
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-300">
              <span>Auto-advance {isAutoPlaying ? 'ativo' : 'pausado'}</span>
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="hover:text-white transition-colors"
              >
                {isAutoPlaying ? '⏸️' : '▶️'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}