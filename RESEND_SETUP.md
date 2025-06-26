# 📧 Configuração do Resend para Envio de Emails

## ✅ Status: FORMULÁRIOS ATIVADOS!

Os formulários da Ôluna Engenharia estão configurados para enviar emails reais para **contato@oluna.com.br**.

## 🚀 Como obter sua API Key do Resend:

### 1. Criar conta no Resend
1. Acesse: https://resend.com/
2. Clique em "Sign Up" 
3. Use o email da empresa: **contato@oluna.com.br**
4. Confirme o email

### 2. Obter API Key
1. Acesse o dashboard: https://resend.com/api-keys
2. Clique em "Create API Key"
3. Nome: "Oluna Website Forms"
4. Permissão: "Sending access"
5. Copie a chave (começa com `re_`)

### 3. Configurar no projeto
1. Edite o arquivo `.env` na raiz do projeto
2. Substitua `seu_resend_api_key_aqui` pela chave real:
   ```bash
   RESEND_API_KEY=re_sua_chave_real_aqui
   ```

### 4. Verificar domínio (IMPORTANTE!)
1. No Resend, vá em "Domains"
2. Adicione o domínio: `oluna.com.br`
3. Configure os registros DNS conforme instruções
4. Aguarde verificação (até 24h)

## 📋 O que os formulários fazem:

### ✅ Quando alguém preenche:
1. **Dados validados** (segurança total)
2. **Email enviado para:** contato@oluna.com.br
3. **Email de confirmação** enviado para o cliente
4. **Design profissional** com dados organizados

### 📧 Conteúdo do email para vocês:
- 👤 Dados completos do cliente
- 🏢 Informações da empresa  
- 🔧 Serviço solicitado
- ⚡ Nível de urgência (visual com cores)
- 💬 Mensagem detalhada
- 📞 Botões para ligar/responder

### 🛡️ Segurança implementada:
- ✅ Rate limiting (5 envios por hora)
- ✅ Proteção anti-spam
- ✅ Validação de dados
- ✅ Sanitização de inputs

## 💰 Custos:
- **GRATUITO** até 3.000 emails/mês
- Mais que suficiente para formulários de contato

## 🚨 Status atual:
- **SEM API KEY**: Modo desenvolvimento (só logs)
- **COM API KEY**: Emails reais ativados ✅

## 📞 Suporte:
Se precisar de ajuda, o Filipe pode configurar remotamente!