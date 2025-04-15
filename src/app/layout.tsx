// src/app/layout.tsx
import { AppProviders } from '@/context'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'
import fs from 'fs/promises'
import path from 'path'

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
    const filePath = path.join(
      process.cwd(),
      'public',
      'locales',
      `${locale}.json`,
    )
    const fileContent = await fs.readFile(filePath, 'utf8')
    messages = JSON.parse(fileContent)
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
