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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/locales/${locale}.json`)
  if (!res.ok) {
    throw new Error(
      `Não foi possível carregar as traduções para o idioma ${locale}`,
    )
  }
  const messages = await res.json()

  const authValue = {}

  return (
    <html lang={locale}>
      <body className="bg-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders authValue={authValue}>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
