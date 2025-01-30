'use client'

import React, { createContext, useContext } from 'react'

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

const LayoutAdminContext = createContext<LayoutAdminContextProps | undefined>(
  undefined,
)

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
}) => (
  <LayoutAdminContext.Provider value={value}>
    {children}
  </LayoutAdminContext.Provider>
)
