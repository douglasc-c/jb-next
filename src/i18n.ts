import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

const locales = ['pt-BR'] as const

export default getRequestConfig(async () => {
  const headersData = headers()
  const locale = headersData.get('X-NEXT-INTL-LOCALE') || 'pt-BR'

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  return {
    locale,
    timeZone: 'America/Sao_Paulo',
    messages: (await import(`../public/locales/${locale}.json`)).default,
  }
})
