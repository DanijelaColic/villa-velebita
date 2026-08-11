/**
 * TEMPLATE: kopiraj kao src/middleware.ts
 * Zamijeni MODULE_ROOT s putanjom do modula, npr. '@/modules/booking-admin'
 *
 * Ako već imaš middleware.ts — integriraj logiku ručno.
 */
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from 'MODULE_ROOT/booking.config';
import { verifyAdminSessionToken } from 'MODULE_ROOT/lib/admin-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
    const ok = await verifyAdminSessionToken(cookie?.value);

    if (!ok) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/admin/login') {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
    const ok = await verifyAdminSessionToken(cookie?.value);
    if (ok) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
