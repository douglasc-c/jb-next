import '@/app/globals.css'
import Sidebar from '@/components/header/sidebar-admin'
import { getLocale } from 'next-intl/server'

const languages = ['pt-BR']
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const locale = await getLocale()

  return (
    <html lang={lng}>
      <body className="flex flex-col h-screen">
        <Sidebar locale={locale} />
        <div className="md:ml-64 flex-grow overflow-y-auto bg-primary">
          {children}
        </div>
      </body>
    </html>
  )
}
