import { useLayoutContext } from '@/context/layout-context'
import { useLayoutAdminContext } from '@/context/layout-admin-context'

export const useUniversalLayoutContext = () => {
  const adminContext = useLayoutAdminContext()
  const userContext = useLayoutContext()

  console.log('Context')
  if (adminContext) {
    console.log('adminContext')
    return adminContext
  }

  if (userContext) {
    console.log('userContext')
    return userContext
  }

  throw new Error('Nenhum contexto foi encontrado')
}
