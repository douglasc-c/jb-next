import React from 'react'

import type { AuthContextProps } from './auth-context'
import { AuthProvider } from './auth-context'

interface AppProvidersProps {
  children: React.ReactNode
  authValue: Omit<
    AuthContextProps,
    'authData' | 'setAuthData' | 'isLoadingAuthData'
  >
}

export const AppProviders = ({ children, authValue }: AppProvidersProps) => {
  return <AuthProvider value={authValue}>{children}</AuthProvider>
}

export default AppProviders
