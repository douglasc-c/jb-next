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
