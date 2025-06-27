import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { generateSlug, generateMetaDescription } from '@/utils/seo'

export interface BlogPost {
  slug: string
  title: string
  description: string
  content: string
  category: string
  tags: string[]
  author: string
  publishDate: string
  modifiedDate?: string
  featured: boolean
  image?: string
  readingTime: number
  excerpt: string
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
  color: string
  icon: string
  postCount: number
}

export interface BlogTag {
  slug: string
  name: string
  postCount: number
}

// Blog categories configuration
export const blogCategories: BlogCategory[] = [
  {
    slug: 'termografia',
    name: 'Termografia Industrial',
    description: 'Tudo sobre termografia industrial, equipamentos e aplicações práticas',
    color: 'from-orange-500 to-red-500',
    icon: 'thermometer',
    postCount: 0
  },
  {
    slug: 'manutencao-preditiva',
    name: 'Manutenção Preditiva',
    description: 'Estratégias e benefícios da manutenção preditiva para sua empresa',
    color: 'from-blue-500 to-cyan-500',
    icon: 'activity',
    postCount: 0
  },
  {
    slug: 'eficiencia-energetica',
    name: 'Eficiência Energética',
    description: 'Dicas e soluções para reduzir custos e aumentar eficiência energética',
    color: 'from-green-500 to-emerald-500',
    icon: 'lightbulb',
    postCount: 0
  },
  {
    slug: 'seguranca-eletrica',
    name: 'Segurança Elétrica',
    description: 'Normas, compliance e boas práticas em segurança elétrica',
    color: 'from-yellow-500 to-orange-500',
    icon: 'shield',
    postCount: 0
  },
  {
    slug: 'cases',
    name: 'Cases e Projetos',
    description: 'Estudos de caso reais e resultados obtidos em projetos',
    color: 'from-purple-500 to-pink-500',
    icon: 'clipboard-check',
    postCount: 0
  },
  {
    slug: 'tecnologia',
    name: 'Tecnologia e Inovação',
    description: 'Novidades tecnológicas, IoT e tendências do setor energético',
    color: 'from-indigo-500 to-blue-500',
    icon: 'zap',
    postCount: 0
  }
]

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog')

// Get all post files from the content directory
export function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_PATH)) {
    return []
  }
  
  return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
}

// Get post data from MDX file
export function getPostFromFile(filename: string): BlogPost | null {
  try {
    const filePath = path.join(POSTS_PATH, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Generate slug from filename if not provided
    const slug = data.slug || generateSlug(path.basename(filename, path.extname(filename)))
    
    // Calculate reading time
    const stats = readingTime(content)
    
    // Generate excerpt from content if not provided
    const excerpt = data.excerpt || generateMetaDescription(content, 200)

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || excerpt,
      content,
      category: data.category || 'tecnologia',
      tags: data.tags || [],
      author: data.author || 'Equipe Ôluna',
      publishDate: data.publishDate || data.date || new Date().toISOString(),
      modifiedDate: data.modifiedDate,
      featured: data.featured || false,
      image: data.image,
      readingTime: Math.ceil(stats.minutes),
      excerpt
    }
  } catch (error) {
    console.error(`Error reading post ${filename}:`, error)
    return null
  }
}

// Get all posts
export function getAllPosts(): BlogPost[] {
  const postFiles = getPostFiles()
  const posts = postFiles
    .map(getPostFromFile)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  return posts
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

// Get featured posts
export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().filter((post) => post.featured).slice(0, limit)
}

// Get recent posts
export function getRecentPosts(limit: number = 5): BlogPost[] {
  return getAllPosts().slice(0, limit)
}

// Get post by slug
export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) || null
}

// Get related posts
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts().filter((post) => post.slug !== currentPost.slug)
  
  // Score posts based on similarity
  const scoredPosts = allPosts.map((post) => {
    let score = 0
    
    // Same category gets high score
    if (post.category === currentPost.category) {
      score += 10
    }
    
    // Shared tags get medium score
    const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
    score += sharedTags.length * 3
    
    // Featured posts get slight boost
    if (post.featured) {
      score += 1
    }
    
    return { post, score }
  })
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}

// Get all unique tags
export function getAllTags(): BlogTag[] {
  const allPosts = getAllPosts()
  const tagCounts: Record<string, number> = {}
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({
      slug: generateSlug(tag),
      name: tag,
      postCount: count
    }))
    .sort((a, b) => b.postCount - a.postCount)
}

// Get categories with post counts
export function getCategoriesWithCounts(): BlogCategory[] {
  const allPosts = getAllPosts()
  const categoryCounts: Record<string, number> = {}
  
  allPosts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1
  })
  
  return blogCategories.map((category) => ({
    ...category,
    postCount: categoryCounts[category.slug] || 0
  }))
}

// Search posts
export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    )
  })
}

// Generate blog sitemap data
export function getBlogSitemapData() {
  const allPosts = getAllPosts()
  const categories = getCategoriesWithCounts().filter(cat => cat.postCount > 0)
  const tags = getAllTags()
  
  return {
    posts: allPosts.map((post) => ({
      slug: post.slug,
      category: post.category,
      publishDate: post.publishDate,
      modifiedDate: post.modifiedDate || post.publishDate
    })),
    categories: categories.map((cat) => ({
      slug: cat.slug,
      name: cat.name
    })),
    tags: tags.map((tag) => ({
      slug: tag.slug,
      name: tag.name
    }))
  }
}