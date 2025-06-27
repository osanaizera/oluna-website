'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BlogPost } from '@/lib/blog/posts'
import { cn } from '@/utils/cn'

interface PostCardProps {
  post: BlogPost
  featured?: boolean
  index?: number
}

export function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  }

  return (
    <motion.article
      className={cn(
        'group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300',
        featured && 'lg:col-span-2 lg:row-span-2'
      )}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover="hover"
    >
      <Link href={`/blog/${post.category}/${post.slug}`} className="block">
        {/* Image */}
        <div className={cn('relative overflow-hidden', featured ? 'h-64 lg:h-80' : 'h-48')}>
          <motion.div variants={imageVariants} className="w-full h-full">
            <Image
              src={post.image || '/blog/default-post.jpg'}
              alt={post.title}
              fill
              className="object-cover"
              sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          </motion.div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-900">
              {post.category.replace('-', ' ')}
            </span>
          </div>

          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-red-500 text-white">
                Destaque
              </span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className={cn('p-6', featured && 'lg:p-8')}>
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <time dateTime={post.publishDate}>
              {formatDate(post.publishDate)}
            </time>
            <span>•</span>
            <span>{post.readingTime} min de leitura</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          {/* Title */}
          <h2 className={cn(
            'font-display font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors',
            featured ? 'text-2xl lg:text-3xl' : 'text-xl'
          )}>
            {post.title}
          </h2>

          {/* Description */}
          <p className={cn(
            'text-gray-600 leading-relaxed mb-4',
            featured ? 'text-base lg:text-lg' : 'text-sm'
          )}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-orange-600 group-hover:text-orange-700">
            Ler artigo
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
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
      </Link>
    </motion.article>
  )
}