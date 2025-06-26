'use client'

interface ImageSkeletonProps {
  className?: string
  width?: number | string
  height?: number | string
  rounded?: boolean
  thermalEffect?: boolean
}

export default function ImageSkeleton({
  className = '',
  width = '100%',
  height = '200px',
  rounded = false,
  thermalEffect = false,
}: ImageSkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 ${
        rounded ? 'rounded-lg' : ''
      } ${className}`}
      style={{ width, height }}
    >
      {/* Base shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Thermal effect overlay */}
      {thermalEffect && (
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full animate-pulse"
            style={{
              background: `
                radial-gradient(circle at 20% 30%, var(--heat-orange, #FF6A3D) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, var(--cool-teal, #0093FF) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, var(--heat-red, #D5577A) 0%, transparent 60%)
              `,
              animationDuration: '3s',
            }}
          />
        </div>
      )}

      {/* Optional loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin opacity-50" />
      </div>
    </div>
  )
}

// CSS for shimmer animation (add to globals.css)
export const shimmerStyles = `
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
`
