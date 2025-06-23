'use client'

import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão após rolar 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    // Número do WhatsApp da Ôluna (substitua pelo número real)
    const phoneNumber = '5511999999999' // Formato: código do país + DDD + número
    const message = encodeURIComponent(
      'Olá! Gostaria de saber mais sobre os serviços da Ôluna Engenharia. Pode me ajudar?'
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div className="relative">
        {/* Tooltip */}
        <div 
          className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
            Fale conosco no WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>

        {/* Botão WhatsApp Enhanced */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 overflow-hidden"
          aria-label="Conversar no WhatsApp"
        >
          {/* Thermal animation rings */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-15 group-hover:opacity-25" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-10 group-hover:opacity-20" style={{ animationDelay: '1s' }}></div>
          
          {/* Thermal glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
            <div className="w-full h-full bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-full animate-pulse"></div>
          </div>
          
          {/* Ícone WhatsApp */}
          <svg 
            className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.685"/>
          </svg>

          {/* Enhanced notification badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {/* Thermal ping for notification */}
            <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
          </div>
        </button>
      </div>
    </div>
  )
}