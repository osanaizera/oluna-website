/**
 * Business Intelligence Tracking Utilities
 * Specialized tracking for Ôluna Engenharia's professional services
 * with lead generation, service interest, and customer journey analytics
 */

import type {
  LeadEventParams,
  ServiceEventParams,
  BusinessIntelligenceParams,
  AnalyticsEvent,
  ConversionGoal,
} from '@/types/analytics'
import { trackEvent, trackConversion } from '@/services/analytics'
import { hasConsent } from '@/utils/privacy'

// Business-specific conversion goals
export const CONVERSION_GOALS: Record<string, ConversionGoal> = {
  CONTACT_FORM: {
    goal_id: 'contact_form_submission',
    goal_name: 'Formulário de Contato',
    goal_type: 'lead',
    goal_value: 100,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'contact_form_complete',
        parameter_conditions: { form_success: true },
      },
    ],
  },
  QUOTE_REQUEST: {
    goal_id: 'quote_request',
    goal_name: 'Solicitação de Orçamento',
    goal_type: 'lead',
    goal_value: 250,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'quote_request',
        parameter_conditions: { form_type: 'quote' },
      },
    ],
  },
  CONSULTATION_REQUEST: {
    goal_id: 'consultation_request',
    goal_name: 'Solicitação de Consultoria',
    goal_type: 'consultation',
    goal_value: 500,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'consultation_request',
        parameter_conditions: { service_interest: ['thermal', 'electrical', 'energy'] },
      },
    ],
  },
  WHATSAPP_ENGAGEMENT: {
    goal_id: 'whatsapp_engagement',
    goal_name: 'Engajamento WhatsApp',
    goal_type: 'engagement',
    goal_value: 50,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'whatsapp_click',
        parameter_conditions: { contact_method: 'whatsapp' },
      },
    ],
  },
  PHONE_ENGAGEMENT: {
    goal_id: 'phone_engagement',
    goal_name: 'Engajamento Telefônico',
    goal_type: 'engagement',
    goal_value: 75,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'phone_call_click',
        parameter_conditions: { contact_method: 'phone' },
      },
    ],
  },
  SERVICE_PORTFOLIO_VIEW: {
    goal_id: 'service_portfolio_view',
    goal_name: 'Visualização do Portfólio',
    goal_type: 'engagement',
    goal_value: 25,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'portfolio_view',
        parameter_conditions: { time_on_section: 30000 },
      },
    ],
  },
  DOCUMENT_DOWNLOAD: {
    goal_id: 'document_download',
    goal_name: 'Download de Documentos',
    goal_type: 'download',
    goal_value: 30,
    goal_currency: 'BRL',
    completion_conditions: [
      {
        event_name: 'file_download',
        parameter_conditions: { file_type: ['pdf', 'doc', 'docx'] },
      },
    ],
  },
}

// Service categories and their business value
export const SERVICE_CATEGORIES = {
  thermal: {
    name: 'Termografia Industrial',
    value_score: 100,
    urgency_factor: 0.8,
    typical_budget: 'medium',
    sales_cycle_days: 30,
  },
  electrical: {
    name: 'Diagnósticos Elétricos',
    value_score: 85,
    urgency_factor: 0.9,
    typical_budget: 'high',
    sales_cycle_days: 21,
  },
  energy: {
    name: 'Eficiência Energética',
    value_score: 120,
    urgency_factor: 0.6,
    typical_budget: 'high',
    sales_cycle_days: 45,
  },
  maintenance: {
    name: 'Manutenção Industrial',
    value_score: 75,
    urgency_factor: 0.7,
    typical_budget: 'medium',
    sales_cycle_days: 14,
  },
  compliance: {
    name: 'Auditorias de Conformidade',
    value_score: 90,
    urgency_factor: 0.5,
    typical_budget: 'medium',
    sales_cycle_days: 60,
  },
} as const

// Lead scoring matrix
export const LEAD_SCORING = {
  // Contact method scoring
  contact_method: {
    whatsapp: 8,
    phone: 10,
    email: 6,
    form: 7,
  },
  // Lead source scoring
  lead_source: {
    organic: 9,
    direct: 10,
    referral: 8,
    social: 6,
    paid: 7,
    email: 5,
  },
  // Urgency level scoring
  urgency_level: {
    urgent: 10,
    high: 8,
    medium: 6,
    low: 4,
  },
  // Service interest scoring
  service_interest: {
    multiple: 10,
    single_high_value: 8,
    single_medium_value: 6,
    single_low_value: 4,
  },
  // Company type scoring
  company_type: {
    industrial: 10,
    commercial: 7,
    residential: 5,
  },
} as const

/**
 * Calculate lead quality score based on multiple factors
 */
