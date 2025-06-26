'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThermalButton from '@/components/common/ThermalButton'

interface SearchResult {
  title: string
  description: string
  href: string
  type: 'page' | 'service' | 'project'
}

// Mock search data - in a real app this would come from a search API or static index
const searchData: SearchResult[] = [
  {
    title: 'Termografia Industrial',
    description:
      'Diagnósticos térmicos precisos para identificação de problemas em equipamentos industriais',
    href: '/servicos',
    type: 'service',
  },
  {
    title: 'Diagnósticos Elétricos',
    description: 'Análises especializadas em sistemas elétricos industriais e prediais',
    href: '/servicos',
    type: 'service',
  },
  {
    title: 'Sobre a Ôluna Engenharia',
    description: 'Conheça nossa história, missão e equipe especializada em soluções de engenharia',
    href: '/sobre',
    type: 'page',
  },
  {
    title: 'Nossos Projetos',
    description: 'Portfolio completo de projetos realizados e cases de sucesso',
    href: '/projetos',
    type: 'project',
  },
  {
    title: 'Contato',
    description: 'Entre em contato conosco para orçamentos e consultorias',
    href: '/contato',
    type: 'page',
  },
  {
    title: 'Inspeção Termográfica',
    description: 'Serviços especializados de inspeção com câmeras termográficas',
    href: '/servicos',
    type: 'service',
  },
  {
    title: 'Manutenção Preditiva',
    description: 'Técnicas avançadas de manutenção preditiva baseada em termografia',
    href: '/servicos',
    type: 'service',
  },
]

interface SearchWidgetProps {
  placeholder?: string
  maxResults?: number
  onResultClick?: (result: SearchResult) => void
}

export default function SearchWidget({
  placeholder = 'Buscar páginas, serviços, projetos...',
  maxResults = 5,
  onResultClick,
}: SearchWidgetProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Simple search algorithm
  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return searchData
      .filter(
        (item) =>
          item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
      )
      .sort((a, b) => {
        // Prioritize title matches over description matches
        const aInTitle = a.title.toLowerCase().includes(query)
        const bInTitle = b.title.toLowerCase().includes(query)

        if (aInTitle && !bInTitle) return -1
        if (!aInTitle && bInTitle) return 1

        // Then sort by type priority: services, pages, projects
        const typePriority = { service: 0, page: 1, project: 2 }
        return typePriority[a.type] - typePriority[b.type]
      })
      .slice(0, maxResults)
  }

  // Handle search input changes
  useEffect(() => {
    const searchResults = performSearch(query)
    setResults(searchResults)
    setIsOpen(searchResults.length > 0 && query.length > 0)
    setSelectedIndex(-1)
  }, [query, maxResults])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex])
        } else if (results.length > 0) {
          handleResultClick(results[0])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Handle result selection
  const handleResultClick = (result: SearchResult) => {
    setQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)

    // Track search result click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search_result_click', {
        event_category: '404 Page Search',
        event_label: `${result.title} - ${result.type}`,
        custom_parameters: {
          search_query: query,
          result_href: result.href,
          result_type: result.type,
        },
      })
    }

    onResultClick?.(result)
    router.push(result.href)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Track search attempts
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search_attempt', {
        event_category: '404 Page Search',
        event_label: query,
        custom_parameters: {
          search_query: query,
          results_count: results.length,
          has_results: results.length > 0,
        },
      })
    }

    // If there are results, navigate to the first one
    if (results.length > 0) {
      handleResultClick(results[0])
    }
  }

  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        )
      case 'project':
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6"
            />
          </svg>
        )
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
    }
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'service':
        return 'text-heat-orange'
      case 'project':
        return 'text-cool-teal'
      default:
        return 'text-forest-green'
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <label htmlFor="search-404" className="sr-only">
          Buscar páginas e conteúdo do site
        </label>

        <div className="relative">
          <input
            ref={inputRef}
            id="search-404"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-16 text-gray-900 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-owns={isOpen ? 'search-results' : undefined}
            aria-describedby="search-help"
            autoComplete="off"
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Button */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <ThermalButton
              variant="primary"
              size="sm"
              thermalEffect="glow"
              type="submit"
              className="px-3"
              aria-label="Realizar busca"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </ThermalButton>
          </div>
        </div>

        <div id="search-help" className="sr-only">
          Use as setas do teclado para navegar pelos resultados e Enter para selecionar
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden"
          >
            <ul id="search-results" role="listbox" className="py-2">
              {results.map((result, index) => (
                <li
                  key={`${result.href}-${index}`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <button
                    type="button"
                    onClick={() => handleResultClick(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors ${
                      selectedIndex === index ? 'bg-primary-50 border-l-4 border-primary-400' : ''
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 mt-1 ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {result.description}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              result.type === 'service'
                                ? 'bg-heat-orange/10 text-heat-orange'
                                : result.type === 'project'
                                  ? 'bg-cool-teal/10 text-cool-teal'
                                  : 'bg-forest-green/10 text-forest-green'
                            }`}
                          >
                            {result.type === 'service'
                              ? 'Serviço'
                              : result.type === 'project'
                                ? 'Projeto'
                                : 'Página'}
                          </span>
                          <span className="text-xs text-gray-400">{result.href}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {query && results.length === 0 && (
              <div className="px-4 py-6 text-center text-gray-500">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-sm">Nenhum resultado encontrado para &ldquo;{query}&rdquo;</p>
                <p className="text-xs mt-1">
                  Tente termos como &ldquo;termografia&rdquo;, &ldquo;diagnóstico&rdquo; ou &ldquo;contato&rdquo;
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
