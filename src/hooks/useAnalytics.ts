/**
 * Analytics Hooks for Ôluna Engenharia
 * Custom React hooks for tracking user interactions and business events
 * with LGPD compliance and privacy-first approach
 */

'use client'

import { useEffect, useCallback, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type {
  AnalyticsEvent,
  LeadEventParams,
  ServiceEventParams,
  FormEventParams,
  ConsentState,
  UserProperties,
  ConversionGoal,
} from '@/types/analytics'
import {
  trackEvent,
  trackPageView,
  trackLead,
  trackServiceInterest,
  trackFormEvent,
  trackWhatsAppClick,
  trackPhoneClick,
  trackEmailClick,
  trackFileDownload,
  trackScrollDepth,
  trackEngagementTime,
  setUserProperties,
  trackConversion,
} from '@/services/analytics'
import { hasConsent, getConsentState, saveConsentState, getUserIdentifier } from '@/utils/privacy'

/**
 * Main analytics hook - provides core tracking functionality
 */
export function useAnalytics() {
  const [consent, setConsent] = useState<ConsentState | null>(null)
  const [isOptedOut, setIsOptedOut] = useState(false)

  useEffect(() => {
    const currentConsent = getConsentState()
    setConsent(currentConsent)
    setIsOptedOut(!hasConsent('analytics'))
  }, [])

  const track = useCallback((event: AnalyticsEvent) => {
    if (!hasConsent('analytics')) {
      return
    }
    trackEvent(event)
  }, [])

  const trackPage = useCallback((path?: string, title?: string) => {
    if (!hasConsent('analytics')) {
      return
    }
    trackPageView(path || window.location.pathname, title)
  }, [])

  const trackCustomConversion = useCallback((goal: ConversionGoal, value?: number) => {
    if (!hasConsent('analytics')) {
      return
    }
    trackConversion(goal, value)
  }, [])

  const updateUserProperties = useCallback((properties: Partial<UserProperties>) => {
    if (!hasConsent('analytics')) {
      return
    }
    setUserProperties(properties)
  }, [])

  const updateConsent = useCallback((updates: Partial<ConsentState>) => {
    const updatedConsent = saveConsentState(updates)
    setConsent(updatedConsent)
    setIsOptedOut(!hasConsent('analytics'))

    // Dispatch custom event for analytics service
    window.dispatchEvent(
      new CustomEvent('consent-updated', {
        detail: updatedConsent,
      })
    )
  }, [])

  const getUserId = useCallback(() => {
    return hasConsent('analytics') ? getUserIdentifier() : undefined
  }, [])

  const getSessionId = useCallback(() => {
    return getUserIdentifier()
  }, [])

  return {
    trackEvent: track,
    trackPageView: trackPage,
    trackConversion: trackCustomConversion,
    setUserProperties: updateUserProperties,
    getUserId,
    getSessionId,
    consent,
    updateConsent,
    isOptedOut,
  }
}

/**
 * Hook for automatic page view tracking
 */
export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    if (!hasConsent('analytics')) {
      return
    }

    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams, trackPageView])
}

/**
 * Hook for tracking form interactions
 */
