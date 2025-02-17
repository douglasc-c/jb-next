'use client'

import React, { createContext, useContext, useReducer } from 'react'

export interface LayoutAdminContextProps {
  texts: {
    name: string
    compliance: string
    type: string
    seeMore: string
    pendingEmail: string
    pendingAddress: string
    pendingDocuments: string
    validated: string
    unknownStatus: string
    underReview: string
    total: string
    admins: string
    addUser: string
    userType: string
    role: string
    users: string
    username: string
    cancel: string
    email: string
    password: string
    lastName: string
    add: string
    admin: string
    user: string
    individual: string
    addVenture: string
    available: string
    inProgress: string
    ventureName: string
    description: string
    corporateName: string
    investmentType: string
    isAvailable: string
    constructionType: string
    fundingAmount: string
    transferAmount: string
    squareMeterValue: string
    area: string
    floorNumber: string
    completionDate: string
    address: string
    city: string
    postalCode: string
    property: string
    other: string
    status: string
    company: string
    date: string
    amountInvested: string
    amountTransferred: string
    shares: string
    interests: string
    typeOfConstruction: string
    contributionAmount: string
    amountPassed: string
    valueM2: string
    footage: string
    floors: string
    seeContract: string
    provisionalCompletion: string
    constructionStatus: string
    stage: string
    topography: string
    masonry: string
    inspections: string
    thermalInsulationOfTheWalls: string
    roofInsulation: string
    doors: string
    details: string
    interested: string
    interestDate: string
    userDetails: string
    userData: string
    userAddress: string
    financial: string
    firstName: string
    phone: string
    dateOfBith: string
    documentNumber: string
    street: string
    number: string
    complement: string
    neighborhood: string
    state: string
    country: string
    balance: string
    edit: string
    save: string
    noInterestedPartiesFound: string
    venture: string
    thereAreStillNoInterestedPartiesForTheRegisteredProjects: string
    addFaq: string
    category: string
    selectACategory: string
    createNewCategory: string
    question: string
    answer: string
    newCategory: string
    create: string
    photos: string
    remove: string
    ventureDetails: string
    avaliable: string
    notAvaliable: string
    images: string
    summary: string
    house: string
    apartment: string
    startDate: string
    valuation: string
    delete: string
    areYouSureYouWantToDeleteIt: string
    approve: string
    reject: string
    selectAStage: string
    selectATaks: string
    completPhase: string
    newValuation: string
    consulting: string
    confirmed: string
    mode: string
    totalInvested: string
    totalValuation: string
    valuationBefore: string
    valuationAfter: string
    difference: string
    percentage: string
    contract: string
    addContract: string
    uploadContract: string
    model: string
    selectAModel: string
    downloadContract: string
    viewContract: string
    signalContract: string
    send: string
    signedIn: string
    generateSignature: string
  }
  locale: string
}

// Definindo o estado para o reducer
interface LayoutAdminState {
  texts: LayoutAdminContextProps['texts']
  locale: string
}

// Definindo as ações que atualizam o estado
type LayoutAdminAction =
  | { type: 'SET_TEXTS'; payload: LayoutAdminContextProps['texts'] }
  | { type: 'SET_LOCALE'; payload: string }

// Reducer para atualizar o estado do LayoutAdminContext
const layoutAdminReducer = (
  state: LayoutAdminState,
  action: LayoutAdminAction,
): LayoutAdminState => {
  switch (action.type) {
    case 'SET_TEXTS':
      return { ...state, texts: action.payload }
    case 'SET_LOCALE':
      return { ...state, locale: action.payload }
    default:
      return state
  }
}

// Extendendo a interface para incluir funções de atualização
export interface LayoutAdminContextExtendedProps
  extends LayoutAdminContextProps {
  setTexts: (texts: LayoutAdminContextProps['texts']) => void
  setLocale: (locale: string) => void
}

const LayoutAdminContext = createContext<
  LayoutAdminContextExtendedProps | undefined
>(undefined)

export const useLayoutAdminContext = () => {
  const context = useContext(LayoutAdminContext)
  if (!context) {
    throw new Error(
      'useLayoutAdminContext must be used within a LayoutProvider',
    )
  }
  return context
}

export const LayoutProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: LayoutAdminContextProps
}) => {
  const [state, dispatch] = useReducer(layoutAdminReducer, {
    texts: value.texts,
    locale: value.locale,
  })

  const setTexts = (texts: LayoutAdminContextProps['texts']) => {
    dispatch({ type: 'SET_TEXTS', payload: texts })
  }

  const setLocale = (locale: string) => {
    dispatch({ type: 'SET_LOCALE', payload: locale })
  }

  return (
    <LayoutAdminContext.Provider value={{ ...state, setTexts, setLocale }}>
      {children}
    </LayoutAdminContext.Provider>
  )
}
