import '@/app/globals.css'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/header/header-admin'
import {
  LayoutAdminContextProps,
  LayoutProvider,
} from '@/context/layout-admin-context'
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
    users: t('TextLang.users'),
    stages: t('TextLang.stages'),
    interests: t('TextLang.interests'),
    ventures: t('TextLang.ventures'),
    support: t('TextLang.support'),
    signOut: t('TextLang.signOut'),
  }

  const textUsers = {
    name: t('TextLang.name'),
    compliance: t('TextLang.compliance'),
    type: t('TextLang.type'),
    seeMore: t('TextLang.seeMore'),
    pendingAddress: t('TextLang.pendingAddress'),
    pendingDocuments: t('TextLang.pendingDocuments'),
    validated: t('TextLang.validated'),
    unknownStatus: t('TextLang.unknownStatus'),
    underReview: t('TextLang.underReview'),
    total: t('TextLang.total'),
    admins: t('TextLang.admins'),
    addUser: t('TextLang.addUser'),
    userType: t('TextLang.userType'),
    role: t('TextLang.role'),
    users: t('TextLang.users'),
    email: t('TextLang.email'),
    password: t('TextLang.password'),
    username: t('TextLang.username'),
    lastName: t('TextLang.lastName'),
    cancel: t('TextLang.cancel'),
    add: t('TextLang.add'),
    admin: t('TextLang.admin'),
    user: t('TextLang.user'),
    individual: t('TextLang.individual'),
  }

  const layoutValue: LayoutAdminContextProps = { textUsers, locale }

  return (
    <html lang={lng}>
      <body className="bg-neutral-950 text-white flex">
        <Sidebar text={textHeader} locale={locale} />
        <div className="ml-64 flex-grow">
          <Header text={textHeader} />
          <LayoutProvider value={layoutValue}>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  )
}
