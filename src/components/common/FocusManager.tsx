'use client'

import React, { useEffect, useRef, useState } from 'react'

interface FocusManagerProps {
  children: React.ReactNode
  trapFocus?: boolean
  restoreFocus?: boolean
  initialFocus?: React.RefObject<HTMLElement>
}

/**
 * Component that manages focus for modals, forms, and other interactive elements
 * Implements focus trapping and restoration according to WCAG guidelines
 */
export const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  trapFocus = false,
  restoreFocus = true,
  initialFocus
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<Element | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (restoreFocus) {
      previousActiveElementRef.current = document.activeElement
    }

    if (initialFocus?.current) {
      initialFocus.current.focus()
    }

    setIsInitialized(true)

    return () => {
      if (restoreFocus && previousActiveElementRef.current) {
        (previousActiveElementRef.current as HTMLElement).focus()
      }
    }
  }, [restoreFocus, initialFocus])

  useEffect(() => {
    if (!trapFocus || !isInitialized) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const container = containerRef.current
      if (!container) return

      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      
      const firstFocusable = focusableElements[0] as HTMLElement
      const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [trapFocus, isInitialized])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

export default FocusManager