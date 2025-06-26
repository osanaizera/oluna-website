import { NextRequest, NextResponse } from 'next/server'
import { validateContactForm, ContactFormData } from '@/utils/validation'
import { sanitizeString } from '@/utils/validation'

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Security constants
const MAX_REQUESTS_PER_HOUR = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const HONEYPOT_FIELD = 'website' // Hidden field to catch bots

/**
 * Rate limiting middleware
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    })
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 }
  }

  if (userLimit.count >= MAX_REQUESTS_PER_HOUR) {
    return { allowed: false, remaining: 0 }
  }

  userLimit.count++
  return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - userLimit.count }
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return request.ip || 'unknown'
}

/**
 * Sanitize form data to prevent XSS and injection attacks
 */
function sanitizeFormData(data: any): ContactFormData {
  return {
    name: sanitizeString(data.name || ''),
    email: sanitizeString(data.email || '').toLowerCase(),
    phone: sanitizeString(data.phone || ''),
    company: sanitizeString(data.company || ''),
    position: sanitizeString(data.position || ''),
    city: sanitizeString(data.city || ''),
    service: sanitizeString(data.service || ''),
    urgency: sanitizeString(data.urgency || ''),
    message: sanitizeString(data.message || ''),
    files: data.files || [],
  }
}

/**
 * Send email notifications
 */
async function sendEmailNotifications(formData: ContactFormData): Promise<{
  notificationSent: boolean
  confirmationSent: boolean
}> {
  const { emailService } = await import('@/services/email')

  try {
    // Send notification to company
    const notificationSent = await emailService.sendContactForm(formData)

    // Send confirmation to user
    const confirmationSent = await emailService.sendConfirmationEmail(formData)

    return { notificationSent, confirmationSent }
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    return { notificationSent: false, confirmationSent: false }
  }
}

/**
 * Handle POST request for contact form submission
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT_EXCEEDED',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()

    // Check honeypot field (anti-bot protection)
    if (body[HONEYPOT_FIELD]) {
      // Silent fail for bots
      return NextResponse.json({ success: true })
    }

    // Sanitize input data
    const formData = sanitizeFormData(body)

    // Validate form data
    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      )
    }

    // Send email notifications
    const emailResults = await sendEmailNotifications(formData)

    if (!emailResults.notificationSent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send notification. Please try again or contact us directly.',
          code: 'EMAIL_SEND_ERROR',
        },
        { status: 500 }
      )
    }

    // Log successful submission (for analytics)
    console.log('✅ Contact form submitted successfully:', {
      timestamp: new Date().toISOString(),
      service: formData.service,
      urgency: formData.urgency,
      company: formData.company,
      ip: clientIP,
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          'Solicitação enviada com sucesso! Nossa equipe entrará em contato em até 24 horas.',
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    )
  } catch (error) {
    console.error('❌ Contact form API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

/**
 * Handle OPTIONS request for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
