
import React from 'react'


import type { AuthContextProps } from './auth-context'
import { AuthProvider } from './auth-context'


import { EnterpriseProvider } from './enterprise-context'
import type { LayoutContextProps } from './layout-context'
import { LayoutProvider } from './layout-context'


interface AppProvidersProps {
  children: React.ReactNode
  authValue: Omit<AuthContextProps, 'authData' | 'setAuthData' | 'isLoadingAuthData'>
  layoutValue: LayoutContextProps

}

export const AppProviders = ({
  children,
  authValue,
  layoutValue,
}: AppProvidersProps) => {
  return (
    <AuthProvider value={authValue}>
      <LayoutProvider value={layoutValue}>
        <EnterpriseProvider>
          {children}
        </EnterpriseProvider>
      </LayoutProvider>
    </AuthProvider>
  )
}

export default AppProviders
