// src/app/layout.tsx
import { AppProviders } from '@/context'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'

const languages = ['pt-BR', 'es-US']

export const metadata: Metadata = {
  title: 'Auditax',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const locale = lng || 'pt-BR'

  let messages
  try {
    // Em produção, a URL será relativa ao domínio atual
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const res = await fetch(`${baseUrl}/locales/${locale}.json`)
    if (!res.ok) {
      throw new Error(`Falha ao carregar traduções: ${res.status}`)
    }
    messages = await res.json()
  } catch (error) {
    console.error(`Erro ao carregar traduções para ${locale}:`, error)
    messages = {}
  }

  const authValue = {}

  return (
    <html lang={locale}>
      <body className="flex flex-col h-screen bg-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders authValue={authValue}>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
