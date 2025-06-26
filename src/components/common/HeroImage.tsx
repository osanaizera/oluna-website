'use client'

import Image from 'next/image'
import { useState } from 'react'
import ImageSkeleton from './ImageSkeleton'

interface HeroImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  blurDataURL?: string
  overlayEffect?: 'thermal' | 'gradient' | 'none'
}

export default function HeroImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = true, // Hero images should have priority
  quality = 90, // Higher quality for hero images
  sizes = '100vw', // Hero images typically full width
  blurDataURL,
  overlayEffect = 'none',
}: HeroImageProps) {
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
      <ImageSkeleton
        className={className}
        width={width}
        height={height}
        thermalEffect={overlayEffect === 'thermal'}
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <ImageSkeleton
          className="absolute inset-0"
          width="100%"
          height="100%"
          thermalEffect={overlayEffect === 'thermal'}
        />
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Overlay effects */}
      {overlayEffect === 'thermal' && !isLoading && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="w-full h-full opacity-20 mix-blend-screen"
            style={{
              background: `
                radial-gradient(circle at 15% 25%, var(--heat-orange) 0%, transparent 40%),
                radial-gradient(circle at 85% 20%, var(--heat-red) 0%, transparent 45%),
                radial-gradient(circle at 30% 75%, var(--cool-teal) 0%, transparent 35%)
              `,
            }}
          />
        </div>
      )}

      {overlayEffect === 'gradient' && !isLoading && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}
