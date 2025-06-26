/**
 * Validation Utilities - Utilitários de validação para formulários
 *
 * Funções para validar diferentes tipos de dados:
 * - Emails e URLs
 * - Documentos brasileiros (CPF, CNPJ)
 * - Telefones
 * - Senhas
 * - Campos de texto
 */

/**
 * Valida formato de email
 *
 * @param email - Email para validar
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Valida URL
 *
 * @param url - URL para validar
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidURL('https://example.com') // true
 * isValidURL('not-a-url') // false
 * ```
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Valida CPF brasileiro
 *
 * @param cpf - CPF para validar (com ou sem formatação)
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidCPF('123.456.789-00') // false (CPF inválido)
 * isValidCPF('11144477735') // true (CPF válido)
 * ```
 */
export function isValidCPF(cpf: string): boolean {
  // Remove formatação
  const digits = cpf.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (digits.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(digits)) return false

  // Calcula primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(digits[9])) return false

  // Calcula segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(digits[10])) return false

  return true
}

/**
 * Valida CNPJ brasileiro
 *
 * @param cnpj - CNPJ para validar (com ou sem formatação)
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidCNPJ('12.345.678/0001-95') // false (CNPJ inválido)
 * isValidCNPJ('11222333000181') // true (CNPJ válido)
 * ```
 */
export function isValidCNPJ(cnpj: string): boolean {
  // Remove formatação
  const digits = cnpj.replace(/\D/g, '')

  // Verifica se tem 14 dígitos
  if (digits.length !== 14) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(digits)) return false

  // Calcula primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * weights1[i]
  }
  let remainder = sum % 11
  const digit1 = remainder < 2 ? 0 : 11 - remainder
  if (digit1 !== parseInt(digits[12])) return false

  // Calcula segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i]) * weights2[i]
  }
  remainder = sum % 11
  const digit2 = remainder < 2 ? 0 : 11 - remainder
  if (digit2 !== parseInt(digits[13])) return false

  return true
}

/**
 * Valida telefone brasileiro
 *
 * @param phone - Telefone para validar
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidPhone('(11) 98765-4321') // true
 * isValidPhone('11987654321') // true
 * isValidPhone('123456') // false
 * ```
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')

  // Aceita celular (11 dígitos) ou fixo (10 dígitos)
  if (digits.length === 11) {
    // Celular: deve começar com 9 no terceiro dígito
    return /^(\d{2})(9\d{8})$/.test(digits)
  } else if (digits.length === 10) {
    // Fixo: não pode começar com 9 no terceiro dígito
    return /^(\d{2})([2-8]\d{7})$/.test(digits)
  }

  return false
}

/**
 * Valida força de senha
 *
 * @param password - Senha para validar
 * @returns Objeto com resultado da validação
 *
 * @example
 * ```typescript
 * validatePassword('123456') // { isValid: false, score: 1, feedback: [...] }
 * validatePassword('MyStr0ngP@ss!') // { isValid: true, score: 5, feedback: [] }
 * ```
 */
export function validatePassword(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0

  // Comprimento mínimo
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Deve ter pelo menos 8 caracteres')
  }

  // Letra minúscula
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Deve conter pelo menos uma letra minúscula')
  }

  // Letra maiúscula
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Deve conter pelo menos uma letra maiúscula')
  }

  // Número
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Deve conter pelo menos um número')
  }

  // Caractere especial
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1
  } else {
    feedback.push('Deve conter pelo menos um caractere especial')
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  }
}

/**
 * Valida CEP brasileiro
 *
 * @param cep - CEP para validar
 * @returns true se válido, false caso contrário
 *
 * @example
 * ```typescript
 * isValidCEP('01234-567') // true
 * isValidCEP('01234567') // true
 * isValidCEP('1234') // false
 * ```
 */
export function isValidCEP(cep: string): boolean {
  const digits = cep.replace(/\D/g, '')
  return /^\d{8}$/.test(digits)
}

/**
 * Valida se string contém apenas letras (incluindo acentos)
 *
 * @param text - Texto para validar
 * @returns true se contém apenas letras, false caso contrário
 *
 * @example
 * ```typescript
 * isOnlyLetters('João Silva') // true
 * isOnlyLetters('João123') // false
 * ```
 */
export function isOnlyLetters(text: string): boolean {
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(text)
}

