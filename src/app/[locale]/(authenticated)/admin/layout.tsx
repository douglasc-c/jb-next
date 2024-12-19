import '@/app/globals.css'
import { getLocale, getTranslations } from 'next-intl/server'
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
  const locale = await getLocale()
  const t = await getTranslations(lng)

  const textHeader = {
    welcome: t('TextLang.welcome'),
    dashboard: t('TextLang.dashboard'),
    constructionCircuit: t('TextLang.constructionCircuit'),
    compliance: t('TextLang.compliance'),
    myData: t('TextLang.myData'),
    myVentures: t('TextLang.myVentures'),
    support: t('TextLang.support'),
    signOut: t('TextLang.signOut'),
  }

  // const layoutValue: LayoutContextProps = {
  //   locale,
  // }

  return (
    <html lang={lng}>
      <body className="bg-neutral-950 text-white flex">
        <Sidebar text={textHeader} locale={locale} />
        <div className="ml-64 flex-grow">
          <Header text={textHeader} locale={locale} />
          {/* <LayoutProvider value={layoutValue}> */}
          {children}
          {/* </LayoutProvider> */}
        </div>
      </body>
    </html>
  )
}
