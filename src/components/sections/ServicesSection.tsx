'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ThermographyIcon,
  EnergyDiagnosticIcon,
  CertificationIcon,
  MonitoringIcon,
} from '@/components/icons/ServiceIcons'

const services = [
  {
    id: 'termografia',
    title: 'Termografia Industrial',
    subtitle: 'Veja antes de falhar',
    description:
      'Identifique sobrecargas e conexões soltas sem parar a produção. Nossa tecnologia detecta pontos quentes em painéis, CCMs e barramentos com precisão cirúrgica.',
    icon: ThermographyIcon,
    gradient: 'from-primary-400 to-accent-500',
    features: [
      'Inspeção sem parada de produção',
      'Relatórios detalhados com imagens',
      'Recomendações prioritárias',
      'Análise de tendências térmicas',
    ],
    metrics: {
      efficiency: 95,
      accuracy: 98,
      speed: 85,
    },
    color: 'var(--heat-orange)',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico Energético',
    subtitle: 'Decisões seguras',
    description:
      'Medições precisas + análises profundas = decisões de investimento seguras. Identifique oportunidades de economia e otimize o consumo energético.',
    icon: EnergyDiagnosticIcon,
    gradient: 'from-secondary-500 to-primary-400',
    features: [
      'Qualidade de energia e harmônicas',
      'Análise de fator de potência',
      'Cálculo de ROI e payback',
      'Monitoramento em tempo real',
    ],
    metrics: {
      efficiency: 92,
      accuracy: 96,
      speed: 88,
    },
    color: 'var(--cool-teal)',
  },
  {
    id: 'laudos',
    title: 'Laudos NR-10/12',
    subtitle: 'Conformidade sem dor de cabeça',
    description:
      'Documentação oficial assinada por engenheiro, com recomendações claras para manter sua empresa em conformidade regulatória.',
    icon: CertificationIcon,
    gradient: 'from-accent-500 to-secondary-500',
    features: [
      'Laudos assinados por CRE A',
      'Conformidade NR-10 e NR-12',
      'Plano de ações corretivas',
      'Acompanhamento de implementação',
    ],
    metrics: {
      efficiency: 100,
      accuracy: 100,
      speed: 90,
    },
    color: 'var(--heat-red)',
  },
  {
    id: 'monitoramento',
    title: 'Monitoramento Contínuo',
    subtitle: 'Alertas proativos',
    description:
      'Alertas proativos direto no seu e-mail ou WhatsApp. Sensores inteligentes e portal web para dados em tempo quase real.',
    icon: MonitoringIcon,
    gradient: 'from-primary-400 to-secondary-500',
    features: [
      'Dashboard em tempo real',
      'Alertas por e-mail e WhatsApp',
      'Histórico e tendências',
      'IA para predição de falhas',
    ],
    metrics: {
      efficiency: 97,
      accuracy: 94,
      speed: 99,
    },
    color: '#00C4FF',
  },
]

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    })

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 106, 61, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 106, 61, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite',
            }}
          />
        </div>

        {/* Thermal gradients */}
        <div className="absolute inset-0 opacity-30">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
                index === activeService ? 'opacity-30 scale-110' : 'opacity-10 scale-90'
              }`}
              style={{
                background: `radial-gradient(circle, ${service.color}40 0%, transparent 70%)`,
                left: `${15 + index * 20}%`,
                top: `${20 + (index % 2) * 40}%`,
                transform: `translate(-50%, -50%) ${index === activeService ? 'scale(1.1)' : 'scale(0.9)'}`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Soluções Tecnológicas</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Nossos{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
              Serviços
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tecnologia de ponta para detectar o invisível e transformar dados em ações preventivas.
            <strong className="text-white"> Engenharia de precisão para sua operação.</strong>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Cards */}
          <div className="lg:col-span-7 space-y-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`group relative p-8 rounded-3xl border transition-all duration-700 cursor-pointer ${
                  index === activeService
                    ? 'bg-white/10 backdrop-blur-md border-white/30 scale-105'
                    : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/8'
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
              >
                {/* Progress indicator */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full">
                  <div
                    className={`w-full bg-gradient-to-b ${service.gradient} rounded-full transition-all duration-700 ${
                      index === activeService ? 'h-full' : 'h-0'
                    }`}
                  />
                </div>

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.gradient} transition-all duration-500 ${
                      index === activeService ? 'scale-110 shadow-2xl' : 'scale-100'
                    }`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-display font-semibold text-white">
                        {service.title}
                      </h3>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white`}
                      >
                        {service.subtitle}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>

                    {/* Features */}
                    <div
                      className={`grid grid-cols-2 gap-2 transition-all duration-500 ${
                        index === activeService
                          ? 'opacity-100 max-h-32'
                          : 'opacity-60 max-h-16 overflow-hidden'
                      }`}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div
                    className={`transition-all duration-500 ${
                      index === activeService
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    }`}
                  >
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-white">
                        {service.metrics.efficiency}%
                      </div>
                      <div className="text-xs text-gray-400">Eficiência</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Dashboard */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-300 text-sm">Análise em Tempo Real</p>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-6 mb-8">
                  {Object.entries(services[activeService].metrics).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300 capitalize">
                          {key === 'efficiency'
                            ? 'Eficiência'
                            : key === 'accuracy'
                              ? 'Precisão'
                              : 'Velocidade'}
                        </span>
                        <span className="text-white font-semibold">{value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${services[activeService].gradient} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Thermal Visualization */}
                <div className="relative">
                  <div className="text-sm text-gray-300 mb-4">Visualização Termográfica</div>
                  <div className="aspect-video bg-gray-800/50 rounded-2xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-32 h-32 rounded-full blur-xl transition-all duration-1000"
                        style={{
                          background: `radial-gradient(circle, ${services[activeService].color}80 0%, ${services[activeService].color}40 50%, transparent 100%)`,
                          animation: 'thermal-pulse 2s ease-in-out infinite',
                        }}
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 text-xs text-gray-400 font-mono">
                      TEMP: 45.2°C | STATUS: NORMAL
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  className={`w-full mt-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${services[activeService].gradient} hover:shadow-2xl hover:scale-105`}
                >
                  Solicitar {services[activeService].title}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Inspeções Realizadas', value: '1,200+' },
            { label: 'Economia Gerada', value: 'R$ 2,4M' },
            { label: 'Clientes Ativos', value: '150+' },
            { label: 'Uptime Médio', value: '99.8%' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes thermal-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
