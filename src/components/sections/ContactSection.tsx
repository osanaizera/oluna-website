'use client'

import { useState } from 'react'
import LeadForm from './LeadForm'
import EnhancedContactForm from '@/components/forms/EnhancedContactForm'

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false)

  return (
    <section
      id="contato"
      className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Enhanced Thermal Background Effects */}
      <div className="absolute inset-0">
        {/* Animated thermal waves for contact */}
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="contactThermal1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="contactThermal2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--cool-teal)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--heat-orange)" stopOpacity="0.1" />
              </linearGradient>
              <filter id="contactGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Gentle thermal flows */}
            <path
              d="M0,100 Q300,50 600,100 T1200,100 Q900,150 600,200 T0,200 Z"
              fill="url(#contactThermal1)"
              filter="url(#contactGlow)"
              className="animate-pulse"
              style={{ animationDuration: '12s' }}
            />

            <path
              d="M0,400 Q400,350 800,400 T1200,400 L1200,600 L0,600 Z"
              fill="url(#contactThermal2)"
              filter="url(#contactGlow)"
              className="animate-pulse"
              style={{ animationDuration: '15s', animationDelay: '3s' }}
            />

            {/* Floating contact indicators */}
            {[...Array(4)].map((_, i) => (
              <g key={i}>
                <circle
                  cx={300 + i * 200}
                  cy={250 + (i % 2) * 80}
                  r="2"
                  fill="var(--heat-orange)"
                  opacity="0.4"
                  className="animate-pulse"
                  style={{
                    animationDuration: `${4 + i}s`,
                    animationDelay: `${i * 1.5}s`,
                  }}
                />
                <circle
                  cx={300 + i * 200}
                  cy={250 + (i % 2) * 80}
                  r="6"
                  fill="none"
                  stroke="var(--heat-red)"
                  strokeWidth="1"
                  opacity="0.2"
                  className="animate-ping"
                  style={{
                    animationDuration: `${5 + i}s`,
                    animationDelay: `${i * 1.5}s`,
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Subtle radial gradients */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, var(--heat-orange) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, var(--cool-teal) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, var(--heat-red) 0%, transparent 50%)
              `,
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        {!showForm ? (
          // CTA Principal
          <div className="max-w-4xl mx-auto text-center">
            {/* Opções de Contato */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-8">
                Como prefere falar conosco?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Formulário Detalhado */}
                <button
                  onClick={() => setShowForm(true)}
                  className="group p-6 border-2 border-primary-200 rounded-2xl hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solicite um Orçamento</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Conte-nos sobre sua necessidade específica
                  </p>
                  <span className="text-primary-400 font-medium text-sm">Mais preciso →</span>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => {
                    const message = encodeURIComponent(
                      'Olá! Gostaria de solicitar uma um orçamento para minha operação. Podem me ajudar?'
                    )
                    window.open(`https://wa.me/5521973498376?text=${message}`, '_blank')
                  }}
                  className="group p-6 border-2 border-green-200 rounded-2xl hover:border-green-400 hover:bg-green-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.685" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-600 mb-4">Contato direto e agendamento rápido</p>
                  <span className="text-green-500 font-medium text-sm">Mais rápido →</span>
                </button>

                {/* Telefone */}
                <button
                  onClick={() => window.open('tel:+5521973498376')}
                  className="group p-6 border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Telefone</h4>
                  <p className="text-sm text-gray-600 mb-4">Fale diretamente com nossa equipe</p>
                  <span className="text-blue-500 font-medium text-sm">Mais direto →</span>
                </button>
              </div>
            </div>

            {/* Credibilidade */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Engenheiros CRE A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>150+ clientes ativos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Resposta em 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Orçamento rápido</span>
              </div>
            </div>
          </div>
        ) : (
          // Formulário de Lead
          <div>
            <div className="text-center mb-12">
              <button
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Voltar às opções de contato
              </button>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Solicitar Orçamento
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Quanto mais detalhes você fornecer, mais precisa será nossa análise inicial.
                <strong className="text-gray-900"> Leva apenas 3 minutos.</strong>
              </p>
            </div>

            <EnhancedContactForm />
          </div>
        )}
      </div>
    </section>
  )
}
