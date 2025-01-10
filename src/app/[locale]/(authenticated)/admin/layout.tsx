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

  const texts = {
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
    addVenture: t('TextLang.addVenture'),
    available: t('TextLang.available'),
    inProgress: t('TextLang.inProgress'),
    ventureName: t('TextLang.ventureName'),
    description: t('TextLang.description'),
    corporateName: t('TextLang.corporateName'),
    investmentType: t('TextLang.investmentType'),
    isAvailable: t('TextLang.isAvailable'),
    constructionType: t('TextLang.constructionType'),
    fundingAmount: t('TextLang.fundingAmount'),
    transferAmount: t('TextLang.transferAmount'),
    squareMeterValue: t('TextLang.squareMeterValue'),
    area: t('TextLang.area'),
    floorNumber: t('TextLang.floorNumber'),
    completionDate: t('TextLang.completionDate'),
    address: t('TextLang.address'),
    city: t('TextLang.city'),
    postalCode: t('TextLang.postalCode'),
    property: t('TextLang.property'),
    other: t('TextLang.other'),
    status: t('TextLang.status'),
    company: t('TextLang.company'),
    date: t('TextLang.date'),
    amountInvested: t('TextLang.amountInvested'),
    amountTransferred: t('TextLang.amountTransferred'),
    shares: t('TextLang.shares'),
    interests: t('TextLang.interests'),
    typeOfConstruction: t('TextLang.typeOfConstruction'),
    contributionAmount: t('TextLang.contributionAmount'),
    amountPassed: t('TextLang.amountPassed'),
    valueM2: t('TextLang.valueM2'),
    footage: t('TextLang.footage'),
    floors: t('TextLang.floors'),
    seeContract: t('TextLang.seeContract'),
    provisionalCompletion: t('TextLang.provisionalCompletion'),
    constructionStatus: t('TextLang.constructionStatus'),
    stage: t('TextLang.stage'),
    topography: t('TextLang.topography'),
    masonry: t('TextLang.masonry'),
    inspections: t('TextLang.inspections'),
    thermalInsulationOfTheWalls: t('TextLang.thermalInsulationOfTheWalls'),
    roofInsulation: t('TextLang.roofInsulation'),
    doors: t('TextLang.doors'),
    details: t('TextLang.details'),
    interested: t('TextLang.interested'),
    interestDate: t('TextLang.interestDate'),
    userDetails: t('TextLang.userDetails'),
    userData: t('TextLang.userData'),
    userAddress: t('TextLang.userAddress'),
    userFinancial: t('TextLang.userFinancial'),
    firstName: t('TextLang.firstName'),
    phone: t('TextLang.phone'),
    dateOfBith: t('TextLang.dateOfBith'),
    documentNumber: t('TextLang.documentNumber'),
    street: t('TextLang.street'),
    number: t('TextLang.number'),
    complement: t('TextLang.complement'),
    neighborhood: t('TextLang.neighborhood'),
    state: t('TextLang.state'),
    country: t('TextLang.country'),
    balance: t('TextLang.balance'),
    edit: t('TextLang.edit'),
    save: t('TextLang.save'),
    pendingEmail: t('TextLang.pendingEmail'),
    venture: t('TextLang.venture'),
    noInterestedPartiesFound: t('TextLang.noInterestedPartiesFound'),
    thereAreStillNoInterestedPartiesForTheRegisteredProjects: t(
      'TextLang.thereAreStillNoInterestedPartiesForTheRegisteredProjects',
    ),
    addFaq: t('TextLang.addFaq'),
    category: t('TextLang.category'),
    selectACategory: t('TextLang.selectACategory'),
    createNewCategory: t('TextLang.createNewCategory'),
    question: t('TextLang.question'),
    answer: t('TextLang.answer'),
    newCategory: t('TextLang.newCategory'),
    create: t('TextLang.create'),
    photos: t('TextLang.photos'),
    remove: t('TextLang.remove'),
  }

  const layoutValue: LayoutAdminContextProps = {
    texts,
    locale,
  }

  return (
    <html lang={lng}>
      <body className="bg-zinc-800 text-white flex">
        <Sidebar text={textHeader} locale={locale} />
        <div className="ml-64 flex-grow">
          <Header text={textHeader} />
          <LayoutProvider value={layoutValue}>{children}</LayoutProvider>
        </div>
      </body>
    </html>
  )
}