/**
 * Valida se string contém apenas números
 *
 * @param text - Texto para validar
 * @returns true se contém apenas números, false caso contrário
 *
 * @example
 * ```typescript
 * isOnlyNumbers('123456') // true
 * isOnlyNumbers('123abc') // false
 * ```
 */
export function isOnlyNumbers(text: string): boolean {
  return /^\d+$/.test(text)
}

/**
 * Valida se valor está dentro de um intervalo
 *
 * @param value - Valor para validar
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns true se está no intervalo, false caso contrário
 *
 * @example
 * ```typescript
 * isInRange(5, 1, 10) // true
 * isInRange(15, 1, 10) // false
 * ```
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Valida se string tem comprimento adequado
 *
 * @param text - Texto para validar
 * @param min - Comprimento mínimo
 * @param max - Comprimento máximo (opcional)
 * @returns true se tem comprimento adequado, false caso contrário
 *
 * @example
 * ```typescript
 * hasValidLength('João', 2, 10) // true
 * hasValidLength('A', 2, 10) // false
 * ```
 */
export function hasValidLength(text: string, min: number, max?: number): boolean {
  const length = text.trim().length

  if (length < min) return false
  if (max && length > max) return false

  return true
}

/**
 * Limpa e valida string removendo espaços extras
 *
 * @param text - Texto para limpar
 * @returns Texto limpo
 *
 * @example
 * ```typescript
 * sanitizeString('  João   Silva  ') // 'João Silva'
 * sanitizeString('') // ''
 * ```
 */
export function sanitizeString(text: string): string {
  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Valida se data está no futuro
 *
 * @param date - Data para validar
 * @returns true se está no futuro, false caso contrário
 *
 * @example
 * ```typescript
 * isFutureDate(new Date('2030-01-01')) // true
 * isFutureDate(new Date('2020-01-01')) // false
 * ```
 */
export function isFutureDate(date: Date | string): boolean {
  const inputDate = new Date(date)
  const now = new Date()

  return inputDate > now
}

/**
 * Valida se data está no passado
 *
 * @param date - Data para validar
 * @returns true se está no passado, false caso contrário
 *
 * @example
 * ```typescript
 * isPastDate(new Date('2020-01-01')) // true
 * isPastDate(new Date('2030-01-01')) // false
 * ```
 */
export function isPastDate(date: Date | string): boolean {
  const inputDate = new Date(date)
  const now = new Date()

  return inputDate < now
}

/**
 * Valida se pessoa é maior de idade
 *
 * @param birthDate - Data de nascimento
 * @param minAge - Idade mínima (padrão: 18)
 * @returns true se é maior de idade, false caso contrário
 *
 * @example
 * ```typescript
 * isOfAge(new Date('2000-01-01')) // true (se pessoa tem 18+ anos)
 * isOfAge(new Date('2010-01-01')) // false
 * ```
 */
export function isOfAge(birthDate: Date | string, minAge: number = 18): boolean {
  const birth = new Date(birthDate)
  const now = new Date()

  const age = now.getFullYear() - birth.getFullYear()
  const monthDiff = now.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    return age - 1 >= minAge
  }

  return age >= minAge
}

/**
 * Valida arquivo baseado em tipo e tamanho
 *
 * @param file - Arquivo para validar
 * @param options - Opções de validação
 * @returns Resultado da validação
 *
 * @example
 * ```typescript
 * validateFile(file, { maxSize: 5000000, allowedTypes: ['pdf', 'doc'] })
 * ```
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number
    allowedTypes?: string[]
    maxSizeMB?: number
  } = {}
): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const { maxSize, allowedTypes, maxSizeMB } = options

  // Validar tamanho
  const sizeLimit = maxSize || (maxSizeMB ? maxSizeMB * 1024 * 1024 : 10 * 1024 * 1024) // 10MB default
  if (file.size > sizeLimit) {
    const sizeMB = Math.round(sizeLimit / (1024 * 1024))
    errors.push(`Arquivo deve ter no máximo ${sizeMB}MB`)
  }

  // Validar tipo
  if (allowedTypes && allowedTypes.length > 0) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    const mimeType = file.type.toLowerCase()

    const isValidType = allowedTypes.some((type) => {
      const lowerType = type.toLowerCase()
      return (
        fileExtension === lowerType ||
        mimeType.includes(lowerType) ||
        (lowerType === 'pdf' && mimeType === 'application/pdf') ||
        (lowerType === 'doc' && (mimeType.includes('word') || mimeType.includes('document'))) ||
        (lowerType === 'docx' && mimeType.includes('wordprocessingml')) ||
        (lowerType === 'xls' && mimeType.includes('excel')) ||
        (lowerType === 'xlsx' && mimeType.includes('spreadsheetml'))
      )
    })

    if (!isValidType) {
      errors.push(`Tipo de arquivo não permitido. Permitidos: ${allowedTypes.join(', ')}`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Valida multiple arquivos
 *
 * @param files - Lista de arquivos
 * @param options - Opções de validação
 * @returns Resultado da validação
 */
