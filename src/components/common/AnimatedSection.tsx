'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide' | 'scale' | 'fade-slide'
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  stagger?: boolean
  staggerDelay?: number
}

export default function AnimatedSection({
  children,
  className = '',
  animation = 'fade-slide',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  stagger = false,
  staggerDelay = 0.1,
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  })

  const getVariants = () => {
    const directionOffset = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    }

    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      case 'slide':
        return {
          hidden: { opacity: 0, ...directionOffset[direction] },
          visible: { opacity: 1, x: 0, y: 0 },
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case 'fade-slide':
      default:
        return {
          hidden: { opacity: 0, ...directionOffset[direction] },
          visible: { opacity: 1, x: 0, y: 0 },
        }
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {stagger && Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={variants}
              transition={{
                duration,
                delay: delay + index * staggerDelay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

// Specific animation components for convenience
export function FadeIn({ children, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="fade" {...props}>
      {children}
    </AnimatedSection>
  )
}

export function SlideIn({ children, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="slide" {...props}>
      {children}
    </AnimatedSection>
  )
}

export function ScaleIn({ children, ...props }: Omit<AnimatedSectionProps, 'animation'>) {
  return (
    <AnimatedSection animation="scale" {...props}>
      {children}
    </AnimatedSection>
  )
}
