/**
 * LGPD-Compliant Cookie Consent Manager
 * Brazilian data protection law compliant consent management
 * for Ôluna Engenharia website analytics
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getConsentState,
  saveConsentState,
  shouldShowConsentBanner,
  getDataProcessingNotice,
  optOutFromTracking,
  optInToTracking,
  needsConsentRenewal,
  getConsentExpiryDate,
} from '@/utils/privacy'
import type { ConsentState } from '@/types/analytics'

interface CookieConsentProps {
  className?: string
  position?: 'bottom' | 'top' | 'center'
  showDetailsModal?: boolean
}

export function CookieConsent({
  className = '',
  position = 'bottom',
  showDetailsModal = true,
}: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showRenewal, setShowRenewal] = useState(false)
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const currentConsent = getConsentState()
    setConsent(currentConsent)
    setShowBanner(shouldShowConsentBanner())
    setShowRenewal(needsConsentRenewal())
  }, [])

  const handleAcceptAll = async () => {
    setIsLoading(true)

    const updatedConsent = saveConsentState({
      analytics: 'granted',
      marketing: 'granted',
      functional: 'granted',
      preferences: 'granted',
    })

    setConsent(updatedConsent)
    setShowBanner(false)
    setShowRenewal(false)

    // Dispatch consent update event
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: updatedConsent,
      })
    )

    setIsLoading(false)
  }

  const handleRejectAll = async () => {
    setIsLoading(true)

    const updatedConsent = optOutFromTracking()

    setConsent(updatedConsent)
    setShowBanner(false)
    setShowRenewal(false)

    // Dispatch consent update event
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: updatedConsent,
      })
    )

    setIsLoading(false)
  }

  const handleCustomizeConsent = (consentUpdates: Partial<ConsentState>) => {
    setIsLoading(true)

    const updatedConsent = saveConsentState(consentUpdates)

    setConsent(updatedConsent)
    setShowBanner(false)
    setShowDetails(false)
    setShowRenewal(false)

    // Dispatch consent update event
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: updatedConsent,
      })
    )

    setIsLoading(false)
  }

  const dataProcessingNotice = getDataProcessingNotice()

  if (!showBanner && !showRenewal) {
    return null
  }

  const positionClasses = {
    bottom: 'bottom-0 left-0 right-0',
    top: 'top-0 left-0 right-0',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  }

  return (
    <>
      <AnimatePresence>
        {(showBanner || showRenewal) && (
          <motion.div
            initial={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === 'bottom' ? 100 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`fixed ${positionClasses[position]} z-50 ${className}`}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
          >
            <div className="bg-white border-t-4 border-heat-orange shadow-2xl max-w-full">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      id="cookie-consent-title"
                      className="text-lg font-semibold text-graphite mb-2"
                    >
                      {showRenewal
                        ? 'Renovação de Consentimento'
                        : 'Proteção de Dados e Privacidade'}
                    </h3>
                    <p
                      id="cookie-consent-description"
                      className="text-gray-600 text-sm leading-relaxed mb-4 lg:mb-0"
                    >
                      {showRenewal ? (
                        <>
                          Seu consentimento expira em{' '}
                          {getConsentExpiryDate().toLocaleDateString('pt-BR')}. Precisamos renovar
                          suas preferências de privacidade para continuar oferecendo a melhor
                          experiência em nosso site.
                        </>
                      ) : (
                        <>
                          Respeitamos sua privacidade e seguimos a{' '}
                          <strong>Lei Geral de Proteção de Dados (LGPD)</strong>. Utilizamos cookies
                          essenciais para o funcionamento do site e, com seu consentimento, cookies
                          de análise para melhorar nossos serviços. Você pode personalizar suas
                          preferências a qualquer momento.
                        </>
                      )}
                    </p>
                    <div className="text-xs text-gray-500">
                      <a
                        href="/politica-privacidade"
                        className="underline hover:text-heat-orange transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de Privacidade
                      </a>
                      {' | '}
                      <button
                        onClick={() => setShowDetails(true)}
                        className="underline hover:text-heat-orange transition-colors"
                      >
                        Detalhes dos Cookies
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 min-w-max">
                    <button
                      onClick={() => setShowDetails(true)}
                      className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
                      disabled={isLoading}
                    >
                      Personalizar
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
                      disabled={isLoading}
                    >
                      Rejeitar Opcional
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2 text-sm bg-heat-orange text-white hover:bg-heat-red transition-colors rounded-md font-medium disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processando...' : 'Aceitar Todos'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Consent Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="consent-modal-title"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 id="consent-modal-title" className="text-xl font-bold text-graphite">
                    Configurações de Privacidade
                  </h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <ConsentForm
                  consent={consent}
                  onSave={handleCustomizeConsent}
                  dataProcessingNotice={dataProcessingNotice}
                  isLoading={isLoading}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

interface ConsentFormProps {
  consent: ConsentState | null
  onSave: (consent: Partial<ConsentState>) => void
  dataProcessingNotice: ReturnType<typeof getDataProcessingNotice>
  isLoading: boolean
}

function ConsentForm({ consent, onSave, dataProcessingNotice, isLoading }: ConsentFormProps) {
  const [formConsent, setFormConsent] = useState({
    analytics: consent?.analytics || 'denied',
    marketing: consent?.marketing || 'denied',
    functional: consent?.functional || 'denied',
    preferences: consent?.preferences || 'denied',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formConsent)
  }

  const cookieCategories = [
    {
      id: 'essential',
      name: 'Cookies Essenciais',
      description: 'Necessários para o funcionamento básico do site, como segurança e navegação.',
      required: true,
      examples: ['Sessão do usuário', 'Segurança CSRF', 'Preferências de idioma'],
    },
    {
      id: 'analytics',
      name: 'Cookies de Análise',
      description: 'Nos ajudam a entender como você usa o site e melhorar nossos serviços.',
      required: false,
      examples: ['Google Analytics', 'Métricas de performance', 'Estatísticas de uso'],
      consentKey: 'analytics' as keyof typeof formConsent,
    },
    {
      id: 'functional',
      name: 'Cookies Funcionais',
      description: 'Permitem funcionalidades extras como formulários e integração com WhatsApp.',
      required: false,
      examples: ['Formulário de contato', 'Botão WhatsApp', 'Mapa interativo'],
      consentKey: 'functional' as keyof typeof formConsent,
    },
    {
      id: 'preferences',
      name: 'Cookies de Preferências',
      description: 'Lembram suas escolhas para personalizar sua experiência no site.',
      required: false,
      examples: ['Tema escolhido', 'Configurações salvas', 'Preferências de contato'],
      consentKey: 'preferences' as keyof typeof formConsent,
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Data Processing Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Informações sobre Tratamento de Dados</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>Finalidade:</strong> {dataProcessingNotice.purpose}
          </p>
          <p>
            <strong>Base Legal:</strong> {dataProcessingNotice.legalBasis}
          </p>
          <p>
            <strong>Retenção:</strong> {dataProcessingNotice.retention}
          </p>
          <p>
            <strong>Contato:</strong> {dataProcessingNotice.contact}
          </p>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="space-y-4">
        {cookieCategories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-graphite mb-1">{category.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <details className="text-xs text-gray-500">
                  <summary className="cursor-pointer hover:text-gray-700">Ver exemplos</summary>
                  <ul className="mt-2 ml-4 list-disc">
                    {category.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </details>
              </div>

              <div className="ml-4">
                {category.required ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Obrigatório
                  </span>
                ) : (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formConsent[category.consentKey!] === 'granted'}
                      onChange={(e) =>
                        setFormConsent((prev) => ({
                          ...prev,
                          [category.consentKey!]: e.target.checked ? 'granted' : 'denied',
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-heat-orange/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-heat-orange"></div>
                  </label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LGPD Rights */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold text-graphite mb-2">Seus Direitos sob a LGPD</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          {dataProcessingNotice.rights.map((right, index) => (
            <li key={index} className="flex items-start">
              <span className="text-heat-orange mr-2">•</span>
              {right}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-3">
          Para exercer seus direitos, entre em contato conosco através do e-mail:{' '}
          {dataProcessingNotice.contact}
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={() =>
            setFormConsent({
              analytics: 'denied',
              marketing: 'denied',
              functional: 'denied',
              preferences: 'denied',
            })
          }
          className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
          disabled={isLoading}
        >
          Rejeitar Todos
        </button>
        <button
          type="button"
          onClick={() =>
            setFormConsent({
              analytics: 'granted',
              marketing: 'granted',
              functional: 'granted',
              preferences: 'granted',
            })
          }
          className="px-4 py-2 text-sm border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
          disabled={isLoading}
        >
          Aceitar Todos
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm bg-heat-orange text-white hover:bg-heat-red transition-colors rounded-md font-medium disabled:opacity-50 flex-1 sm:flex-none"
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Preferências'}
        </button>
      </div>
    </form>
  )
}

export default CookieConsent
