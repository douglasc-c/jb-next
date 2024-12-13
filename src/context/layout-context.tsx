'use client'

import React, { createContext, useContext } from 'react'

export interface LayoutContextProps {
  textYourResources: {
    youResources: string
    estimatedAssets: string
    numberOfHouse: string
    land: string
    avaliableValue: string
  }
  textDataInvestments: {
    totalBalance: string
    balanceInvested: string
    developments: string
    portfolio: string
    invested: string
  }

  textNewOpportunities: {
    newOpportunitiesPortifolio: string
    document: string
    startDate: string
    address: string
    seeMore: string
  }

  textMyContracts: {
    status: string
    company: string
    date: string
    amountInvested: string
    amountTransferred: string
    shares: string
  }

  textMyData: {
    myData: string
    name: string
    lastName: string
    email: string
    documentNumber: string
    dateOfBith: string
    country: string
    address: string
    city: string
    password: string
    confirmPassword: string
    at4HandsRealEstateInvestments: string
    tochangeInformationPleaseContactOur: string
    technicalSupport: string
  }

  textCompliance: {
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