export function validateFiles(
  files: File[],
  options: {
    maxSize?: number
    allowedTypes?: string[]
    maxSizeMB?: number
    maxFiles?: number
  } = {}
): {
  isValid: boolean
  errors: string[]
  fileErrors: { [key: string]: string[] }
} {
  const errors: string[] = []
  const fileErrors: { [key: string]: string[] } = {}
  const { maxFiles = 5 } = options

  // Validar número máximo de arquivos
  if (files.length > maxFiles) {
    errors.push(`Máximo de ${maxFiles} arquivos permitidos`)
  }

  // Validar cada arquivo
  files.forEach((file, index) => {
    const validation = validateFile(file, options)
    if (!validation.isValid) {
      fileErrors[`file-${index}`] = validation.errors
    }
  })

  return {
    isValid: errors.length === 0 && Object.keys(fileErrors).length === 0,
    errors,
    fileErrors,
  }
}

/**
 * Valida nome completo brasileiro
 *
 * @param name - Nome para validar
 * @returns true se válido, false caso contrário
 */
export function isValidBrazilianName(name: string): boolean {
  const trimmed = name.trim()

  // Deve ter pelo menos 2 palavras
  const words = trimmed.split(/\s+/)
  if (words.length < 2) return false

  // Cada palavra deve ter pelo menos 2 caracteres
  if (words.some((word) => word.length < 2)) return false

  // Apenas letras, espaços e acentos
  return /^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)
}

/**
 * Valida se string contém apenas caracteres seguros (anti-XSS básico)
 *
 * @param input - String para validar
 * @returns true se seguro, false caso contrário
 */
export function isSafeInput(input: string): boolean {
  // Bloqueia tags HTML básicas e scripts
  const dangerousPatterns = [
    /<script/i,
    /<\/script>/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<link/i,
    /<meta/i,
  ]

  return !dangerousPatterns.some((pattern) => pattern.test(input))
}

/**
 * Valida código postal brasileiro (CEP expandido)
 *
 * @param cep - CEP para validar
 * @returns Resultado detalhado da validação
 */
export function validateBrazilianCEP(cep: string): {
  isValid: boolean
  formatted: string
  errors: string[]
} {
  const errors: string[] = []
  const digits = cep.replace(/\D/g, '')

  if (digits.length !== 8) {
    errors.push('CEP deve ter 8 dígitos')
  }

  // CEPs que começam com 0 são inválidos
  if (digits.startsWith('0')) {
    errors.push('CEP não pode começar com 0')
  }

  // Formatar se válido
  const formatted = digits.length === 8 ? digits.replace(/(\d{5})(\d{3})/, '$1-$2') : cep

  return {
    isValid: errors.length === 0,
    formatted,
    errors,
  }
}

/**
 * Lista de cidades brasileiras principais para validação
 */
