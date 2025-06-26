/**
 * Analytics Types for Ôluna Engenharia
 * Comprehensive type definitions for Google Analytics 4 (GA4) tracking
 * with LGPD compliance and professional service business intelligence
 */

// Google Analytics 4 Configuration
export interface GA4Config {
  measurement_id: string
  privacy_policy_url?: string
  cookie_domain?: string
  cookie_expires?: number
  anonymize_ip?: boolean
  allow_google_signals?: boolean
  allow_ad_personalization_signals?: boolean
  restricted_data_processing?: boolean
}

// LGPD Compliance Types
export interface PrivacySettings {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  functionality_storage: 'granted' | 'denied'
  personalization_storage: 'granted' | 'denied'
  security_storage: 'granted' | 'denied'
}

export type ConsentStatus = 'granted' | 'denied' | 'unknown'

export interface ConsentState {
  analytics: ConsentStatus
  marketing: ConsentStatus
  functional: ConsentStatus
  preferences: ConsentStatus
  timestamp: number
  version: string
}

// Core Analytics Events
export type AnalyticsEventName =
  // Standard GA4 Events
  | 'page_view'
  | 'scroll'
  | 'click'
  | 'form_submit'
  | 'file_download'
  | 'search'
  | 'video_play'
  | 'video_complete'

  // Business Events - Lead Generation
  | 'lead_generated'
  | 'contact_form_submit'
  | 'contact_form_start'
  | 'contact_form_complete'
  | 'quote_request'
  | 'consultation_request'
  | 'phone_call_click'
  | 'whatsapp_click'
  | 'email_click'

  // Business Events - Service Interest
  | 'service_view'
  | 'service_interest'
  | 'thermal_analysis_interest'
  | 'electrical_diagnosis_interest'
  | 'energy_efficiency_interest'
  | 'industrial_maintenance_interest'
  | 'compliance_audit_interest'

  // Business Events - Engagement
  | 'portfolio_view'
  | 'case_study_view'
  | 'testimonial_view'
  | 'about_us_view'
  | 'team_view'
  | 'certification_view'

  // Business Events - Conversions
  | 'conversion_lead'
  | 'conversion_consultation'
  | 'conversion_project_inquiry'
  | 'conversion_download'
  | 'conversion'
  | 'performance_metric'

  // Technical Events
  | 'error_occurred'
  | 'performance_issue'
  | 'user_engagement'
  | 'session_start'
  | 'first_visit'
  | 'returning_visit'
  | 'experiment_exposure'
  | 'experiment_conversion'
  // Allow any custom event name
  | string

// Event Parameters
export interface BaseEventParams {
  event_category?: string
  event_label?: string
  value?: number
  currency?: string
  custom_parameters?: Record<string, any>
  // Allow any additional parameters for flexibility
  [key: string]: any
}

// Lead Generation Event Parameters
export interface LeadEventParams extends BaseEventParams {
  lead_type: 'contact_form' | 'phone' | 'whatsapp' | 'email' | 'consultation'
  lead_source: 'organic' | 'direct' | 'referral' | 'social' | 'paid' | 'email'
  service_interest?: string[]
  project_type?: 'residential' | 'commercial' | 'industrial'
  urgency_level?: 'low' | 'medium' | 'high' | 'urgent'
  budget_range?: 'under_5k' | '5k_15k' | '15k_50k' | '50k_plus' | 'not_specified'
  contact_preference?: 'phone' | 'email' | 'whatsapp' | 'in_person'
}

// Service Interest Event Parameters
export interface ServiceEventParams extends BaseEventParams {
  service_name: string
  service_category: 'thermal' | 'electrical' | 'energy' | 'maintenance' | 'compliance'
  page_section?: string
  interaction_type: 'view' | 'click' | 'hover' | 'scroll' | 'download'
  content_group?: string
  time_on_section?: number
}

// Form Event Parameters
export interface FormEventParams extends BaseEventParams {
  form_name: string
  form_type: 'contact' | 'quote' | 'newsletter' | 'consultation' | 'download'
  form_step?: number
  form_completion_rate?: number
  fields_completed?: string[]
  validation_errors?: string[]
  form_abandonment_point?: string
}

// User Engagement Event Parameters
export interface EngagementEventParams extends BaseEventParams {
  engagement_time_msec?: number
  page_title?: string
  page_location?: string
  page_referrer?: string
  scroll_depth?: number
  content_group1?: string
  content_group2?: string
  content_group3?: string
  user_agent?: string
  screen_resolution?: string
  language?: string
}

// E-commerce Event Parameters (for service packages)
export interface EcommerceEventParams extends BaseEventParams {
  transaction_id?: string
  item_id?: string
  item_name?: string
  item_category?: string
  item_variant?: string
  price?: number
  quantity?: number
  discount?: number
  affiliation?: string
  coupon?: string
  promotion_id?: string
  promotion_name?: string
}

// Performance Event Parameters
export interface PerformanceEventParams extends BaseEventParams {
  metric_name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP'
  metric_value: number
  metric_rating: 'good' | 'needs-improvement' | 'poor'
  page_type?: string
  connection_type?: string
  device_type?: 'mobile' | 'tablet' | 'desktop'
}

// Custom Business Intelligence Parameters
export interface BusinessIntelligenceParams extends BaseEventParams {
  customer_journey_stage: 'awareness' | 'consideration' | 'decision' | 'retention'
  lead_quality_score?: number
  service_demand_indicator?: 'low' | 'medium' | 'high'
  geographic_region?: string
  company_size?: 'small' | 'medium' | 'large' | 'enterprise'
  industry_sector?: string
  decision_maker_role?: string
  competitive_context?: string[]
}