export function calculateLeadScore(params: LeadEventParams): number {
  let score = 0

  // Base score from contact method
  if (params.contact_preference && params.contact_preference in LEAD_SCORING.contact_method) {
    score += LEAD_SCORING.contact_method[params.contact_preference as keyof typeof LEAD_SCORING.contact_method] || 0
  }

  // Score from lead source
  if (params.lead_source) {
    score += LEAD_SCORING.lead_source[params.lead_source] || 0
  }

  // Score from urgency level
  if (params.urgency_level) {
    score += LEAD_SCORING.urgency_level[params.urgency_level] || 0
  }

  // Score from service interest
  if (params.service_interest && params.service_interest.length > 0) {
    if (params.service_interest.length > 1) {
      score += LEAD_SCORING.service_interest.multiple
    } else {
      const service = params.service_interest[0] as keyof typeof SERVICE_CATEGORIES
      const serviceValue = SERVICE_CATEGORIES[service]?.value_score || 50

      if (serviceValue >= 100) score += LEAD_SCORING.service_interest.single_high_value
      else if (serviceValue >= 75) score += LEAD_SCORING.service_interest.single_medium_value
      else score += LEAD_SCORING.service_interest.single_low_value
    }
  }

  // Score from company type
  if (params.project_type) {
    const companyType =
      params.project_type === 'industrial'
        ? 'industrial'
        : params.project_type === 'commercial'
          ? 'commercial'
          : 'residential'
    score += LEAD_SCORING.company_type[companyType] || 0
  }

  return Math.min(score, 100) // Cap at 100
}

/**
 * Track high-value lead generation with business intelligence
 */
export function trackQualifiedLead(params: LeadEventParams): void {
  if (!hasConsent('analytics')) {
    return
  }

  const leadScore = calculateLeadScore(params)
  const isQualifiedLead = leadScore >= 60 // Threshold for qualified leads

  // Enhanced lead tracking with business intelligence
  const businessParams: BusinessIntelligenceParams = {
    customer_journey_stage: 'consideration',
    lead_quality_score: leadScore,
    service_demand_indicator: leadScore >= 80 ? 'high' : leadScore >= 60 ? 'medium' : 'low',
    event_category: 'lead_generation',
    event_label: 'qualified_lead',
    value: leadScore,
  }

  const leadEvent: AnalyticsEvent = {
    name: 'lead_generated',
    parameters: {
      event_category: 'lead_generation',
      event_label: 'qualified_lead',
      value: leadScore,
    },
  }

  trackEvent(leadEvent)

  // Track conversion for qualified leads
  if (isQualifiedLead) {
    const conversionGoal =
      params.lead_type === 'consultation'
        ? CONVERSION_GOALS.CONSULTATION_REQUEST
        : params.lead_type === 'whatsapp'
          ? CONVERSION_GOALS.WHATSAPP_ENGAGEMENT
          : params.lead_type === 'phone'
            ? CONVERSION_GOALS.PHONE_ENGAGEMENT
            : CONVERSION_GOALS.CONTACT_FORM

    trackConversion(conversionGoal, leadScore)
  }

  console.log(
    `[Business Analytics] Lead tracked - Score: ${leadScore}, Qualified: ${isQualifiedLead}`
  )
}

/**
 * Track service interest with business context
 */
export function trackBusinessServiceInterest(
  serviceName: string,
  serviceCategory: keyof typeof SERVICE_CATEGORIES,
  interactionType: ServiceEventParams['interaction_type'],
  context?: {
    timeOnSection?: number
    pageSection?: string
    userType?: string
  }
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const serviceInfo = SERVICE_CATEGORIES[serviceCategory]
  const demandIndicator =
    serviceInfo.value_score >= 100 ? 'high' : serviceInfo.value_score >= 75 ? 'medium' : 'low'

  const businessParams: BusinessIntelligenceParams = {
    customer_journey_stage: interactionType === 'view' ? 'awareness' : 'consideration',
    service_demand_indicator: demandIndicator,
    event_category: 'service_engagement',
    event_label: serviceName,
    value: serviceInfo.value_score / 10, // Scale down for event value
  }

  const serviceEvent: AnalyticsEvent = {
    name: 'service_interest',
    parameters: {
      event_category: 'service_engagement',
      event_label: serviceName,
      value: serviceInfo.value_score / 10,
    },
  }

  trackEvent(serviceEvent)

  // Track high-value service interactions as potential leads
  if (serviceInfo.value_score >= 90 && interactionType === 'click') {
    trackQualifiedLead({
      lead_type: 'consultation',
      lead_source: 'organic',
      service_interest: [serviceName],
      project_type: 'industrial',
      urgency_level: 'medium',
      event_category: 'lead_generation',
      event_label: 'service_interest_lead',
      value: serviceInfo.value_score / 10,
    })
  }
}

/**
 * Track customer journey progression
 */
