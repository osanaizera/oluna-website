/**
 * Format Utilities - Utilitários de formatação para dados
 * 
 * Funções para formatar diferentes tipos de dados como:
 * - Datas e horários
 * - Valores monetários
 * - Números e percentuais
 * - Telefones e documentos
 * - URLs e slugs
 */

/**
 * Formata data para padrão brasileiro
 * 
 * @param date - Data para formatar
 * @param options - Opções de formatação Intl.DateTimeFormat
 * @returns Data formatada em pt-BR
 * 
 * @example
 * ```typescript
 * formatDate(new Date()) // '22/06/2025'
 * formatDate(new Date(), { dateStyle: 'full' }) // 'domingo, 22 de junho de 2025'
 * ```
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }
): string {
  const dateObj = new Date(date)
  
  if (isNaN(dateObj.getTime())) {
    throw new Error('Data inválida fornecida para formatDate')
  }
  
  return new Intl.DateTimeFormat('pt-BR', options).format(dateObj)
}

/**
 * Formata valor monetário em Real brasileiro
 * 
 * @param value - Valor numérico para formatar
 * @param options - Opções de formatação
 * @returns Valor formatado em BRL
 * 
 * @example
 * ```typescript
 * formatCurrency(1234.56) // 'R$ 1.234,56'
 * formatCurrency(1000, { minimumFractionDigits: 0 }) // 'R$ 1.000'
 * ```
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    ...options
  }).format(value)
}

/**
 * Formata número com separadores de milhares
 * 
 * @param value - Número para formatar
 * @param options - Opções de formatação
 * @returns Número formatado
 * 
 * @example
 * ```typescript
 * formatNumber(1234567) // '1.234.567'
 * formatNumber(12.345, { minimumFractionDigits: 2 }) // '12,35'
 * ```
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('pt-BR', options).format(value)
}

/**
 * Formata percentual
 * 
 * @param value - Valor decimal (0.25 = 25%)
 * @param options - Opções de formatação
 * @returns Percentual formatado
 * 
 * @example
 * ```typescript
 * formatPercent(0.25) // '25%'
 * formatPercent(0.1234, { minimumFractionDigits: 2 }) // '12,34%'
 * ```
 */
export function formatPercent(
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    ...options
  }).format(value)
}

/**
 * Formata telefone brasileiro
 * 
 * @param phone - Número de telefone (apenas dígitos)
 * @returns Telefone formatado
 * 
 * @example
 * ```typescript
 * formatPhone('11987654321') // '(11) 98765-4321'
 * formatPhone('1134567890') // '(11) 3456-7890'
 * ```
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  
  if (digits.length === 11) {
    // Celular: (11) 98765-4321
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (digits.length === 10) {
    // Fixo: (11) 3456-7890
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  return phone // Retorna original se não conseguir formatar
}

/**
 * Formata CPF
 * 
 * @param cpf - CPF (apenas dígitos)
 * @returns CPF formatado
 * 
 * @example
 * ```typescript
 * formatCPF('12345678900') // '123.456.789-00'
 * ```
 */
export function formatCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '')
  
  if (digits.length === 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  
  return cpf
}

/**
 * Formata CNPJ
 * 
 * @param cnpj - CNPJ (apenas dígitos)
 * @returns CNPJ formatado
 * 
 * @example
 * ```typescript
 * formatCNPJ('12345678000195') // '12.345.678/0001-95'
 * ```
 */
export function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '')
  
  if (digits.length === 14) {
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  
  return cnpj
}

/**
 * Cria slug a partir de string (para URLs)
 * 
 * @param text - Texto para converter em slug
 * @returns Slug formatado
 * 
 * @example
 * ```typescript
 * createSlug('Ôluna Engenharia Ltda.') // 'oluna-engenharia-ltda'
 * createSlug('Projeto de Estruturas') // 'projeto-de-estruturas'
 * ```
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens múltiplos
    .trim()
    .replace(/^-|-$/g, '') // Remove hífens no início e fim
}

/**
 * Trunca texto mantendo palavras inteiras
 * 
 * @param text - Texto para truncar
 * @param maxLength - Comprimento máximo
 * @param suffix - Sufixo a adicionar (padrão: '...')
 * @returns Texto truncado
 * 
 * @example
 * ```typescript
 * truncateText('Este é um texto muito longo', 15) // 'Este é um...'
 * truncateText('Texto curto', 20) // 'Texto curto'
 * ```
 */
export function truncateText(
  text: string, 
  maxLength: number, 
  suffix: string = '...'
): string {
  if (text.length <= maxLength) {
    return text
  }
  
  const truncated = text.slice(0, maxLength - suffix.length)
  const lastSpace = truncated.lastIndexOf(' ')
  
  // Se encontrou espaço, corta na palavra completa
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + suffix
  }
  
  // Senão, corta no comprimento exato
  return truncated + suffix
}

/**
 * Capitaliza primeira letra de cada palavra
 * 
 * @param text - Texto para capitalizar
 * @returns Texto com primeiras letras maiúsculas
 * 
 * @example
 * ```typescript
 * capitalize('joão da silva') // 'João Da Silva'
 * capitalize('ÔLUNA ENGENHARIA') // 'Ôluna Engenharia'
 * ```
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Formata bytes em unidades legíveis
 * 
 * @param bytes - Número de bytes
 * @param decimals - Casas decimais (padrão: 2)
 * @returns Tamanho formatado
 * 
 * @example
 * ```typescript
 * formatBytes(1024) // '1 KB'
 * formatBytes(1048576) // '1 MB'
 * formatBytes(1234567, 1) // '1.2 MB'
 * ```
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

/**
 * Remove acentos de string
 * 
 * @param text - Texto com acentos
 * @returns Texto sem acentos
 * 
 * @example
 * ```typescript
 * removeAccents('Ôluna Engenharia Ltda.') // 'Oluna Engenharia Ltda.'
 * ```
 */
export function removeAccents(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Mascara string mostrando apenas primeiros e últimos caracteres
 * 
 * @param text - Texto para mascarar
 * @param visibleStart - Caracteres visíveis no início
 * @param visibleEnd - Caracteres visíveis no final
 * @param maskChar - Caractere de máscara
 * @returns Texto mascarado
 * 
 * @example
 * ```typescript
 * maskString('joao@email.com', 2, 4) // 'jo*****com'
 * maskString('12345678900', 3, 2, '#') // '123#######00'
 * ```
 */
export function maskString(
  text: string,
  visibleStart: number = 2,
  visibleEnd: number = 2,
  maskChar: string = '*'
): string {
  if (text.length <= visibleStart + visibleEnd) {
    return text
  }
  
  const start = text.slice(0, visibleStart)
  const end = text.slice(-visibleEnd)
  const middle = maskChar.repeat(text.length - visibleStart - visibleEnd)
  
  return start + middle + end
}