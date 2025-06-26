import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/services/email'

/**
 * Test endpoint for email functionality
 * Use: POST /api/test-email
 */
export async function POST(request: NextRequest) {
  try {
    // Test data
    const testFormData = {
      name: 'Teste Sistema',
      email: 'teste@example.com',
      phone: '(21) 99999-9999',
      company: 'Teste Company',
      position: 'Desenvolvedor',
      city: 'Rio de Janeiro',
      service: 'Termografia',
      urgency: 'media',
      message: 'Este é um email de teste do sistema.',
      files: []
    }

    console.log('🧪 Testing email service...')
    
    // Test sending contact form email
    const result = await emailService.sendContactForm(testFormData)
    
    console.log('🧪 Test email result:', result)

    return NextResponse.json({
      success: true,
      message: 'Test email sent',
      result: {
        success: result.success,
        messageId: result.messageId,
        error: result.error,
        provider: result.provider
      },
      env: {
        hasApiKey: !!process.env.RESEND_API_KEY,
        fromEmail: process.env.FROM_EMAIL,
        contactEmail: process.env.CONTACT_EMAIL
      }
    })
  } catch (error: any) {
    console.error('❌ Test email error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Test email failed',
        stack: error.stack
      },
      { status: 500 }
    )
  }
}