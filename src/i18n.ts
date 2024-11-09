import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

const locales = ['pt-BR'] as const

export default getRequestConfig(async () => {
  const headersData = await headers()
  const locale = headersData.get('X-NEXT-INTL-LOCALE') || 'pt-BR'

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default,
  }
})
