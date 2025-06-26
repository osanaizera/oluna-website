'use client'

import { useEffect, useState } from 'react'

export default function DashboardDemo() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // KPIs que serão exibidos no dashboard
  const kpiData = [
    {
      title: 'Pontos Críticos',
      value: '12',
      change: '-40%',
      trend: 'down',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Eficiência Energética',
      value: '94.2%',
      change: '+8.5%',
      trend: 'up',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Temperatura Média',
      value: '42.8°C',
      change: '-2.1°C',
      trend: 'down',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Economia Estimada',
      value: 'R$ 18.5k',
      change: '+12%',
      trend: 'up',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Conformidade NR-10',
      value: '100%',
      change: '0%',
      trend: 'stable',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ]

  // Simulação de dados do gráfico termográfico
  const thermalData = [
    { time: '00:00', temp: 38.2, status: 'normal' },
    { time: '04:00', temp: 42.1, status: 'warning' },
    { time: '08:00', temp: 45.8, status: 'critical' },
    { time: '12:00', temp: 43.2, status: 'warning' },
    { time: '16:00', temp: 39.5, status: 'normal' },
    { time: '20:00', temp: 37.8, status: 'normal' },
  ]

  // Loop de 10 segundos
  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 3300) // ~10s / 3 slides

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
    >
      {/* Mockup do Notebook */}
      <div className="relative mx-auto max-w-4xl">
        {/* Base do laptop */}
        <div className="relative bg-gray-800 rounded-t-2xl p-1 shadow-2xl">
          {/* Webcam */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full"></div>

          {/* Tela */}
          <div className="bg-gray-900 rounded-xl p-6 min-h-[400px] relative overflow-hidden">
            {/* Header do Dashboard */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Ô</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ôluna Dashboard</h3>
                  <p className="text-gray-400 text-xs">
                    Relatório Termográfico - Shopping Boulevard
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Conteúdo do Dashboard - Slides */}
            <div className="relative h-80 overflow-hidden">
              {/* Slide 1: KPIs Overview */}
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  currentSlide === 0 ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <h4 className="text-white font-medium mb-4">Indicadores Principais</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {kpiData.map((kpi, index) => (
                    <div
                      key={index}
                      className={`${kpi.bgColor} rounded-lg p-4 transform transition-all duration-500`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 text-xs font-medium">{kpi.title}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            kpi.trend === 'up'
                              ? 'bg-green-400'
                              : kpi.trend === 'down'
                                ? 'bg-red-400'
                                : 'bg-gray-400'
                          } animate-pulse`}
                        ></div>
                      </div>
                      <div className="flex items-end gap-2">
                        <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
                        <span className={`text-xs ${kpi.color} font-medium`}>{kpi.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slide 2: Gráfico Termográfico */}
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  currentSlide === 1
                    ? 'translate-x-0'
                    : currentSlide === 0
                      ? 'translate-x-full'
                      : '-translate-x-full'
                }`}
              >
                <h4 className="text-white font-medium mb-4">Análise Termográfica - Últimas 24h</h4>
                <div className="bg-gray-800 rounded-lg p-4 h-64">
                  {/* Simulação de gráfico */}
                  <div className="relative h-full flex items-end justify-between gap-2">
                    {thermalData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center gap-2 flex-1">
                        {/* Barra do gráfico */}
                        <div
                          className={`w-full rounded-t transition-all duration-1000 ${
                            data.status === 'critical'
                              ? 'bg-red-500'
                              : data.status === 'warning'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`}
                          style={{
                            height: `${(data.temp - 30) * 8}px`,
                            animationDelay: `${index * 200}ms`,
                          }}
                        >
                          {/* Valor da temperatura */}
                          <div className="text-white text-xs font-bold text-center pt-1">
                            {data.temp}°C
                          </div>
                        </div>
                        {/* Horário */}
                        <span className="text-gray-400 text-xs">{data.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide 3: Mapa de Calor */}
              <div
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  currentSlide === 2 ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <h4 className="text-white font-medium mb-4">Mapa de Calor - Painel Principal</h4>
                <div className="bg-gray-800 rounded-lg p-4 h-64 relative overflow-hidden">
                  {/* Simulação de imagem termográfica */}
                  <div className="w-full h-full relative bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 rounded">
                    {/* Hot spots animados */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-6 h-6 rounded-full animate-pulse"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${30 + (i % 3) * 20}%`,
                          background:
                            i % 3 === 0
                              ? 'radial-gradient(circle, var(--heat-orange) 0%, transparent 70%)'
                              : i % 3 === 1
                                ? 'radial-gradient(circle, var(--heat-red) 0%, transparent 70%)'
                                : 'radial-gradient(circle, var(--cool-teal) 0%, transparent 70%)',
                          animationDelay: `${i * 300}ms`,
                          animationDuration: `${2 + (i % 2)}s`,
                        }}
                      />
                    ))}

                    {/* Overlay com informações */}
                    <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1">
                      <span className="text-white text-xs">Temp. Max: 67.3°C</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1">
                      <span className="text-white text-xs">Crítico: CCM-A3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores de slide */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-primary-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Base do laptop */}
        <div className="bg-gray-700 rounded-b-3xl h-4 shadow-xl"></div>
        <div className="bg-gray-600 rounded-b-2xl h-1 mx-8 shadow-lg"></div>
      </div>

      {/* Reflexo da tela */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-t-2xl pointer-events-none"></div>
    </div>
  )
}
