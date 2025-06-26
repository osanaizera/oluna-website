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
        behavior: 'smooth',
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
    { id: 'contato', label: 'Contato', target: 'contato' },
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
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div
            className={`w-full h-full transition-all duration-300 ${
              isScrolled
                ? 'bg-gradient-to-r from-primary-400/5 via-accent-500/3 to-secondary-500/5'
                : 'bg-gradient-to-r from-primary-400/10 via-accent-500/8 to-secondary-500/10'
            }`}
          ></div>
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
                <span
                  className={`text-lg font-display font-semibold leading-tight transition-colors duration-200 ${
                    isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md'
                  }`}
                >
                  Ôluna Engenharia
                </span>
                <span
                  className={`text-xs font-medium leading-none transition-colors duration-200 ${
                    isScrolled ? 'text-gray-500' : 'text-white/90 drop-shadow-sm'
                  }`}
                >
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
            <div className="hidden lg:block relative z-30">
              <a
                href="https://wa.me/5521973498376?text=Olá%21%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20Ôluna%20Engenharia."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 cursor-pointer"
                style={{ 
                  position: 'relative', 
                  zIndex: 50, 
                  pointerEvents: 'auto',
                  textDecoration: 'none'
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Falar no WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              type="button"
              className="lg:hidden p-2 rounded-md transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Fechar menu principal' : 'Abrir menu principal'}
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
                    <a
                      href="https://wa.me/5521973498376?text=Olá!%20Gostaria%20de%20falar%20com%20um%20especialista%20da%20Ôluna%20Engenharia."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                      aria-label="Falar com especialista via WhatsApp"
                      role="menuitem"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      Falar no WhatsApp
                    </a>
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
