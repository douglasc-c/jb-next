// src/app/layout.tsx
import { AppProviders } from '@/context'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'

const languages = ['pt-BR']

export const metadata: Metadata = {
  title: '4Hands',
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

  // Define a URL base; pode ser definida via variável de ambiente
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : 'http://localhost:3000'

  // Carrega as traduções
  const res = await fetch(`${baseUrl}/locales/${locale}.json`)
  if (!res.ok) {
    throw new Error(
      `Não foi possível carregar as traduções para o idioma ${locale}`,
    )
  }
  const messages = await res.json()

  // Valores iniciais para o AuthProvider e LayoutProvider (exemplo)
  const authValue = {}
  const layoutValue = { locale }

  return (
    <html lang={locale}>
      <body className="bg-zinc-200">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders authValue={authValue} layoutValue={layoutValue}>
            {children}
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
