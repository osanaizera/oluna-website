# Projeto Website Ôluna Engenharia - Guia para Claude Code

## Visão Geral
Site institucional da Ôluna Engenharia, empresa especializada em soluções de engenharia. Este projeto utiliza as tecnologias mais modernas para criar uma experiência web rápida, acessível e otimizada para SEO.

## Stack Tecnológica Detalhada
- **Framework**: Next.js 14.2.22 (App Router)
- **Linguagem**: TypeScript 5.x
- **Estilização**: Tailwind v4
- **Testes**: Jest 29.x + React Testing Library
- **Linting**: ESLint 8.x + Prettier 3.x
- **Deploy**: Vercel (otimizado para Edge Functions)
- **Node**: 18.x ou superior

## Estrutura do Projeto Detalhada
```
oluna-website/
├── src/
│   ├── app/                # App Router do Next.js
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página inicial
│   │   ├── globals.css     # Estilos globais
│   │   ├── sobre/          # Página sobre
│   │   ├── servicos/       # Página de serviços
│   │   ├── projetos/       # Portfolio de projetos
│   │   ├── contato/        # Página de contato
│   │   └── blog/           # Blog (opcional)
│   ├── components/         # Componentes React
│   │   ├── common/         # Botões, Cards, Modals, etc
│   │   ├── layout/         # Header, Footer, Navigation
│   │   └── sections/       # Hero, Features, Testimonials
│   ├── styles/             # Estilos e temas
│   │   └── tailwind-theme.css
│   ├── utils/              # Funções auxiliares
│   │   ├── format.ts       # Formatadores (data, moeda, etc)
│   │   ├── validation.ts   # Validações de formulário
│   │   └── seo.ts          # Utilitários de SEO
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollLock.ts
│   │   ├── useMediaQuery.ts
│   │   └── useIntersectionObserver.ts
│   ├── services/           # Integrações e APIs
│   │   ├── api.ts          # Cliente API
│   │   ├── email.ts        # Serviço de email
│   │   └── analytics.ts    # Google Analytics
│   ├── lib/                # Configurações de bibliotecas
│   │   └── fonts.ts        # Configuração de fontes
│   └── types/              # Tipos TypeScript
│       ├── index.ts        # Tipos globais
│       └── api.ts          # Tipos de API
├── public/                 # Assets estáticos
│   ├── images/            # Imagens do site
│   ├── icons/             # Ícones e favicons
│   └── documents/         # PDFs e documentos
├── tests/                  # Testes automatizados
│   ├── unit/              # Testes unitários
│   ├── integration/       # Testes de integração
│   └── e2e/               # Testes end-to-end
└── docs/                   # Documentação do projeto
```

## Comandos de Desenvolvimento

### Comandos Principais
```bash
npm run dev                 # Inicia servidor de desenvolvimento (localhost:3000)
npm run build              # Build de produção
npm run start              # Inicia servidor de produção
npm run lint               # Verifica erros de linting
npm run lint:fix           # Corrige erros de linting automaticamente
npm run typecheck          # Verifica tipos TypeScript
npm run test               # Executa todos os testes
npm run test:watch         # Testes em modo watch
npm run test:coverage      # Gera relatório de cobertura
npm run format             # Formata código com Prettier
npm run format:check       # Verifica formatação
```

### Comandos de Desenvolvimento Úteis
```bash
npm run analyze            # Analisa bundle size
npm run clean              # Limpa cache e builds
npm run validate           # Executa lint, typecheck e testes
npm run prepare-commit     # Prepara código para commit
npm run storybook          # Inicia Storybook (se configurado)
npm run lighthouse         # Executa auditoria Lighthouse
```

## Padrões de Código e Convenções

### Estrutura de Componentes
```typescript
// components/common/Button.tsx
import { ButtonHTMLAttributes, FC } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button-base',
        `button-${variant}`,
        `button-${size}`,
        isLoading && 'button-loading',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Estrutura de Páginas (App Router)
```typescript
// app/servicos/page.tsx
import { Metadata } from 'next'
import { ServicesHero } from '@/components/sections/ServicesHero'
import { ServicesList } from '@/components/sections/ServicesList'

export const metadata: Metadata = {
  title: 'Serviços - Ôluna Engenharia',
  description: 'Conheça nossos serviços especializados em engenharia',
}

