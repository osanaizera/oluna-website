/**
 * Analytics Service for Ôluna Engenharia
 * Comprehensive Google Analytics 4 integration with LGPD compliance
 * and professional service business intelligence tracking
 */

// Simplified global gtag declaration
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void
    dataLayer?: any[]
  }
}

// Simple gtag function
const gtag = (command: string, targetId: string, config?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, config)
  }
}
import type {
  AnalyticsEvent,
  AnalyticsEventName,
  EventParams,
  LeadEventParams,
  ServiceEventParams,
  FormEventParams,
  EngagementEventParams,
  PerformanceEventParams,
  BusinessIntelligenceParams,
  UserProperties,
  ConversionGoal,
  AnalyticsConfig,
  AnalyticsManager,
  AnalyticsError,
  UserContext,
} from '@/types/analytics'

import {
  hasConsent,
  isDataCollectionCompliant,
  getPrivacyCompliantUserContext,
  getUserIdentifier,
  logPrivacyEvent,
  getConsentState,
} from '@/utils/privacy'

/**
 * Analytics Service Class
 * Handles all analytics tracking with privacy compliance
 */
class AnalyticsService implements AnalyticsManager {
  private config: AnalyticsConfig | null = null
  private isInitialized = false
  private eventQueue: AnalyticsEvent[] = []
  private userContext: Partial<UserContext> | null = null

  /**
   * Initialize analytics service
   */
  async init(config: AnalyticsConfig): Promise<void> {
    this.config = config
    this.userContext = getPrivacyCompliantUserContext()

    // Only initialize if analytics consent is granted
    if (!hasConsent('analytics')) {
      console.log('[Analytics] Initialization skipped - no consent')
      return
    }

    try {
      // Initialize Google Analytics 4
      if (typeof window !== 'undefined' && config.ga4_measurement_id && window.gtag) {
        window.gtag('config', config.ga4_measurement_id, {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: config.anonymize_ip,
          cookie_domain: config.cookie_domain,
          cookie_expires: config.cookie_expires,
          sample_rate: config.sample_rate,
          site_speed_sample_rate: config.site_speed_sample_rate,
          custom_map: {
            custom_parameter_1: 'service_interest',
            custom_parameter_2: 'lead_type',
            custom_parameter_3: 'user_type',
          },
        })

        // Set enhanced measurement
        if (config.enhanced_measurement && window.gtag) {
          window.gtag('config', config.ga4_measurement_id, {
            enhanced_measurement: true,
          })
        }

        this.isInitialized = true
        console.log('[Analytics] Initialized successfully')

        // Process queued events
        this.processEventQueue()

        // Log initialization for compliance
        console.log('[Analytics] Initialized with measurement ID:', config.ga4_measurement_id)
      }
    } catch (error) {
      console.error('[Analytics] Initialization failed:', error)
      this.trackError({
        error_type: 'analytics',
        error_message: 'Analytics initialization failed',
        error_stack: error instanceof Error ? error.stack : undefined,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        timestamp: Date.now(),
        session_id: getUserIdentifier(),
      })
    }
  }

  /**
   * Track custom events with privacy compliance
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isPrivacyCompliant(event)) {
      return
    }

    if (!this.isInitialized) {
      this.eventQueue.push(event)
      return
    }

    try {
      const enhancedEvent = this.enhanceEvent(event)
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', enhancedEvent.name, {
          event_category: enhancedEvent.parameters.event_category || 'engagement',
          event_label: enhancedEvent.parameters.event_label,
          value: enhancedEvent.parameters.value || 1,
        })
      }

      // Log successful tracking
      if (this.config?.debug_mode) {
        console.log('[Analytics] Event tracked:', enhancedEvent)
      }
    } catch (error) {
      console.error('[Analytics] Event tracking failed:', error)
      this.trackError({
        error_type: 'analytics',
        error_message: 'Event tracking failed',
        error_stack: error instanceof Error ? error.stack : undefined,
        page_path: window.location.pathname,
        user_agent: navigator.userAgent,
        timestamp: Date.now(),
        session_id: getUserIdentifier(),
      })
    }
  }

  /**
   * Track page views
   */
  trackPageView(path: string, title?: string): void {
    if (!hasConsent('analytics')) {
      return
    }

    const event: AnalyticsEvent = {
      name: 'page_view',
      parameters: {
        event_category: 'page_view',
        event_label: path,
        value: 1,
      },
    }

    this.trackEvent(event)
  }

