import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['pt-BR'],
  defaultLocale: 'pt-BR',
})

export function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request)

  const [, locale] = request.nextUrl.pathname.split('/')
  const token = request.cookies.get('auth-token')

  const protectedRoutes = [
    'dashboard',
    'mydata',
    'compliance',
    'constructioncircuit',
    'myventures',
    'support',
  ]

  const adminRoutes = [
    'admin/users',
    'admin/interests',
    'admin/ventures',
    'admin/support',
  ]

  // Simulação de validação de token e extração de informações do usuário
  const user = token ? decodeToken(token.value) : null

  // Redirecionar usuários não autenticados para a página de login
  if (
    !token &&
    protectedRoutes
      .concat(adminRoutes)
      .some((route) =>
        request.nextUrl.pathname.startsWith(`/${locale}/${route}`),
      )
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  // Redirecionar usuários não administradores para a página principal
  if (
    adminRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(`/${locale}/${route}`),
    ) &&
    (!user || user.role !== 'ADMIN')
  ) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
  }

  return intlResponse
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

// Função auxiliar para decodificar o token
function decodeToken(token: string) {
  try {
    // Substitua pela lógica real de decodificação do token (ex.: JWT)
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch (err) {
    console.error('Erro ao decodificar o token:', err)
    return null
  }
}
