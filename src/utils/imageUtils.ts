/**
 * Image optimization utilities for the Ôluna Engenharia website
 */

/**
 * Generate a blur data URL with thermal gradient effect
 */
export function generateThermalBlurDataURL(width: number = 8, height: number = 8): string {
  // Create a simple thermal gradient for blur placeholder
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx) return generateSimpleBlurDataURL()

  // Create thermal-inspired gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#FF6A3D20') // heat-orange with opacity
  gradient.addColorStop(0.5, '#D5577A15') // heat-red with opacity
  gradient.addColorStop(1, '#0093FF10') // cool-teal with opacity

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Generate a simple gray blur data URL
 */
export function generateSimpleBlurDataURL(width: number = 8, height: number = 8): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  if (!ctx)
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  // Create gradient from light to dark gray
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6') // gray-100
  gradient.addColorStop(0.5, '#e5e7eb') // gray-200
  gradient.addColorStop(1, '#d1d5db') // gray-300

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.1)
}

/**
 * Generate responsive image sizes string based on breakpoints
 */
export function generateImageSizes(config: {
  mobile?: string
  tablet?: string
  desktop?: string
  default?: string
}): string {
  const {
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw',
    default: defaultSize = '100vw',
  } = config

  return `(max-width: 768px) ${mobile}, (max-width: 1200px) ${tablet}, ${desktop}`
}

/**
 * Optimize image URL for different use cases
 */
export function optimizeImageUrl(
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'avif' | 'auto'
  } = {}
): string {
  // If it's already optimized or external, return as-is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src
  }

  const { width, height, quality = 85, format = 'auto' } = options
  const params = new URLSearchParams()

  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (quality !== 85) params.append('q', quality.toString())
  if (format !== 'auto') params.append('f', format)

  const queryString = params.toString()
  return queryString ? `${src}?${queryString}` : src
}

/**
 * Get optimal image dimensions for different screen sizes
 */
export function getOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = 1920
): { width: number; height: number }[] {
  const aspectRatio = originalWidth / originalHeight
  const sizes = [320, 640, 768, 1024, 1280, 1920]

  return sizes
    .filter((size) => size <= Math.max(originalWidth, maxWidth))
    .map((width) => ({
      width,
      height: Math.round(width / aspectRatio),
    }))
}

/**
 * Pre-defined blur data URLs for common use cases
 */
export const BLUR_DATA_URLS = {
  thermal:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  gray: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  landscape:
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAACAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
} as const

/**
 * Image configuration presets for different use cases
 */
export const IMAGE_CONFIGS = {
  hero: {
    quality: 90,
    priority: true,
    sizes: '100vw',
    placeholder: 'blur' as const,
  },
  card: {
    quality: 85,
    priority: false,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder: 'blur' as const,
  },
  thumbnail: {
    quality: 80,
    priority: false,
    sizes: '(max-width: 768px) 50vw, 25vw',
    placeholder: 'blur' as const,
  },
  logo: {
    quality: 95,
    priority: true,
    sizes: '200px',
    placeholder: 'empty' as const,
  },
  thermal: {
    quality: 90,
    priority: false,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    placeholder: 'blur' as const,
    blurDataURL: BLUR_DATA_URLS.thermal,
  },
} as const

/**
 * Validate image URL and provide fallback
 */
export function validateImageUrl(
  src: string,
  fallback: string = '/images/placeholder.jpg'
): string {
  if (!src || src.trim() === '') {
    return fallback
  }

  try {
    // Basic URL validation
    new URL(src, window.location.origin)
    return src
  } catch {
    return fallback
  }
}
