/**
 * Email Service - Abstração para envio de emails
 *
 * Suporta diferentes provedores:
 * - Resend (recomendado)
 * - SendGrid
 * - Nodemailer (SMTP)
 * - EmailJS (client-side fallback)
 */

import { ContactFormData } from '@/utils/validation'

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
  provider?: string
}

export interface EmailProvider {
  send(options: EmailOptions): Promise<EmailResult>
}

export interface EmailOptions {
  to: string | string[]
  from: string
  subject: string
  html: string
  text?: string
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType: string
}

/**
 * Resend Email Provider (Recomendado)
 */
export class ResendProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // Verificar se estamos em modo de desenvolvimento sem API key
      if (this.apiKey === 'dev-mode') {
        console.log('📧 Resend Email (development mode):', {
          from: options.from,
          to: options.to,
          subject: options.subject,
        })
        return {
          success: true,
          messageId: `dev-${Date.now()}`,
          provider: 'resend-dev-mode'
        }
      }

      const { Resend } = require('resend')
      const resend = new Resend(this.apiKey)

      const result = await resend.emails.send({
        from: options.from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments
      })

      // Verificar se a resposta indica sucesso
      if (result.error) {
        console.error('❌ Resend API error:', result.error)
        return {
          success: false,
          error: result.error.message || 'Resend API error',
          provider: 'resend'
        }
      }

      console.log('✅ Resend Email sent successfully:', {
        id: result.data?.id,
        from: options.from,
        to: options.to,
        subject: options.subject,
      })

      return {
        success: true,
        messageId: result.data?.id,
        provider: 'resend'
      }
    } catch (error: any) {
      console.error('❌ Resend email error:', error)
      return {
        success: false,
        error: error.message || 'Unknown error occurred',
        provider: 'resend'
      }
    }
  }
}

/**
 * SendGrid Email Provider
 */
export class SendGridProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // TODO: Install sendgrid package: npm install @sendgrid/mail
      // const sgMail = require('@sendgrid/mail')
      // sgMail.setApiKey(this.apiKey)

      // const msg = {
      //   to: options.to,
      //   from: options.from,
      //   subject: options.subject,
      //   html: options.html,
      //   text: options.text,
      //   attachments: options.attachments
      // }

      // await sgMail.send(msg)

      // Simulação por enquanto
      console.log('📧 SendGrid Email (simulated):', {
        from: options.from,
        to: options.to,
        subject: options.subject,
      })

      return {
        success: true,
        messageId: `sendgrid-sim-${Date.now()}`,
        provider: 'sendgrid-simulated'
      }
    } catch (error: any) {
      console.error('❌ SendGrid email error:', error)
      return {
        success: false,
        error: error.message || 'SendGrid error',
        provider: 'sendgrid'
      }
    }
  }
}

/**
 * Nodemailer SMTP Provider
 */
export class NodemailerProvider implements EmailProvider {
  private config: {
    host: string
    port: number
    secure: boolean
    auth: {
      user: string
      pass: string
    }
  }

  constructor(config: any) {
    this.config = config
  }

  async send(options: EmailOptions): Promise<EmailResult> {
    try {
      // TODO: Install nodemailer package: npm install nodemailer @types/nodemailer
      // const nodemailer = require('nodemailer')

      // const transporter = nodemailer.createTransporter(this.config)

      // const result = await transporter.sendMail({
      //   from: options.from,
      //   to: options.to,
      //   subject: options.subject,
      //   html: options.html,
      //   text: options.text,
      //   attachments: options.attachments
      // })

      // Simulação por enquanto
      console.log('📧 SMTP Email (simulated):', {
        from: options.from,
        to: options.to,
        subject: options.subject,
        smtp: this.config.host,
      })

      return {
        success: true,
        messageId: `smtp-sim-${Date.now()}`,
        provider: 'smtp-simulated'
      }
    } catch (error: any) {
      console.error('❌ SMTP email error:', error)
      return {
        success: false,
        error: error.message || 'SMTP error',
        provider: 'smtp'
      }
    }
  }
}

/**
 * Email Service Factory
 */
export class EmailService {
  private provider: EmailProvider

  constructor(provider?: EmailProvider) {
    this.provider = provider || this.createDefaultProvider()
  }