// Union type for all event parameters
export type EventParams = BaseEventParams & {
  // Allow any additional custom parameters
  [key: string]: any
}

// Analytics Event Structure
export interface AnalyticsEvent {
  name: AnalyticsEventName
  parameters: EventParams
  timestamp?: number
  user_id?: string
  session_id?: string
  page_path?: string
  page_title?: string
  referrer?: string
  user_agent?: string
}

// User Properties for Enhanced Segmentation
export interface UserProperties {
  user_type?: 'new' | 'returning' | 'customer' | 'lead' | 'engaged' | 'highly_engaged'
  preferred_contact_method?: 'phone' | 'email' | 'whatsapp'
  service_interests?: string[]
  geographic_location?: string
  company_type?: 'residential' | 'commercial' | 'industrial'
  lead_source?: string
  customer_lifetime_value?: number
  engagement_score?: number
  last_service_inquiry?: string
  referral_source?: string
  last_session_duration?: number
  last_session_interactions?: number
  // Allow any additional properties
  [key: string]: any
}

// Enhanced User Context
export interface UserContext {
  user_id?: string
  session_id: string
  client_id: string
  user_properties: Partial<UserProperties>
  consent_state: ConsentState
  privacy_settings: PrivacySettings
  device_info: {
    device_type: 'mobile' | 'tablet' | 'desktop'
    browser: string
    os: string
    screen_resolution: string
    viewport_size: string
  }
  location_info?: {
    country: string
    region: string
    city: string
    timezone: string
  }
}

// Analytics Configuration
export interface AnalyticsConfig {
  ga4_measurement_id: string
  debug_mode: boolean
  anonymize_ip: boolean
  cookie_domain: string
  cookie_expires: number
  sample_rate: number
  site_speed_sample_rate: number
  enhanced_measurement: boolean
  privacy_policy_url: string
  data_retention_days: number
  enhanced_conversions: boolean
  conversion_linker: boolean
}

// Conversion Goals
export interface ConversionGoal {
  goal_id: string
  goal_name: string
  goal_type: 'lead' | 'engagement' | 'download' | 'consultation' | 'project'
  goal_value?: number
  goal_currency?: string
  completion_conditions: {
    event_name: AnalyticsEventName
    parameter_conditions?: Record<string, any>
  }[]
}

// Attribution Model
export interface AttributionData {
  source: string
  medium: string
  campaign?: string
  term?: string
  content?: string
  first_touch_source?: string
  last_touch_source?: string
  touch_points?: string[]
  conversion_path?: string[]
  time_to_conversion?: number
}

// Advanced Analytics Features
export interface AdvancedAnalytics {
  audience_segments: string[]
  custom_dimensions: Record<string, string | number>
  custom_metrics: Record<string, number>
  cross_domain_tracking?: boolean
  enhanced_ecommerce?: boolean
  user_timing?: {
    category: string
    variable: string
    value: number
    label?: string
  }[]
}

// Analytics Context Provider Props
export interface AnalyticsProviderProps {
  children: React.ReactNode
  config: AnalyticsConfig
  initial_consent?: Partial<ConsentState>
  debug?: boolean
}

// Hook Return Types
export interface UseAnalyticsReturn {
  trackEvent: (event: AnalyticsEvent) => void
  trackPageView: (path: string, title?: string) => void
  trackConversion: (goal: ConversionGoal, value?: number) => void
  setUserProperties: (properties: Partial<UserProperties>) => void
  getUserId: () => string | undefined
  getSessionId: () => string
  consent: ConsentState
  updateConsent: (updates: Partial<ConsentState>) => void
  optOut: () => void
  optIn: () => void
  isOptedOut: boolean
}

export interface UsePerformanceReturn {
  trackWebVital: (metric: PerformanceEventParams) => void
  trackPageLoad: (timing: PerformanceTiming) => void
  trackCustomTiming: (category: string, variable: string, value: number) => void
  getPerformanceMetrics: () => Record<string, number>
}

// Error Tracking
export interface AnalyticsError {
  error_type: 'javascript' | 'network' | 'user' | 'analytics'
  error_message: string
  error_stack?: string
  page_path: string
  user_agent: string
  timestamp: number
  user_id?: string
  session_id: string
}

// Data Layer Structure
export interface DataLayerEvent {
  event: string
  eventCategory?: string
  eventAction?: string
  eventLabel?: string
  eventValue?: number
  customParameters?: Record<string, any>
  userProperties?: Partial<UserProperties>
  consentState?: ConsentState
}

export type DataLayerPush = (event: DataLayerEvent) => void

// Analytics Manager Interface
export interface AnalyticsManager {
  init: (config: AnalyticsConfig) => Promise<void>
  trackEvent: (event: AnalyticsEvent) => void
  trackPageView: (path: string, title?: string) => void
  trackConversion: (goal: ConversionGoal) => void
  trackPerformance: (metric: PerformanceEventParams) => void
  trackError: (error: AnalyticsError) => void
  setUserProperties: (properties: Partial<UserProperties>) => void
  updateConsent: (consent: Partial<ConsentState>) => void
  getOptOutStatus: () => boolean
  setOptOut: (optOut: boolean) => void
  destroy: () => void
}
