// src/app/layout.tsx
import '@/app/globals.css'
import { getLocale, getTranslations } from 'next-intl/server'
import Header from '@/components/header/header'
import { LayoutProvider, LayoutContextProps } from '@/context/layout-context'
import Sidebar from '@/components/header/sidebar'

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
  const textYourResources = {
    youResources: t('TextLang.youResources'),
    estimatedAssets: t('TextLang.estimatedAssets'),
    numberOfHouse: t('TextLang.numberOfHouse'),
    land: t('TextLang.land'),
    avaliableValue: t('TextLang.avaliableValue'),
  }

  const textDataInvestments = {
    totalBalance: t('TextLang.totalBalance'),
    balanceInvested: t('TextLang.balanceInvested'),
    developments: t('TextLang.developments'),
    portfolio: t('TextLang.portfolio'),
    invested: t('TextLang.invested'),
  }

  const textNewOpportunities = {
    newOpportunitiesPortifolio: t('TextLang.newOpportunitiesPortifolio'),
    document: t('TextLang.document'),
    startDate: t('TextLang.startDate'),
    address: t('TextLang.address'),
    seeMore: t('TextLang.seeMore'),
  }

  const textMyContracts = {
    status: t('TextLang.status'),
    company: t('TextLang.company'),
    date: t('TextLang.date'),
    amountInvested: t('TextLang.amountInvested'),
    amountTransferred: t('TextLang.amountTransferred'),
    shares: t('TextLang.shares'),
  }

  const textMyData = {
    myData: t('TextLang.myData'),
    name: t('TextLang.name'),
    lastName: t('TextLang.lastName'),
    email: t('TextLang.email'),
    documentNumber: t('TextLang.documentNumber'),
    dateOfBith: t('TextLang.dateOfBith'),
    country: t('TextLang.country'),
    address: t('TextLang.address'),
    city: t('TextLang.city'),
    password: t('TextLang.password'),
    confirmPassword: t('TextLang.confirmPassword'),
    shares: t('TextLang.shares'),
    at4HandsRealEstateInvestments: t('TextLang.at4HandsRealEstateInvestments'),
    tochangeInformationPleaseContactOur: t(
      'TextLang.tochangeInformationPleaseContactOur',
    ),
    technicalSupport: t('TextLang.technicalSupport'),
  }

  const textCompliance = {
    compliance: t('TextLang.compliance'),
    verifyYourIdentity: t('TextLang.verifyYourIdentity'),
    documentType: t('TextLang.documentType'),
    idOfTheIssuingBody: t('TextLang.idOfTheIssuingBody'),
    orDragYourDocumentHere: t('TextLang.orDragYourDocumentHere'),
    attach: t('TextLang.attach'),
    support: t('TextLang.support'),
    step: t('TextLang.step'),
    from: t('TextLang.from'),
    previo: t('TextLang.previo'),
    next: t('TextLang.next'),
    finish: t('TextLang.finish'),
    at4HandsRealEstateInvestmentsWeNeedTo: t(
      'TextLang.at4HandsRealEstateInvestmentsWeNeedTo',
    ),
    lgptLaws: t('TextLang.lgptLaws'),
    verificationCompleted: t('TextLang.verificationCompleted'),
    congratulationsYouHaveSubmittedYourDocumentsAndCompletedTheMandatoryComplianceStep:
      t(
        'TextLang.congratulationsYouHaveSubmittedYourDocumentsAndCompletedTheMandatoryComplianceStep',
      ),
    howDoIChangeMyDataAndDocuments: t(
      'TextLang.howDoIChangeMyDataAndDocuments',
    ),
  }

  const layoutValue: LayoutContextProps = {
    textYourResources,
    textDataInvestments,
    textNewOpportunities,
    textMyContracts,
    textMyData,
    textCompliance,
    locale,
  }

  return (
    <html lang={lng}>
      <body className="bg-neutral-950 text-white flex">
        <Sidebar text={textHeader} locale={locale} />
        <div className="ml-64 flex-grow">
          <Header text={textHeader} locale={locale} />
          <LayoutProvider value={layoutValue}>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  )
}
