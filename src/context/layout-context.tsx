'use client'

import React, { createContext, useContext } from 'react'

export interface LayoutContextProps {
  texts: {
    youResources: string
    estimatedAssets: string
    numberOfHouse: string
    land: string
    avaliableValue: string
    totalBalance: string
    balanceInvested: string
    developments: string
    portfolio: string
    invested: string
    newOpportunitiesPortifolio: string
    document: string
    startDate: string
    address: string
    seeMore: string
    status: string
    company: string
    date: string
    amountInvested: string
    amountTransferred: string
    shares: string
    myData: string
    name: string
    lastName: string
    email: string
    documentNumber: string
    dateOfBith: string
    country: string
    city: string
    password: string
    confirmPassword: string
    at4HandsRealEstateInvestments: string
    tochangeInformationPleaseContactOur: string
    technicalSupport: string
    compliance: string
    verifyYourIdentity: string
    documentType: string
    idOfTheIssuingBody: string
    orDragYourDocumentHere: string
    attach: string
    support: string
    step: string
    from: string
    previo: string
    next: string
    finish: string
    at4HandsRealEstateInvestmentsWeNeedTo: string
    lgptLaws: string
    verificationCompleted: string
    congratulationsYouHaveSubmittedYourDocumentsAndCompletedTheMandatoryComplianceStep: string
    howDoIChangeMyDataAndDocuments: string
    constructionCircuit: string
    myVentures: string
    typeOfConstruction: string
    contributionAmount: string
    amountPassed: string
    postalCode: string
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
    frequentlyAskedQuestions: string
    talkToTheSupport: string
    stillHaveQuestions: string
    summary: string
    firstName: string
    phone: string
    street: string
    number: string
    complement: string
    neighborhood: string
    state: string
    edit: string
    save: string
    cancel: string
    currentPassword: string
    newPassword: string
    documentFront: string
    documentBack: string
    proofOfAddress: string
    incomeTaxProof: string
    takeAnInterest: string
    venture: string
    completionDate: string
    noNewDevelopmentsAvailable: string
    youHaveNoBusiness: string
  }

  locale: string
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined)

export const useLayoutContext = () => {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
}

export const LayoutProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: LayoutContextProps
}) => <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
