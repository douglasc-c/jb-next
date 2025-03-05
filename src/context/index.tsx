import React from 'react'

import type { AuthContextProps } from './auth-context'
import { AuthProvider } from './auth-context'

import { EnterpriseProvider } from './enterprise-context'

interface AppProvidersProps {
  children: React.ReactNode
  authValue: Omit<
    AuthContextProps,
    'authData' | 'setAuthData' | 'isLoadingAuthData'
  >
}

export const AppProviders = ({ children, authValue }: AppProvidersProps) => {
  return (
    <AuthProvider value={authValue}>
      <EnterpriseProvider>{children}</EnterpriseProvider>
    </AuthProvider>
  )
}

export default AppProviders