  private createDefaultProvider(): EmailProvider {
    // Prioridade: Resend > SendGrid > SMTP
    if (process.env.RESEND_API_KEY) {
      return new ResendProvider(process.env.RESEND_API_KEY)
    }

    if (process.env.SENDGRID_API_KEY) {
      return new SendGridProvider(process.env.SENDGRID_API_KEY)
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      return new NodemailerProvider({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    }

    // Fallback para desenvolvimento (logs apenas)
    console.warn('⚠️ No email provider configured. Using development mode.')
    return new ResendProvider('dev-mode')
  }

  async sendContactForm(formData: ContactFormData): Promise<EmailResult> {
    const emailOptions: EmailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@olunaengenharia.com.br',
      to: process.env.CONTACT_EMAIL || 'contato@olunaengenharia.com.br',
      subject: this.generateSubject(formData),
      html: this.generateHTML(formData),
      text: this.generateText(formData),
    }

    console.log('📧 Sending email to:', emailOptions.to)
    const result = await this.provider.send(emailOptions)
    
    if (result.success) {
      console.log('✅ Contact form email sent successfully:', {
        messageId: result.messageId,
        provider: result.provider,
        to: emailOptions.to
      })
    } else {
      console.error('❌ Failed to send contact form email:', {
        error: result.error,
        provider: result.provider,
        to: emailOptions.to
      })
    }
    
    return result
  }

  async sendConfirmationEmail(formData: ContactFormData): Promise<EmailResult> {
    const emailOptions: EmailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@olunaengenharia.com.br',
      to: formData.email,
      subject: 'Confirmação de Solicitação - Ôluna Engenharia',
      html: this.generateConfirmationHTML(formData),
      text: this.generateConfirmationText(formData),
    }

    console.log('📧 Sending confirmation email to:', emailOptions.to)
    const result = await this.provider.send(emailOptions)
    
    if (result.success) {
      console.log('✅ Confirmation email sent successfully:', {
        messageId: result.messageId,
        provider: result.provider,
        to: emailOptions.to
      })
    } else {
      console.error('❌ Failed to send confirmation email:', {
        error: result.error,
        provider: result.provider,
        to: emailOptions.to
      })
    }
    
    return result
  }

  private generateSubject(data: ContactFormData): string {
    const urgencyEmojis = {
      urgente: '🚨',
      alta: '⚡',
      media: '📋',
      baixa: '📅',
    }

    const emoji = urgencyEmojis[data.urgency as keyof typeof urgencyEmojis] || '📋'

    return `${emoji} Nova Solicitação: ${data.service} - ${data.company}`
  }

