/**
 * Analytics Initialization Component
 * Client-side analytics setup with page tracking and performance monitoring
 */

'use client'

import { useEffect } from 'react'
import { usePageTracking, useScrollTracking, useEngagementTracking } from '@/hooks/useAnalytics'
import { initializePerformanceTracking } from '@/utils/performance'
import { initializeBusinessTracking } from '@/utils/businessTracking'

export function AnalyticsInit() {
  // Initialize page tracking
  usePageTracking()

  // Initialize scroll tracking
  useScrollTracking()

  // Initialize engagement tracking
  const { trackInteraction } = useEngagementTracking()

  useEffect(() => {
    // Initialize performance tracking after page load
    const initializeTracking = () => {
      try {
        initializePerformanceTracking()
        initializeBusinessTracking()

        console.log('[Analytics] All tracking systems initialized')
      } catch (error) {
        console.error('[Analytics] Failed to initialize tracking:', error)
      }
    }

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      initializeTracking()
    } else {
      window.addEventListener('load', initializeTracking)
      return () => window.removeEventListener('load', initializeTracking)
    }
  }, [])

  // Track user interactions
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Track link clicks
      if (target.tagName === 'A') {
        const href = target.getAttribute('href')
        if (href) {
          trackInteraction('link_click', 1)

          // Track external links
          if (href.startsWith('http') && !href.includes(window.location.hostname)) {
            trackInteraction('external_link_click', 2)
          }
        }
      }

      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const buttonText = target.textContent?.trim() || 'unknown'
        trackInteraction(`button_click:${buttonText.toLowerCase()}`, 1)
      }
    }

    // Track keyboard navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        trackInteraction('keyboard_navigation', 1)
      }
    }

    // Track focus events for accessibility
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        trackInteraction('form_field_focus', 1)
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocus)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocus)
    }
  }, [trackInteraction])

  // This component doesn't render anything
  return null
}

export default AnalyticsInit
