'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

export interface User {
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

export interface AuthData {
  token: string
  user: User
  mustChangePassword: boolean
}

export interface AuthContextProps {
  authData: AuthData | null
  setAuthData: (data: AuthData) => void
  isLoadingAuthData: boolean
}

interface AuthState {
  authData: AuthData | null
  isLoadingAuthData: boolean
}

type AuthAction =
  | { type: 'SET_AUTH_DATA'; payload: AuthData }
  | { type: 'CLEAR_AUTH_DATA' }
  | { type: 'SET_LOADING'; payload: boolean }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_AUTH_DATA':
      return { ...state, authData: action.payload }
    case 'CLEAR_AUTH_DATA':
      return { ...state, authData: null }
    case 'SET_LOADING':
      return { ...state, isLoadingAuthData: action.payload }
    default:
      return state
  }
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
  const initialState: AuthState = {
    authData: null,
    isLoadingAuthData: true,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const setAuthData = (data: AuthData) => {
    dispatch({ type: 'SET_AUTH_DATA', payload: data })
  }

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData')
    if (savedAuthData) {
      dispatch({ type: 'SET_AUTH_DATA', payload: JSON.parse(savedAuthData) })
    }
    dispatch({ type: 'SET_LOADING', payload: false })
  }, [])

  useEffect(() => {
    if (state.authData) {
      localStorage.setItem('authData', JSON.stringify(state.authData))
    }
  }, [state.authData])

  return (
    <AuthContext.Provider
      value={{
        ...value,
        authData: state.authData,
        setAuthData,
        isLoadingAuthData: state.isLoadingAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
