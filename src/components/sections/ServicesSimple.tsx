'use client'

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
    subtitle: 'Detecte problemas antes que aconteçam',
    description:
      'Inspeção termográfica para identificar pontos quentes, sobrecargas e conexões soltas em painéis elétricos, CCMs e barramentos.',
    icon: ThermographyIcon,
    gradient: 'from-primary-400 to-accent-500',
    benefits: [
      'Sem parada de produção',
      'Relatórios com imagens termográficas',
      'Priorização de ações corretivas',
    ],
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico Energético',
    subtitle: 'Otimize seu consumo de energia',
    description:
      'Análise completa da qualidade de energia, medição de harmônicas, fator de potência e identificação de oportunidades de economia.',
    icon: EnergyDiagnosticIcon,
    gradient: 'from-secondary-500 to-primary-400',
    benefits: [
      'Medições com equipamentos calibrados',
      'Relatório com cálculo de ROI',
      'Plano de melhorias energéticas',
    ],
  },
  {
    id: 'laudos',
    title: 'Laudos NR-10/12',
    subtitle: 'Conformidade regulatória garantida',
    description:
      'Elaboração de laudos técnicos assinados por engenheiro CRE A para atender as normas NR-10 e NR-12.',
    icon: CertificationIcon,
    gradient: 'from-accent-500 to-secondary-500',
    benefits: [
      'Assinados por engenheiro CRE A',
      'Conformidade com normas vigentes',
      'Cronograma de adequações',
    ],
  },
  {
    id: 'monitoramento',
    title: 'Monitoramento Contínuo',
    subtitle: 'Acompanhamento em tempo real',
    description:
      'Sistema de monitoramento 24/7 com alertas automáticos por e-mail, WhatsApp e dashboard web para acompanhamento.',
    icon: MonitoringIcon,
    gradient: 'from-primary-400 to-secondary-500',
    benefits: ['Dashboard online 24/7', 'Alertas automáticos', 'Histórico e relatórios mensais'],
  },
]

export default function ServicesSimple() {
  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            <span className="text-primary-700 font-medium">Nossos Serviços</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Como Podemos{' '}
            <span className="bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500 bg-clip-text text-transparent">
              Ajudar Você
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Soluções especializadas em engenharia elétrica e termografia para garantir a segurança e
            eficiência da sua operação.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
            >
              {/* Service Header */}
              <div className="flex items-start gap-6 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.gradient} group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm font-medium mb-3 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}
                  >
                    {service.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {service.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}
                    />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:scale-105`}
              >
                Solicitar {service.title}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  Consultoria Especializada
                </h3>
                <p className="text-gray-600 mb-6">
                  Não encontrou exatamente o que precisa? Nossa equipe desenvolve soluções
                  personalizadas para seu desafio específico.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Engenheiros CRE A</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Resposta em 24h</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-gradient-to-r from-primary-400 via-accent-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Falar com Especialista
                </button>
                <p className="text-xs text-gray-500 mt-2">Análise inicial gratuita</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
