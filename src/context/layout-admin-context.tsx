'use client'

import React, { createContext, useContext } from 'react'

export interface LayoutAdminContextProps {
  textUsers: {
    name: string
    compliance: string
    type: string
    seeMore: string
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
  }

  textVenture: {
    total: string
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
    cancel: string
    add: string
    property: string
    other: string
  }

  textMyContracts: {
    status: string
    company: string
    date: string
    amountInvested: string
    amountTransferred: string
    shares: string
    seeMore: string
  }

  textDetailContract: {
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
    city: string
    status: string
    topography: string
    masonry: string
    inspections: string
    thermalInsulationOfTheWalls: string
    roofInsulation: string
    doors: string
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
