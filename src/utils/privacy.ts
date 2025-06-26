/**
 * Privacy Utilities for LGPD Compliance
 * Implements Brazilian data protection law compliance for analytics
 * and cookie management with user consent controls
 */

import Cookies from 'js-cookie'
import type { ConsentState, ConsentStatus, PrivacySettings, UserContext } from '@/types/analytics'

// LGPD Constants
export const LGPD_CONSTANTS = {
  CONSENT_COOKIE_NAME: 'oluna_consent',
  CONSENT_VERSION: '1.0',
  CONSENT_DURATION_DAYS: 365,
  ANALYTICS_COOKIE_PREFIX: '_ga',
  FUNCTIONAL_COOKIES: ['oluna_session', 'oluna_preferences'],
  MARKETING_COOKIES: ['_fbp', '_fbc', 'oluna_utm'],
  REQUIRED_COOKIES: ['oluna_essential'],
  DATA_RETENTION_DAYS: 26 * 30, // 26 months as per LGPD
  MINOR_AGE_THRESHOLD: 18,
} as const

// Default consent state for new users
export const DEFAULT_CONSENT_STATE: ConsentState = {
  analytics: 'unknown',
  marketing: 'denied',
  functional: 'denied',
  preferences: 'denied',
  timestamp: Date.now(),
  version: LGPD_CONSTANTS.CONSENT_VERSION,
}

// Privacy-first GA4 settings
export const PRIVACY_FIRST_SETTINGS: PrivacySettings = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'denied',
  personalization_storage: 'denied',
  security_storage: 'granted', // Always granted for security
}

/**
 * Get current consent state from cookies
 */
export function getConsentState(): ConsentState {
  try {
    const cookieValue = Cookies.get(LGPD_CONSTANTS.CONSENT_COOKIE_NAME)

    if (!cookieValue) {
      return DEFAULT_CONSENT_STATE
    }

    const parsed = JSON.parse(cookieValue) as ConsentState

    // Validate consent version
    if (parsed.version !== LGPD_CONSTANTS.CONSENT_VERSION) {
      return DEFAULT_CONSENT_STATE
    }

    // Check if consent is expired (1 year)
    const consentAge = Date.now() - parsed.timestamp
    const maxAge = LGPD_CONSTANTS.CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000

    if (consentAge > maxAge) {
      return DEFAULT_CONSENT_STATE
    }

    return parsed
  } catch (error) {
    console.warn('Error parsing consent state:', error)
    return DEFAULT_CONSENT_STATE
  }
}

/**
 * Save consent state to cookies
 */
export function saveConsentState(consent: Partial<ConsentState>): ConsentState {
  const currentConsent = getConsentState()
  const updatedConsent: ConsentState = {
    ...currentConsent,
    ...consent,
    timestamp: Date.now(),
    version: LGPD_CONSTANTS.CONSENT_VERSION,
  }

  try {
    Cookies.set(LGPD_CONSTANTS.CONSENT_COOKIE_NAME, JSON.stringify(updatedConsent), {
      expires: LGPD_CONSTANTS.CONSENT_DURATION_DAYS,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    // Update Google Consent Mode
    updateGoogleConsentMode(updatedConsent)

    return updatedConsent
  } catch (error) {
    console.error('Error saving consent state:', error)
    return currentConsent
  }
}

/**
 * Update Google Consent Mode based on user preferences
 */
export function updateGoogleConsentMode(consent: ConsentState): void {
  if (typeof window === 'undefined' || !window.gtag) {
    return
  }

  const consentSettings: Partial<PrivacySettings> = {
    analytics_storage: consent.analytics === 'granted' ? 'granted' : 'denied',
    ad_storage: consent.marketing === 'granted' ? 'granted' : 'denied',
    ad_user_data: consent.marketing === 'granted' ? 'granted' : 'denied',
    ad_personalization: consent.marketing === 'granted' ? 'granted' : 'denied',
    functionality_storage: consent.functional === 'granted' ? 'granted' : 'denied',
    personalization_storage: consent.preferences === 'granted' ? 'granted' : 'denied',
    security_storage: 'granted', // Always granted
  }

  window.gtag('consent', 'update', consentSettings)
}

/**
 * Initialize default consent mode before GA4 loads
 */
export function initializeConsentMode(): void {
  if (typeof window === 'undefined') {
    return
  }

  // Initialize Google Consent Mode with privacy-first defaults
  window.gtag =
    window.gtag ||
    function () {
      ;(window.dataLayer = window.dataLayer || []).push(arguments)
    }

  window.gtag('consent', 'default', PRIVACY_FIRST_SETTINGS)

  // Apply saved consent preferences
  const savedConsent = getConsentState()
  if (savedConsent.analytics !== 'unknown') {
    updateGoogleConsentMode(savedConsent)
  }
}

/**
 * Check if user has given consent for specific purpose
 */
export function hasConsent(purpose: keyof Omit<ConsentState, 'timestamp' | 'version'>): boolean {
  const consent = getConsentState()
  return consent[purpose] === 'granted'
}

/**
 * Check if user is likely a minor (for enhanced LGPD protection)
 */
export function isLikelyMinor(): boolean {
  // This is a placeholder - in production, you might implement
  // age verification or parental consent mechanisms
  return false
}

/**
 * Get LGPD-compliant user identifier
 */
export function getUserIdentifier(): string {
  // Use session-based identifier instead of persistent tracking
  let sessionId = sessionStorage.getItem('oluna_session_id')

  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('oluna_session_id', sessionId)
  }

  return sessionId
}

/**
 * Generate privacy-compliant session ID
 */
function generateSessionId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 15)
  return `oluna_${timestamp}_${random}`
}