export function useFormTracking(
  formName: string,
  formType: FormEventParams['form_type'] = 'contact'
) {
  const startTimeRef = useRef<number>()
  const fieldsCompletedRef = useRef<Set<string>>(new Set())
  const validationErrorsRef = useRef<string[]>([])

  const trackFormStart = useCallback(() => {
    if (!hasConsent('analytics')) {
      return
    }

    startTimeRef.current = Date.now()

    trackFormEvent({
      form_name: formName,
      form_type: formType,
      event_category: 'form_interaction',
      event_label: 'form_start',
      form_step: 1,
      value: 1,
    })
  }, [formName, formType])

  const trackFieldCompletion = useCallback(
    (fieldName: string) => {
      if (!hasConsent('analytics')) {
        return
      }

      fieldsCompletedRef.current.add(fieldName)

      trackFormEvent({
        form_name: formName,
        form_type: formType,
        event_category: 'form_interaction',
        event_label: 'field_completed',
        fields_completed: Array.from(fieldsCompletedRef.current),
        form_completion_rate: (fieldsCompletedRef.current.size / 10) * 100, // Assuming 10 total fields
        value: 1,
      })
    },
    [formName, formType]
  )

  const trackValidationError = useCallback(
    (fieldName: string, errorMessage: string) => {
      if (!hasConsent('analytics')) {
        return
      }

      validationErrorsRef.current.push(`${fieldName}: ${errorMessage}`)

      trackFormEvent({
        form_name: formName,
        form_type: formType,
        event_category: 'form_interaction',
        event_label: 'validation_error',
        validation_errors: validationErrorsRef.current.slice(-5), // Keep last 5 errors
        form_abandonment_point: fieldName,
        value: 1,
      })
    },
    [formName, formType]
  )

  const trackFormSubmit = useCallback(
    (success: boolean = true) => {
      if (!hasConsent('analytics')) {
        return
      }

      const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0

      trackFormEvent({
        form_name: formName,
        form_type: formType,
        event_category: 'form_interaction',
        event_label: success ? 'form_submit_success' : 'form_submit_error',
        fields_completed: Array.from(fieldsCompletedRef.current),
        validation_errors: validationErrorsRef.current,
        form_completion_rate: 100,
        value: success ? 10 : 0, // Higher value for successful submissions
        custom_parameters: {
          form_duration_ms: duration,
          total_fields_completed: fieldsCompletedRef.current.size,
          total_validation_errors: validationErrorsRef.current.length,
        },
      })

      // Track as conversion if successful
      if (success) {
        trackConversion({
          goal_id: `form_${formType}_conversion`,
          goal_name: `${formName} Conversion`,
          goal_type: 'lead',
          goal_value: formType === 'quote' ? 500 : 100,
          goal_currency: 'BRL',
          completion_conditions: [
            {
              event_name: 'form_submit',
              parameter_conditions: { form_name: formName, success: true },
            },
          ],
        })
      }
    },
    [formName, formType]
  )

  const trackFormAbandonment = useCallback(
    (abandonmentPoint: string) => {
      if (!hasConsent('analytics')) {
        return
      }

      const duration = startTimeRef.current ? Date.now() - startTimeRef.current : 0

      trackFormEvent({
        form_name: formName,
        form_type: formType,
        event_category: 'form_interaction',
        event_label: 'form_abandoned',
        form_abandonment_point: abandonmentPoint,
        fields_completed: Array.from(fieldsCompletedRef.current),
        form_completion_rate: (fieldsCompletedRef.current.size / 10) * 100,
        value: 0,
        custom_parameters: {
          form_duration_ms: duration,
          abandonment_point: abandonmentPoint,
        },
      })
    },
    [formName, formType]
  )

  return {
    trackFormStart,
    trackFieldCompletion,
    trackValidationError,
    trackFormSubmit,
    trackFormAbandonment,
  }
}

/**
 * Hook for tracking scroll depth and engagement
 */
export function useScrollTracking() {
  const scrollDepthTrackedRef = useRef<Set<number>>(new Set())
  const maxScrollDepthRef = useRef(0)
  const engagementStartRef = useRef(Date.now())

  useEffect(() => {
    if (!hasConsent('analytics')) {
      return
    }

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )

      if (scrollPercent > maxScrollDepthRef.current) {
        maxScrollDepthRef.current = scrollPercent

        // Track at 25%, 50%, 75%, and 100%
        const milestones = [25, 50, 75, 100]
        milestones.forEach((milestone) => {
          if (scrollPercent >= milestone && !scrollDepthTrackedRef.current.has(milestone)) {
            scrollDepthTrackedRef.current.add(milestone)
            trackScrollDepth(milestone)
          }
        })
      }
    }

    // Throttled scroll tracking
    let scrollTimeout: NodeJS.Timeout
    const throttledScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [])

  useEffect(() => {
    if (!hasConsent('analytics')) {
      return
    }

    // Track engagement time when component unmounts or page changes
    return () => {
      const engagementTime = Date.now() - engagementStartRef.current
      if (engagementTime > 1000) {
        // Only track if engaged for more than 1 second
        trackEngagementTime(engagementTime)
      }
    }
  }, [])

  return {
    maxScrollDepth: maxScrollDepthRef.current,
    scrollMilestones: Array.from(scrollDepthTrackedRef.current),
  }
}