export default function ServicosPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
    </>
  )
}
```

### Padrões de Hooks Customizados
```typescript
// hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px'
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isIntersecting }
}
```

## Configurações de SEO

### Meta Tags Padrão
```typescript
// lib/seo.ts
export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://olunaengenharia.com.br'),
  title: {
    default: 'Ôluna Engenharia',
    template: '%s | Ôluna Engenharia'
  },
  description: 'Soluções inovadoras em engenharia',
  keywords: ['engenharia', 'construção', 'projetos', 'consultoria'],
  authors: [{ name: 'Ôluna Engenharia' }],
  creator: 'Ôluna Engenharia',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://olunaengenharia.com.br',
    siteName: 'Ôluna Engenharia',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ôluna Engenharia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@olunaengenharia'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
}
```

## Padrões de Performance

### Otimização de Imagens
```typescript
// Sempre use next/image com configurações otimizadas
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Descrição detalhada"
  width={1200}
  height={600}
  priority // Para imagens above-the-fold
  placeholder="blur"
  blurDataURL="..." // Base64 para placeholder
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Lazy Loading de Componentes
```typescript
// Use dynamic imports para componentes pesados
import dynamic from 'next/dynamic'

const MapComponent = dynamic(
  () => import('@/components/common/Map'),
  { 
    loading: () => <MapSkeleton />,
    ssr: false // Para componentes client-only
  }
)
```

## Acessibilidade (a11y)

### Checklist de Acessibilidade
- [ ] Todos os botões e links têm labels descritivos
- [ ] Imagens possuem alt text apropriado
- [ ] Formulários têm labels associados
- [ ] Navegação por teclado funciona corretamente
- [ ] Cores têm contraste WCAG AA (mínimo)
- [ ] ARIA labels quando necessário
- [ ] Skip links para navegação
- [ ] Testes com screen readers

### Exemplo de Componente Acessível
```typescript
// components/common/Card.tsx
export const Card: FC<CardProps> = ({ title, description, link }) => {
  return (
    <article className="card" role="article" aria-labelledby={`card-${title}`}>
      <h3 id={`card-${title}`}>{title}</h3>
      <p>{description}</p>
      <a href={link} aria-label={`Saiba mais sobre ${title}`}>
        Saiba mais
        <span className="sr-only">sobre {title}</span>
      </a>
    </article>
  )
}
```

## Integração com APIs

### Cliente API Base
```typescript
// services/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.olunaengenharia.com.br'

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response.json()
}
```

## Formulários e Validação

### Exemplo de Formulário de Contato
```typescript
// components/forms/ContactForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    // Enviar dados
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Campos do formulário */}
    </form>
  )
}
```

## Testes

### Estrutura de Testes
```typescript
// tests/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/common/Button'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when loading', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## Deploy e CI/CD

### Configuração Vercel
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["gru1"],
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "NEXT_PUBLIC_GA_ID": "@ga_id"
  }
}
```

### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run validate
      - run: npm run test:coverage
```

## Debugging e Troubleshooting

### Problemas Comuns

1. **Erro de Hidratação**
   - Verifique se o conteúdo do servidor e cliente são idênticos
   - Use `suppressHydrationWarning` apenas como último recurso
   - Considere usar `dynamic` com `ssr: false` para componentes client-only

2. **Performance Issues**
   - Use React DevTools Profiler
   - Verifique re-renders desnecessários
   - Implemente `memo`, `useMemo`, e `useCallback` quando apropriado

3. **TypeScript Errors**
   - Sempre defina tipos explícitos para props
   - Use `satisfies` operator para type safety
   - Evite `any` - use `unknown` quando necessário

## Recursos e Referências

### Documentação Essencial
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Ferramentas de Desenvolvimento
- [Next.js DevTools](https://nextjs.org/docs/advanced-features/debugging)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

## Notas Importantes para Claude Code

1. **Sempre priorize performance**: Use Server Components por padrão, Client Components apenas quando necessário
2. **SEO é crítico**: Sempre configure metadata apropriada para cada página
3. **Mobile-first**: Desenvolva primeiro para mobile, depois adapte para desktop
4. **Acessibilidade**: Teste com teclado e screen readers
5. **Commits semânticos**: Use conventional commits (feat:, fix:, docs:, etc)
6. **Code splitting**: Divida o código em chunks menores para melhor performance
7. **Error boundaries**: Implemente error boundaries para melhor UX
8. **Loading states**: Sempre forneça feedback visual durante carregamentos

## Checklist de Qualidade

Antes de fazer commit ou deploy, verifique:

- [ ] Código está formatado (npm run format)
- [ ] Não há erros de lint (npm run lint)
- [ ] Tipos estão corretos (npm run typecheck)
- [ ] Testes estão passando (npm run test)
- [ ] Build está funcionando (npm run build)
- [ ] Lighthouse score > 90 em todas as métricas
- [ ] Funciona em todos os navegadores alvo
- [ ] Responsivo em todas as resoluções
- [ ] Imagens estão otimizadas
- [ ] Sem console.logs em produção