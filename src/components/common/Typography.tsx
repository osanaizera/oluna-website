import React from 'react'
import { cn } from '@/utils/cn'

// Typography component variants
type TypographyVariant =
  | 'hero'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'code'
  | 'button'
  | 'quote'

// Element mapping for semantic HTML
type ElementMap = {
  hero: 'h1'
  heading: 'h2'
  subheading: 'h3'
  body: 'p'
  caption: 'span'
  code: 'code'
  button: 'span'
  quote: 'blockquote'
}

interface TypographyProps<V extends TypographyVariant> {
  variant: V
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
}

// Variant to CSS class mapping
const variantClasses: Record<TypographyVariant, string> = {
  hero: 'text-hero',
  heading: 'text-heading',
  subheading: 'text-subheading',
  body: 'text-body',
  caption: 'text-caption',
  code: 'text-code',
  button: 'text-button',
  quote: 'text-quote',
}

// Default element mapping
const defaultElements: ElementMap = {
  hero: 'h1',
  heading: 'h2',
  subheading: 'h3',
  body: 'p',
  caption: 'span',
  code: 'code',
  button: 'span',
  quote: 'blockquote',
}

export function Typography<V extends TypographyVariant>({
  variant,
  children,
  className,
  as,
  ...props
}: TypographyProps<V> & Omit<React.HTMLAttributes<HTMLElement>, keyof TypographyProps<V>>) {
  const Component = as || defaultElements[variant]
  const variantClass = variantClasses[variant]

  return React.createElement(
    Component,
    {
      className: cn(variantClass, className),
      ...props,
    },
    children
  )
}

// Convenience components for common use cases
export const Hero = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'hero'>, 'variant'> & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Typography variant="hero" className={className} {...props}>
    {children}
  </Typography>
)

export const Heading = ({
  children,
  className,
  as = 'h2',
  ...props
}: Omit<TypographyProps<'heading'>, 'variant'> & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Typography variant="heading" as={as} className={className} {...props}>
    {children}
  </Typography>
)

export const Subheading = ({
  children,
  className,
  as = 'h3',
  ...props
}: Omit<TypographyProps<'subheading'>, 'variant'> & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Typography variant="subheading" as={as} className={className} {...props}>
    {children}
  </Typography>
)

export const Body = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'body'>, 'variant'> & React.HTMLAttributes<HTMLParagraphElement>) => (
  <Typography variant="body" className={className} {...props}>
    {children}
  </Typography>
)

export const Caption = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'caption'>, 'variant'> & React.HTMLAttributes<HTMLSpanElement>) => (
  <Typography variant="caption" className={className} {...props}>
    {children}
  </Typography>
)

export const Code = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'code'>, 'variant'> & React.HTMLAttributes<HTMLElement>) => (
  <Typography
    variant="code"
    className={cn('bg-gray-100 px-1.5 py-0.5 rounded', className)}
    {...props}
  >
    {children}
  </Typography>
)

export const ButtonText = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'button'>, 'variant'> & React.HTMLAttributes<HTMLSpanElement>) => (
  <Typography variant="button" className={className} {...props}>
    {children}
  </Typography>
)

export const Quote = ({
  children,
  className,
  ...props
}: Omit<TypographyProps<'quote'>, 'variant'> & React.HTMLAttributes<HTMLQuoteElement>) => (
  <Typography
    variant="quote"
    className={cn('border-l-4 border-gray-300 pl-4', className)}
    {...props}
  >
    {children}
  </Typography>
)
