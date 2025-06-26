import { Inter, Source_Sans_3, JetBrains_Mono, Roboto_Slab } from 'next/font/google'

/**
 * Font Configuration for Ôluna Engenharia
 *
 * Optimized font loading strategy with:
 * - Professional engineering/technical aesthetic
 * - Proper fallbacks and loading states
 * - Minimal layout shift (CLS optimization)
 * - Performance-first approach
 */

// Primary Body Font - Inter
// Excellent readability, modern, technical feel
export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  adjustFontFallback: true, // Helps reduce layout shift
})

// Display/Heading Font - Source Sans 3
// Professional, clean, great for engineering content
export const sourceSans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  style: ['normal'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  fallback: [
    'Inter',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Arial',
    'sans-serif',
  ],
  adjustFontFallback: true,
})

// Monospace Font - JetBrains Mono
// Perfect for technical content, code, specifications
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-mono',
  display: 'swap',
  preload: false, // Only load when needed
  fallback: [
    'Fira Code',
    'Cascadia Code',
    'SF Mono',
    'Monaco',
    'Inconsolata',
    'Roboto Mono',
    'Consolas',
    'Courier New',
    'monospace',
  ],
  adjustFontFallback: true,
})

// Accent Font - Roboto Slab (for special headings/quotes)
// Technical but approachable, good for emphasis
export const robotoSlab = Roboto_Slab({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  style: ['normal'],
  variable: '--font-accent',
  display: 'swap',
  preload: false, // Only load when needed
  fallback: ['Source Sans 3', 'Inter', 'Georgia', 'serif'],
  adjustFontFallback: true,
})

// Font class names for easy component usage
export const fontClassNames = {
  body: inter.className,
  display: sourceSans.className,
  mono: jetbrainsMono.className,
  accent: robotoSlab.className,
}

// CSS Variables for use in CSS/Tailwind
export const fontVariables = [
  inter.variable,
  sourceSans.variable,
  jetbrainsMono.variable,
  robotoSlab.variable,
].join(' ')

// Typography configuration for consistent styling
export const typography = {
  // Font sizes with responsive scaling
  sizes: {
    xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', // 12px → 14px
    sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', // 14px → 16px
    base: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', // 16px → 18px
    lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', // 18px → 20px
    xl: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', // 20px → 24px
    '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)', // 24px → 30px
    '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)', // 30px → 36px
    '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)', // 36px → 48px
    '5xl': 'clamp(3rem, 2.4rem + 3vw, 4rem)', // 48px → 64px
    '6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)', // 60px → 80px
    '7xl': 'clamp(4.5rem, 3.5rem + 5vw, 6rem)', // 72px → 96px
  },

  // Line heights
  leading: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing for different contexts
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Font weights
  weight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

// Predefined text styles for common use cases
export const textStyles = {
  // Hero and main headings
  hero: {
    fontFamily: 'var(--font-display)',
    fontSize: typography.sizes['6xl'],
    fontWeight: typography.weight.bold,
    lineHeight: typography.leading.tight,
    letterSpacing: typography.tracking.tight,
  },

  // Section headings
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weight.semibold,
    lineHeight: typography.leading.tight,
    letterSpacing: typography.tracking.normal,
  },

  // Subheadings
  subheading: {
    fontFamily: 'var(--font-display)',
    fontSize: typography.sizes.xl,
    fontWeight: typography.weight.medium,
    lineHeight: typography.leading.snug,
    letterSpacing: typography.tracking.normal,
  },

  // Body text
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: typography.sizes.base,
    fontWeight: typography.weight.normal,
    lineHeight: typography.leading.relaxed,
    letterSpacing: typography.tracking.normal,
  },

  // Small text
  caption: {
    fontFamily: 'var(--font-body)',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weight.normal,
    lineHeight: typography.leading.normal,
    letterSpacing: typography.tracking.wide,
  },

  // Code and technical content
  code: {
    fontFamily: 'var(--font-mono)',
    fontSize: typography.sizes.sm,
    fontWeight: typography.weight.normal,
    lineHeight: typography.leading.snug,
    letterSpacing: typography.tracking.normal,
  },

  // Button text
  button: {
    fontFamily: 'var(--font-body)',
    fontSize: typography.sizes.base,
    fontWeight: typography.weight.medium,
    lineHeight: typography.leading.none,
    letterSpacing: typography.tracking.wide,
  },

  // Quote/accent text
  quote: {
    fontFamily: 'var(--font-accent)',
    fontSize: typography.sizes.lg,
    fontWeight: typography.weight.normal,
    lineHeight: typography.leading.relaxed,
    letterSpacing: typography.tracking.normal,
    fontStyle: 'italic',
  },
} as const

// CSS custom properties for runtime use
export const fontCSSProperties = {
  '--font-size-xs': typography.sizes.xs,
  '--font-size-sm': typography.sizes.sm,
  '--font-size-base': typography.sizes.base,
  '--font-size-lg': typography.sizes.lg,
  '--font-size-xl': typography.sizes.xl,
  '--font-size-2xl': typography.sizes['2xl'],
  '--font-size-3xl': typography.sizes['3xl'],
  '--font-size-4xl': typography.sizes['4xl'],
  '--font-size-5xl': typography.sizes['5xl'],
  '--font-size-6xl': typography.sizes['6xl'],
  '--font-size-7xl': typography.sizes['7xl'],
} as const

// Performance optimization helpers
export const fontPreloadLinks = [
  // Preload critical fonts
  {
    rel: 'preload',
    href: '/_next/static/media/inter-latin-400-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/_next/static/media/inter-latin-600-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: '/_next/static/media/source-sans-3-latin-600-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
] as const
