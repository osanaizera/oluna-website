import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { GlobalLiveRegion } from '@/components/common/LiveRegion'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import CookieConsent from '@/components/analytics/CookieConsent'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
// import AnalyticsInit from '@/components/analytics/AnalyticsInit' // Disabled temporarily
import {
  inter,
  sourceSans,
  jetbrainsMono,
  robotoSlab,
  fontVariables,
  fontClassNames,
} from '@/lib/fonts'
import {
  generateDefaultMetadata,
  generateOrganizationSchema,
  generateProfessionalServiceSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
} from '@/lib/seo'
import { generateResourceHints } from '@/utils/seo'

export const metadata: Metadata = generateDefaultMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Generate comprehensive structured data for the entire site
  const organizationSchema = generateOrganizationSchema()
  const professionalServiceSchema = generateProfessionalServiceSchema()
  const localBusinessSchema = generateLocalBusinessSchema()
  const websiteSchema = generateWebSiteSchema()
  const resourceHints = generateResourceHints()

  // Combine all schemas into a single JSON-LD script
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, professionalServiceSchema, localBusinessSchema, websiteSchema],
  }

  return (
    <html lang="pt-BR" className={fontVariables}>
      <head>
        {/* Enhanced Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#FF6A3D" />
        <meta name="msapplication-TileColor" content="#FF6A3D" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Security Headers */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Language and Locale */}
        <meta name="language" content="pt-BR" />
        <meta name="geo.region" content="BR-RJ" />
        <meta name="geo.placename" content="Rio de Janeiro" />
        <meta name="geo.position" content="-22.9068;-43.1729" />
        <meta name="ICBM" content="-22.9068, -43.1729" />

        {/* Business Information */}
        <meta name="rating" content="General" />
        <meta name="distribution" content="Global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="subject" content="Termografia Industrial, Diagnósticos Elétricos, Engenharia" />
        <meta name="copyright" content="© 2024 Ôluna Engenharia. Todos os direitos reservados." />

        {/* Resource Hints for Performance */}
        {resourceHints.map((hint, index) => (
          <link key={index} {...hint} />
        ))}

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FF6A3D" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Comprehensive JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema, null, 2),
          }}
        />

        {/* Google Analytics and Search Console */}
        <meta name="google-site-verification" content="google-site-verification-code" />

        {/* Social Media Verification */}
        <meta name="facebook-domain-verification" content="facebook-domain-verification-code" />
        <meta name="pinterest-site-verification" content="pinterest-site-verification-code" />

        {/* Feed Links */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Ôluna Engenharia - Blog RSS"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Ôluna Engenharia - Blog Atom"
          href="/atom.xml"
        />

        {/* Canonical URL is handled by Next.js metadata API */}

        {/* Preload Critical Images */}
        <link rel="preload" as="image" href="/logo.png" />
        <link rel="preload" as="image" href="/hero-bg.jpg" />
      </head>
      <body className={`${fontClassNames.body} antialiased bg-gray-50 text-gray-900 font-body`}>
        {/* Enhanced Skip Navigation for Accessibility */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>
        <a href="#nav-menu" className="skip-link">
          Pular para a navegação
        </a>
        <a href="#contato" className="skip-link">
          Pular para o contato
        </a>

        {/* Global ARIA Live Regions */}
        <GlobalLiveRegion />

        <Header />

        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        {/* Google Analytics with Privacy Compliance */}
        <GoogleAnalytics
          measurementId={process.env.NEXT_PUBLIC_GA_ID || ''}
          debugMode={process.env.NODE_ENV === 'development'}
        />

        {/* LGPD Cookie Consent Manager */}
        <CookieConsent position="bottom" />

        {/* Vercel Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />

        {/* Analytics Initialization - Disabled temporarily */}
        {/* <AnalyticsInit /> */}

        {/* Service Worker Registration for PWA - Disabled temporarily */}
        {/* 
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
        */}

        {/* Initialize Performance and Business Tracking - Disabled temporarily */}
        {/*
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                // Dynamically import and initialize tracking
                Promise.all([
                  import('/src/utils/performance.js').then(m => m.initializeAllPerformanceTracking()),
                  import('/src/utils/businessTracking.js').then(m => m.initializeBusinessTracking())
                ]).catch(console.warn);
              });
            `,
          }}
        />
        */}
      </body>
    </html>
  )
}
