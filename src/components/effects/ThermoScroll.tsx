'use client'

import { useEffect, useRef, useState } from 'react'
import OptimizedImage from '@/components/common/OptimizedImage'

interface ThermoScrollProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export default function ThermoScroll({
  children,
  className = '',
  threshold = 0.3,
  delay = 0,
}: ThermoScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold, delay])

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
      {/* Conteúdo base em escala de cinza */}
      <div
        className={`transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      >
        <div className="filter grayscale">{children}</div>
      </div>

      {/* Overlay termográfico */}
      <div
        className={`absolute inset-0 transition-all duration-2000 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Gradiente termográfico base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 mix-blend-screen opacity-70" />

        {/* Efeito de varredura termográfica */}
        <div
          className={`absolute inset-0 transition-all duration-3000 ease-out ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         skew-x-12 animate-pulse"
            style={{ animationDuration: '4s' }}
          />
        </div>

        {/* Pontos de calor dinâmicos */}
        <div
          className={`absolute inset-0 transition-all duration-2500 ease-out delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Hot spots */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                background:
                  i % 3 === 0
                    ? 'radial-gradient(circle, var(--heat-orange) 0%, transparent 70%)'
                    : i % 3 === 1
                      ? 'radial-gradient(circle, var(--heat-red) 0%, transparent 70%)'
                      : 'radial-gradient(circle, var(--cool-teal) 0%, transparent 70%)',
                animationDelay: `${i * 300}ms`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* Overlay final com blend mode */}
        <div className="absolute inset-0 mix-blend-screen">
          <div className="w-full h-full bg-gradient-to-br from-primary-400/60 via-accent-500/80 to-secondary-500/60" />
        </div>

        {/* Conteúdo termográfico colorido */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* Efeito de linha de varredura */}
      <div
        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-primary-400 to-transparent 
                      transition-all duration-3000 ease-out ${
                        isVisible ? 'translate-x-full opacity-100' : 'translate-x-0 opacity-0'
                      }`}
        style={{
          boxShadow: '0 0 20px var(--heat-orange)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  )
}

// Componente específico para imagens de painéis elétricos com otimização
interface ThermoImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  delay?: number
  priority?: boolean
  sizes?: string
}

export function ThermoImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  delay = 0,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: ThermoImageProps) {
  return (
    <ThermoScroll delay={delay} className={className}>
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="w-full h-full object-cover"
          placeholder="blur"
          quality={90}
        />
      </div>
    </ThermoScroll>
  )
}

// Componente para cards com efeito termográfico
interface ThermoCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ThermoCard({ children, className = '', delay = 0 }: ThermoCardProps) {
  return (
    <ThermoScroll delay={delay} className={`rounded-xl overflow-hidden ${className}`}>
      <div className="bg-white p-6 h-full">{children}</div>
    </ThermoScroll>
  )
}
