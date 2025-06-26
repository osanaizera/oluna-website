import { NextRequest, NextResponse } from 'next/server'

/**
 * Debug endpoint to test email configuration and Resend API
 * Access via: GET /api/debug-email
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting email debug...')
    
    // Check environment variables
    const envCheck = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
      fromEmail: process.env.FROM_EMAIL,
      contactEmail: process.env.CONTACT_EMAIL,
      nodeEnv: process.env.NODE_ENV
    }
    
    console.log('🔍 Environment check:', envCheck)
    
    // Test Resend API directly
    let resendTest = null
    try {
      const { Resend } = require('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      console.log('🔍 Testing Resend API...')
      
      const result = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: [process.env.CONTACT_EMAIL || 'contato@oluna.com.br'],
        subject: '🧪 Teste Debug - Ôluna Engenharia',
        html: `
          <h1>Teste de Email Debug</h1>
          <p>Este é um email de teste enviado em: ${new Date().toISOString()}</p>
          <p>Se você recebeu este email, o sistema está funcionando!</p>
        `,
        text: `Teste de Email Debug - ${new Date().toISOString()}`
      })
      
      console.log('✅ Resend API result:', result)
      
      resendTest = {
        success: !result.error,
        messageId: result.data?.id,
        error: result.error?.message || null,
        fullResult: result
      }
    } catch (resendError: any) {
      console.error('❌ Resend API error:', resendError)
      resendTest = {
        success: false,
        error: resendError.message,
        stack: resendError.stack
      }
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: envCheck,
      resendTest,
      message: 'Debug information collected. Check server logs for details.'
    })
    
  } catch (error: any) {
    console.error('❌ Debug endpoint error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}