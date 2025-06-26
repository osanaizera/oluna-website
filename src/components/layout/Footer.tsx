export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="bg-gray-900 text-white relative overflow-hidden">
      {/* Thermal Background for Footer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="footerThermal1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--heat-orange)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--cool-teal)" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="footerThermal2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--cool-teal)" stopOpacity="0.2" />
                <stop offset="50%" stopColor="var(--heat-red)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--heat-orange)" stopOpacity="0.1" />
              </linearGradient>
              <filter id="footerGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Thermal waves in footer */}
            <path
              d="M0,50 Q300,20 600,50 T1200,50 L1200,150 Q900,120 600,150 T0,150 Z"
              fill="url(#footerThermal1)"
              filter="url(#footerGlow)"
              className="animate-pulse"
              style={{ animationDuration: '10s' }}
            />

            <path
              d="M0,250 Q400,220 800,250 T1200,250 L1200,400 L0,400 Z"
              fill="url(#footerThermal2)"
              filter="url(#footerGlow)"
              className="animate-pulse"
              style={{ animationDuration: '12s', animationDelay: '2s' }}
            />

            {/* Thermal dots pattern */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={150 + i * 130}
                cy={150 + (i % 2) * 80}
                r="2"
                fill="var(--heat-orange)"
                opacity="0.3"
                className="animate-pulse"
                style={{
                  animationDuration: `${4 + (i % 3)}s`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Seção principal do footer */}
      <div className="container mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-500 rounded-xl flex items-center justify-center mr-3 relative overflow-hidden group">
                {/* Thermal effect in footer logo */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 40 40">
                    <defs>
                      <radialGradient id="footerLogoThermal" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle
                      cx="20"
                      cy="20"
                      r="15"
                      fill="url(#footerLogoThermal)"
                      className="animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />
                  </svg>
                </div>
                <span className="text-white font-bold text-xl relative z-10">Ô</span>
              </div>
              <span className="text-xl font-display font-semibold">Ôluna Engenharia</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Engenheiros apaixonados por descobrir o invisível e transformar dados em ações.
              Especialistas em termografia e diagnósticos elétricos.
            </p>

            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 max-w-sm">
              <div className="text-center group">
                <div className="text-2xl font-bold text-primary-400 transition-all duration-300 group-hover:scale-110 relative">
                  30%
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-primary-400/30 to-accent-500/30 rounded-md transition-opacity duration-300 -m-1"></div>
                </div>
                <div className="text-xs text-gray-400">↓ Downtime</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-accent-500 transition-all duration-300 group-hover:scale-110 relative">
                  12%
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-accent-500/30 to-secondary-500/30 rounded-md transition-opacity duration-300 -m-1"></div>
                </div>
                <div className="text-xs text-gray-400">Economia</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold text-secondary-500 transition-all duration-300 group-hover:scale-110 relative">
                  4-6
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-secondary-500/30 to-primary-400/30 rounded-md transition-opacity duration-300 -m-1"></div>
                </div>
                <div className="text-xs text-gray-400">Meses ROI</div>
              </div>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="#servicos"
                  className="hover:text-primary-400 transition-all duration-300 relative group block py-1"
                >
                  Termografia Industrial
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="hover:text-primary-400 transition-all duration-300 relative group block py-1"
                >
                  Diagnóstico Energético
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="hover:text-primary-400 transition-all duration-300 relative group block py-1"
                >
                  Laudos NR-10/12
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="hover:text-primary-400 transition-all duration-300 relative group block py-1"
                >
                  Monitoramento Contínuo
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
              <li>
                <a
                  href="#servicos"
                  className="hover:text-primary-400 transition-all duration-300 relative group block py-1"
                >
                  Consultoria Energética
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-primary-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-sm">(21) 97349-8376</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-primary-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-sm">contato@oluna.com.br</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-primary-400 mt-0.5">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">
                  Leme - Rio de Janeiro, RJ
                  <br />
                  Atendimento em todo Brasil
                </span>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/5521973498376?text=Olá! Gostaria de saber mais sobre os serviços da Ôluna Engenharia. Pode me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 relative overflow-hidden group hover:scale-105 hover:shadow-lg"
            >
              {/* Thermal animation in WhatsApp button */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="w-full h-full bg-gradient-to-r from-white/30 via-transparent to-white/30 -skew-x-12 animate-pulse"></div>
              </div>
              <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.685" />
              </svg>
              <span className="relative z-10">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>© {currentYear} Ôluna Engenharia. Todos os direitos reservados.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span>Engenheiros CRE A Certificados</span>
              <div className="flex items-center gap-2 group">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse relative">
                  {/* Thermal ping effect for online status */}
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-30"></div>
                  <div
                    className="absolute inset-0 bg-green-300 rounded-full animate-ping opacity-20"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
                <span className="group-hover:text-green-400 transition-colors">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
