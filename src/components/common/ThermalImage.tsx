'use client'

import { useState } from 'react'
import OptimizedImage from './OptimizedImage'
import ImageSkeleton from './ImageSkeleton'
import { IMAGE_CONFIGS, generateThermalBlurDataURL } from '@/utils/imageUtils'

interface ThermalImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  aspectRatio?: 'square' | '16/9' | '4/3' | 'auto'
  thermalEffect?: 'scan' | 'reveal' | 'pulse' | 'none'
  hotSpots?: Array<{
    x: number // percentage from left
    y: number // percentage from top
    intensity: 'low' | 'medium' | 'high'
    temp?: string
  }>
}

const aspectRatioClasses = {
  square: 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  auto: '',
}

export default function ThermalImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  aspectRatio = '16/9',
  thermalEffect = 'reveal',
  hotSpots = [],
}: ThermalImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [showThermal, setShowThermal] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    // Auto-trigger thermal effect after load
    setTimeout(() => setShowThermal(true), 500)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const containerClasses = `
    relative overflow-hidden cursor-pointer group
    ${aspectRatio !== 'auto' ? aspectRatioClasses[aspectRatio] : ''}
    ${className}
  `.trim()

  if (hasError) {
    return (
      <ImageSkeleton
        className={containerClasses}
        width={aspectRatio !== 'auto' ? '100%' : width}
        height={aspectRatio !== 'auto' ? '100%' : height}
        thermalEffect={true}
        rounded={true}
      />
    )
  }

  return (
    <div
      className={containerClasses}
      onMouseEnter={() => setShowThermal(true)}
      onMouseLeave={() => setShowThermal(false)}
    >
      {/* Loading state */}
      {isLoading && (
        <ImageSkeleton
          className="absolute inset-0"
          width="100%"
          height="100%"
          thermalEffect={true}
          rounded={false}
        />
      )}

      {/* Base image (grayscale when thermal is shown) */}
      <div
        className={`relative transition-all duration-1000 ${
          showThermal && thermalEffect !== 'none'
            ? 'filter grayscale brightness-75'
            : 'filter grayscale-0'
        }`}
      >
        <OptimizedImage
          src={src}
          alt={alt}
          width={aspectRatio !== 'auto' ? undefined : width}
          height={aspectRatio !== 'auto' ? undefined : height}
          fill={aspectRatio !== 'auto'}
          priority={priority}
          quality={IMAGE_CONFIGS.thermal.quality}
          sizes={IMAGE_CONFIGS.thermal.sizes}
          placeholder="blur"
          blurDataURL={IMAGE_CONFIGS.thermal.blurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          className="object-cover"
        />
      </div>

      {/* Thermal overlay effects */}
      {showThermal && thermalEffect !== 'none' && !isLoading && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Base thermal gradient */}
          <div
            className={`absolute inset-0 mix-blend-screen transition-opacity duration-1000 ${
              thermalEffect === 'reveal'
                ? 'opacity-70'
                : thermalEffect === 'pulse'
                  ? 'opacity-60 animate-pulse'
                  : 'opacity-50'
            }`}
            style={{
              background: `
                radial-gradient(circle at 20% 30%, var(--heat-orange) 0%, transparent 40%),
                radial-gradient(circle at 80% 70%, var(--cool-teal) 0%, transparent 45%),
                radial-gradient(circle at 50% 20%, var(--heat-red) 0%, transparent 35%),
                linear-gradient(135deg, rgba(255, 106, 61, 0.1) 0%, rgba(0, 147, 255, 0.1) 100%)
              `,
            }}
          />

          {/* Scanning line effect */}
          {thermalEffect === 'scan' && (
            <div
              className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-bounce opacity-80"
              style={{
                boxShadow: '0 0 10px var(--heat-orange)',
                animation: 'thermal-scan 3s ease-in-out infinite',
              }}
            />
          )}

          {/* Hot spots */}
          {hotSpots.map((spot, index) => (
            <div
              key={index}
              className={`absolute w-4 h-4 rounded-full animate-pulse ${
                spot.intensity === 'high'
                  ? 'animate-ping'
                  : spot.intensity === 'medium'
                    ? 'animate-pulse'
                    : 'animate-bounce'
              }`}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)',
                background:
                  spot.intensity === 'high'
                    ? 'radial-gradient(circle, var(--heat-orange) 0%, transparent 70%)'
                    : spot.intensity === 'medium'
                      ? 'radial-gradient(circle, var(--heat-red) 0%, transparent 70%)'
                      : 'radial-gradient(circle, var(--cool-teal) 0%, transparent 70%)',
                animationDelay: `${index * 200}ms`,
                animationDuration: `${2 + (index % 3)}s`,
              }}
            >
              {/* Temperature label */}
              {spot.temp && (
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                  style={{ fontSize: '10px' }}
                >
                  {spot.temp}
                </div>
              )}
            </div>
          ))}

          {/* Thermal grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 106, 61, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 106, 61, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />
        </div>
      )}

      {/* Thermal mode indicator */}
      {showThermal && !isLoading && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            THERMAL
          </span>
        </div>
      )}

      {/* Hover instructions */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {showThermal ? 'Modo Termográfico' : 'Passe o mouse para ver termografia'}
      </div>
    </div>
  )
}

// CSS for thermal scan animation (add to globals.css if needed)
export const thermalAnimationStyles = `
@keyframes thermal-scan {
  0% { top: 0%; opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
`
