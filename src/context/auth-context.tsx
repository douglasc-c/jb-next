'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  avatar: string
  birthDate: string
  complianceStatus: string
  email: string
  emailVerified: boolean
  firstName: string
  id: number
  isActive: boolean
  isApproved: boolean
  lastName: string
  mustChangePassword: boolean
  numberDocument: string
  phone: string
  role: string
  username: string
}

interface AuthData {
  token: string
  user: User
  mustChangePassword: boolean
}

interface AuthContextProps {
  textSignIn: {
    enter: string
    useYour4HandsLoginToAccess: string
    email: string
    useYour4HandsSignupToAccess: string
    password: string
    username: string
    phone: string
    userType: string
    documentNumber: string
    company: string
    individual: string
    dateOfBith: string
    name: string
    forgotYourPassword: string
    signup: string
    signIn: string
    privacyCookPolicy: string
    TermsOfService: string
    yourInformationIsSafe: string
  }
  locale: string
  authData: AuthData | null
  setAuthData: (data: AuthData) => void
  isLoadingAuthData: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: Omit<
    AuthContextProps,
    'authData' | 'setAuthData' | 'isLoadingAuthData'
  >
}) => {
  const [authData, setAuthData] = useState<AuthData | null>(null)
  const [isLoadingAuthData, setIsLoadingAuthData] = useState(true)

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData))
    }
    setIsLoadingAuthData(false)
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))
    }
  }, [authData])

  return (
    <AuthContext.Provider
      value={{ ...value, authData, setAuthData, isLoadingAuthData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
