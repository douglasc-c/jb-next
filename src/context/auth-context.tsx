'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  avatar: string
  birthDate: string
  complianceStatus: string
  email: string
  emailVerified: boolean
  firstName: string
  id: boolean
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
    password: string
    forgotYourPassword: string
    signIn: string
    privacyCookPolicy: string
    TermsOfService: string
    yourInformationIsSafe: string
  }
  locale: string
  authData: AuthData | null
  setAuthData: (data: AuthData) => void
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
  value: Omit<AuthContextProps, 'authData' | 'setAuthData'>
}) => {
  const [authData, setAuthData] = useState<AuthData | null>(null)

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData))
    }
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.setItem('authData', JSON.stringify(authData))
    }
  }, [authData])

  return (
    <AuthContext.Provider value={{ ...value, authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  )
}