/**
 * Clear all tracking cookies (for opt-out)
 */
export function clearTrackingCookies(): void {
  // Clear Google Analytics cookies
  const gaCookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie.startsWith('_ga'))
    .map((cookie) => cookie.split('=')[0])

  gaCookies.forEach((cookieName) => {
    Cookies.remove(cookieName, { path: '/', domain: window.location.hostname })
    Cookies.remove(cookieName, { path: '/', domain: `.${window.location.hostname}` })
  })

  // Clear marketing cookies
  LGPD_CONSTANTS.MARKETING_COOKIES.forEach((cookieName) => {
    Cookies.remove(cookieName, { path: '/', domain: window.location.hostname })
    Cookies.remove(cookieName, { path: '/', domain: `.${window.location.hostname}` })
  })

  // Clear functional cookies (except essential)
  LGPD_CONSTANTS.FUNCTIONAL_COOKIES.forEach((cookieName) => {
    Cookies.remove(cookieName, { path: '/' })
  })
}

/**
 * Complete opt-out from all tracking
 */
export function optOutFromTracking(): ConsentState {
  // Clear all tracking cookies
  clearTrackingCookies()

  // Set all consent to denied
  const optOutConsent: ConsentState = {
    analytics: 'denied',
    marketing: 'denied',
    functional: 'denied',
    preferences: 'denied',
    timestamp: Date.now(),
    version: LGPD_CONSTANTS.CONSENT_VERSION,
  }

  // Save opt-out state
  const consent = saveConsentState(optOutConsent)

  // Set GA4 opt-out flag
  if (typeof window !== 'undefined') {
    ;(window as any)[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = true
  }

  return consent
}

/**
 * Opt back into tracking (with user consent)
 */
export function optInToTracking(
  purposes: Partial<Pick<ConsentState, 'analytics' | 'marketing' | 'functional' | 'preferences'>>
): ConsentState {
  // Remove GA4 opt-out flag
  if (typeof window !== 'undefined') {
    ;(window as any)[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = false
  }

  const consent = saveConsentState(purposes)

  // Reload page to reinitialize tracking if analytics consent was granted
  if (purposes.analytics === 'granted') {
    // Don't reload immediately - let the user see the confirmation
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  return consent
}

/**
 * Check if consent banner should be shown
 */
export function shouldShowConsentBanner(): boolean {
  const consent = getConsentState()

  // Show banner if no consent has been given or if consent is unknown
  return (
    consent.analytics === 'unknown' &&
    consent.marketing === 'denied' &&
    consent.functional === 'denied' &&
    consent.preferences === 'denied'
  )
}

/**
 * Get privacy-compliant user context
 */
export function getPrivacyCompliantUserContext(): Partial<UserContext> {
  const consent = getConsentState()

  const baseContext = {
    session_id: getUserIdentifier(),
    client_id: getUserIdentifier(),
    consent_state: consent,
    privacy_settings: PRIVACY_FIRST_SETTINGS,
  }

  // Only include detailed device info if functional consent is given
  if (consent.functional === 'granted') {
    return {
      ...baseContext,
      device_info: {
        device_type: getDeviceType(),
        browser: getBrowserName(),
        os: getOperatingSystem(),
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      },
    }
  }

  return baseContext
}

/**
 * Detect device type (privacy-compliant)
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Get browser name (privacy-compliant)
 */
function getBrowserName(): string {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Other'
}

/**
 * Get operating system (privacy-compliant)
 */
function getOperatingSystem(): string {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = navigator.userAgent
  if (userAgent.includes('Win')) return 'Windows'
  if (userAgent.includes('Mac')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Other'
}

/**
 * Generate LGPD-compliant data processing notice
 */
export function getDataProcessingNotice(): {
  purpose: string
  legalBasis: string
  retention: string
  rights: string[]
  contact: string
} {
  return {
    purpose:
      'Coletamos dados para melhorar nossos serviços, analisar o desempenho do site e fornecer conteúdo relevante.',
    legalBasis: 'Legítimo interesse e consentimento do usuário conforme Art. 7º da LGPD.',
    retention: `Os dados são mantidos por ${LGPD_CONSTANTS.DATA_RETENTION_DAYS} dias ou até a retirada do consentimento.`,
    rights: [
      'Confirmação da existência de tratamento',
      'Acesso aos dados',
      'Correção de dados incompletos, inexatos ou desatualizados',
      'Anonimização, bloqueio ou eliminação de dados',
      'Portabilidade dos dados',
      'Eliminação dos dados tratados com consentimento',
      'Informação sobre compartilhamento de dados',
      'Revogação do consentimento',
    ],
    contact: 'contato@olunaengenharia.com.br',
  }
}

/**
 * Validate consent state structure
 */
export function isValidConsentState(consent: any): consent is ConsentState {
  return (
    typeof consent === 'object' &&
    consent !== null &&
    ['granted', 'denied', 'unknown'].includes(consent.analytics) &&
    ['granted', 'denied'].includes(consent.marketing) &&
    ['granted', 'denied'].includes(consent.functional) &&
    ['granted', 'denied'].includes(consent.preferences) &&
    typeof consent.timestamp === 'number' &&
    typeof consent.version === 'string'
  )
}

/**
 * Log privacy compliance events (for audit purposes)
 */
export function logPrivacyEvent(
  event: 'consent_given' | 'consent_withdrawn' | 'data_deleted' | 'opt_out' | 'opt_in',
  details: Record<string, any> = {}
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[LGPD Compliance] ${event}:`, {
      timestamp: new Date().toISOString(),
      user_session: getUserIdentifier(),
      ...details,
    })
  }

  // In production, you might want to send this to a compliance logging service
  // that doesn't track users but helps with LGPD audit requirements
}

/**
 * Check if data collection is compliant with current consent
 */
export function isDataCollectionCompliant(
  dataType: 'analytics' | 'marketing' | 'functional' | 'preferences'
): boolean {
  const consent = getConsentState()
  return consent[dataType] === 'granted'
}

/**
 * Get consent expiry date
 */
export function getConsentExpiryDate(): Date {
  const consent = getConsentState()
  const expiryTime = consent.timestamp + LGPD_CONSTANTS.CONSENT_DURATION_DAYS * 24 * 60 * 60 * 1000
  return new Date(expiryTime)
}

/**
 * Check if consent needs renewal
 */
export function needsConsentRenewal(): boolean {
  const consent = getConsentState()
  const now = Date.now()
  const consentAge = now - consent.timestamp
  const renewalThreshold = (LGPD_CONSTANTS.CONSENT_DURATION_DAYS - 30) * 24 * 60 * 60 * 1000 // 30 days before expiry

  return consentAge > renewalThreshold
}
