'use client'

import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // h-16 = 64px
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Início', target: 'hero' },
    { id: 'servicos', label: 'Serviços', target: 'servicos' },
    { id: 'sobre', label: 'Sobre', target: 'sobre' },
    { id: 'cases', label: 'Cases', target: 'cases' },
    { id: 'contato', label: 'Contato', target: 'contato' }
  ]

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-100' 
            : 'bg-gray-900/90 backdrop-blur-md'
        }`}
      >
        {/* Subtle Thermal Enhancement */}
        <div className="absolute inset-0 opacity-3">
          <div className={`w-full h-full transition-all duration-300 ${
            isScrolled
              ? 'bg-gradient-to-r from-primary-400/5 via-accent-500/3 to-secondary-500/5'
              : 'bg-gradient-to-r from-primary-400/10 via-accent-500/8 to-secondary-500/10'
          }`}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group relative"
              onClick={() => scrollToSection('hero')}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <span className="text-white font-bold text-lg">Ô</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg font-display font-semibold leading-tight transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md'
                }`}>
                  Ôluna Engenharia
                </span>
                <span className={`text-xs font-medium leading-none transition-colors duration-200 ${
                  isScrolled ? 'text-gray-500' : 'text-white/90 drop-shadow-sm'
                }`}>
                  Termografia & Diagnósticos
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.target)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-md ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50' 
                      : 'text-white/95 hover:text-white hover:bg-white/10 drop-shadow-sm'
                  }`}
                >
                  {item.label}
                  {/* Active indicator */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-8 transition-all duration-200"></div>
                </button>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => scrollToSection('contato')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
              >
                Falar com Especialista
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md transition-colors duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span 
                  className={`absolute top-0 left-0 w-full h-0.5 transform transition-all duration-200 ${
                    isMobileMenuOpen ? 'rotate-45 top-2.5' : ''
                  } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}
                />
                <span 
                  className={`absolute top-2.5 left-0 w-full h-0.5 transition-all duration-200 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}
                />
                <span 
                  className={`absolute top-5 left-0 w-full h-0.5 transform transition-all duration-200 ${
                    isMobileMenuOpen ? '-rotate-45 top-2.5' : ''
                  } ${isScrolled ? 'bg-gray-900' : 'bg-white'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200 transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden shadow-lg`}
        >
          <nav className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.target)}
                  className="block w-full text-left text-gray-700 font-medium py-3 px-4 rounded-lg hover:text-primary-600 hover:bg-gray-50 transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
                >
                  Falar com Especialista
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer para compensar header fixo */}
      <div className="h-16"></div>
    </>
  )
}