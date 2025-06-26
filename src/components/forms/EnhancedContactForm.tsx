'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { validateContactForm, ContactFormData, BRAZILIAN_CITIES } from '@/utils/validation'
import {
  formatPhoneAsType,
  formatProperName,
  formatEmail,
  limitTextWithCounter,
} from '@/utils/format'
import { cn } from '@/utils/cn'
import { useFormTracking, useServiceTracking } from '@/hooks/useAnalytics'
import { trackQualifiedLead } from '@/utils/businessTracking'

// Service options with thermal icons
const SERVICES = [
  {
    id: 'termografia',
    name: 'Termografia',
    description: 'Análise térmica de equipamentos e instalações',
    icon: '🔥',
  },
  {
    id: 'qualidade-energia',
    name: 'Análise de Qualidade de Energia',
    description: 'Avaliação de qualidade e eficiência energética',
    icon: '⚡',
  },
  {
    id: 'consultoria-bess',
    name: 'Consultoria para Projeto de BESS',
    description: 'Sistemas de armazenamento de energia em baterias',
    icon: '🔋',
  },
  {
    id: 'analise-carregadores',
    name: 'Análise de Capacidade para Carregadores Elétricos',
    description: 'Estudo para instalação de pontos de recarga',
    icon: '🔌',
  },
  {
    id: 'energia-solar',
    name: 'Projeto de Energia Solar Local',
    description: 'Dimensionamento e projeto de sistemas fotovoltaicos',
    icon: '☀️',
  },
  {
    id: 'laudos',
    name: 'Laudos NR-10/12',
    description: 'Laudos técnicos obrigatórios',
    icon: '📋',
  },
  {
    id: 'outro',
    name: 'Outro Serviço',
    description: 'Descreva sua necessidade específica',
    icon: '🔧',
  },
]

const URGENCY_LEVELS = [
  {
    id: 'urgente',
    name: 'Urgente - Problema ativo',
    description: 'Necessita atenção imediata',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '🚨',
  },
  {
    id: 'alta',
    name: 'Alta - Até 1 semana',
    description: 'Prioridade alta',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    icon: '⚡',
  },
  {
    id: 'media',
    name: 'Média - Até 1 mês',
    description: 'Prioridade média',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    icon: '📋',
  },
  {
    id: 'baixa',
    name: 'Baixa - Planejamento',
    description: 'Para futuro planejamento',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: '📅',
  },
]

const COMPANY_TYPES = [
  'Indústria Alimentícia',
  'Indústria Química',
  'Indústria Automotiva',
  'Indústria Farmacêutica',
  'Indústria Metalúrgica',
  'Shopping Center',
  'Hospital/Clínica',
  'Universidade/Escola',
  'Condomínio Residencial',
  'Condomínio Comercial',
  'Hotel/Resort',
  'Supermercado/Varejo',
  'Outro',
]

interface FormErrors {
  [key: string]: string[]
}

interface FormState extends ContactFormData {
  companyType: string
  honeypot: string // Anti-bot field
}