  private generateHTML(data: ContactFormData): string {
    const urgencyColors = {
      urgente: '#dc2626',
      alta: '#ea580c',
      media: '#ca8a04',
      baixa: '#16a34a',
    }

    const urgencyColor = urgencyColors[data.urgency as keyof typeof urgencyColors] || '#6b7280'

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nova Solicitação - Ôluna Engenharia</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6; 
            color: #374151; 
            margin: 0; 
            padding: 0;
            background-color: #f9fafb;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #FF6A3D 0%, #D5577A 50%, #0093FF 100%);
            color: white; 
            padding: 30px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: 600;
          }
          .header p {
            margin: 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content { 
            padding: 30px 20px; 
          }
          .section { 
            margin-bottom: 25px; 
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            overflow: hidden;
          }
          .section-header {
            background: #f3f4f6;
            padding: 12px 16px;
            font-weight: 600;
            font-size: 14px;
            color: #374151;
            border-bottom: 1px solid #e5e7eb;
          }
          .section-content {
            padding: 16px;
          }
          .field-row {
            display: flex;
            margin-bottom: 8px;
          }
          .field-row:last-child {
            margin-bottom: 0;
          }
          .field-label { 
            font-weight: 500; 
            color: #6b7280;
            min-width: 80px;
            margin-right: 12px;
          }
          .field-value { 
            color: #374151;
            flex: 1;
          }
          .urgency-indicator {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            background: ${urgencyColor};
            color: white;
          }
          .message-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 16px;
            font-family: monospace;
            font-size: 14px;
            line-height: 1.5;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            background: #f3f4f6;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
          }
          .cta-buttons {
            margin-top: 20px;
            text-align: center;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 24px;
            margin: 0 8px;
            background: linear-gradient(135deg, #FF6A3D, #D5577A);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            font-size: 14px;
          }
          @media (max-width: 600px) {
            .container { margin: 10px; }
            .field-row { flex-direction: column; }
            .field-label { min-width: auto; margin-bottom: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔥 Nova Solicitação de Análise</h1>
            <p>Recebida em ${new Date().toLocaleString('pt-BR', {
              timeZone: 'America/Sao_Paulo',
              dateStyle: 'full',
              timeStyle: 'short',
            })}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-header">👤 Dados do Solicitante</div>
              <div class="section-content">
                <div class="field-row">
                  <div class="field-label">Nome:</div>
                  <div class="field-value">${data.name}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Email:</div>
                  <div class="field-value"><a href="mailto:${data.email}" style="color: #0093FF;">${data.email}</a></div>
                </div>
                <div class="field-row">
                  <div class="field-label">Telefone:</div>
                  <div class="field-value"><a href="tel:${data.phone}" style="color: #0093FF;">${data.phone}</a></div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-header">🏢 Informações da Empresa</div>
              <div class="section-content">
                <div class="field-row">
                  <div class="field-label">Empresa:</div>
                  <div class="field-value">${data.company}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Cargo:</div>
                  <div class="field-value">${data.position}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Cidade:</div>
                  <div class="field-value">${data.city}</div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-header">🔧 Serviço e Urgência</div>
              <div class="section-content">
                <div class="field-row">
                  <div class="field-label">Serviço:</div>
                  <div class="field-value">${data.service}</div>
                </div>
                <div class="field-row">
                  <div class="field-label">Urgência:</div>
                  <div class="field-value">
                    <span class="urgency-indicator">${data.urgency}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <div class="section-header">💬 Mensagem</div>
              <div class="section-content">
                <div class="message-box">${data.message}</div>
              </div>
            </div>

            <div class="cta-buttons">
              <a href="mailto:${data.email}" class="cta-button">✉️ Responder</a>
              <a href="tel:${data.phone}" class="cta-button">📞 Ligar</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Este email foi gerado automaticamente pelo site da Ôluna Engenharia</p>
            <p>Para mais informações, acesse: <a href="https://olunaengenharia.com.br" style="color: #0093FF;">olunaengenharia.com.br</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private generateText(data: ContactFormData): string {
    return `
NOVA SOLICITAÇÃO DE ANÁLISE - ÔLUNA ENGENHARIA

DADOS DO SOLICITANTE:
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}

EMPRESA:
Nome: ${data.company}
Cargo: ${data.position}
Cidade: ${data.city}

SERVIÇO:
Tipo: ${data.service}
Urgência: ${data.urgency.toUpperCase()}

MENSAGEM:
${data.message}

Data/Hora: ${new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })}

---
Este email foi gerado automaticamente pelo site da Ôluna Engenharia
    `.trim()
  }

  private generateConfirmationHTML(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmação de Solicitação - Ôluna Engenharia</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6; 
            color: #374151; 
            margin: 0; 
            padding: 0;
            background-color: #f9fafb;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #16a34a 0%, #0093FF 100%);
            color: white; 
            padding: 30px 20px; 
            text-align: center;
          }
          .content { padding: 30px 20px; }
          .highlight { color: #16a34a; font-weight: 600; }
          .next-steps {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Solicitação Confirmada!</h1>
            <p>Obrigado pelo seu interesse, ${data.name.split(' ')[0]}!</p>
          </div>
          
          <div class="content">
            <p>Sua solicitação de <strong>${data.service}</strong> foi recebida com sucesso.</p>
            
            <div class="next-steps">
              <h3>📋 Próximos passos:</h3>
              <ul>
                <li><span class="highlight">24 horas:</span> Nossa equipe entrará em contato</li>
                <li><span class="highlight">48 horas:</span> Agendamento da análise inicial</li>
                <li><span class="highlight">5 dias:</span> Relatório preliminar</li>
              </ul>
            </div>
            
            <p><strong>Dados da sua solicitação:</strong></p>
            <ul>
              <li>Empresa: ${data.company}</li>
              <li>Serviço: ${data.service}</li>
              <li>Urgência: ${data.urgency}</li>
              <li>Cidade: ${data.city}</li>
            </ul>
            
            <p>Dúvidas? Entre em contato:</p>
            <p>📧 <a href="mailto:contato@olunaengenharia.com.br">contato@olunaengenharia.com.br</a><br>
            📱 <a href="tel:+5521973498376">(21) 97349-8376</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private generateConfirmationText(data: ContactFormData): string {
    return `
CONFIRMAÇÃO DE SOLICITAÇÃO - ÔLUNA ENGENHARIA

Olá ${data.name.split(' ')[0]}!

Sua solicitação de ${data.service} foi recebida com sucesso.

PRÓXIMOS PASSOS:
• 24 horas: Nossa equipe entrará em contato
• 48 horas: Agendamento da análise inicial  
• 5 dias: Relatório preliminar

DADOS DA SOLICITAÇÃO:
Empresa: ${data.company}
Serviço: ${data.service}
Urgência: ${data.urgency}
Cidade: ${data.city}

Dúvidas? Entre em contato:
Email: contato@olunaengenharia.com.br
Telefone: (11) 99999-9999

Obrigado pela confiança!
Equipe Ôluna Engenharia
    `.trim()
  }
}

// Export singleton instance
export const emailService = new EmailService()
