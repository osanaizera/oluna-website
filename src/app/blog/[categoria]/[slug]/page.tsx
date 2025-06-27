import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts,
  blogCategories 
} from '@/lib/blog/posts'
import { 
  generateBlogPostMetadata, 
  generateBlogPostStructuredData 
} from '@/lib/blog/seo'
import { PostCard } from '@/components/blog/PostCard'
import { formatDate } from '@/utils/format'
import { cn } from '@/utils/cn'

interface BlogPostPageProps {
  params: {
    categoria: string
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return generateBlogPostMetadata(post)
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map((post) => ({
    categoria: post.category,
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const category = blogCategories.find(cat => cat.slug === post.category)
  const relatedPosts = getRelatedPosts(post)
  const structuredData = generateBlogPostStructuredData(post)

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                  <li>
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                      Início
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li>
                    <Link href="/blog" className="hover:text-primary-600 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li>
                    <Link 
                      href={`/blog/${post.category}`} 
                      className="hover:text-primary-600 transition-colors"
                    >
                      {category?.name}
                    </Link>
                  </li>
                  <li className="text-gray-400">/</li>
                  <li className="text-gray-500 font-medium" aria-current="page">
                    {post.title}
                  </li>
                </ol>
              </nav>

              {/* Category Badge */}
              {category && (
                <Link 
                  href={`/blog/${category.slug}`}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium text-sm mb-6 transition-all duration-300 hover:shadow-lg',
                    'bg-gradient-to-r',
                    category.color
                  )}
                >
                  {category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H9V3H12.5L15.5 6H21V9H21ZM21 19H3V17H21V19Z"/>
                  </svg>
                  <span>{post.author}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM15 10H17V12H15V10Z"/>
                  </svg>
                  <time dateTime={post.publishDate}>
                    {formatDate(post.publishDate)}
                  </time>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                  <span>{post.readingTime} min de leitura</span>
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg prose-gray max-w-none">
                <MDXRemote source={post.content} />
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                    Artigos Relacionados
                  </h2>
                  <p className="text-xl text-gray-600">
                    Continue explorando conteúdos técnicos em engenharia.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                    <PostCard
                      key={relatedPost.slug}
                      post={relatedPost}
                      index={index}
                    />
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Ver todos os artigos
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Precisa de Consultoria Especializada?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Nossa equipe de engenheiros está pronta para ajudar sua empresa com soluções técnicas personalizadas.
              </p>
              <a
                href="https://wa.me/5521973498376?text=Olá!%20Li%20o%20artigo%20sobre%20{post.title.replace(/ /g, '%20')}%20e%20gostaria%20de%20uma%20consultoria."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}