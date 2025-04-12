'use client'

import { useTranslations } from 'next-intl'

export default function Dashboard() {
  const t = useTranslations('TextLang')

  return (
    <main className="m-4 md:ml-0 mt-0 bg-gray border border-border h-[calc(100vh-5rem)] flex flex-col items-start md:p-10 p-4 rounded-lg space-y-4 antialiased">
      <h1 className="text-2xl font-medium text-zinc-200">{t('dashboard')}</h1>
      <section className="flex w-full flex-col md:flex-row gap-6"></section>
    </main>
  )
}
