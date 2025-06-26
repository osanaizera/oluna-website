'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { useAnnouncer } from '@/hooks/useAnnouncer'
import ScreenReaderOnly from '@/components/common/ScreenReaderOnly'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null)
  const [focusedNavIndex, setFocusedNavIndex] = useState<number>(-1)
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const { announcePolite, announceAssertive } = useAnnouncer()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string, itemLabel?: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 64 // h-16 = 64px
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      // Announce navigation to screen readers
      if (itemLabel) {
        announcePolite(`Navegando para ${itemLabel}`)
      }
      
      // Focus the target section for screen readers
      setTimeout(() => {
        element.focus()
        element.scrollIntoView()
      }, 300)
    }
    
    setIsMobileMenuOpen(false)
    setActiveNavItem(sectionId)
  }

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    
    // Announce menu state to screen readers
    announcePolite(newState ? 'Menu principal aberto' : 'Menu principal fechado')
    
    // Manage focus when menu closes
    if (!newState && mobileMenuButtonRef.current) {
      mobileMenuButtonRef.current.focus()
    }
  }

  const navItems = [
    { id: 'home', label: 'Início', target: 'hero' },
    { id: 'servicos', label: 'Serviços', target: 'servicos' },
    { id: 'sobre', label: 'Sobre', target: 'sobre' },
    { id: 'cases', label: 'Cases', target: 'cases' },
    { id: 'contato', label: 'Contato', target: 'contato' }
  ]

  // Keyboard navigation for menu items
  const handleNavKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        const nextIndex = (index + 1) % navItems.length
        setFocusedNavIndex(nextIndex)
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        const prevIndex = (index - 1 + navItems.length) % navItems.length
        setFocusedNavIndex(prevIndex)
        break
      case 'Home':
        event.preventDefault()
        setFocusedNavIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusedNavIndex(navItems.length - 1)
        break
      case 'Escape':
        if (isMobileMenuOpen) {
          event.preventDefault()
          toggleMobileMenu()
        }
        break
    }
  }

  return (
    <>
      <motion.header 
        ref={headerRef}
        role="banner"
        aria-label="Cabeçalho principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-100' 
            : 'bg-gray-900/90 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
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
            <motion.button 
              type="button"
              className="flex items-center cursor-pointer group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg p-2"
              onClick={() => scrollToSection('hero', 'página inicial')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Ôluna Engenharia - Voltar ao início"
            >
              <motion.div 
                className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center mr-3 shadow-sm"
                whileHover={{ rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span className="text-white font-bold text-lg">Ô</span>
              </motion.div>
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
            </motion.button>

            {/* Desktop Navigation */}
            <nav 
              id="nav-menu"
              className="hidden lg:flex items-center space-x-1"
              role="navigation"
              aria-label="Menu principal"
            >
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.target, item.label)}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 relative group rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50' 
                      : 'text-white/95 hover:text-white hover:bg-white/10 drop-shadow-sm'
                  } ${activeNavItem === item.target ? 'bg-primary-50 text-primary-600' : ''}`}
                  aria-label={`Navegar para ${item.label}`}
                  aria-current={activeNavItem === item.target ? 'page' : undefined}
                >
                  {item.label}
                  {/* Active indicator */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: 32 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden lg:flex items-center">
              <motion.button 
                type="button"
                onClick={() => scrollToSection('contato', 'seção de contato')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label="Falar com especialista - Ir para contato"
              >
                Falar com Especialista
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="lg:hidden p-2 rounded-md transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-lg overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              role="navigation"
              aria-label="Menu principal móvel"
            >
          <nav className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.target, item.label)}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  className="block w-full text-left text-gray-700 font-medium py-3 px-4 rounded-lg hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label={`Navegar para ${item.label}`}
                  role="menuitem"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <motion.button 
                  type="button"
                  onClick={() => scrollToSection('contato', 'seção de contato')}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Falar com especialista - Ir para contato"
                  role="menuitem"
                >
                  Falar com Especialista
                </motion.button>
              </div>
            </div>
          </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer para compensar header fixo */}
      <div className="h-16"></div>
    </>
  )
}