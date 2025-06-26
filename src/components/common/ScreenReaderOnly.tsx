import React from 'react'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

/**
 * Component that hides content visually but keeps it accessible to screen readers
 * Follows WCAG guidelines for screen reader only content
 */
export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ children, className = '' }) => {
  return <span className={`sr-only ${className}`}>{children}</span>
}

export default ScreenReaderOnly
