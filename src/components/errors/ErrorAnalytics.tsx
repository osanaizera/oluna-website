'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface ErrorAnalyticsProps {
  errorType: '404' | '500' | 'generic'
  errorMessage?: string
  errorStack?: string
  userAgent?: string
}

// Simple type for window.gtag
type GtagFunction = (command: string, targetId: string, config?: any) => void

declare global {
  interface Window {
    gtag?: GtagFunction
    dataLayer?: any[]
  }
}

export default function ErrorAnalytics({
  errorType,
  errorMessage,
  errorStack,
  userAgent,
}: ErrorAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hasTracked = useRef(false)

  useEffect(() => {
    // Prevent duplicate tracking
    if (hasTracked.current) return
    hasTracked.current = true

    const trackError = async () => {
      try {
        // Get comprehensive error data
        const errorData = {
          error_type: errorType,
          error_message: errorMessage || `HTTP ${errorType} Error`,
          requested_url: window.location.href,
          referrer: document.referrer || 'direct',
          user_agent: userAgent || navigator.userAgent,
          timestamp: new Date().toISOString(),
          page_title: document.title,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          search_params: searchParams.toString(),
          pathname: pathname,
          language: navigator.language,
          platform: navigator.platform,
          cookies_enabled: navigator.cookieEnabled,
          online_status: navigator.onLine ? 'online' : 'offline',
        }

        // Track with Google Analytics if available
        if (typeof window.gtag === 'function') {
          // Track as exception
          window.gtag('event', 'exception', {
            description: `${errorType}_error_${pathname}`,
            fatal: false,
            custom_map: {
              custom_dimension_1: errorType,
              custom_dimension_2: pathname,
              custom_dimension_3: document.referrer || 'direct',
            },
          })

          // Track as custom event
          window.gtag('event', 'error_page_view', {
            event_category: 'Error Pages',
            event_label: `${errorType} - ${pathname}`,
            custom_parameters: {
              error_type: errorType,
              requested_url: pathname,
              referrer_url: document.referrer || 'direct',
              user_agent_info: navigator.userAgent.substring(0, 100), // Truncate for storage
            },
          })

          // Track page view for 404 (with no-index)
          window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
            page_title: `Error ${errorType} - ${document.title}`,
            page_location: window.location.href,
            page_referrer: document.referrer,
            custom_map: {
              custom_dimension_error: errorType,
            },
          })
        }

        // Send to custom analytics endpoint if available
        if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
          fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              event_type: 'error_page',
              ...errorData,
            }),
          }).catch(console.warn) // Silent fail for analytics
        }

        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.group(`🔥 Ôluna Error Analytics - ${errorType}`)
          console.table(errorData)
          console.groupEnd()
        }

        // Track user behavior on error page
        trackErrorPageBehavior()
      } catch (error) {
        // Silent fail - don't break page functionality
        console.warn('Error analytics failed:', error)
      }
    }

    // Track immediately
    trackError()

    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackErrorPageExit('page_hidden')
      }
    }

    // Track page unload
    const handleBeforeUnload = () => {
      trackErrorPageExit('page_unload')
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [errorType, errorMessage, pathname, searchParams, userAgent])

  // Track user interactions on error page
  const trackErrorPageBehavior = () => {
    const startTime = Date.now()
    let interactionCount = 0
    let scrollDepth = 0

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      scrollDepth = Math.max(scrollDepth, scrollPercent)
    }

    // Track clicks on error page
    const handleClick = (event: MouseEvent) => {
      interactionCount++
      const target = event.target as HTMLElement
      const elementInfo = {
        tag: target.tagName.toLowerCase(),
        class: target.className,
        text: target.textContent?.substring(0, 50) || '',
        href: target.getAttribute('href') || '',
      }

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'error_page_interaction', {
          event_category: 'Error Page Behavior',
          event_label: `${errorType} - Click on ${elementInfo.tag}`,
          custom_parameters: elementInfo,
        })
      }
    }

    // Send behavior data when user leaves
    const sendBehaviorData = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000)

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'error_page_behavior', {
          event_category: 'Error Page Behavior',
          event_label: `${errorType} - Page Interaction Summary`,
          custom_parameters: {
            time_on_page: timeOnPage,
            interaction_count: interactionCount,
            scroll_depth: scrollDepth,
            error_type: errorType,
            page_path: pathname,
          },
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)

    // Send data after 30 seconds or on page leave
    const behaviorTimer = setTimeout(sendBehaviorData, 30000)

    const cleanup = () => {
      clearTimeout(behaviorTimer)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      sendBehaviorData()
    }

    window.addEventListener('beforeunload', cleanup)
    return cleanup
  }

  // Track how users exit error pages
  const trackErrorPageExit = (exitType: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'error_page_exit', {
        event_category: 'Error Page Behavior',
        event_label: `${errorType} - ${exitType}`,
        custom_parameters: {
          error_type: errorType,
          exit_type: exitType,
          page_path: pathname,
          time_on_page: Date.now(),
        },
      })
    }
  }

  // Track successful recoveries (navigation away from error page)
  useEffect(() => {
    const trackRecovery = () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'error_recovery', {
          event_category: 'Error Page Behavior',
          event_label: `${errorType} - User found valid page`,
          custom_parameters: {
            error_type: errorType,
            recovery_path: window.location.pathname,
            original_error_path: pathname,
          },
        })
      }
    }

    // Track if user successfully navigates to a valid page
    const handleNavigation = () => {
      if (window.location.pathname !== pathname) {
        trackRecovery()
      }
    }

    window.addEventListener('popstate', handleNavigation)
    return () => window.removeEventListener('popstate', handleNavigation)
  }, [errorType, pathname])

  // This component doesn't render anything visible
  return null
}

// Helper hook for error boundary analytics
export function useErrorTracking() {
  const trackError = (error: Error, errorInfo?: any) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'javascript_error', {
        event_category: 'JavaScript Errors',
        event_label: error.message,
        custom_parameters: {
          error_stack: error.stack?.substring(0, 500) || '',
          error_name: error.name,
          component_stack: errorInfo?.componentStack?.substring(0, 500) || '',
          page_path: window.location.pathname,
        },
      })
    }

    // Send to error logging service
    if (process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ERROR_LOGGING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error_message: error.message,
          error_stack: error.stack,
          error_name: error.name,
          page_path: window.location.pathname,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          component_stack: errorInfo?.componentStack,
        }),
      }).catch(console.warn)
    }
  }

  return { trackError }
}
