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
    feedback
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