/**
 * Hook for tracking service interest and interactions
 */
export function useServiceTracking() {
  const trackService = useCallback(
    (params: Omit<ServiceEventParams, 'event_category' | 'event_label'>) => {
      if (!hasConsent('analytics')) {
        return
      }

      trackServiceInterest({
        service_name: params.service_name,
        service_category: params.service_category,
        interaction_type: params.interaction_type,
        event_category: 'service_engagement',
        event_label: params.service_name,
        value: params.value || 1,
      })
    },
    []
  )

  const trackServiceView = useCallback(
    (serviceName: string, serviceCategory: ServiceEventParams['service_category']) => {
      trackService({
        service_name: serviceName,
        service_category: serviceCategory,
        interaction_type: 'view',
        time_on_section: 0,
        value: 1,
      })
    },
    [trackService]
  )

  const trackServiceClick = useCallback(
    (
      serviceName: string,
      serviceCategory: ServiceEventParams['service_category'],
      section?: string
    ) => {
      trackService({
        service_name: serviceName,
        service_category: serviceCategory,
        interaction_type: 'click',
        page_section: section,
        value: 2,
      })
    },
    [trackService]
  )

  const trackServiceInterestClick = useCallback(
    (serviceName: string, leadType: LeadEventParams['lead_type'] = 'consultation') => {
      if (!hasConsent('analytics')) {
        return
      }

      // Track both service interest and lead generation
      trackService({
        service_name: serviceName,
        service_category: 'thermal', // Default category
        interaction_type: 'click',
        value: 3,
      })

      trackLead({
        lead_type: leadType,
        lead_source: 'organic',
        service_interest: [serviceName],
        urgency_level: 'medium',
        event_category: 'lead_generation',
        event_label: leadType,
        value: 5,
      })
    },
    [trackService]
  )

  return {
    trackServiceView,
    trackServiceClick,
    trackServiceInterest: trackServiceInterestClick,
  }
}

/**
 * Hook for tracking contact interactions
 */
export function useContactTracking() {
  const trackWhatsApp = useCallback((context: string = 'general') => {
    if (!hasConsent('analytics')) {
      return
    }

    trackWhatsAppClick(context)

    // Also track as lead
    trackLead({
      lead_type: 'whatsapp',
      lead_source: 'direct',
      contact_preference: 'whatsapp',
      urgency_level: 'high',
      event_category: 'lead_generation',
      event_label: 'whatsapp_click',
      value: 8,
    })
  }, [])

  const trackPhone = useCallback((context: string = 'general') => {
    if (!hasConsent('analytics')) {
      return
    }

    trackPhoneClick(context)

    // Also track as lead
    trackLead({
      lead_type: 'phone',
      lead_source: 'direct',
      contact_preference: 'phone',
      urgency_level: 'high',
      event_category: 'lead_generation',
      event_label: 'phone_click',
      value: 8,
    })
  }, [])

  const trackEmail = useCallback((context: string = 'general') => {
    if (!hasConsent('analytics')) {
      return
    }

    trackEmailClick(context)

    // Also track as lead
    trackLead({
      lead_type: 'email',
      lead_source: 'direct',
      contact_preference: 'email',
      urgency_level: 'medium',
      event_category: 'lead_generation',
      event_label: 'email_click',
      value: 5,
    })
  }, [])

  return {
    trackWhatsAppClick: trackWhatsApp,
    trackPhoneClick: trackPhone,
    trackEmailClick: trackEmail,
  }
}

/**
 * Hook for tracking file downloads
 */
