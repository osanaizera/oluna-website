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
  notificationResult: { success: boolean; error?: string; messageId?: string }
  confirmationResult: { success: boolean; error?: string; messageId?: string }
}> {
  const { emailService } = await import('@/services/email')

  try {
    console.log('📧 Starting email notifications for:', formData.email)
    
    // Send notification to company
    const notificationResult = await emailService.sendContactForm(formData)
    
    // Send confirmation to user
    const confirmationResult = await emailService.sendConfirmationEmail(formData)
    
    console.log('📧 Email results:', {
      notification: {
        success: notificationResult.success,
        error: notificationResult.error,
        messageId: notificationResult.messageId
      },
      confirmation: {
        success: confirmationResult.success,
        error: confirmationResult.error,
        messageId: confirmationResult.messageId
      }
    })

    return { 
      notificationResult: {
        success: notificationResult.success,
        error: notificationResult.error,
        messageId: notificationResult.messageId
      },
      confirmationResult: {
        success: confirmationResult.success,
        error: confirmationResult.error,
        messageId: confirmationResult.messageId
      }
    }
  } catch (error: any) {
    console.error('❌ Email sending failed:', error)
    return { 
      notificationResult: { 
        success: false, 
        error: error.message || 'Failed to send notification email' 
      },
      confirmationResult: { 
        success: false, 
        error: error.message || 'Failed to send confirmation email' 
      }
    }
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

    if (!emailResults.notificationResult.success) {
      console.error('❌ Notification email failed:', emailResults.notificationResult.error)
      return NextResponse.json(
        {
          success: false,
          error: `Failed to send notification: ${emailResults.notificationResult.error}. Please try again or contact us directly.`,
          code: 'EMAIL_SEND_ERROR',
          details: {
            notificationError: emailResults.notificationResult.error,
            confirmationError: emailResults.confirmationResult.error
          }
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
      notificationMessageId: emailResults.notificationResult.messageId,
      confirmationMessageId: emailResults.confirmationResult.messageId,
      confirmationSent: emailResults.confirmationResult.success
    })

    // Return success response with detailed information
    return NextResponse.json(
      {
        success: true,
        message:
          'Solicitação enviada com sucesso! Nossa equipe entrará em contato em até 24 horas.',
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        details: {
          notificationSent: emailResults.notificationResult.success,
          confirmationSent: emailResults.confirmationResult.success,
          messageIds: {
            notification: emailResults.notificationResult.messageId,
            confirmation: emailResults.confirmationResult.messageId
          }
        }
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