  /**
   * Track conversion goals
   */
  trackConversion(goal: ConversionGoal, value?: number): void {
    if (!hasConsent('analytics')) {
      return
    }

    const event: AnalyticsEvent = {
      name: 'conversion',
      parameters: {
        event_category: 'conversion',
        event_label: goal.goal_name,
        value: value || goal.goal_value || 0,
        currency: goal.goal_currency || 'BRL',
      },
    }

    this.trackEvent(event)

    // Also track as GA4 conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        value: value || goal.goal_value || 0,
        currency: goal.goal_currency || 'BRL',
      })
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: PerformanceEventParams): void {
    if (!hasConsent('analytics')) {
      return
    }

    const event: AnalyticsEvent = {
      name: 'performance_metric',
      parameters: {
        event_category: 'performance',
        event_label: metric.metric_name,
        value: metric.metric_value,
      },
    }

    this.trackEvent(event)
  }

  /**
   * Track errors for debugging and monitoring
   */
  trackError(error: AnalyticsError): void {
    // Error tracking is always allowed for debugging purposes
    const event: AnalyticsEvent = {
      name: 'error_occurred',
      parameters: {
        event_category: 'error',
        event_label: error.error_type,
        value: 1,
      },
    }

    // Queue error events even without consent for debugging
    if (!this.isInitialized) {
      this.eventQueue.push(event)
      return
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `${error.error_type}: ${error.error_message}`,
        fatal: false,
      })
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Partial<UserProperties>): void {
    if (!hasConsent('analytics')) {
      return
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', {
        user_type: properties.user_type,
      })
    }

    // Update user context
    if (this.userContext) {
      this.userContext.user_properties = {
        ...this.userContext.user_properties,
        ...properties,
      }
    }
  }

  /**
   * Update consent and reinitialize if needed
   */
  updateConsent(consent: any): void {
    const hasAnalyticsConsent = consent.analytics === 'granted'

    if (hasAnalyticsConsent && !this.isInitialized && this.config) {
      // Reinitialize analytics
      this.init(this.config)
    } else if (!hasAnalyticsConsent && this.isInitialized) {
      // Disable analytics
      this.destroy()
    }
  }

  /**
   * Get opt-out status
   */
  getOptOutStatus(): boolean {
    return !hasConsent('analytics')
  }

  /**
   * Set opt-out status
   */
  setOptOut(optOut: boolean): void {
    if (optOut) {
      this.destroy()
      logPrivacyEvent('opt_out', { service: 'analytics' })
    } else {
      logPrivacyEvent('opt_in', { service: 'analytics' })
    }
  }

  /**
   * Destroy analytics service
   */
  destroy(): void {
    this.isInitialized = false
    this.eventQueue = []
    this.userContext = null

    // Disable GA4 tracking
    if (typeof window !== 'undefined' && this.config?.ga4_measurement_id) {
      ;(window as any)[`ga-disable-${this.config.ga4_measurement_id}`] = true
    }
  }

  /**
   * Process queued events
   */
  private processEventQueue(): void {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift()
      if (event) {
        this.trackEvent(event)
      }
    }
  }

  /**
   * Check if tracking is privacy compliant
   */
  private isPrivacyCompliant(event: AnalyticsEvent): boolean {
    // Allow error tracking for debugging
    if (event.name === 'error_occurred') {
      return true
    }

    // Check consent for analytics events
    return hasConsent('analytics')
  }

  /**
   * Enhance event with additional context
   */
  private enhanceEvent(event: AnalyticsEvent): AnalyticsEvent {
    const userContext = this.userContext || getPrivacyCompliantUserContext()

    return {
      ...event,
      timestamp: event.timestamp || Date.now(),
      session_id: event.session_id || getUserIdentifier(),
      page_path: event.page_path || window.location.pathname,
      page_title: event.page_title || document.title,
      referrer: event.referrer || document.referrer,
      user_agent: event.user_agent || navigator.userAgent,
      parameters: {
        ...event.parameters,
      },
    }
  }

  /**
   * Determine user type based on behavior
   */
  private getUserType(): string {
    // Simple heuristic - can be enhanced with more sophisticated logic
    const isReturning = document.referrer.includes(window.location.hostname)
    const hasInteracted = sessionStorage.getItem('oluna_interaction_count')

    if (hasInteracted && parseInt(hasInteracted) > 5) {
      return 'engaged'
    } else if (isReturning) {
      return 'returning'
    } else {
      return 'new'
    }
  }
}