export default function EnhancedContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    companyType: '',
    position: '',
    city: '',
    service: '',
    urgency: '',
    message: '',
    files: [],
    honeypot: '', // Hidden field for bot detection
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitAttempts, setSubmitAttempts] = useState(0)
  const [previousPhone, setPreviousPhone] = useState('')
  const [citySearchTerm, setCitySearchTerm] = useState('')
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [showCityDropdown, setShowCityDropdown] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)

  // Analytics tracking hooks
  const formTracking = useFormTracking('contact_form', 'contact')
  const { trackServiceView } = useServiceTracking()

  // Track form start on mount
  useEffect(() => {
    formTracking.trackFormStart()
  }, [formTracking])

  // Character counter for message
  const messageLength = formData.message.length
  const messageMaxLength = 1000
  const messagePercentage = (messageLength / messageMaxLength) * 100
  const messageIsOverLimit = messageLength > messageMaxLength

  // Filter cities based on search term
  useEffect(() => {
    if (citySearchTerm.length >= 2) {
      const filtered = BRAZILIAN_CITIES.filter((city) =>
        city.toLowerCase().includes(citySearchTerm.toLowerCase())
      ).slice(0, 10) // Limit to 10 results
      setFilteredCities(filtered)
      setShowCityDropdown(true)
    } else {
      setFilteredCities([])
      setShowCityDropdown(false)
    }
  }, [citySearchTerm])

  // Real-time validation
  const validateField = useCallback(
    (field: string, value: any) => {
      const tempData = { ...formData, [field]: value }
      const validation = validateContactForm(tempData)

      if (validation.errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    },
    [formData]
  )

  // Handle input changes with formatting and validation
  const handleInputChange = useCallback(
    (field: keyof FormState, value: string) => {
      let formattedValue = value

      // Apply formatting based on field type
      switch (field) {
        case 'phone':
          formattedValue = formatPhoneAsType(value, previousPhone)
          setPreviousPhone(formattedValue)
          break
        case 'name':
          formattedValue = formatProperName(value)
          break
        case 'email':
          formattedValue = formatEmail(value)
          break
        case 'city':
          setCitySearchTerm(value)
          setShowCityDropdown(true)
          break
        case 'message':
          formattedValue = value.length > 1000 ? value.slice(0, 1000) : value
          break
      }

      setFormData((prev) => ({ ...prev, [field]: formattedValue }))

      // Track field completion for analytics
      if (formattedValue.length > 0) {
        formTracking.trackFieldCompletion(field)
      }

      // Real-time validation (debounced)
      if (submitAttempts > 0) {
        setTimeout(() => validateField(field, formattedValue), 300)
      }
    },
    [previousPhone, submitAttempts, validateField, formTracking]
  )

  // Handle city selection
  const selectCity = useCallback(
    (city: string) => {
      setFormData((prev) => ({ ...prev, city }))
      setCitySearchTerm(city)
      setShowCityDropdown(false)

      if (submitAttempts > 0) {
        validateField('city', city)
      }
    },
    [submitAttempts, validateField]
  )

  // Handle file upload
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      setFormData((prev) => ({ ...prev, files }))

      if (submitAttempts > 0 && files.length > 0) {
        validateField('files', files)
      }
    },
    [submitAttempts, validateField]
  )

  // Remove file
  const removeFile = useCallback(
    (index: number) => {
      const newFiles = formData.files?.filter((_, i) => i !== index) || []
      setFormData((prev) => ({ ...prev, files: newFiles }))

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
    [formData.files]
  )

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempts((prev) => prev + 1)
    setIsSubmitting(true)

    try {
      // Client-side validation
      const validation = validateContactForm(formData)

      if (!validation.isValid) {
        setErrors(validation.errors)
        setIsSubmitting(false)

        // Track form validation errors
        const errorFields = Object.keys(validation.errors)
        errorFields.forEach((field) => {
          formTracking.trackValidationError(field, validation.errors[field]?.[0] || 'Invalid field')
        })

        // Focus on first error field
        const firstErrorField = errorFields[0]
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLElement
        errorElement?.focus()

        return
      }

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      if (result.success) {
        setIsSuccess(true)
        setErrors({})

        // Track successful form submission
        formTracking.trackFormSubmit(true)

        // Track qualified lead with business intelligence
        trackQualifiedLead({
          lead_type: 'contact_form',
          lead_source: 'organic',
          service_interest: formData.service ? [formData.service] : [],
          project_type: formData.companyType?.includes('Indústria')
            ? 'industrial'
            : formData.companyType?.includes('Comercial')
              ? 'commercial'
              : 'residential',
          urgency_level:
            formData.urgency === 'urgente'
              ? 'urgent'
              : formData.urgency === 'alta'
                ? 'high'
                : formData.urgency === 'media'
                  ? 'medium'
                  : 'low',
          budget_range: 'not_specified',
          contact_preference: 'email',
          event_category: 'lead_generation',
          event_label: 'contact_form_submission',
          value: 100, // Base lead value
        })

        // Track service interest if selected
        if (formData.service) {
          trackServiceView(
            formData.service,
            formData.service === 'termografia'
              ? 'thermal'
              : formData.service === 'diagnostico'
                ? 'energy'
                : formData.service === 'laudos'
                  ? 'compliance'
                  : formData.service === 'monitoramento'
                    ? 'maintenance'
                    : 'thermal'
          )
        }

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          companyType: '',
          position: '',
          city: '',
          service: '',
          urgency: '',
          message: '',
          files: [],
          honeypot: '',
        })
        setCitySearchTerm('')

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        setErrors(result.errors || { general: ['Erro desconhecido'] })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        general: ['Erro ao enviar formulário. Tente novamente ou entre em contato por telefone.'],
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center">
          {/* Thermal success animation */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            {/* Thermal glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full opacity-20 animate-ping"></div>
          </div>

          <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
            🎉 Solicitação Enviada com Sucesso!
          </h3>

          <div className="text-gray-600 mb-8 space-y-2">
            <p>
              Nossa equipe entrará em contato em até <strong>24 horas</strong>.
            </p>
            <p>Você também receberá um email de confirmação com os próximos passos.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-lg font-semibold hover:shadow-thermal transition-all duration-300 hover:scale-105"
            >
              ✉️ Nova Solicitação
            </button>

            <button
              onClick={() => {
                const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5521973498376'
                const message = encodeURIComponent(
                  'Olá! Acabei de enviar uma solicitação pelo site e gostaria de acelerar o atendimento.'
                )
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
              }}
              className="px-6 py-3 border border-green-500 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              📱 WhatsApp
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="website"
          value={formData.honeypot}
          onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* General errors */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <ul className="list-disc list-inside">
                {errors.general.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Personal Information Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              👤 Informações Pessoais
            </h3>
            <p className="text-gray-600">Conte-nos sobre você</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2 required"
                htmlFor="name"
              >
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name[0]}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2 required"
                htmlFor="email"
              >
                Email profissional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                placeholder="seu.email@empresa.com"
              />
              <p className="text-xs text-gray-500 mt-1">Usaremos para enviar o relatório</p>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="mt-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2 required"
              htmlFor="phone"
            >
              Telefone/WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              )}
              placeholder="(11) 99999-9999"
            />
            <p className="text-xs text-gray-500 mt-1">Para contato direto e confirmações</p>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone[0]}
              </p>
            )}
          </div>
        </div>

        {/* Company Information Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              🏢 Informações da Empresa
            </h3>
            <p className="text-gray-600">Dados da sua organização</p>
          </div>

          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2 required"
                htmlFor="company"
              >
                Nome da empresa
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                  errors.company ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                placeholder="Nome da sua empresa"
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.company[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Type */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2 required"
                  htmlFor="companyType"
                >
                  Tipo de empresa
                </label>
                <select
                  id="companyType"
                  name="companyType"
                  required
                  value={formData.companyType}
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                    errors.companyType ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  )}
                >
                  <option value="">Selecione o tipo</option>
                  {COMPANY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.companyType && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.companyType[0]}
                  </p>
                )}
              </div>

              {/* Position */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2 required"
                  htmlFor="position"
                >
                  Seu cargo/função
                </label>
                <input
                  id="position"
                  name="position"
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                    errors.position ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  )}
                  placeholder="Ex: Gerente de Manutenção"
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.position[0]}
                  </p>
                )}
              </div>
            </div>

            {/* City with autocomplete */}
            <div className="relative">
              <label
                className="block text-sm font-medium text-gray-700 mb-2 required"
                htmlFor="city"
              >
                Cidade
              </label>
              <input
                ref={cityInputRef}
                id="city"
                name="city"
                type="text"
                required
                value={citySearchTerm}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                onFocus={() => citySearchTerm.length >= 2 && setShowCityDropdown(true)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors',
                  errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                placeholder="Digite sua cidade"
                autoComplete="off"
              />

              {/* City dropdown */}
              {showCityDropdown && filteredCities.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => selectCity(city)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Digite pelo menos 2 caracteres para buscar
              </p>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.city[0]}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Service Selection Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              🔧 Como Podemos Ajudar?
            </h3>
            <p className="text-gray-600">Selecione o serviço de interesse</p>
          </div>

          {/* Service Selection */}
          <div className="space-y-6">
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-4 required">
                  Serviço de interesse
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <label
                      key={service.id}
                      className={cn(
                        'relative p-4 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer hover:border-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
                        formData.service === service.id
                          ? 'border-primary-400 bg-primary-50 shadow-md'
                          : 'border-gray-200'
                      )}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        checked={formData.service === service.id}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <span className="text-2xl" aria-hidden="true">
                          {service.icon}
                        </span>
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                        </div>
                      </div>
                      {formData.service === service.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.service && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {errors.service[0]}
                  </p>
                )}
              </fieldset>
            </div>

            {/* Urgency Selection */}
            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-4 required">
                  Nível de urgência
                </legend>
                <div className="space-y-3">
                  {URGENCY_LEVELS.map((level) => (
                    <label
                      key={level.id}
                      className={cn(
                        'block w-full p-4 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer hover:border-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
                        formData.urgency === level.id
                          ? `${level.borderColor} ${level.bgColor} shadow-md`
                          : 'border-gray-200'
                      )}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.id}
                        checked={formData.urgency === level.id}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex items-start gap-3">
                        <span className="text-xl flex-shrink-0" aria-hidden="true">
                          {level.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className={cn('font-medium', level.color)}>{level.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{level.description}</div>
                        </div>
                        {formData.urgency === level.id && (
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.urgency && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {errors.urgency[0]}
                  </p>
                )}
              </fieldset>
            </div>
          </div>
        </div>

        {/* Message and Files Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
              💬 Detalhes Adicionais
            </h3>
            <p className="text-gray-600">Informações complementares</p>
          </div>

          <div className="space-y-6">
            {/* Message */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2 required"
                htmlFor="message"
              >
                Descreva sua necessidade
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors resize-none',
                  errors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'
                )}
                placeholder="Conte-nos mais sobre sua situação atual, problemas encontrados, objetivos específicos, prazos, ou qualquer informação relevante que nos ajude a entender melhor sua necessidade..."
              />

              {/* Character counter */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Informações detalhadas nos ajudam a preparar uma análise mais precisa
                </p>
                <div
                  className={cn(
                    'text-xs font-medium',
                    messageIsOverLimit ? 'text-red-600' : 'text-gray-500'
                  )}
                >
                  {messageLength}/{messageMaxLength}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div
                  className={cn(
                    'h-1 rounded-full transition-all duration-300',
                    messageIsOverLimit
                      ? 'bg-red-500'
                      : messagePercentage > 80
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                  )}
                  style={{ width: `${Math.min(messagePercentage, 100)}%` }}
                />
              </div>

              {errors.message && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.message[0]}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="files">
                Documentos técnicos (opcional)
              </label>
              <div className="space-y-4">
                <div
                  className={cn(
                    'relative border-2 border-dashed rounded-lg p-6 transition-colors hover:border-gray-400',
                    errors.files ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  )}
                >
                  <input
                    ref={fileInputRef}
                    id="files"
                    name="files"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-primary-600">Clique para enviar</span> ou
                      arraste arquivos aqui
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, DOC, JPG, PNG, XLS até 10MB (máximo 3 arquivos)
                    </p>
                  </div>
                </div>

                {/* File list */}
                {formData.files && formData.files.length > 0 && (
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="flex-shrink-0 p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.files && (
                  <p className="text-sm text-red-600" role="alert">
                    {errors.files[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || messageIsOverLimit}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-xl font-semibold hover:shadow-thermal transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg relative overflow-hidden group"
          >
            {/* Thermal effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <div className="w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 -skew-x-12 animate-pulse"></div>
            </div>

            <span className="relative z-10 flex items-center gap-3">
              {isSubmitting ? (
                <>
                  {/* Enhanced thermal spinner */}
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                    <circle
                      className="opacity-40"
                      cx="12"
                      cy="12"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>🔥 Solicitar Orçamento</>
              )}
            </span>
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Resposta garantida em até 24 horas • Orçamento sem compromisso
          </p>
        </div>
      </form>
    </div>
  )
}
