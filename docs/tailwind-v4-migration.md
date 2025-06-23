# Migração para Tailwind CSS v4

## O que mudou

### Removidos
- `tailwind.config.ts` - Não é mais necessário
- `postcss.config.js` - Tailwind v4 não depende mais do PostCSS

### Novo Sistema
O Tailwind v4 usa CSS nativo com a diretiva `@import "tailwindcss"` e o bloco `@theme` para customizações.

## Estrutura de Arquivos CSS

### 1. `/src/app/globals.css`
Arquivo principal com:
- Import do Tailwind CSS v4
- Variáveis de tema customizadas no bloco `@theme`
- Estilos base, componentes e utilitários

### 2. `/src/styles/tailwind-theme.css`
Arquivo adicional demonstrando:
- Extensões avançadas do tema
- Componentes complexos
- Utilitários específicos do projeto

## Como Usar

### Variáveis CSS Customizadas
```css
/* Usar diretamente nas classes do Tailwind */
<div className="bg-[var(--color-primary-500)]">
  Conteúdo
</div>

/* Ou nas classes utilitárias customizadas */
<h1 className="text-primary">Título</h1>
```

### Classes de Componentes
```jsx
// Botões
<button className="btn btn-primary">Primário</button>
<button className="btn btn-secondary">Secundário</button>
<button className="btn btn-outline">Outline</button>

// Cards
<div className="card">
  Conteúdo do card
</div>

// Container responsivo
<div className="container">
  Conteúdo centralizado
</div>

// Grid responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Utilitários Especiais
```jsx
// Glassmorphism
<div className="glass">
  Efeito de vidro
</div>

// Texto gradiente
<h1 className="gradient-text">
  Texto com gradiente
</h1>

// Animações customizadas
<div className="animate-float">
  Elemento flutuante
</div>

// Glow effect
<button className="glow-primary glow-primary-hover">
  Botão com brilho
</button>
```

## Variáveis de Tema Disponíveis

### Cores
- **Primary**: `--color-primary-50` até `--color-primary-900`
- **Gray**: `--color-gray-50` até `--color-gray-900`
- **Success**: `--color-success`
- **Warning**: `--color-warning`
- **Error**: `--color-error`
- **Info**: `--color-info`

### Tipografia
- **Sans**: `--font-sans`
- **Mono**: `--font-mono`

### Espaçamentos
- **Section**: `--spacing-section`
- **Container**: `--spacing-container`

### Outros
- **Raios**: `--radius-card`, `--radius-button`
- **Sombras**: `--shadow-card`, `--shadow-card-hover`
- **Z-index**: `--z-dropdown`, `--z-modal`, etc.
- **Transições**: `--transition-fast`, `--transition-normal`, `--transition-slow`

## Modo Escuro
O tema suporta modo escuro automaticamente usando `prefers-color-scheme`. As variáveis `--foreground` e `--background` se ajustam automaticamente.

## Performance
O Tailwind v4 oferece melhor performance pois:
- Não requer processamento PostCSS
- Usa CSS nativo
- Menor tempo de build
- Melhor tree-shaking

## Comandos
Não há mudanças nos comandos do projeto:
```bash
npm run dev    # Desenvolvimento
npm run build  # Build de produção
```