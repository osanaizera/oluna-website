/**
 * Class Name Utility - Utilitário para concatenar classes CSS condicionalmente
 *
 * Esta função combina clsx e tailwind-merge para:
 * - Concatenar classes condicionalmente
 * - Resolver conflitos entre classes Tailwind
 * - Manter apenas as classes mais específicas
 *
 * @example
 * ```typescript
 * // Uso básico
 * cn('px-2 py-1', 'bg-red-500') // 'px-2 py-1 bg-red-500'
 *
 * // Condicional
 * cn('text-base', isLarge && 'text-lg') // 'text-base text-lg' ou apenas 'text-base'
 *
 * // Resolvendo conflitos Tailwind
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (remove px-2 conflitante)
 *
 * // Com objetos
 * cn('base-class', { 'active-class': isActive, 'disabled-class': isDisabled })
 * ```
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina e normaliza classes CSS com suporte a Tailwind CSS
 *
 * @param inputs - Classes CSS para combinar (strings, objetos, arrays, condicionais)
 * @returns String com classes CSS otimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
