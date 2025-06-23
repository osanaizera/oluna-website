interface IconProps {
  className?: string
  size?: number
}

// Ícone de Termografia - Sensor de calor minimalista
export const ThermographyIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M12 2v20M8 6h8M8 10h8M8 14h8M8 18h8" />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.2" />
    <path d="M16 4v16a2 2 0 01-2 2H10a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2z" />
  </svg>
)

// Ícone de Diagnóstico Energético - Raio com medidor
export const EnergyDiagnosticIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M18 4v4M16 6h4" strokeWidth="1" />
  </svg>
)

// Ícone de Laudo - Documento com selo
export const CertificationIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
    <circle cx="18" cy="18" r="3" strokeWidth="1" />
    <path d="M16.5 17.5l1 1 2-2" strokeWidth="1" />
  </svg>
)

// Ícone de Monitoramento - Dashboard com ondas
export const MonitoringIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 12l2-2 2 2 4-4" />
    <circle cx="7" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="11" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="8" r="1" fill="currentColor" />
    <path d="M3 20h18" />
  </svg>
)

// Ícone de Consultoria - Lâmpada com engrenagem
export const ConsultingIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M9 21h6" />
    <path d="M12 21v-6" />
    <path d="M12 3a6 6 0 016 6c0 2-3 3-3 3H9s-3-1-3-3a6 6 0 016-6z" />
    <circle cx="17" cy="7" r="2" strokeWidth="1" />
    <path d="M16.5 6.5l1 1M17.5 6.5l-1 1" strokeWidth="1" />
  </svg>
)

// Ícone de Ferramentas/Outros
export const ToolsIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)

// Ícone de Análise - Gráfico com lupa
export const AnalysisIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M8 11h6" />
    <path d="M11 8v6" />
  </svg>
)

// Ícone de Velocidade - Velocímetro
export const SpeedIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M12 20a8 8 0 008-8 8 8 0 00-8-8 8 8 0 00-8 8 8 8 0 008 8z" />
    <polyline points="12,12 8,8" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
)

// Ícone de Segurança - Escudo com check
export const SecurityIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

// Ícone de Indústria - Fábrica minimalista
export const IndustryIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4v18" />
    <path d="M19 21V11l-6-4" />
    <path d="M9 9v.01" />
    <path d="M9 13v.01" />
    <path d="M9 17v.01" />
    <path d="M15 13v.01" />
    <path d="M15 17v.01" />
  </svg>
)

// Ícone de ROI - Gráfico de crescimento
export const ROIIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M3 12l9-9 9 9" />
    <path d="M12 3v18" />
    <path d="M8 12h8" />
    <circle cx="16" cy="8" r="2" fill="currentColor" />
  </svg>
)

// Ícone de Temperatura - Termômetro
export const TemperatureIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M14 4v10.54a4 4 0 11-4 0V4a2 2 0 014 0z" />
    <circle cx="12" cy="16" r="2" fill="currentColor" />
    <path d="M12 6v8" strokeWidth="1" />
  </svg>
)

// Ícone para Relatórios NR-10
export const NR10ReportIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <path d="M9 11h6"/>
    <circle cx="12" cy="15" r="1" fill="currentColor" />
    <path d="M10.5 9h3l-1.5 2.5"/>
  </svg>
)

// Ícone para Laudos de Termografia
export const ThermographyReportIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <path d="M9 9h6v6H9z"/>
    <circle cx="9.5" cy="9.5" r="0.5" fill="var(--heat-orange)"/>
    <circle cx="14.5" cy="14.5" r="0.5" fill="var(--cool-teal)"/>
    <circle cx="12" cy="12" r="0.5" fill="var(--heat-red)"/>
    <path d="M12 7v2"/>
    <path d="M12 15v2"/>
    <path d="M7 12h2"/>
    <path d="M15 12h2"/>
  </svg>
)

// Ícone para Equipamentos Calibrados
export const CalibratedEquipmentIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 6v6l4 2"/>
    <circle cx="12" cy="12" r="2"/>
    <path d="M8 4l1.5 1.5"/>
    <path d="M16 4l-1.5 1.5"/>
    <path d="M4 8l1.5 1.5"/>
    <path d="M20 8l-1.5 1.5"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
  </svg>
)

// Ícone para ART CREA
export const ARTCreaIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    className={className} 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"
  >
    <path d="M9 12l2 2 4-4"/>
    <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"/>
    <path d="M3 11v8a2 2 0 002 2h14a2 2 0 002-2v-8"/>
    <circle cx="7" cy="8" r="1"/>
    <circle cx="17" cy="8" r="1"/>
    <path d="M10 6h4"/>
    <path d="M12 15v2"/>
  </svg>
)