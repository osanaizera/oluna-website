'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ThermalButton from '@/components/common/ThermalButton'
import { Heading, Body } from '@/components/common/Typography'

interface NavigationItem {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  thermal: 'hot' | 'warm' | 'cool'
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Termografia Industrial',
    description: 'Diagnósticos térmicos precisos para sua indústria',
    href: '/servicos',
    thermal: 'hot',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    title: 'Diagnósticos Elétricos',
    description: 'Análises precisas de sistemas elétricos industriais',
    href: '/servicos',
    thermal: 'warm',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: 'Projetos Realizados',
    description: 'Conheça nossos cases de sucesso em engenharia',
    href: '/projetos',
    thermal: 'cool',
    icon: (
      <svg
        className="w-6 h-6"
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
    ),
  },
]

const quickLinks = [
  { title: 'Sobre Nós', href: '/sobre' },
  { title: 'Contato', href: '/contato' },
  { title: 'Orçamento', href: '/contato' },
]

export default function NavigationSuggestions() {
  const getThermalGradient = (thermal: 'hot' | 'warm' | 'cool') => {
    switch (thermal) {
      case 'hot':
        return 'from-heat-orange to-heat-red'
      case 'warm':
        return 'from-heat-red to-accent-500'
      case 'cool':
        return 'from-cool-teal to-secondary-500'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Navigation Cards */}
      <div className="mb-12">
        <Heading as="h2" className="text-center text-graphite mb-8 font-display">
          Explore Nossas Soluções
        </Heading>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navigationItems.map((item, index) => (
            <motion.div key={item.title} variants={itemVariants}>
              <Link href={item.href} className="group block h-full">
                <div className="relative h-full p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group-focus:ring-2 group-focus:ring-primary-400 group-focus:ring-offset-2">
                  {/* Thermal Indicator */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${getThermalGradient(item.thermal)} animate-pulse`}
                    ></div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getThermalGradient(item.thermal)} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-graphite mb-2 font-display group-hover:text-primary-500 transition-colors">
                    {item.title}
                  </h3>
                  <Body className="text-gray-600 text-sm leading-relaxed">{item.description}</Body>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium mr-2">Explorar</span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

                  {/* Thermal Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl transform -skew-x-12"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="text-center">
        <Heading as="h3" className="text-graphite mb-6 font-display text-xl">
          Acesso Rápido
        </Heading>

        <div className="flex flex-wrap justify-center gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Link href={link.href}>
                <ThermalButton
                  variant="ghost"
                  size="sm"
                  thermalEffect="glow"
                  className="hover:bg-primary-50 border border-primary-200"
                >
                  {link.title}
                </ThermalButton>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <motion.div
        className="mt-12 p-6 bg-gradient-to-r from-forest-green/10 to-cool-teal/10 rounded-2xl border border-forest-green/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-forest-green mb-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="font-semibold">Emergência 24h</span>
          </div>
          <Body className="text-gray-600 mb-4">
            Problemas críticos em sistemas elétricos? Nossa equipe está disponível para emergências.
          </Body>
          <a
            href="tel:+5521973498376"
            className="inline-block"
            aria-label="Ligar para emergência da Ôluna Engenharia"
          >
            <ThermalButton
              variant="secondary"
              size="md"
              thermalEffect="pulse"
              className="shadow-lg"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Emergência 24h
              </span>
            </ThermalButton>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
