import type { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'

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
  params: {
    lng: string
  }
}) {
  const locale = await getLocale()
  const t = await getTranslations(lng)

  const textSignIn = {
    enter: t('TextLang.enter'),
    useYour4HandsLoginToAccess: t('TextLang.useYour4HandsLoginToAccess'),
    email: t('TextLang.email'),
    password: t('TextLang.password'),
    forgotYourPassword: t('TextLang.forgotYourPassword'),
    signIn: t('TextLang.signIn'),
    privacyCookPolicy: t('TextLang.privacyCookPolicy'),
    TermsOfService: t('TextLang.TermsOfService'),
    yourInformationIsSafe: t('TextLang.yourInformationIsSafe'),
  }

  const layoutValue = { textSignIn, locale }

  return (
    <html lang={lng}>
      <body className="text-white">
        <AuthProvider value={layoutValue}>{children}</AuthProvider>
      </body>
    </html>
  )
}
