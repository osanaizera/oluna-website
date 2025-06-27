import { Metadata } from 'next'
import { BlogPost, BlogCategory } from './posts'
import { generateArticleSchema } from '@/lib/seo'
import { seoConfig } from '@/lib/seo'

// Generate SEO metadata for blog post
export function generateBlogPostMetadata(post: BlogPost): Metadata {
  const { company } = seoConfig
  const fullTitle = `${post.title} | Blog Ôluna Engenharia`
  const canonicalUrl = `/blog/${post.category}/${post.slug}`
  const imageUrl = post.image || '/blog/default-og.jpg'
  
  return {
    title: fullTitle,
    description: post.description,
    keywords: [
      ...seoConfig.defaults.keywords,
      ...post.tags,
      post.category,
      'blog engenharia',
      'artigos técnicos',
      'dicas energia'
    ],
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${company.url}${canonicalUrl}`,
      siteName: seoConfig.defaults.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.modifiedDate || post.publishDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: seoConfig.social.twitter,
    },
    other: {
      'article:author': post.author,
      'article:published_time': post.publishDate,
      'article:modified_time': post.modifiedDate || post.publishDate,
      'article:section': post.category,
      'article:tag': post.tags.join(','),
    }
  }
}

// Generate SEO metadata for blog category page
export function generateCategoryMetadata(
  category: BlogCategory,
  page: number = 1
): Metadata {
  const { company } = seoConfig
  const title = page > 1 
    ? `${category.name} - Página ${page} | Blog Ôluna Engenharia`
    : `${category.name} | Blog Ôluna Engenharia`
  
  const description = `${category.description}. Artigos técnicos sobre ${category.name.toLowerCase()} pela equipe da Ôluna Engenharia.`
  const canonicalUrl = `/blog/${category.slug}${page > 1 ? `?page=${page}` : ''}`
  
  return {
    title,
    description,
    keywords: [
      ...seoConfig.defaults.keywords,
      category.name.toLowerCase(),
      `blog ${category.name.toLowerCase()}`,
      `artigos ${category.name.toLowerCase()}`,
      'dicas técnicas',
      'engenharia elétrica'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: category.name,
      description,
      url: `${company.url}${canonicalUrl}`,
      siteName: seoConfig.defaults.siteName,
      images: [
        {
          url: `/blog/categories/${category.slug}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `Artigos sobre ${category.name}`,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description,
      images: [`/blog/categories/${category.slug}-og.jpg`],
    },
    ...(page > 1 && {
      robots: {
        index: false,
        follow: true,
      }
    })
  }
}

// Generate SEO metadata for blog main page
export function generateBlogMetadata(page: number = 1): Metadata {
  const { company } = seoConfig
  const title = page > 1 
    ? `Blog - Página ${page} | Ôluna Engenharia`
    : 'Blog | Ôluna Engenharia - Artigos sobre Engenharia e Energia'
  
  const description = 'Blog técnico da Ôluna Engenharia com artigos sobre termografia industrial, eficiência energética, manutenção preditiva e segurança elétrica.'
  const canonicalUrl = `/blog${page > 1 ? `?page=${page}` : ''}`
  
  return {
    title,
    description,
    keywords: [
      ...seoConfig.defaults.keywords,
      'blog engenharia',
      'artigos técnicos',
      'dicas energia',
      'termografia blog',
      'manutenção preditiva artigos',
      'eficiência energética dicas',
      'segurança elétrica blog'
    ],
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: 'Blog Ôluna Engenharia',
      description,
      url: `${company.url}${canonicalUrl}`,
      siteName: seoConfig.defaults.siteName,
      images: [
        {
          url: '/blog/blog-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog Ôluna Engenharia',
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog Ôluna Engenharia',
      description,
      images: ['/blog/blog-og.jpg'],
    },
    ...(page > 1 && {
      robots: {
        index: false,
        follow: true,
      }
    })
  }
}

// Generate structured data for blog post
export function generateBlogPostStructuredData(post: BlogPost) {
  const { company } = seoConfig
  
  const article = generateArticleSchema(
    post.title,
    post.description,
    post.publishDate,
    post.modifiedDate || post.publishDate,
    post.author,
    post.image
  )
  
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: company.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${company.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${company.url}/blog/${post.category}/${post.slug}`,
      },
    ],
  }
  
  const readingAction = {
    '@context': 'https://schema.org',
    '@type': 'ReadAction',
    target: `${company.url}/blog/${post.category}/${post.slug}`,
    agent: {
      '@type': 'Person',
      name: 'Reader',
    },
    object: {
      '@id': `${company.url}/blog/${post.category}/${post.slug}#article`,
    },
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': [article, breadcrumb, readingAction],
  }
}

// Generate structured data for blog category page
export function generateCategoryStructuredData(
  category: BlogCategory,
  posts: BlogPost[]
) {
  const { company } = seoConfig
  
  const collectionPage = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} - Blog Ôluna Engenharia`,
    description: category.description,
    url: `${company.url}/blog/${category.slug}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Artigos sobre ${category.name}`,
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          url: `${company.url}/blog/${post.category}/${post.slug}`,
          datePublished: post.publishDate,
          author: {
            '@type': 'Organization',
            name: post.author,
          },
        },
      })),
    },
  }
  
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: company.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${company.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${company.url}/blog/${category.slug}`,
      },
    ],
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': [collectionPage, breadcrumb],
  }
}

// Generate structured data for blog main page
export function generateBlogStructuredData(
  featuredPosts: BlogPost[],
  recentPosts: BlogPost[]
) {
  const { company } = seoConfig
  
  const blog = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${company.url}/blog#blog`,
    name: 'Blog Ôluna Engenharia',
    description: 'Blog técnico sobre engenharia elétrica, termografia industrial e eficiência energética',
    url: `${company.url}/blog`,
    publisher: {
      '@id': `${company.url}#organization`,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Artigos em Destaque',
      numberOfItems: featuredPosts.length,
      itemListElement: featuredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          url: `${company.url}/blog/${post.category}/${post.slug}`,
          datePublished: post.publishDate,
          author: {
            '@type': 'Organization',
            name: post.author,
          },
        },
      })),
    },
  }
  
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: company.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${company.url}/blog`,
      },
    ],
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': [blog, breadcrumb],
  }
}