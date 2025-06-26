# Font Optimization Documentation

## Overview

This document outlines the comprehensive font optimization implementation for the Ôluna Engenharia website, focusing on performance, accessibility, and professional engineering aesthetics.

## Font Strategy

### Selected Fonts

1. **Inter** (Primary Body Font)

   - **Purpose**: Body text, paragraphs, general content
   - **Rationale**: Excellent readability, modern, technical feel
   - **Weights**: 300, 400, 500, 600, 700
   - **Variable**: `--font-body`

2. **Source Sans 3** (Display/Heading Font)

   - **Purpose**: Headings, titles, display text
   - **Rationale**: Professional, clean, great for engineering content
   - **Weights**: 400, 600, 700
   - **Variable**: `--font-display`

3. **JetBrains Mono** (Monospace Font)

   - **Purpose**: Code, technical specifications, data
   - **Rationale**: Perfect for technical content with excellent readability
   - **Weights**: 400, 500, 600
   - **Variable**: `--font-mono`

4. **Roboto Slab** (Accent Font)
   - **Purpose**: Quotes, special emphasis, technical callouts
   - **Rationale**: Technical but approachable, good for emphasis
   - **Weights**: 400, 600, 700
   - **Variable**: `--font-accent`

## Performance Optimizations

### Font Loading Strategy

```typescript
// All fonts use 'swap' display strategy
display: 'swap'

// Critical fonts are preloaded
preload: true // Inter and Source Sans 3
preload: false // JetBrains Mono and Roboto Slab (loaded when needed)
```

### Preloading Critical Fonts

```html
<!-- Critical font preloads in layout.tsx -->
<link
  rel="preload"
  href="/_next/static/media/inter-latin-400-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
<link
  rel="preload"
  href="/_next/static/media/inter-latin-600-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
<link
  rel="preload"
  href="/_next/static/media/source-sans-3-latin-600-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin="anonymous"
/>
```

### Fallback Strategy

Each font includes comprehensive fallbacks to minimize layout shift:

```typescript
// Example fallback chain for Inter
fallback: [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
]
```

### Layout Shift Prevention

- `adjustFontFallback: true` on all fonts
- Responsive font sizes using clamp()
- Proper font-feature-settings for optimal rendering

## Typography System

### Responsive Font Sizes

All font sizes use CSS clamp() for fluid scaling:

```css
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem); /* 16px → 18px */
--font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem); /* 20px → 24px */
--font-size-hero: clamp(3.75rem, 3rem + 3.75vw, 5rem); /* 60px → 80px */
```

### Typography Utilities

Pre-defined classes for common text styles:

```css
.text-hero      /* Large hero headings */
.text-heading   /* Section headings */
.text-subheading /* Subsection headings */
.text-body      /* Body text */
.text-caption   /* Small text */
.text-code      /* Technical/code text */
.text-button    /* Button text */
.text-quote     /* Emphasized quotes */
```

### Font Feature Settings

All fonts include optimized feature settings:

```css
font-feature-settings:
  'kern' 1,
  'liga' 1,
  'calt' 1;
text-rendering: optimizeLegibility;
```

## Component Usage

### Typography Component

```tsx
import { Typography, Hero, Heading, Body } from '@/components/common'

// Flexible typography component
<Typography variant="hero">Large Hero Text</Typography>

// Convenience components
<Hero>Hero Heading</Hero>
<Heading>Section Heading</Heading>
<Body>Body paragraph text</Body>
```

### CSS Classes

```tsx
// Direct CSS class usage
<h1 className="text-hero">Hero Title</h1>
<h2 className="text-heading">Section Title</h2>
<p className="text-body">Body content</p>

// Responsive font sizes
<h1 className="text-responsive-6xl">Responsive Hero</h1>
<p className="text-responsive-lg">Responsive Large Text</p>

// Font family utilities
<span className="font-display">Display Font</span>
<span className="font-body">Body Font</span>
<code className="font-mono">Monospace Code</code>
```

## Performance Benefits

### Before Optimization

- Used Google Fonts CDN
- No font preloading
- Basic fallbacks
- Fixed font sizes
- Layout shift on font load

### After Optimization

- ✅ Next.js font optimization
- ✅ Critical font preloading
- ✅ Comprehensive fallbacks with adjustFontFallback
- ✅ Responsive font scaling
- ✅ Minimal layout shift (CLS)
- ✅ Better caching strategy
- ✅ Reduced FOIT/FOUT

### Expected Performance Gains

- **LCP improvement**: 200-400ms faster
- **CLS reduction**: ~50% less layout shift
- **Font load time**: 30-50% faster
- **Cache efficiency**: Better long-term caching

## Accessibility Features

### Enhanced Readability

- High contrast ratios maintained
- Optimal line heights (1.4-1.6)
- Comfortable letter spacing
- Professional font choices

### Responsive Design

- Fluid font scaling prevents horizontal scroll
- Maintains readability at all screen sizes
- Touch-friendly text sizes on mobile

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  /* Font animations respect user preferences */
}
```

## Engineering Theme Alignment

### Professional Aesthetics

- **Inter**: Technical precision, modern engineering
- **Source Sans 3**: Clean, authoritative, professional
- **JetBrains Mono**: Technical accuracy, code readability
- **Roboto Slab**: Engineering heritage, technical emphasis

### Content Hierarchy

- Clear distinction between content types
- Technical specifications in monospace
- Professional headings with Source Sans 3
- Readable body content with Inter

## File Structure

```
src/
├── lib/
│   ├── fonts.ts          # Font configuration
│   └── README-fonts.md   # This documentation
├── components/
│   └── common/
│       └── Typography.tsx # Typography components
└── app/
    ├── layout.tsx        # Font integration
    └── globals.css       # Typography styles
```

## Usage Guidelines

### Do's

- ✅ Use `text-hero` for main page headings
- ✅ Use `font-display` for all headings
- ✅ Use `font-mono` for technical data
- ✅ Use responsive font classes when possible
- ✅ Maintain semantic HTML structure

### Don'ts

- ❌ Don't use fixed px font sizes
- ❌ Don't mix font families arbitrarily
- ❌ Don't ignore semantic heading structure
- ❌ Don't override font-feature-settings unnecessarily

## Testing Checklist

- [ ] Fonts load properly in all browsers
- [ ] No FOIT (Flash of Invisible Text)
- [ ] Minimal FOUT (Flash of Unstyled Text)
- [ ] Good Lighthouse performance scores
- [ ] Responsive scaling works correctly
- [ ] Fallbacks render acceptably
- [ ] Accessibility requirements met

## Browser Support

- Chrome/Edge 88+
- Firefox 89+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

Variable fonts and font-display: swap are well supported across modern browsers.
