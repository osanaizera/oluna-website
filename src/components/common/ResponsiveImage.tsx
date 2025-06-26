'use client'

import Image from 'next/image'
import { useState } from 'react'
import ImageSkeleton from './ImageSkeleton'

interface ResponsiveImageProps {
  src: string
  alt: string
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'auto'
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  blurDataURL?: string
  rounded?: boolean
  loading?: 'lazy' | 'eager'
  fill?: boolean
  width?: number
  height?: number
}

const aspectRatioClasses = {
  square: 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  auto: '',
}

export default function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  priority = false,
  quality = 85,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  blurDataURL,
  rounded = true,
  loading = 'lazy',
  fill = false,
  width = 800,
  height = 600,
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const containerClasses = `
    relative overflow-hidden
    ${aspectRatio !== 'auto' ? aspectRatioClasses[aspectRatio] : ''}
    ${rounded ? 'rounded-lg' : ''}
    ${className}
  `.trim()

  if (hasError) {
    return (
      <ImageSkeleton
        className={containerClasses}
        width={fill ? '100%' : width}
        height={fill ? '100%' : height}
        rounded={rounded}
      />
    )
  }

  return (
    <div className={containerClasses}>
      {/* Loading state */}
      {isLoading && (
        <ImageSkeleton
          className="absolute inset-0"
          width="100%"
          height="100%"
          rounded={false} // Container already handles rounding
        />
      )}

      {/* Main image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill || aspectRatio !== 'auto'}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-all duration-500 ${
          isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}
