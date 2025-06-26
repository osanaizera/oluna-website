import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    console.log('📧 Testing direct email to contato@oluna.com.br')
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Usando domínio verificado do Resend
      to: ['contato@oluna.com.br'],
      subject: '🧪 Teste Direto - Sistema Funcionando',
      html: `
        <h1>✅ Teste de Email Direto</h1>
        <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        <p><strong>De:</strong> onboarding@resend.dev</p>
        <p><strong>Para:</strong> contato@oluna.com.br</p>
        <p>Este email foi enviado diretamente do Resend para testar a entrega.</p>
        <p>Se você recebeu este email, o problema pode estar no domínio FROM_EMAIL.</p>
      `,
      text: `Teste Direto - ${new Date().toISOString()}`
    })
    
    console.log('📧 Result:', result)
    
    return NextResponse.json({
      success: !result.error,
      messageId: result.data?.id,
      error: result.error?.message || null,
      timestamp: new Date().toISOString()
    })
    
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}