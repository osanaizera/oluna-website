import type { Metadata } from 'next'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Ôluna Engenharia',
  description: 'Soluções em Engenharia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}