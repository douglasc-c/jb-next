'use client'

import React, { createContext, useContext, useReducer } from 'react'

export interface LayoutAdminContextProps {
  locale: string
}

export interface LayoutAdminContextExtendedProps
  extends LayoutAdminContextProps {
  setLocale: (locale: string) => void
}

interface LayoutAdminState {
  locale: string
}

type LayoutAdminAction = { type: 'SET_LOCALE'; payload: string }

const layoutAdminReducer = (
  state: LayoutAdminState,
  action: LayoutAdminAction,
): LayoutAdminState => {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.payload }
    default:
      return state
  }
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
    locale: value.locale,
  })

  const setLocale = (locale: string) => {
    dispatch({ type: 'SET_LOCALE', payload: locale })
  }

  return (
    <LayoutAdminContext.Provider value={{ ...state, setLocale }}>
      {children}
    </LayoutAdminContext.Provider>
  )
}
