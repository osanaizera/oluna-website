'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  darkModeSrc?: string // Optional dark mode variant
}

export default function LogoImage({
  src,
  alt,
  width = 120,
  height = 40,
  className = '',
  priority = true, // Logos typically should load fast
  quality = 95, // High quality for logos
  darkModeSrc,
}: LogoImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 font-semibold text-xs">{alt.split(' ')[0] || 'Logo'}</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Loading state */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-100 animate-pulse rounded"
          style={{ width, height }}
        />
      )}

      {/* Light mode logo */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${darkModeSrc ? 'block dark:hidden' : ''}`}
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />

      {/* Dark mode logo (if provided) */}
      {darkModeSrc && (
        <Image
          src={darkModeSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          onLoad={handleLoad}
          onError={handleError}
          className={`hidden dark:block transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      )}
    </div>
  )
}
