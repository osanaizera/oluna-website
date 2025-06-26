'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThermalErrorDisplayProps {
  errorCode?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export default function ThermalErrorDisplay({
  errorCode = '404',
  size = 'lg',
  animated = true,
}: ThermalErrorDisplayProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState(0)

  useEffect(() => {
    if (!animated) return

    const scanInterval = setInterval(() => {
      setIsScanning(true)
      setScanPhase((prev) => (prev + 1) % 4)

      setTimeout(() => setIsScanning(false), 2000)
    }, 4000)

    return () => clearInterval(scanInterval)
  }, [animated])

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64',
    lg: 'w-80 h-80',
  }

  const digitSize = {
    sm: 'text-6xl',
    md: 'text-7xl',
    lg: 'text-8xl',
  }

  // Thermal color mapping for different scan phases
  const thermalColors = [
    ['#FF6A3D', '#D5577A'], // Heat Orange to Heat Red
    ['#D5577A', '#0093FF'], // Heat Red to Cool Teal
    ['#0093FF', '#0F6B47'], // Cool Teal to Forest Green
    ['#0F6B47', '#FF6A3D'], // Forest Green to Heat Orange
  ]

  return (
    <div
      className={`relative ${sizeClasses[size]} mx-auto`}
      role="img"
      aria-label={`Erro ${errorCode} - Display termográfico`}
    >
      {/* Main Thermal Display Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-gray-300 bg-black shadow-2xl">
        {/* Thermal Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern
                id="thermal-grid"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  width="10"
                  height="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#thermal-grid)" className="text-gray-400" />
          </svg>
        </div>

        {/* Thermal Gradient Background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scanPhase}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, ${thermalColors[scanPhase][0]}20, ${thermalColors[scanPhase][1]}10, transparent 70%)`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Error Code Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`${digitSize[size]} font-mono font-bold text-center leading-none`}
            style={{
              background: `linear-gradient(45deg, ${thermalColors[scanPhase][0]}, ${thermalColors[scanPhase][1]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255, 106, 61, 0.5))',
            }}
            animate={
              isScanning
                ? {
                    scale: [1, 1.1, 1],
                    filter: [
                      'drop-shadow(0 0 20px rgba(255, 106, 61, 0.5))',
                      'drop-shadow(0 0 40px rgba(255, 106, 61, 0.8))',
                      'drop-shadow(0 0 20px rgba(255, 106, 61, 0.5))',
                    ],
                  }
                : {}
            }
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            {errorCode}
          </motion.div>
        </div>

        {/* Scanning Line Effect */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Horizontal scan line */}
              <motion.div
                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-heat-orange to-transparent shadow-lg"
                style={{
                  boxShadow: '0 0 10px rgba(255, 106, 61, 0.8), 0 0 20px rgba(255, 106, 61, 0.4)',
                }}
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 2, ease: 'linear' }}
              />

              {/* Vertical scan line */}
              <motion.div
                className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-cool-teal to-transparent shadow-lg"
                style={{
                  boxShadow: '0 0 10px rgba(0, 147, 255, 0.8), 0 0 20px rgba(0, 147, 255, 0.4)',
                }}
                initial={{ left: '0%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 2, ease: 'linear', delay: 0.5 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Temperature Scale */}
        <div className="absolute right-2 top-2 bottom-2 w-6 rounded-full overflow-hidden border border-gray-400">
          <div className="h-full bg-gradient-to-t from-cool-teal via-heat-red to-heat-orange relative">
            {/* Temperature markers */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[100, 75, 50, 25, 0].map((temp, index) => (
                <div key={temp} className="relative">
                  <div className="absolute right-0 w-2 h-0.5 bg-white"></div>
                  <span
                    className="absolute right-3 top-0 text-xs text-white font-mono leading-none"
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    {temp}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corner Targeting Markers */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-heat-orange"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-heat-orange"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-heat-orange"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-heat-orange"></div>

        {/* Status Indicator */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-heat-orange"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs text-white font-mono">
            {isScanning ? 'SCANNING...' : 'NO SIGNAL'}
          </span>
        </div>
      </div>

      {/* Device Frame */}
      <div className="absolute -inset-2 bg-gray-800 rounded-3xl -z-10 shadow-2xl">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
        </div>
      </div>

      {/* Thermal Camera Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm font-mono text-gray-500">THERMAL CAM</p>
        <p className="text-xs text-gray-400">ÔLUNA-404</p>
      </div>
    </div>
  )
}

// Additional thermal display variants
export function ThermalErrorMini() {
  return <ThermalErrorDisplay size="sm" animated={false} />
}

export function ThermalErrorAnimated() {
  return <ThermalErrorDisplay size="md" animated={true} />
}
