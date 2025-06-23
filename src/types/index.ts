/**
 * Type Definitions - Definições de tipos TypeScript para o projeto
 * 
 * Este arquivo centraliza todas as definições de tipos compartilhadas
 * entre diferentes partes da aplicação, garantindo consistência
 * e facilitando manutenção.
 * 
 * Organização:
 * - Interfaces de UI/Components
 * - Tipos de dados de negócio
 * - Tipos de API/Backend
 * - Utilitários e helpers
 * - Enums e constantes
 */

// =============================================================================
// UI/COMPONENT INTERFACES
// =============================================================================

/**
 * Item de navegação do menu/header
 */
export interface INavItem {
  label: string
  href: string
  external?: boolean
  icon?: string
  children?: INavItem[]
}

/**
 * Props básicas para componentes que aceitam children
 */
export interface IWithChildren {
  children: React.ReactNode
}

/**
 * Props básicas para componentes com className customizável
 */
export interface IWithClassName {
  className?: string
}

/**
 * Props para componentes de loading/carregamento
 */
export interface ILoadingProps {
  isLoading?: boolean
  loadingText?: string
}

/**
 * Props para componentes de erro
 */
export interface IErrorProps {
  error?: string | Error | null
  onRetry?: () => void
}

/**
 * Estado comum de requisições/operações
 */
export interface IAsyncState<T = any> {
  data?: T
  loading: boolean
  error?: string | null
}

// =============================================================================
// BUSINESS DATA INTERFACES
// =============================================================================

/**
 * Serviço oferecido pela empresa
 */
export interface IService {
  id: string
  title: string
  description: string
  longDescription?: string
  icon?: string
  image?: string
  features?: string[]
  pricing?: {
    type: 'fixed' | 'hourly' | 'project'
    value?: number
    currency?: string
  }
  category?: string
  status: 'active' | 'inactive' | 'coming-soon'
  createdAt: Date
  updatedAt: Date
}

/**
 * Projeto/case da empresa
 */
export interface IProject {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  gallery?: string[]
  tags: string[]
  category: string
  client?: string
  duration?: {
    start: Date
    end?: Date
  }
  location?: string
  status: 'completed' | 'in-progress' | 'planned'
  link?: string
  technologies?: string[]
  team?: string[]
  testimonial?: {
    content: string
    author: string
    role: string
    avatar?: string
  }
  createdAt: Date
  updatedAt: Date
}

/**
 * Membro da equipe
 */
export interface ITeamMember {
  id: string
  name: string
  role: string
  bio?: string
  avatar?: string
  email?: string
  linkedin?: string
  specialties?: string[]
  experience?: number // anos de experiência
  status: 'active' | 'inactive'
}

/**
 * Depoimento/testemunho de cliente
 */
export interface ITestimonial {
  id: string
  content: string
  author: string
  role: string
  company?: string
  avatar?: string
  rating: number // 1-5
  projectId?: string
  featured: boolean
  createdAt: Date
}

/**
 * Post do blog
 */
export interface IBlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: ITeamMember
  category: string
  tags: string[]
  featuredImage?: string
  published: boolean
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

// =============================================================================
// FORM INTERFACES
// =============================================================================

/**
 * Formulário de contato
 */
export interface IContactForm {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  service?: string // ID do serviço de interesse
  budget?: string
  timeline?: string
  consent: boolean // LGPD consent
}

/**
 * Formulário de newsletter
 */
export interface INewsletterForm {
  email: string
  name?: string
  interests?: string[]
  consent: boolean
}

/**
 * Formulário de orçamento
 */
export interface IQuoteForm extends IContactForm {
  projectType: string
  projectScope: string
  location: string
  budget: string
  timeline: string
  requirements: string
  attachments?: File[]
}

// =============================================================================
// API INTERFACES
// =============================================================================

/**
 * Resposta padrão da API
 */
export interface IApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

/**
 * Parâmetros de paginação
 */
export interface IPaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

/**
 * Parâmetros de filtro
 */
export interface IFilterParams {
  search?: string
  category?: string
  status?: string
  dateFrom?: string
  dateTo?: string
}

/**
 * Configuração de SEO para páginas
 */
export interface ISEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  structuredData?: object
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Torna todas as propriedades de um tipo opcionais
 */
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * Torna todas as propriedades de um tipo obrigatórias
 */
export type Required<T> = {
  [P in keyof T]-?: T[P]
}

/**
 * Seleciona apenas algumas propriedades de um tipo
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/**
 * Exclui propriedades de um tipo
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * Tipo para IDs únicos
 */
export type ID = string

/**
 * Tipo para timestamps
 */
export type Timestamp = Date | string | number

/**
 * Tipo para URLs
 */
export type URL = string

/**
 * Tipo para cores (hex, rgb, etc)
 */
export type Color = string

/**
 * Tipo para breakpoints responsivos
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Tipo para variantes de componentes
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'

/**
 * Tipo para tamanhos de componentes
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Tipo para status genéricos
 */
export type Status = 'active' | 'inactive' | 'pending' | 'draft' | 'published'

// =============================================================================
// ENUMS
// =============================================================================

/**
 * Categorias de serviços
 */
export enum ServiceCategory {
  STRUCTURAL = 'structural',
  ELECTRICAL = 'electrical',
  HYDRAULIC = 'hydraulic',
  CONSULTING = 'consulting',
  PLANNING = 'planning',
  INSPECTION = 'inspection'
}

/**
 * Status de projetos
 */
export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

/**
 * Tipos de contato/lead
 */
export enum ContactType {
  QUOTE = 'quote',
  CONSULTATION = 'consultation',
  SUPPORT = 'support',
  PARTNERSHIP = 'partnership',
  GENERAL = 'general'
}

/**
 * Prioridades
 */
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Configurações padrão da aplicação
 */
export const APP_CONFIG = {
  siteName: 'Ôluna Engenharia',
  siteUrl: 'https://www.olunaengenharia.com.br',
  companyName: 'Ôluna Engenharia Ltda',
  email: 'contato@olunaengenharia.com.br',
  phone: '(11) 99999-9999',
  address: {
    street: 'Rua da Engenharia, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    country: 'Brasil'
  },
  social: {
    linkedin: 'https://linkedin.com/company/oluna-engenharia',
    instagram: 'https://instagram.com/olunaengenharia',
    facebook: 'https://facebook.com/olunaengenharia'
  }
} as const

/**
 * Configurações de paginação padrão
 */
export const PAGINATION_CONFIG = {
  defaultLimit: 10,
  maxLimit: 100,
  defaultPage: 1
} as const

/**
 * Configurações de validação
 */
export const VALIDATION_CONFIG = {
  minPasswordLength: 8,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'application/msword']
} as const