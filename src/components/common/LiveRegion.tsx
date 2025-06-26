'use client'

import React, { useEffect, useRef } from 'react'

interface LiveRegionProps {
  message: string
  politeness?: 'polite' | 'assertive' | 'off'
  atomic?: boolean
  relevant?:
    | 'additions'
    | 'removals'
    | 'text'
    | 'all'
    | 'additions text'
    | 'additions removals'
    | 'removals text'
    | 'text additions'
    | 'text removals'
    | 'removals additions'
  className?: string
}

/**
 * ARIA live region component for announcing dynamic content to screen readers
 * Follows WCAG guidelines for live regions
 */
export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  politeness = 'polite',
  atomic = true,
  relevant = 'additions text',
  className = '',
}) => {
  const liveRegionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (liveRegionRef.current && message) {
      // Clear and set message to ensure screen readers announce it
      liveRegionRef.current.textContent = ''
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message
        }
      }, 100)
    }
  }, [message])

  return (
    <div
      ref={liveRegionRef}
      aria-live={politeness}
      aria-atomic={atomic}
      aria-relevant={relevant}
      className={`sr-only ${className}`}
      role="status"
    />
  )
}

/**
 * Global live region provider for app-wide announcements
 */
export const GlobalLiveRegion: React.FC = () => {
  return (
    <>
      {/* Polite announcements */}
      <div
        id="live-region-polite"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      />

      {/* Assertive announcements */}
      <div
        id="live-region-assertive"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="alert"
      />
    </>
  )
}

/**
 * Utility function to announce messages to screen readers
 */
export const announceToScreenReader = (
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
) => {
  const regionId = politeness === 'assertive' ? 'live-region-assertive' : 'live-region-polite'
  const region = document.getElementById(regionId)

  if (region) {
    region.textContent = ''
    setTimeout(() => {
      if (region) {
        region.textContent = message
      }
    }, 100)
  }
}

export default LiveRegion
