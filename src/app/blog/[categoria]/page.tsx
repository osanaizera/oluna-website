import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  getPostsByCategory, 
  getCategoriesWithCounts, 
  blogCategories 
} from '@/lib/blog/posts'
import { 
  generateCategoryMetadata, 
  generateCategoryStructuredData 
} from '@/lib/blog/seo'
import { PostCard } from '@/components/blog/PostCard'
import { cn } from '@/utils/cn'

interface CategoryPageProps {
  params: {
    categoria: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = blogCategories.find(cat => cat.slug === params.categoria)
  
  if (!category) {
    return {
      title: 'Categoria não encontrada',
    }
  }

  return generateCategoryMetadata(category)
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    categoria: category.slug,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = blogCategories.find(cat => cat.slug === params.categoria)
  
  if (!category) {
    notFound()
  }

  const posts = getPostsByCategory(params.categoria)
  const allCategories = getCategoriesWithCounts()
  const structuredData = generateCategoryStructuredData(category, posts)

  // Icon component (same as CategoryCard)
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

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className={cn(
          "relative py-24 overflow-hidden",
          "bg-gradient-to-br",
          category.color
        )}>
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-8" aria-label="Breadcrumb">
                <ol className="flex items-center justify-center space-x-2 text-sm text-white/80">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Início
                    </Link>
                  </li>
                  <li className="text-white/60">/</li>
                  <li>
                    <Link href="/blog" className="hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li className="text-white/60">/</li>
                  <li className="text-white font-medium" aria-current="page">
                    {category.name}
                  </li>
                </ol>
              </nav>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 text-white/90">
                {getIcon(category.icon)}
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                {category.name}
              </h1>

              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {category.description}
              </p>

              {/* Stats */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="text-white font-medium">
                  {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'} publicados
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">📝</div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    Em breve, novos artigos
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Estamos preparando conteúdos incríveis sobre {category.name.toLowerCase()}. 
                    Volte em breve!
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Ver outros artigos
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Explore Outras Categorias
                </h2>
                <p className="text-xl text-gray-600">
                  Descubra mais conteúdos técnicos em outras áreas da engenharia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCategories
                  .filter(cat => cat.slug !== category.slug && cat.postCount > 0)
                  .map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/blog/${cat.slug}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className={cn(
                          'absolute inset-0 bg-gradient-to-br opacity-90',
                          cat.color
                        )} />
                        
                        <div className="relative p-6 text-white">
                          <div className="w-8 h-8 mb-3 opacity-90">
                            {getIcon(cat.icon)}
                          </div>
                          
                          <h3 className="text-lg font-display font-bold mb-2">
                            {cat.name}
                          </h3>
                          
                          <p className="text-white/90 text-sm mb-3">
                            {cat.postCount} {cat.postCount === 1 ? 'artigo' : 'artigos'}
                          </p>
                          
                          <div className="flex items-center text-sm font-medium">
                            Ver categoria
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
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}