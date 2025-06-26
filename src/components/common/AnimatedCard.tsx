'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  animation?: 'fade' | 'slide' | 'scale' | 'thermal'
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'thermal'
  thermalColor?: string
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  animation = 'fade',
  hoverEffect = 'lift',
  thermalColor = 'var(--heat-orange)',
}: AnimatedCardProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getAnimationVariants = () => {
    switch (animation) {
      case 'slide':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case 'thermal':
        return {
          hidden: {
            opacity: 0,
            y: 30,
            filter: 'grayscale(100%)',
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'grayscale(0%)',
          },
        }
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'glow':
        return {
          scale: 1.02,
          boxShadow: `0 20px 40px rgba(0,0,0,0.15), 0 0 30px ${thermalColor}40`,
          y: -5,
        }
      case 'scale':
        return {
          scale: 1.05,
          y: -5,
        }
      case 'thermal':
        return {
          scale: 1.03,
          boxShadow: `0 25px 50px rgba(0,0,0,0.2), 0 0 40px ${thermalColor}60`,
          y: -8,
          filter: 'brightness(1.1)',
        }
      case 'lift':
      default:
        return {
          y: -8,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        }
    }
  }

  const variants = getAnimationVariants()
  const hoverVariants = getHoverVariants()

  return (
    <motion.div
      ref={ref as any}
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={hoverVariants}
      style={{
        transformOrigin: 'center',
      }}
    >
      {animation === 'thermal' && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(circle at center, ${thermalColor}20 0%, transparent 70%)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10">{children}</div>

      {/* Shimmer effect on hover */}
      {hoverEffect === 'thermal' && (
        <motion.div
          className="absolute inset-0 opacity-0"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${thermalColor}30 50%, transparent 70%)`,
            transform: 'translateX(-100%)',
          }}
          whileHover={{
            opacity: 1,
            transform: 'translateX(100%)',
          }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.div>
  )
}

// Specific variants for common use cases
export function ThermalCard({
  children,
  ...props
}: Omit<AnimatedCardProps, 'animation' | 'hoverEffect'>) {
  return (
    <AnimatedCard animation="thermal" hoverEffect="thermal" {...props}>
      {children}
    </AnimatedCard>
  )
}

export function ScaleCard({
  children,
  ...props
}: Omit<AnimatedCardProps, 'animation' | 'hoverEffect'>) {
  return (
    <AnimatedCard animation="scale" hoverEffect="scale" {...props}>
      {children}
    </AnimatedCard>
  )
}

export function LiftCard({
  children,
  ...props
}: Omit<AnimatedCardProps, 'animation' | 'hoverEffect'>) {
  return (
    <AnimatedCard animation="slide" hoverEffect="lift" {...props}>
      {children}
    </AnimatedCard>
  )
}
