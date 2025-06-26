'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContactTracking } from '@/hooks/useAnalytics'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { trackWhatsAppClick } = useContactTracking()

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão após rolar 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    // Track analytics
    trackWhatsAppClick('floating_button')

    // Número do WhatsApp da Ôluna (from environment variables)
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5521973498376'
    const defaultMessage =
      process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
      'Olá! Gostaria de saber mais sobre os serviços da Ôluna Engenharia. Pode me ajudar?'

    const message = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0, y: 100 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 100 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          <div className="relative">
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute bottom-full right-0 mb-3"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                    Fale conosco no WhatsApp
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botão WhatsApp Enhanced */}
            <motion.button
              type="button"
              onClick={handleWhatsAppClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
              className="group relative w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
              aria-label="Abrir conversa no WhatsApp para falar com a Ôluna Engenharia"
              whileHover={{
                scale: 1.1,
                backgroundColor: '#16a34a',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                },
              }}
            >
              {/* Thermal animation rings */}
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>
              <div
                className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-15 group-hover:opacity-25"
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-10 group-hover:opacity-20"
                style={{ animationDelay: '1s' }}
              ></div>

              {/* Thermal glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-full animate-pulse"></div>
              </div>

              {/* Ícone WhatsApp */}
              <svg
                className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.685" />
              </svg>

              {/* Enhanced notification badge */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                {/* Thermal ping for notification */}
                <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
