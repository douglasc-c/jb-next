// src/app/layout.tsx
import { AppProviders } from '@/context'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const languages = ['pt-BR', 'es-US']

export const metadata: Metadata = {
  title: 'Auditaxs',
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const dynamic = 'force-dynamic'

async function getMessages(locale: string) {
  try {
    return (await import(`../../public/locales/${locale}.json`)).default
  } catch (error) {
    console.error(`Erro ao carregar traduções para ${locale}:`, error)
    return {}
  }
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const locale = lng || 'pt-BR'
  const messages = await getMessages(locale)
  const authValue = {}

  return (
    <html lang={locale}>
      <body className="flex flex-col h-screen bg-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders authValue={authValue}>{children}</AppProviders>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