export function useDownloadTracking() {
  const trackDownload = useCallback((fileName: string, fileType: string, context?: string) => {
    if (!hasConsent('analytics')) {
      return
    }

    trackFileDownload(fileName, fileType)

    // Track as lead if it's a valuable document
    if (fileType === 'pdf' || fileName.includes('catalogo') || fileName.includes('portfolio')) {
      trackLead({
        lead_type: 'consultation',
        lead_source: 'organic',
        urgency_level: 'medium',
        event_category: 'lead_generation',
        event_label: 'document_download',
        value: 3,
        custom_parameters: {
          downloaded_file: fileName,
          file_type: fileType,
          download_context: context,
        },
      })
    }
  }, [])

  return {
    trackDownload,
  }
}

/**
 * Hook for tracking user engagement and session quality
 */
export function useEngagementTracking() {
  const sessionStartRef = useRef(Date.now())
  const interactionCountRef = useRef(0)
  const pageViewsRef = useRef(1)

  const trackInteraction = useCallback((interactionType: string, value: number = 1) => {
    if (!hasConsent('analytics')) {
      return
    }

    interactionCountRef.current += 1

    // Store interaction count in session storage for user type determination
    sessionStorage.setItem('oluna_interaction_count', interactionCountRef.current.toString())

    trackEvent({
      name: 'user_engagement',
      parameters: {
        event_category: 'engagement',
        event_label: interactionType,
        value: value,
      },
    })

    // Update user properties based on engagement
    if (interactionCountRef.current === 5) {
      setUserProperties({ user_type: 'engaged' })
    } else if (interactionCountRef.current === 10) {
      setUserProperties({ user_type: 'highly_engaged', engagement_score: 75 })
    }
  }, [])

  const trackPageView = useCallback(() => {
    pageViewsRef.current += 1
    trackInteraction('page_view', 1)
  }, [trackInteraction])

  const getEngagementScore = useCallback(() => {
    const sessionDuration = Date.now() - sessionStartRef.current
    const timeScore = Math.min((sessionDuration / 60000) * 20, 40) // Max 40 points for time (up to 2 minutes)
    const interactionScore = Math.min(interactionCountRef.current * 5, 40) // Max 40 points for interactions
    const pageViewScore = Math.min(pageViewsRef.current * 5, 20) // Max 20 points for page views

    return Math.round(timeScore + interactionScore + pageViewScore)
  }, [])

  useEffect(() => {
    // Track session end on page unload
    const handleBeforeUnload = () => {
      if (hasConsent('analytics')) {
        const engagementScore = getEngagementScore()
        setUserProperties({
          engagement_score: engagementScore,
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [getEngagementScore])

  return {
    trackInteraction,
    trackPageView,
    getEngagementScore,
    interactionCount: interactionCountRef.current,
    sessionDuration: Date.now() - sessionStartRef.current,
  }
}

/**
 * Hook for A/B testing and experimentation
 */
export function useExperimentTracking() {
  const [experiments, setExperiments] = useState<Record<string, string>>({})

  const joinExperiment = useCallback((experimentName: string, variant: string) => {
    if (!hasConsent('analytics')) {
      return
    }

    setExperiments((prev) => ({ ...prev, [experimentName]: variant }))

    trackEvent({
      name: 'experiment_exposure',
      parameters: {
        event_category: 'experiment',
        event_label: experimentName,
        value: 1,
      },
    })

    // Set as user property for segmentation
    setUserProperties({
      [`experiment_${experimentName}`]: variant,
    })
  }, [])

  const trackExperimentConversion = useCallback(
    (experimentName: string, conversionType: string) => {
      if (!hasConsent('analytics') || !experiments[experimentName]) {
        return
      }

      trackEvent({
        name: 'experiment_conversion',
        parameters: {
          event_category: 'experiment',
          event_label: `${experimentName}_${conversionType}`,
          value: 10,
        },
      })
    },
    [experiments]
  )

  return {
    joinExperiment,
    trackExperimentConversion,
    experiments,
  }
}
