/**
 * Google Analytics 4 Component
 * Privacy-first GA4 implementation with LGPD compliance
 * and consent management for Ôluna Engenharia
 */

'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import {
  initializeConsentMode,
  hasConsent,
  getConsentState,
  updateGoogleConsentMode,
} from '@/utils/privacy'
import { initializeAnalytics } from '@/services/analytics'

interface GoogleAnalyticsProps {
  measurementId: string
  debugMode?: boolean
}

export function GoogleAnalytics({ measurementId, debugMode = false }: GoogleAnalyticsProps) {
  // Initialize consent mode before any scripts load
  useEffect(() => {
    initializeConsentMode()
  }, [])

  // Handle consent changes
  useEffect(() => {
    const handleConsentChange = () => {
      const consent = getConsentState()
      updateGoogleConsentMode(consent)

      // Initialize analytics if consent is granted
      if (hasConsent('analytics')) {
        initializeAnalytics()
      }
    }

    // Listen for consent changes
    window.addEventListener('consent-updated', handleConsentChange)

    // Check initial consent state
    handleConsentChange()

    return () => {
      window.removeEventListener('consent-updated', handleConsentChange)
    }
  }, [])

  // Don't load scripts if no measurement ID
  if (!measurementId) {
    if (debugMode) {
      console.warn('[GA4] No measurement ID provided')
    }
    return null
  }

  return (
    <>
      {/* Google Tag Manager / gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (debugMode) {
            console.log('[GA4] Script loaded')
          }
        }}
        onError={(error) => {
          console.error('[GA4] Script failed to load:', error)
        }}
      />

      {/* Initialize gtag and consent mode */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Set default consent mode (privacy-first)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted'
            });
            
            // Initialize Google Analytics
            gtag('js', new Date());
            
            // Configure GA4 with privacy settings
            gtag('config', '${measurementId}', {
              'page_title': document.title,
              'page_location': window.location.href,
              'anonymize_ip': true,
              'cookie_domain': 'auto',
              'cookie_expires': 365 * 24 * 60 * 60,
              'sample_rate': ${debugMode ? 1 : 100},
              'site_speed_sample_rate': 10,
              'allow_google_signals': false,
              'allow_ad_personalization_signals': false,
              'restricted_data_processing': true,
              'custom_map': {
                'custom_parameter_1': 'service_interest',
                'custom_parameter_2': 'lead_type',
                'custom_parameter_3': 'user_type',
                'custom_parameter_4': 'contact_method',
                'custom_parameter_5': 'company_type'
              }
            });
            
            // Enhanced measurement configuration
            gtag('config', '${measurementId}', {
              'enhanced_measurement': {
                'scrolls': true,
                'outbound_clicks': true,
                'site_search': false,
                'video_engagement': false,
                'file_downloads': true,
                'page_changes': true
              }
            });
            
            ${
              debugMode
                ? `
            // Debug mode logging
            gtag('config', '${measurementId}', {
              'debug_mode': true
            });
            console.log('[GA4] Initialized with measurement ID: ${measurementId}');
            `
                : ''
            }
            
            // Custom event for initialization
            gtag('event', 'ga4_initialized', {
              'event_category': 'analytics',
              'event_label': 'privacy_compliant',
              'value': 1,
              'non_interaction': true
            });
          `,
        }}
      />

      {/* Privacy-compliant user identification */}
      <Script
        id="gtag-privacy-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Set privacy-compliant user properties
            gtag('set', 'user_properties', {
              'user_type': 'anonymous',
              'privacy_mode': 'lgpd_compliant',
              'consent_version': '1.0',
              'data_collection_method': 'privacy_first'
            });
            
            // Track initial page view only if consent is granted
            if (localStorage.getItem('oluna_consent')) {
              try {
                const consent = JSON.parse(localStorage.getItem('oluna_consent'));
                if (consent.analytics === 'granted') {
                  gtag('event', 'page_view', {
                    'page_title': document.title,
                    'page_location': window.location.href,
                    'page_referrer': document.referrer,
                    'event_category': 'engagement',
                    'consent_granted': true
                  });
                }
              } catch (e) {
                console.warn('[GA4] Error parsing consent:', e);
              }
            }
            
            // Listen for consent updates
            window.addEventListener('consent-updated', function(event) {
              const consent = event.detail || {};
              
              gtag('consent', 'update', {
                'analytics_storage': consent.analytics === 'granted' ? 'granted' : 'denied',
                'ad_storage': consent.marketing === 'granted' ? 'granted' : 'denied',
                'ad_user_data': consent.marketing === 'granted' ? 'granted' : 'denied',
                'ad_personalization': consent.marketing === 'granted' ? 'granted' : 'denied',
                'functionality_storage': consent.functional === 'granted' ? 'granted' : 'denied',
                'personalization_storage': consent.preferences === 'granted' ? 'granted' : 'denied'
              });
              
              // Track consent change
              gtag('event', 'consent_updated', {
                'event_category': 'privacy',
                'event_label': 'user_consent_change',
                'analytics_consent': consent.analytics,
                'marketing_consent': consent.marketing,
                'functional_consent': consent.functional,
                'preferences_consent': consent.preferences,
                'value': 1
              });
              
              ${
                debugMode
                  ? `
              console.log('[GA4] Consent updated:', consent);
              `
                  : ''
              }
            });
            
            // Track user engagement
            let engagementTimer = Date.now();
            let isEngaged = true;
            
            function trackEngagement() {
              if (isEngaged) {
                const engagementTime = Date.now() - engagementTimer;
                gtag('event', 'user_engagement', {
                  'engagement_time_msec': engagementTime,
                  'event_category': 'engagement',
                  'event_label': 'active_session',
                  'value': Math.round(engagementTime / 1000),
                  'non_interaction': true
                });
                engagementTimer = Date.now();
              }
            }
            
            // Track engagement every 30 seconds
            setInterval(trackEngagement, 30000);
            
            // Track when user becomes inactive
            document.addEventListener('visibilitychange', function() {
              if (document.hidden) {
                trackEngagement();
                isEngaged = false;
              } else {
                engagementTimer = Date.now();
                isEngaged = true;
              }
            });
            
            // Track scroll depth
            let maxScrollDepth = 0;
            let scrollDepthTracked = [];
            
            function trackScrollDepth() {
              const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
              
              if (scrollPercent > maxScrollDepth) {
                maxScrollDepth = scrollPercent;
                
                // Track at 25%, 50%, 75%, and 100%
                const milestones = [25, 50, 75, 100];
                milestones.forEach(milestone => {
                  if (scrollPercent >= milestone && !scrollDepthTracked.includes(milestone)) {
                    scrollDepthTracked.push(milestone);
                    gtag('event', 'scroll', {
                      'event_category': 'engagement',
                      'event_label': milestone + '%',
                      'value': milestone,
                      'scroll_depth': milestone,
                      'non_interaction': true
                    });
                  }
                });
              }
            }
            
            // Throttled scroll tracking
            let scrollTimeout;
            window.addEventListener('scroll', function() {
              if (scrollTimeout) {
                clearTimeout(scrollTimeout);
              }
              scrollTimeout = setTimeout(trackScrollDepth, 100);
            });
            
            // Track time on page before unload
            window.addEventListener('beforeunload', function() {
              trackEngagement();
              
              const timeOnPage = Date.now() - performance.timing.navigationStart;
              gtag('event', 'session_end', {
                'event_category': 'engagement',
                'event_label': 'page_unload',
                'value': Math.round(timeOnPage / 1000),
                'time_on_page': timeOnPage,
                'max_scroll_depth': maxScrollDepth,
                'non_interaction': true
              });
            });
          `,
        }}
      />

      {/* Enhanced eCommerce tracking (for service packages) */}
      <Script
        id="gtag-ecommerce"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced eCommerce for service tracking
            gtag('config', '${measurementId}', {
              'custom_map': {
                'service_category': 'item_category',
                'service_name': 'item_name',
                'service_type': 'item_variant',
                'lead_value': 'value',
                'contact_method': 'method'
              }
            });
            
            // Function to track service views
            window.trackServiceView = function(serviceName, serviceCategory, serviceValue) {
              gtag('event', 'view_item', {
                'currency': 'BRL',
                'value': serviceValue || 0,
                'items': [{
                  'item_id': serviceName.toLowerCase().replace(/\\s+/g, '_'),
                  'item_name': serviceName,
                  'item_category': serviceCategory,
                  'item_variant': 'consultation',
                  'price': serviceValue || 0,
                  'quantity': 1
                }]
              });
            };
            
            // Function to track lead generation
            window.trackLead = function(leadType, leadValue, leadSource) {
              gtag('event', 'generate_lead', {
                'currency': 'BRL',
                'value': leadValue || 100,
                'lead_type': leadType,
                'lead_source': leadSource,
                'event_category': 'lead_generation',
                'event_label': leadType
              });
            };
            
            // Function to track conversions
            window.trackConversion = function(conversionType, conversionValue, conversionId) {
              gtag('event', 'conversion', {
                'send_to': '${measurementId}/' + conversionId,
                'value': conversionValue || 0,
                'currency': 'BRL',
                'transaction_id': Date.now().toString(),
                'conversion_type': conversionType
              });
            };
          `,
        }}
      />

      {debugMode && (
        <Script
          id="gtag-debug"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Debug information
              console.log('[GA4] Debug mode enabled');
              console.log('[GA4] Measurement ID:', '${measurementId}');
              console.log('[GA4] Environment:', '${process.env.NODE_ENV}');
              
              // Debug dataLayer
              window.debugDataLayer = function() {
                console.log('[GA4] DataLayer:', window.dataLayer);
              };
              
              // Debug consent state
              window.debugConsent = function() {
                const consent = localStorage.getItem('oluna_consent');
                console.log('[GA4] Consent state:', consent ? JSON.parse(consent) : 'No consent stored');
              };
              
              // Make debug functions available globally
              window.gtag_debug = {
                dataLayer: window.debugDataLayer,
                consent: window.debugConsent
              };
            `,
          }}
        />
      )}
    </>
  )
}

export default GoogleAnalytics
