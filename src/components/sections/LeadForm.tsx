'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  ThermographyIcon, 
  EnergyDiagnosticIcon, 
  CertificationIcon, 
  MonitoringIcon,
  ConsultingIcon,
  ToolsIcon
} from '@/components/icons/ServiceIcons'

const services = [
  { id: 'termografia', name: 'Termografia Industrial', icon: ThermographyIcon },
  { id: 'diagnostico', name: 'Diagnóstico Energético', icon: EnergyDiagnosticIcon },
  { id: 'laudos', name: 'Laudos NR-10/12', icon: CertificationIcon },
  { id: 'monitoramento', name: 'Monitoramento Contínuo', icon: MonitoringIcon },
  { id: 'consultoria', name: 'Consultoria Energética', icon: ConsultingIcon },
  { id: 'outro', name: 'Outro serviço', icon: ToolsIcon }
]

const companies = [
  'Indústria Alimentícia',
  'Indústria Química',
  'Indústria Automotiva',
  'Indústria Farmacêutica',
  'Indústria Metalúrgica',
  'Shopping Center',
  'Hospital/Clínica',
  'Universidade/Escola',
  'Condomínio',
  'Outro'
]

const urgencyLevels = [
  { id: 'urgente', name: 'Urgente (problema ativo)', color: 'text-red-500', bgColor: 'bg-red-50' },
  { id: 'alta', name: 'Alta (até 1 semana)', color: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'media', name: 'Média (até 1 mês)', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { id: 'baixa', name: 'Baixa (planejamento)', color: 'text-green-500', bgColor: 'bg-green-50' }
]

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  companyType: string
  position: string
  service: string
  urgency: string
  description: string
  budget: string
  preferredContact: string
}

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    companyType: '',
    position: '',
    service: '',
    urgency: '',
    description: '',
    budget: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLDivElement>(null)

  const totalSteps = 4

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
        if (!formData.email.trim()) newErrors.email = 'Email é obrigatório'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
        if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
        break
      case 2:
        if (!formData.company.trim()) newErrors.company = 'Nome da empresa é obrigatório'
        if (!formData.companyType) newErrors.companyType = 'Tipo de empresa é obrigatório'
        if (!formData.position.trim()) newErrors.position = 'Cargo é obrigatório'
        break
      case 3:
        if (!formData.service) newErrors.service = 'Serviço é obrigatório'
        if (!formData.urgency) newErrors.urgency = 'Nível de urgência é obrigatório'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setIsSubmitting(true)
    
    // Simular envio (aqui você integraria com sua API)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
      
      // Aqui você enviaria os dados para sua API
      console.log('Form Data:', formData)
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
          Solicitação Enviada com Sucesso!
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Nossa equipe entrará em contato em até 24 horas para agendar uma análise inicial gratuita.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-primary-400 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-thermal transition-all duration-300">
            Agendar Videochamada
          </button>
          <button 
            onClick={() => {
              setIsSuccess(false)
              setCurrentStep(1)
              setFormData({
                name: '', email: '', phone: '', company: '', companyType: '', position: '',
                service: '', urgency: '', description: '', budget: '', preferredContact: 'email'
              })
            }}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Nova Solicitação
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={formRef} className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Etapa {currentStep} de {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% completo
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
          <div 
            className="bg-gradient-to-r from-primary-400 to-accent-500 h-2 rounded-full transition-all duration-500 relative"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          >
            {/* Thermal glow effect in progress bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 animate-pulse opacity-50"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
        {/* Step 1: Informações Pessoais */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                Vamos nos conhecer
              </h3>
              <p className="text-gray-600">Conte-nos sobre você</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email profissional *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="seu.email@empresa.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Informações da Empresa */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                Sobre sua empresa
              </h3>
              <p className="text-gray-600">Informações da organização</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da empresa *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                  errors.company ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nome da sua empresa"
              />
              {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de empresa *
              </label>
              <select
                value={formData.companyType}
                onChange={(e) => updateFormData('companyType', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                  errors.companyType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o tipo</option>
                {companies.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.companyType && <p className="mt-1 text-sm text-red-600">{errors.companyType}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu cargo/função *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ex: Gerente de Manutenção, Diretor de Operações"
              />
              {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Serviço e Urgência */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                Como podemos ajudar?
              </h3>
              <p className="text-gray-600">Serviço de interesse e urgência</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Serviço de interesse *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => updateFormData('service', service.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      formData.service === service.id
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <service.icon className="w-6 h-6 text-gray-700" />
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.service && <p className="mt-2 text-sm text-red-600">{errors.service}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Nível de urgência *
              </label>
              <div className="space-y-3">
                {urgencyLevels.map(level => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => updateFormData('urgency', level.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      formData.urgency === level.id
                        ? 'border-primary-400 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`font-medium ${level.color}`}>
                      {level.name}
                    </div>
                  </button>
                ))}
              </div>
              {errors.urgency && <p className="mt-2 text-sm text-red-600">{errors.urgency}</p>}
            </div>
          </div>
        )}

        {/* Step 4: Detalhes e Finalização */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
                Últimos detalhes
              </h3>
              <p className="text-gray-600">Informações adicionais</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descreva o desafio ou necessidade
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
                placeholder="Conte-nos mais sobre sua situação atual, problemas encontrados ou objetivos..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orçamento estimado
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => updateFormData('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
                >
                  <option value="">Selecione uma faixa</option>
                  <option value="ate-10k">Até R$ 10.000</option>
                  <option value="10k-25k">R$ 10.000 - R$ 25.000</option>
                  <option value="25k-50k">R$ 25.000 - R$ 50.000</option>
                  <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                  <option value="acima-100k">Acima de R$ 100.000</option>
                  <option value="a-definir">A definir</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forma de contato preferida
                </label>
                <select
                  value={formData.preferredContact}
                  onChange={(e) => updateFormData('preferredContact', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-colors"
                >
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="videocall">Videochamada</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Voltar
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-lg font-semibold hover:shadow-thermal transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              {/* Thermal effect in continue button */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 -skew-x-12 animate-pulse"></div>
              </div>
              <span className="relative z-10">Continuar</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-primary-400 to-accent-500 text-white rounded-lg font-semibold hover:shadow-thermal transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative overflow-hidden group"
            >
              {/* Thermal effect in submit button */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 -skew-x-12 animate-pulse"></div>
              </div>
              
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    {/* Enhanced thermal spinner */}
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 818-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      <circle className="opacity-40" cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitação'
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}