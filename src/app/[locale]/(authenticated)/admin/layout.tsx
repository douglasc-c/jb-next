import '@/app/globals.css'
import { getTranslations } from 'next-intl/server'
import Header from '@/components/header/header'
// import { LayoutProvider, LayoutContextProps } from '@/context/layout-context'
import Sidebar from '@/components/header/sidebar-admin'

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
  params: {
    lng: string
  }
}) {
  const t = await getTranslations(lng)

  const textHeader = {
    welcome: t('TextLang.welcome'),
    dashboard: t('TextLang.dashboard'),
    constructionCircuit: t('TextLang.constructionCircuit'),
    compliance: t('TextLang.compliance'),
    users: t('TextLang.users'),
    stages: t('TextLang.stages'),
    interests: t('TextLang.interests'),
    ventures: t('TextLang.ventures'),
    support: t('TextLang.support'),
    signOut: t('TextLang.signOut'),
  }

  // const layoutValue: LayoutContextProps = {

  // }

  return (
    <html lang={lng}>
      <body className="bg-neutral-950 text-white flex">
        <Sidebar text={textHeader} />
        <div className="ml-64 flex-grow">
          <Header text={textHeader} />
          {/* <LayoutProvider value={layoutValue}> */}
          {children}
          {/* </LayoutProvider> */}
        </div>
      </body>
    </html>
  )
}