export function trackCustomerJourney(
  stage: BusinessIntelligenceParams['customer_journey_stage'],
  action: string,
  context?: {
    previousStage?: BusinessIntelligenceParams['customer_journey_stage']
    timeInStage?: number
    touchPoints?: string[]
    value?: number
  }
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const journeyEvent: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'customer_journey',
      event_label: `${stage}_${action}`,
      value: context?.value || 1,
    },
  }

  trackEvent(journeyEvent)

  // Track progression as conversions
  if (stage === 'decision' && action === 'contact_initiated') {
    trackConversion(CONVERSION_GOALS.CONTACT_FORM, context?.value)
  }
}

/**
 * Track competitive analysis and market intelligence
 */
export function trackCompetitiveIntelligence(
  referralSource: string,
  searchTerms?: string[],
  competitiveContext?: string[]
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const competitiveEvent: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'competitive_intelligence',
      event_label: 'referral_analysis',
      value: 1,
    },
  }

  trackEvent(competitiveEvent)
}

/**
 * Track geographic and demographic insights
 */
export function trackDemographicInsights(
  region: string,
  industryType?: string,
  companySize?: BusinessIntelligenceParams['company_size']
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const demographicEvent: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'demographic_intelligence',
      event_label: 'market_segmentation',
      value: 1,
    },
  }

  trackEvent(demographicEvent)
}

/**
 * Track seasonal demand patterns
 */
export function trackSeasonalDemand(
  serviceCategory: keyof typeof SERVICE_CATEGORIES,
  demandLevel: 'low' | 'medium' | 'high',
  seasonalFactors?: string[]
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const seasonalEvent: AnalyticsEvent = {
    name: 'service_interest',
    parameters: {
      event_category: 'seasonal_analysis',
      event_label: `${serviceCategory}_demand`,
      value: demandLevel === 'high' ? 3 : demandLevel === 'medium' ? 2 : 1,
    },
  }

  trackEvent(seasonalEvent)
}

/**
 * Track sales funnel progression
 */
export function trackSalesFunnel(
  stage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'evaluation' | 'purchase',
  action: string,
  leadValue?: number,
  conversionProbability?: number
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const funnelEvent: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'sales_funnel',
      event_label: `${stage}_${action}`,
      value: leadValue ? Math.round(leadValue / 10) : 1,
    },
  }

  trackEvent(funnelEvent)

  // Auto-track conversions for key funnel stages
  if (stage === 'intent' && action === 'contact_form_started') {
    trackConversion(CONVERSION_GOALS.CONTACT_FORM, leadValue)
  } else if (stage === 'evaluation' && action === 'quote_requested') {
    trackConversion(CONVERSION_GOALS.QUOTE_REQUEST, leadValue)
  }
}

/**
 * Track ROI and attribution data
 */
export function trackAttributionData(
  channel: string,
  campaign?: string,
  medium?: string,
  source?: string,
  conversionValue?: number
): void {
  if (!hasConsent('analytics')) {
    return
  }

  const attributionEvent: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'attribution',
      event_label: `${channel}_attribution`,
      value: conversionValue ? Math.round(conversionValue / 10) : 1,
    },
  }

  trackEvent(attributionEvent)
}

/**
 * Generate business intelligence report data
 */
export function generateBIReport(): {
  leadSources: string[]
  topServices: string[]
  conversionFunnel: Record<string, number>
  customerJourneyStages: string[]
  demandIndicators: Record<string, string>
} {
  return {
    leadSources: ['organic', 'direct', 'referral', 'social', 'paid'],
    topServices: Object.keys(SERVICE_CATEGORIES),
    conversionFunnel: {
      awareness: 100,
      interest: 60,
      consideration: 35,
      intent: 20,
      evaluation: 12,
      purchase: 8,
    },
    customerJourneyStages: ['awareness', 'consideration', 'decision', 'retention'],
    demandIndicators: {
      thermal: 'high',
      electrical: 'medium',
      energy: 'high',
      maintenance: 'medium',
      compliance: 'low',
    },
  }
}

/**
 * Set up automated business intelligence tracking
 */
export function initializeBusinessTracking(): void {
  if (typeof window === 'undefined' || !hasConsent('analytics')) {
    return
  }

  // Track session-level business data
  const sessionData = {
    session_start: Date.now(),
    referrer: document.referrer,
    landing_page: window.location.pathname,
    user_agent: navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  }

  // Initialize customer journey tracking
  trackCustomerJourney('awareness', 'session_start', {
    value: 1,
  })

  // Track referral intelligence
  if (document.referrer) {
    const referrerDomain = new URL(document.referrer).hostname
    trackCompetitiveIntelligence(referrerDomain)
  }

  // Set up automatic conversion tracking
  window.addEventListener('beforeunload', () => {
    const sessionDuration = Date.now() - sessionData.session_start
    if (sessionDuration > 30000) {
      // 30 seconds minimum
      trackCustomerJourney('consideration', 'session_end', {
        timeInStage: sessionDuration,
        value: Math.round(sessionDuration / 10000), // Convert to meaningful value
      })
    }
  })

  console.log('[Business Intelligence] Tracking initialized')
}
