'use client'

import api from '@/lib/api'
import React, { createContext, useCallback, useContext, useReducer } from 'react'

export interface FractionalSale {
  id: number
  enterpriseId: number
  totalQuotas: number
  soldQuotas: number
  quotaPrice: string
  createdAt: string
  updatedAt: string
}

export interface Token {
  id: number
  enterpriseId: number
}

export interface Investment {
  id: number
}

export interface Enterprise {
  id: number
  name: string
  corporateName: string
  description: string
  status: string
  isAvailable: boolean
  investmentType: string
  constructionType: string
  fundingAmount: number
  transferAmount: number | null
  coverImageUrl?: string | null
  postalCode?: string
  address?: string
  city?: string
  state?: string | null
  country?: string | null
  squareMeterValue?: number
  area?: number
  progress?: number
  floors?: number
  commercializationType?: string
  createdAt?: string
  updatedAt?: string
  fractionalSale?: FractionalSale | null
  token?: Token | null
  investments?: Investment[]
}


interface EnterpriseState {
  enterprises: Enterprise[]
  currentEnterprise: Enterprise | null
}


type EnterpriseAction =
  | { type: 'SET_ENTERPRISES'; payload: Enterprise[] }
  | { type: 'SET_CURRENT_ENTERPRISE'; payload: Enterprise | null }


function enterpriseReducer(
  state: EnterpriseState,
  action: EnterpriseAction,
): EnterpriseState {
  switch (action.type) {
    case 'SET_ENTERPRISES':
      return { ...state, enterprises: action.payload }
    case 'SET_CURRENT_ENTERPRISE':
      return { ...state, currentEnterprise: action.payload }
    default:
      return state
  }
}


export interface EnterpriseContextProps {
  enterprises: Enterprise[]
  currentEnterprise: Enterprise | null
  fetchEnterprises: () => Promise<void>
  setEnterprises: (list: Enterprise[]) => void
  setCurrentEnterprise: (ent: Enterprise | null) => void
}


const EnterpriseContext = createContext<EnterpriseContextProps | undefined>(undefined)


export function useEnterpriseContext() {
  const context = useContext(EnterpriseContext)
  if (!context) {
    throw new Error(
      'useEnterpriseContext must be used within an EnterpriseProvider',
    )
  }
  return context
}


export const EnterpriseProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: EnterpriseState = {
    enterprises: [],
    currentEnterprise: null,
  }

  const [state, dispatch] = useReducer(enterpriseReducer, initialState)

  const setEnterprises = useCallback((list: Enterprise[]) => {
    dispatch({ type: 'SET_ENTERPRISES', payload: list })
  }, [])

  const setCurrentEnterprise = useCallback((ent: Enterprise | null) => {
    dispatch({ type: 'SET_CURRENT_ENTERPRISE', payload: ent })
  }, [])

  const fetchEnterprises = useCallback(async () => {
    try {
      const response = await api.get('/admin/get-enterprise')
      const { enterprises } = response.data
      setEnterprises(enterprises)
      return enterprises  
    } catch (error) {
      console.error('Erro ao buscar empreendimentos:', error)
      return []  
    }
  }, [setEnterprises])

  return (
    <EnterpriseContext.Provider
      value={{
        enterprises: state.enterprises,
        currentEnterprise: state.currentEnterprise,
        fetchEnterprises,
        setEnterprises,
        setCurrentEnterprise,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  )
}