export const BRAZILIAN_CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Brasília',
  'Salvador',
  'Fortaleza',
  'Belo Horizonte',
  'Manaus',
  'Curitiba',
  'Recife',
  'Goiânia',
  'Belém',
  'Porto Alegre',
  'Guarulhos',
  'Campinas',
  'São Luís',
  'São Gonçalo',
  'Maceió',
  'Duque de Caxias',
  'Natal',
  'Campo Grande',
  'Teresina',
  'São Bernardo do Campo',
  'Nova Iguaçu',
  'João Pessoa',
  'Santo André',
  'Osasco',
  'Jaboatão dos Guararapes',
  'São José dos Campos',
  'Ribeirão Preto',
  'Uberlândia',
  'Sorocaba',
  'Contagem',
  'Aracaju',
  'Feira de Santana',
  'Cuiabá',
  'Joinville',
  'Juiz de Fora',
  'Londrina',
  'Aparecida de Goiânia',
  'Niterói',
  'Ananindeua',
  'Belford Roxo',
  'Caxias do Sul',
  'Campos dos Goytacazes',
  'São João de Meriti',
  'Vila Velha',
  'Florianópolis',
  'Santos',
  'Mauá',
  'Carapicuíba',
  'Olinda',
  'Betim',
  'Diadema',
  'Jundiaí',
  'Piracicaba',
  'Cariacica',
  'Bauru',
  'Petrópolis',
  'Vitória',
  'Canoas',
  'Franca',
  'Maringá',
  'Anápolis',
  'Itaquaquecetuba',
  'Caucaia',
  'Paulista',
  'Cotia',
]

/**
 * Valida cidade brasileira
 *
 * @param city - Nome da cidade
 * @returns true se válida, false caso contrário
 */
export function isValidBrazilianCity(city: string): boolean {
  const normalized = city.trim().toLowerCase()
  return BRAZILIAN_CITIES.some((validCity) => validCity.toLowerCase() === normalized)
}

/**
 * Valida formulário de contato completo
 *
 * @param data - Dados do formulário
 * @returns Resultado da validação
 */
export interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  position: string
  city: string
  service: string
  urgency: string
  message: string
  files?: File[]
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean
  errors: { [key: string]: string[] }
} {
  const errors: { [key: string]: string[] } = {}

  // Validar nome
  if (!data.name?.trim()) {
    errors.name = ['Nome é obrigatório']
  } else if (!isValidBrazilianName(data.name)) {
    errors.name = ['Nome deve conter pelo menos nome e sobrenome']
  } else if (!isSafeInput(data.name)) {
    errors.name = ['Nome contém caracteres não permitidos']
  }

  // Validar email
  if (!data.email?.trim()) {
    errors.email = ['Email é obrigatório']
  } else if (!isValidEmail(data.email)) {
    errors.email = ['Email inválido']
  } else if (!isSafeInput(data.email)) {
    errors.email = ['Email contém caracteres não permitidos']
  }

  // Validar telefone
  if (!data.phone?.trim()) {
    errors.phone = ['Telefone é obrigatório']
  } else if (!isValidPhone(data.phone)) {
    errors.phone = ['Telefone inválido. Use formato: (11) 99999-9999']
  }

  // Validar empresa
  if (!data.company?.trim()) {
    errors.company = ['Nome da empresa é obrigatório']
  } else if (!isSafeInput(data.company)) {
    errors.company = ['Nome da empresa contém caracteres não permitidos']
  }

  // Validar cargo
  if (!data.position?.trim()) {
    errors.position = ['Cargo é obrigatório']
  } else if (!isSafeInput(data.position)) {
    errors.position = ['Cargo contém caracteres não permitidos']
  }

  // Validar cidade
  if (!data.city?.trim()) {
    errors.city = ['Cidade é obrigatória']
  } else if (!isSafeInput(data.city)) {
    errors.city = ['Cidade contém caracteres não permitidos']
  }

  // Validar serviço
  if (!data.service?.trim()) {
    errors.service = ['Serviço é obrigatório']
  }

  // Validar urgência
  if (!data.urgency?.trim()) {
    errors.urgency = ['Nível de urgência é obrigatório']
  }

  // Validar mensagem
  if (!data.message?.trim()) {
    errors.message = ['Mensagem é obrigatória']
  } else if (data.message.length < 10) {
    errors.message = ['Mensagem deve ter pelo menos 10 caracteres']
  } else if (data.message.length > 1000) {
    errors.message = ['Mensagem deve ter no máximo 1000 caracteres']
  } else if (!isSafeInput(data.message)) {
    errors.message = ['Mensagem contém caracteres não permitidos']
  }

  // Validar arquivos se fornecidos
  if (data.files && data.files.length > 0) {
    const fileValidation = validateFiles(data.files, {
      maxSizeMB: 10,
      allowedTypes: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'xls', 'xlsx'],
      maxFiles: 3,
    })

    if (!fileValidation.isValid) {
      errors.files = fileValidation.errors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
