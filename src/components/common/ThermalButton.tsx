'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import ThermalLoader from './ThermalLoader'

interface ThermalButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
  thermalEffect?: 'glow' | 'wave' | 'pulse' | 'none'
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export default function ThermalButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  thermalEffect = 'glow',
  className = '',
  disabled,
  onClick,
  type = 'button'
}: ThermalButtonProps) {
  const baseClasses =
    'relative font-semibold transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2'

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-primary-400 to-accent-500 text-white hover:shadow-thermal hover:scale-105',
    secondary:
      'bg-gradient-to-r from-secondary-500 to-primary-400 text-white hover:shadow-lg hover:scale-105',
    outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white',
    ghost: 'text-primary-400 hover:bg-primary-400/10',
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  }

  const getThermalEffect = () => {
    if (thermalEffect === 'none') return null

    if (thermalEffect === 'glow') {
      return (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
          <div className="w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 -skew-x-12 animate-pulse"></div>
        </div>
      )
    }

    if (thermalEffect === 'wave') {
      return (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="buttonWave" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 Q25,20 50,30 T100,30 L100,70 Q75,60 50,70 T0,70 Z"
              fill="url(#buttonWave)"
              className="animate-pulse"
            />
          </svg>
        </div>
      )
    }

    if (thermalEffect === 'pulse') {
      return (
        <>
          <div className="absolute inset-0 bg-primary-400/20 rounded-inherit animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div
            className="absolute inset-0 bg-accent-500/20 rounded-inherit animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </>
      )
    }

    return null
  }

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {getThermalEffect()}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <ThermalLoader size="sm" type="spinner" />}
        {children}
      </span>
    </motion.button>
  )
}

// Variações específicas para casos comuns
export function ThermalCTAButton({ children, ...props }: Omit<ThermalButtonProps, 'variant'>) {
  return (
    <ThermalButton variant="primary" thermalEffect="glow" {...props}>
      {children}
    </ThermalButton>
  )
}
