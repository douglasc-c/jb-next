'use client'

import React, { createContext, useContext, useReducer } from 'react'

export interface LayoutContextProps {
  locale: string
}

export interface LayoutContextExtendedProps extends LayoutContextProps {
  setLocale: (locale: string) => void
}

interface LayoutState {
  locale: string
}

type LayoutAction = { type: 'SET_LOCALE'; payload: string }

const layoutReducer = (
  state: LayoutState,
  action: LayoutAction,
): LayoutState => {
  switch (action.type) {
    case 'SET_LOCALE':
      return { ...state, locale: action.payload }
    default:
      return state
  }
}

const LayoutContext = createContext<LayoutContextExtendedProps | undefined>(
  undefined,
)

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
}) => {
  const [state, dispatch] = useReducer(layoutReducer, { locale: value.locale })

  const setLocale = (locale: string) => {
    dispatch({ type: 'SET_LOCALE', payload: locale })
  }

  return (
    <LayoutContext.Provider value={{ ...state, setLocale }}>
      {children}
    </LayoutContext.Provider>
  )
}
