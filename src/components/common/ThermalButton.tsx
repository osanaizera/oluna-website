'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import ThermalLoader from './ThermalLoader'

interface ThermalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: ReactNode
  thermalEffect?: 'glow' | 'wave' | 'pulse' | 'none'
}

export default function ThermalButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  thermalEffect = 'glow',
  className = '',
  disabled,
  ...props
}: ThermalButtonProps) {
  const baseClasses = 'relative font-semibold transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-400 to-accent-500 text-white hover:shadow-thermal hover:scale-105',
    secondary: 'bg-gradient-to-r from-secondary-500 to-primary-400 text-white hover:shadow-lg hover:scale-105',
    outline: 'border-2 border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white',
    ghost: 'text-primary-400 hover:bg-primary-400/10'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl'
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
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {getThermalEffect()}
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && <ThermalLoader size="sm" type="spinner" />}
        {children}
      </span>
    </button>
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

export function ThermalWhatsAppButton({ children, ...props }: Omit<ThermalButtonProps, 'variant' | 'className'>) {
  return (
    <ThermalButton 
      variant="primary" 
      thermalEffect="pulse"
      className="bg-green-500 hover:bg-green-600 from-green-500 to-green-600"
      {...props}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.685"/>
      </svg>
      {children}
    </ThermalButton>
  )
}