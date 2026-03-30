import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/modules/booking-admin/booking.config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
    const expected = process.env.ADMIN_TOKEN;

    if (!expected || !cookie || cookie.value !== expected) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === '/admin/login') {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
    const expected = process.env.ADMIN_TOKEN;
    if (expected && cookie?.value === expected) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

export default proxy;
