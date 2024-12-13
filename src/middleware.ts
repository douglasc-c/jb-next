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

  // const protectedRoutes = ['dashboard', 'mydata', 'compliance']
  const protectedRoutes = ['dashboard']

  if (
    !token &&
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(`/${locale}/${route}`),
    )
  ) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return intlResponse
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
