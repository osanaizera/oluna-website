'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BlogCategory } from '@/lib/blog/posts'
import { cn } from '@/utils/cn'

// Icon components (simplified for now)
const getIcon = (iconName: string) => {
  const iconProps = {
    className: "w-full h-full",
    fill: "currentColor",
    viewBox: "0 0 24 24"
  }

  switch (iconName) {
    case 'thermometer':
      return (
        <svg {...iconProps}>
          <path d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 0 0 10 0c0-.55-.45-1-1-1s-1 .45-1 1a3 3 0 0 1-6 0c0-.55-.45-1-1-1s-1 .45-1 1z"/>
          <circle cx="12" cy="16" r="1"/>
        </svg>
      )
    case 'activity':
      return (
        <svg {...iconProps}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    case 'lightbulb':
      return (
        <svg {...iconProps}>
          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1z"/>
          <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"/>
        </svg>
      )
    case 'shield':
      return (
        <svg {...iconProps}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    case 'clipboard-check':
      return (
        <svg {...iconProps}>
          <rect x="9" y="2" width="6" height="3" rx="2" ry="2"/>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      )
    case 'zap':
      return (
        <svg {...iconProps}>
          <path d="M13 3L4 14h6l-2 7 9-11h-6l2-7z"/>
        </svg>
      )
    default:
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      )
  }
}

interface CategoryCardProps {
  category: BlogCategory
  index?: number
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      className="group"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/blog/${category.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
          {/* Gradient Background */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-90',
            category.color
          )} />
          
          {/* Content */}
          <div className="relative p-6 text-white">
            {/* Icon */}
            <div className="w-12 h-12 mb-4 opacity-90">
              {getIcon(category.icon)}
            </div>
            
            {/* Category Info */}
            <h3 className="text-xl font-display font-bold mb-2">
              {category.name}
            </h3>
            
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              {category.description}
            </p>
            
            {/* Post Count */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {category.postCount} {category.postCount === 1 ? 'artigo' : 'artigos'}
              </span>
              
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
          
          {/* Hover Effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  )
}