// Create singleton instance
export const analytics = new AnalyticsService()

// Convenience functions for common tracking events
export const trackEvent = analytics.trackEvent.bind(analytics)
export const trackPageView = analytics.trackPageView.bind(analytics)
export const trackConversion = analytics.trackConversion.bind(analytics)
export const trackPerformance = analytics.trackPerformance.bind(analytics)
export const trackError = analytics.trackError.bind(analytics)
export const setUserProperties = analytics.setUserProperties.bind(analytics)

/**
 * Business-specific tracking functions
 */

/**
 * Track lead generation events
 */
export function trackLead(params: LeadEventParams): void {
  const event: AnalyticsEvent = {
    name: 'lead_generated',
    parameters: {
      event_category: 'lead_generation',
      event_label: params.lead_type,
      value: params.value || 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track service interest
 */
export function trackServiceInterest(params: ServiceEventParams): void {
  const event: AnalyticsEvent = {
    name: 'service_interest',
    parameters: {
      event_category: 'service_engagement',
      event_label: params.service_name,
      value: params.value || 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track form interactions
 */
export function trackFormEvent(params: FormEventParams): void {
  const event: AnalyticsEvent = {
    name: 'form_submit',
    parameters: {
      event_category: 'form_interaction',
      event_label: params.form_name,
      value: params.value || 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track WhatsApp button clicks
 */
export function trackWhatsAppClick(context: string = 'general'): void {
  const event: AnalyticsEvent = {
    name: 'whatsapp_click',
    parameters: {
      event_category: 'contact',
      event_label: 'whatsapp_button',
      value: 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track phone number clicks
 */
export function trackPhoneClick(context: string = 'general'): void {
  const event: AnalyticsEvent = {
    name: 'phone_call_click',
    parameters: {
      event_category: 'contact',
      event_label: 'phone_number',
      value: 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track email clicks
 */
export function trackEmailClick(context: string = 'general'): void {
  const event: AnalyticsEvent = {
    name: 'email_click',
    parameters: {
      event_category: 'contact',
      event_label: 'email_address',
      value: 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track file downloads
 */
export function trackFileDownload(fileName: string, fileType: string): void {
  const event: AnalyticsEvent = {
    name: 'file_download',
    parameters: {
      event_category: 'download',
      event_label: fileName,
      value: 1,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number): void {
  const event: AnalyticsEvent = {
    name: 'scroll',
    parameters: {
      event_category: 'engagement',
      event_label: `${depth}%`,
      value: depth,
    },
  }

  analytics.trackEvent(event)
}

/**
 * Track user engagement time
 */
export function trackEngagementTime(timeMs: number): void {
  const event: AnalyticsEvent = {
    name: 'user_engagement',
    parameters: {
      event_category: 'engagement',
      event_label: 'time_on_page',
      value: Math.round(timeMs / 1000), // Convert to seconds
    },
  }

  analytics.trackEvent(event)
}

/**
 * Initialize analytics service
 */
export async function initializeAnalytics(): Promise<void> {
  const config: AnalyticsConfig = {
    ga4_measurement_id: process.env.NEXT_PUBLIC_GA_ID || '',
    debug_mode: process.env.NODE_ENV === 'development',
    anonymize_ip: true,
    cookie_domain: 'auto',
    cookie_expires: 365 * 24 * 60 * 60, // 1 year in seconds
    sample_rate: process.env.NODE_ENV === 'production' ? 100 : 1,
    site_speed_sample_rate: 10,
    enhanced_measurement: true,
    privacy_policy_url: '/politica-privacidade',
    data_retention_days: 26 * 30, // 26 months
    enhanced_conversions: true,
    conversion_linker: true,
  }

  try {
    await analytics.init(config)
  } catch (error) {
    console.error('[Analytics] Failed to initialize:', error)
  }
}

export default analytics
