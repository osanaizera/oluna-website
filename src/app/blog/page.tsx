import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  getAllPosts, 
  getFeaturedPosts, 
  getRecentPosts, 
  getCategoriesWithCounts 
} from '@/lib/blog/posts'
import { 
  generateBlogMetadata, 
  generateBlogStructuredData 
} from '@/lib/blog/seo'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryCard } from '@/components/blog/CategoryCard'

export const metadata: Metadata = generateBlogMetadata()

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts(3)
  const recentPosts = getRecentPosts(6)
  const categories = getCategoriesWithCounts()
  
  const structuredData = generateBlogStructuredData(featuredPosts, recentPosts)

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
        <section className="relative py-24 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(circle at 25% 25%, var(--heat-orange) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, var(--cool-teal) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, var(--heat-red) 0%, transparent 40%)
                `,
              }}
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Blog Técnico</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Conhecimento em{' '}
                <span
                  className="transition-all duration-1000"
                  style={{
                    color: 'var(--heat-orange)',
                    textShadow: '0 0 30px var(--heat-orange)40',
                  }}
                >
                  Energia
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Artigos técnicos, dicas práticas e insights sobre termografia industrial, 
                eficiência energética e manutenção preditiva pela equipe da Ôluna Engenharia.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{recentPosts.length}+</div>
                  <div className="text-gray-300">Artigos Publicados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{categories.length}</div>
                  <div className="text-gray-300">Categorias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-gray-300">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                    Artigos em Destaque
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Nossos melhores conteúdos sobre engenharia elétrica e eficiência energética.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post, index) => (
                    <PostCard
                      key={post.slug}
                      post={post}
                      featured={index === 0}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                  Explore por Categoria
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Encontre artigos específicos sobre os temas que mais interessam para seu negócio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.slug}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-16">
                <div>
                  <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
                    Artigos Recentes
                  </h2>
                  <p className="text-xl text-gray-600">
                    Acompanhe nossas últimas publicações e mantenha-se atualizado.
                  </p>
                </div>
                
                <Link
                  href="/blog/todos"
                  className="hidden sm:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors"
                >
                  Ver todos os artigos
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post, index) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    index={index}
                  />
                ))}
              </div>

              {/* Mobile View All Button */}
              <div className="text-center mt-12 sm:hidden">
                <Link
                  href="/blog/todos"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
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

        {/* Newsletter CTA */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Não Perca Nenhum Artigo
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Cadastre-se e receba nossos melhores conteúdos sobre engenharia e eficiência energética 
                diretamente no seu e-mail.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Cadastrar
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                Sem spam. Apenas conteúdo de qualidade. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}