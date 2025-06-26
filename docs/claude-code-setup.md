# Claude Code Setup - Configuração Otimizada

Este documento descreve como o projeto foi configurado para maximizar a produtividade com o Claude Code.

## 📁 Arquivos de Configuração Criados

### 1. **CLAUDE.md** - Guia Principal

- Documentação completa do projeto
- Padrões de código e convenções
- Comandos de desenvolvimento
- Exemplos de implementação
- Checklist de qualidade

### 2. **.claude-prompts** - Prompts Pré-definidos

- Prompts para desenvolvimento de componentes
- Templates para formulários e APIs
- Comandos para otimização e testes
- Snippets de código comum

### 3. **.vscode/** - Configuração VS Code

- **extensions.json**: Extensões recomendadas
- **settings.json**: Configurações otimizadas
- **tasks.json**: Tasks automatizadas
- **launch.json**: Configurações de debug
- **snippets.code-snippets**: Snippets personalizados

### 4. **src/utils/** - Utilitários

- **cn.ts**: Utility para classes CSS
- **format.ts**: Formatação de dados
- **validation.ts**: Validações de formulário

### 5. **src/types/index.ts** - Tipos TypeScript

- Interfaces completas do negócio
- Tipos de componentes
- Enums e constantes
- Configurações da aplicação

### 6. **package.json** - Scripts Atualizados

- Scripts de desenvolvimento
- Comandos de qualidade
- Ferramentas de análise

## 🚀 Como Usar com Claude Code

### Comandos Rápidos

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run validate         # Validação completa
npm run prepare-commit   # Preparar para commit

# Análise
npm run analyze          # Bundle analyzer
npm run security-check   # Audit de segurança
npm run lighthouse       # Performance audit
```

### Prompts Úteis

Use os prompts do arquivo `.claude-prompts`:

```
# Criar componente
Crie um componente Card em components/common/ que...

# Otimizar página
Analise e otimize a página home para Core Web Vitals...

# Criar formulário
Crie um formulário de contato com React Hook Form e Zod...
```

### Snippets no VS Code

- `nxpage` - Página Next.js com metadata
- `rcomp` - Componente React com TypeScript
- `hook` - Custom hook
- `test` - Suite de testes Jest
- `form` - Formulário com validação

## 🎯 Principais Benefícios

### 1. **Documentação Centralizada**

- Toda informação importante em `CLAUDE.md`
- Padrões claramente definidos
- Exemplos práticos de implementação

### 2. **Prompts Pré-configurados**

- Acelera desenvolvimento com templates
- Garante consistência no código
- Reduz tempo de configuração

### 3. **Validação Automática**

- Scripts que verificam qualidade
- Lint, types e testes automatizados
- CI/CD ready

### 4. **Tipos Completos**

- TypeScript configurado
- Interfaces de negócio definidas
- Auto-complete otimizado

### 5. **Utilitários Prontos**

- Formatação de dados brasileiros
- Validações comuns
- Helpers de CSS

## 🔧 Configurações VS Code

### Extensões Automáticas

- TypeScript & React development
- Tailwind CSS IntelliSense
- ESLint & Prettier
- Jest testing
- Git integration

### Tasks Configuradas

- `Ctrl+Shift+P` → "Tasks: Run Task"
- Desenvolvimento, testes, build
- Validação completa
- Análise de bundle

### Debug Setup

- Next.js server & client debugging
- Jest test debugging
- TypeScript checking

## 📝 Workflow Recomendado

### 1. **Desenvolvimento de Feature**

```bash
# 1. Verificar TODOs pendentes
# 2. Criar branch para feature
# 3. Desenvolver usando prompts e snippets
# 4. Validar código
npm run validate

# 5. Preparar commit
npm run prepare-commit
```

### 2. **Usando Prompts Claude**

```
# Exemplo: Criar nova página
"Crie uma página 'Sobre' em app/sobre/page.tsx que:
- Tenha metadata SEO otimizada
- Use Server Components
- Seja responsiva
- Inclua seção da equipe
- Tenha animações suaves"
```

### 3. **Verificação de Qualidade**

```bash
# Antes de cada commit
npm run format          # Formatar código
npm run lint:fix        # Corrigir lint errors
npm run typecheck       # Verificar tipos
npm run test:ci         # Executar testes
```

## 📚 Recursos Adicionais

### Documentação Técnica

- `/docs/` - Documentação do projeto
- `CLAUDE.md` - Guia principal
- `package.json` - Scripts disponíveis

### Tipos e Interfaces

- `src/types/index.ts` - Todas as definições
- Autocomplete completo
- Validação em tempo real

### Utilitários

- `src/utils/cn.ts` - Classes CSS
- `src/utils/format.ts` - Formatação
- `src/utils/validation.ts` - Validações

## 🎨 Customização

### Adicionar Novos Prompts

Edite `.claude-prompts` para incluir prompts específicos do projeto.

### Configurar Snippets

Edite `.vscode/snippets.code-snippets` para adicionar novos snippets.

### Atualizar Tipos

Edite `src/types/index.ts` para adicionar novos tipos de negócio.

### Configurar Tasks

Edite `.vscode/tasks.json` para adicionar novos comandos.

## 🔍 Troubleshooting

### Problemas Comuns

1. **TypeScript Errors**

   - Verificar `tsconfig.json`
   - Executar `npm run typecheck`
   - Verificar importações

2. **Lint Errors**

   - Executar `npm run lint:fix`
   - Verificar `.eslintrc.json`
   - Configurar VS Code

3. **Performance Issues**
   - Executar `npm run analyze`
   - Verificar bundle size
   - Otimizar imports

### Comandos de Debug

```bash
# Verificar configuração
npm run typecheck
npm run lint
npm run test:ci

# Analisar performance
npm run analyze
npm run lighthouse

# Limpar cache
npm run clean
```

## 🚀 Próximos Passos

1. **Implementar componentes base** usando snippets
2. **Criar páginas principais** com prompts
3. **Configurar testes** para componentes críticos
4. **Otimizar performance** com análise de bundle
5. **Implementar CI/CD** com validação automática

---

Esta configuração foi projetada para maximizar a produtividade com Claude Code, fornecendo:

- ✅ Documentação clara e acessível
- ✅ Prompts pré-configurados para tarefas comuns
- ✅ Ferramentas de desenvolvimento otimizadas
- ✅ Validação automática de qualidade
- ✅ Tipos e utilitários prontos para uso

**Dica**: Sempre consulte `CLAUDE.md` para orientações específicas e `Claude-prompts` para templates de desenvolvimento!
