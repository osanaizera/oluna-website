'use client'

interface ThermalLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  type?: 'spinner' | 'wave' | 'pulse'
  className?: string
}

export default function ThermalLoader({ 
  size = 'md', 
  type = 'spinner', 
  className = '' 
}: ThermalLoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  }

  if (type === 'spinner') {
    return (
      <div className={`${sizeClasses[size]} ${className} relative`}>
        <svg className="w-full h-full animate-spin" viewBox="0 0 50 50">
          <defs>
            <linearGradient id="thermalSpinner" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--heat-orange)" />
              <stop offset="50%" stopColor="var(--heat-red)" />
              <stop offset="100%" stopColor="var(--cool-teal)" />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="url(#thermalSpinner)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.416"
            strokeDashoffset="31.416"
            className="animate-pulse"
          >
            <animate
              attributeName="stroke-dasharray"
              dur="2s"
              values="0 31.416;15.708 15.708;0 31.416;0 31.416"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              dur="2s"
              values="0;-15.708;-31.416;-31.416"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    )
  }

  if (type === 'wave') {
    return (
      <div className={`${sizeClasses[size]} ${className} relative`}>
        <svg className="w-full h-full" viewBox="0 0 50 20">
          <defs>
            <linearGradient id="thermalWave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--heat-orange)" />
              <stop offset="50%" stopColor="var(--heat-red)" />
              <stop offset="100%" stopColor="var(--cool-teal)" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={5 + i * 10}
              cy="10"
              r="3"
              fill="url(#thermalWave)"
              className="animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (type === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
        {/* Multiple thermal pulse rings */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full animate-ping opacity-20"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-full animate-ping opacity-30"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-400 rounded-full animate-ping opacity-10"
          style={{ animationDelay: '1s' }}
        ></div>
        
        {/* Center dot */}
        <div className="w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return null
}

// Componente de loading para formulários
export function ThermalFormLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ThermalLoader size="sm" type="spinner" />
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600">Processando...</div>
      </div>
    </div>
  )
}

// Componente de loading para páginas
export function ThermalPageLoader() {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center">
        <ThermalLoader size="lg" type="pulse" className="mx-auto mb-6" />
        
        {/* Thermal wave background */}
        <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="pageLoaderThermal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--heat-orange)" />
                <stop offset="50%" stopColor="var(--heat-red)" />
                <stop offset="100%" stopColor="var(--cool-teal)" />
              </linearGradient>
            </defs>
            <path 
              d="M0,50 Q50,30 100,50 T200,50 L200,150 Q150,130 100,150 T0,150 Z"
              fill="url(#pageLoaderThermal)"
              className="animate-pulse"
            />
          </svg>
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 relative">
          Carregando...
        </h3>
        <p className="text-gray-600 text-sm relative">
          Aguarde enquanto preparamos tudo para você
        </p>
      </div>
    </div>
  )
}