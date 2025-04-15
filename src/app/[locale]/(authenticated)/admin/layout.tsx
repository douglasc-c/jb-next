import '@/app/globals.css'

import { SidebarProvider } from '@/context/sidebar-context'
import { getLocale } from 'next-intl/server'
import ClientLayout from './client-layout'

const languages = ['pt-BR']
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function AdminLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const locale = await getLocale()

  return (
    <SidebarProvider>
      <ClientLayout locale={locale}>{children}</ClientLayout>
    </SidebarProvider>
  )
}
