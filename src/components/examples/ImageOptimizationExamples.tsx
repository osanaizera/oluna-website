'use client'

/**
 * Example implementations showing how to use the optimized image components
 * in the Ôluna Engenharia website
 */

import {
  OptimizedImage,
  ResponsiveImage,
  HeroImage,
  LogoImage,
  ThermalImage,
  ImageSkeleton,
} from '@/components/common'

export function HeroSectionExample() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Hero background with thermal overlay */}
      <HeroImage
        src="/images/hero-electrical-panel.jpg"
        alt="Ôluna Engenharia - Análise termográfica de painéis elétricos"
        width={1920}
        height={1080}
        priority={true}
        overlayEffect="thermal"
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 container mx-auto px-6 text-white">
        <h1 className="text-6xl font-bold mb-6">Veja o Invisível Antes da Falha</h1>
        <p className="text-xl mb-8">Transformamos dados termográficos em ações preventivas</p>
      </div>
    </section>
  )
}

export function CaseStudyCardExample() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Thermal image with interactive hot spots */}
      <ThermalImage
        src="/images/case-hotel-panel.jpg"
        alt="Case Study - Hotel Resort Cabo Frio - Painel de 500kVA"
        aspectRatio="16/9"
        thermalEffect="scan"
        hotSpots={[
          { x: 25, y: 30, intensity: 'high', temp: '67.3°C' },
          { x: 60, y: 45, intensity: 'medium', temp: '52.1°C' },
          { x: 80, y: 60, intensity: 'low', temp: '38.7°C' },
        ]}
        className="w-full"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Hotel Resort - Cabo Frio</h3>
        <p className="text-gray-600 mb-4">
          Inspeção termográfica identificou 8 pontos críticos em subestação de 500kVA
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Economia: R$ 45.000</span>
          <span>Downtime evitado: 72h</span>
        </div>
      </div>
    </div>
  )
}

export function ServiceCardExample() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        {/* Service icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center">
          <span className="text-white text-2xl">🔥</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Termografia Industrial</h3>
          <p className="text-gray-600">Detecte problemas antes que aconteçam</p>
        </div>
      </div>

      {/* Responsive equipment image */}
      <ResponsiveImage
        src="/images/thermal-equipment.jpg"
        alt="Equipamento de termografia industrial - Câmera FLIR"
        aspectRatio="4/3"
        className="mb-4"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />

      <p className="text-gray-700 mb-4">
        Inspeção termográfica com câmeras calibradas para identificar pontos quentes e conexões
        soltas.
      </p>

      <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors">
        Solicitar Orçamento
      </button>
    </div>
  )
}

export function HeaderLogoExample() {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Optimized logo with dark mode support */}
        <LogoImage
          src="/images/logo-oluna-light.png"
          darkModeSrc="/images/logo-oluna-dark.png"
          alt="Ôluna Engenharia - Termografia Industrial"
          width={140}
          height={45}
          priority={true}
        />

        <nav className="hidden md:flex space-x-8">
          <a href="#servicos" className="text-gray-700 hover:text-primary-600">
            Serviços
          </a>
          <a href="#sobre" className="text-gray-700 hover:text-primary-600">
            Sobre
          </a>
          <a href="#contato" className="text-gray-700 hover:text-primary-600">
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}

export function TeamPhotoExample() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Nossa Equipe de Engenheiros</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div key={member} className="text-center">
              {/* Team member photo with optimized loading */}
              <OptimizedImage
                src={`/images/team-member-${member}.jpg`}
                alt={`Engenheiro CRE A - Membro da equipe ${member}`}
                width={300}
                height={300}
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                sizes="(max-width: 768px) 200px, 300px"
                quality={90}
              />

              <h3 className="text-xl font-semibold mb-2">Eng. João Silva</h3>
              <p className="text-gray-600 mb-2">CRE A - 123456</p>
              <p className="text-sm text-gray-500">15+ anos em termografia industrial</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function LoadingStateExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Show loading skeletons while images load */}
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-xl overflow-hidden shadow-lg">
          <ImageSkeleton
            className="w-full h-48"
            thermalEffect={item % 2 === 0} // Alternate thermal effect
            rounded={false}
          />

          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function GalleryExample() {
  const projects = [
    {
      id: 1,
      title: 'Shopping Center Rio',
      image: '/images/project-shopping.jpg',
      thermal: '/images/project-shopping-thermal.jpg',
      description: 'Análise completa de sistema elétrico',
    },
    {
      id: 2,
      title: 'Hotel Resort Búzios',
      image: '/images/project-hotel.jpg',
      thermal: '/images/project-hotel-thermal.jpg',
      description: 'Termografia de subestação 1MVA',
    },
    {
      id: 3,
      title: 'Condomínio Empresarial',
      image: '/images/project-condo.jpg',
      thermal: '/images/project-condo-thermal.jpg',
      description: 'Qualidade de energia e harmônicas',
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Galeria de Projetos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {/* Interactive thermal image */}
              <ThermalImage
                src={project.image}
                alt={`Projeto ${project.title} - Análise termográfica`}
                aspectRatio="4/3"
                thermalEffect="reveal"
                className="mb-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />

              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main example component showcasing all implementations
export default function ImageOptimizationExamples() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSectionExample />
      <ServiceCardExample />
      <CaseStudyCardExample />
      <TeamPhotoExample />
      <GalleryExample />
      <LoadingStateExample />
    </div>
  )
}
