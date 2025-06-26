#!/usr/bin/env node

/**
 * Script para testar o envio de email localmente
 * Usage: node test-email.js
 */

require('dotenv').config()

async function testEmail() {
  try {
    console.log('🧪 Testando configuração de email...')
    
    // Verificar variáveis de ambiente
    console.log('📋 Variáveis de ambiente:')
    console.log('- RESEND_API_KEY:', process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : 'NÃO DEFINIDA')
    console.log('- FROM_EMAIL:', process.env.FROM_EMAIL || 'NÃO DEFINIDA')
    console.log('- CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'NÃO DEFINIDA')
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY não está definida no arquivo .env')
    }
    
    // Testar Resend
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    console.log('\n📧 Enviando email de teste...')
    
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [process.env.CONTACT_EMAIL || 'contato@oluna.com.br'],
      subject: '🧪 Teste Local - Ôluna Engenharia',
      html: `
        <h1>🧪 Teste de Email Local</h1>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>From:</strong> ${process.env.FROM_EMAIL}</p>
        <p><strong>To:</strong> ${process.env.CONTACT_EMAIL}</p>
        <p>Se você recebeu este email, o sistema está funcionando corretamente!</p>
      `,
      text: `Teste Local - ${new Date().toISOString()}`
    })
    
    if (result.error) {
      console.error('❌ Erro da API Resend:', result.error)
      process.exit(1)
    }
    
    console.log('✅ Email enviado com sucesso!')
    console.log('📧 Message ID:', result.data?.id)
    console.log('📧 Resultado completo:', JSON.stringify(result, null, 2))
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message)
    if (error.stack) {
      console.error('Stack trace:', error.stack)
    }
    process.exit(1)
  }
}

testEmail()