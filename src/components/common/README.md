# Image Optimization Components

This folder contains optimized image components for the Ôluna Engenharia website, designed to provide excellent performance, user experience, and thermal visual effects.

## Components Overview

### 🚀 OptimizedImage

The base optimized image component with lazy loading, blur placeholders, and error handling.

```tsx
import { OptimizedImage } from '@/components/common'

;<OptimizedImage
  src="/thermal-panel.jpg"
  alt="Painel elétrico com termografia"
  width={800}
  height={600}
  priority={false}
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  quality={85}
/>
```

### 📱 ResponsiveImage

Responsive image component with predefined aspect ratios and adaptive sizing.

```tsx
import { ResponsiveImage } from '@/components/common'

;<ResponsiveImage
  src="/case-study.jpg"
  alt="Case study do hotel resort"
  aspectRatio="16/9"
  className="rounded-lg shadow-lg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### 🎯 HeroImage

Optimized for hero sections with high priority loading and overlay effects.

```tsx
import { HeroImage } from '@/components/common'

;<HeroImage
  src="/hero-background.jpg"
  alt="Ôluna Engenharia - Termografia Industrial"
  width={1920}
  height={1080}
  priority={true}
  overlayEffect="thermal"
  quality={90}
/>
```

### 🏢 LogoImage

Specialized for logos with high quality and optional dark mode variants.

```tsx
import { LogoImage } from '@/components/common'

;<LogoImage
  src="/logo-light.png"
  darkModeSrc="/logo-dark.png"
  alt="Ôluna Engenharia"
  width={120}
  height={40}
  priority={true}
/>
```

### 🔥 ThermalImage

Advanced thermal imaging component with interactive effects and hot spots.

```tsx
import { ThermalImage } from '@/components/common'

;<ThermalImage
  src="/electrical-panel.jpg"
  alt="Painel elétrico com análise termográfica"
  aspectRatio="16/9"
  thermalEffect="scan"
  hotSpots={[
    { x: 25, y: 30, intensity: 'high', temp: '67.3°C' },
    { x: 75, y: 60, intensity: 'medium', temp: '45.2°C' },
  ]}
/>
```

### 💀 ImageSkeleton

Loading skeleton component with thermal effects.

```tsx
import { ImageSkeleton } from '@/components/common'

;<ImageSkeleton className="w-full h-64" rounded={true} thermalEffect={true} />
```

## Image Configuration Presets

The `imageUtils.ts` file provides predefined configurations:

```tsx
import { IMAGE_CONFIGS } from '@/utils/imageUtils'

// Available presets:
IMAGE_CONFIGS.hero // High quality, priority loading
IMAGE_CONFIGS.card // Standard quality, lazy loading
IMAGE_CONFIGS.thumbnail // Lower quality, small sizes
IMAGE_CONFIGS.logo // Highest quality, priority
IMAGE_CONFIGS.thermal // Optimized for thermal effects
```

## Utility Functions

### Generate Blur Data URLs

```tsx
import { generateThermalBlurDataURL, generateSimpleBlurDataURL } from '@/utils/imageUtils'

const thermalBlur = generateThermalBlurDataURL(8, 8)
const simpleBlur = generateSimpleBlurDataURL(8, 8)
```

### Responsive Image Sizes

```tsx
import { generateImageSizes } from '@/utils/imageUtils'

const sizes = generateImageSizes({
  mobile: '100vw',
  tablet: '50vw',
  desktop: '33vw',
})
```

### Image URL Optimization

```tsx
import { optimizeImageUrl } from '@/utils/imageUtils'

const optimizedUrl = optimizeImageUrl('/image.jpg', {
  width: 800,
  height: 600,
  quality: 85,
  format: 'webp',
})
```

## Performance Features

### ✅ Automatic Optimizations

- **Lazy Loading**: Images load only when needed
- **Modern Formats**: Automatic AVIF/WebP conversion
- **Responsive Sizing**: Multiple image sizes for different devices
- **Blur Placeholders**: Smooth loading experience
- **Error Handling**: Graceful fallbacks for failed loads

### ✅ Thermal Visual Effects

- **Interactive Thermal Mode**: Hover to reveal thermal analysis
- **Hot Spot Indicators**: Animated temperature markers
- **Scanning Effects**: Thermal scanning line animations
- **Gradient Overlays**: Heat map visualizations

### ✅ SEO & Accessibility

- **Proper Alt Text**: Required alt attributes
- **Loading States**: Clear visual feedback
- **Keyboard Navigation**: Full accessibility support
- **Screen Reader Friendly**: Proper ARIA labels

## Best Practices

### 1. Choose the Right Component

- **Hero sections**: Use `HeroImage` with `priority={true}`
- **Content cards**: Use `ResponsiveImage` with appropriate aspect ratio
- **Thermal analysis**: Use `ThermalImage` with hot spots
- **Logos**: Use `LogoImage` with high quality
- **General use**: Use `OptimizedImage` for full control

### 2. Optimize Image Sizes

```tsx
// Good: Specific sizes for responsive images
sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'

// Bad: Generic sizing
sizes = '100vw'
```

### 3. Use Appropriate Quality Settings

```tsx
// Hero images: Higher quality
quality={90}

// Thumbnails: Lower quality for performance
quality={75}

// Logos: Highest quality
quality={95}
```

### 4. Implement Proper Loading Strategy

```tsx
// Above the fold: Priority loading
priority={true}

// Below the fold: Lazy loading (default)
priority={false}
```

## Thermal Effects Configuration

### Available Effects

- `scan`: Animated scanning line
- `reveal`: Smooth thermal reveal
- `pulse`: Pulsing thermal overlay
- `none`: No thermal effects

### Hot Spot Configuration

```tsx
hotSpots={[
  {
    x: 25,        // Percentage from left
    y: 30,        // Percentage from top
    intensity: 'high',    // 'low' | 'medium' | 'high'
    temp: '67.3°C'        // Optional temperature label
  }
]}
```

## Integration Examples

### In a Card Component

```tsx
function ProjectCard({ project }) {
  return (
    <div className="card">
      <ThermalImage
        src={project.thermalImage}
        alt={`Análise termográfica - ${project.name}`}
        aspectRatio="16/9"
        thermalEffect="reveal"
        hotSpots={project.hotSpots}
      />
      <div className="p-4">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  )
}
```

### In a Hero Section

```tsx
function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <HeroImage
        src="/hero-thermal.jpg"
        alt="Termografia industrial - Ôluna Engenharia"
        width={1920}
        height={1080}
        priority={true}
        overlayEffect="thermal"
        className="absolute inset-0"
      />
      <div className="relative z-10">{/* Hero content */}</div>
    </section>
  )
}
```

## Performance Monitoring

Monitor image performance using:

1. **Core Web Vitals**: Track LCP improvements
2. **Network Panel**: Verify format optimizations
3. **Lighthouse**: Check overall image optimizations
4. **User Experience**: Monitor loading states and interactions

## Future Enhancements

- [ ] WebP/AVIF format detection and optimization
- [ ] Progressive loading for large images
- [ ] Image compression API integration
- [ ] Advanced thermal analysis overlays
- [ ] Real-time thermal data integration
- [ ] Accessibility improvements for thermal effects
