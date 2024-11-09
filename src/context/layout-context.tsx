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
