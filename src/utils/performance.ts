/**
 * Performance Tracking Utilities
 * Core Web Vitals and performance monitoring for Ôluna Engenharia
 * with privacy-compliant analytics integration
 */

import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

// Performance thresholds based on Core Web Vitals
const PERFORMANCE_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
} as const

type MetricType = keyof typeof PERFORMANCE_THRESHOLDS
type MetricRating = 'good' | 'needs-improvement' | 'poor'

/**
 * Get performance rating for a metric value
 */
function getPerformanceRating(metric: MetricType, value: number): MetricRating {
  const thresholds = PERFORMANCE_THRESHOLDS[metric]
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Initialize Core Web Vitals tracking
 */
export function initializePerformanceTracking(): void {
  if (typeof window === 'undefined') return

  // Cumulative Layout Shift (CLS)
  onCLS((metric: any) => {
    console.log('CLS:', metric.value, getPerformanceRating('CLS', metric.value))
  })

  // First Input Delay (FID)
  onFID((metric: any) => {
    console.log('FID:', metric.value, getPerformanceRating('FID', metric.value))
  })

  // First Contentful Paint (FCP)
  onFCP((metric: any) => {
    console.log('FCP:', metric.value, getPerformanceRating('FCP', metric.value))
  })

  // Largest Contentful Paint (LCP)
  onLCP((metric: any) => {
    console.log('LCP:', metric.value, getPerformanceRating('LCP', metric.value))
  })

  // Time to First Byte (TTFB)
  onTTFB((metric: any) => {
    console.log('TTFB:', metric.value, getPerformanceRating('TTFB', metric.value))
  })
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === 'undefined') return null
  
  return {
    navigation: performance.navigation,
    timing: performance.timing,
    memory: (performance as any).memory || null,
  }
}

/**
 * Monitor page load performance
 */
export function trackPageLoad() {
  if (typeof window === 'undefined') return

  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = getPerformanceMetrics()
      console.log('Page load metrics:', metrics)
    }, 0)
  })
}

// Auto-initialize on import
if (typeof window !== 'undefined') {
  initializePerformanceTracking()
  trackPageLoad()
}