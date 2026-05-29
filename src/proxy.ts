import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return intlMiddleware(request)
}

export default proxy

export const config = {
  matcher: ['/', '/(ru|en)/:path*', '/((?!_next|api|assets|.*\\..*).*)'],
}
