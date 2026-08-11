/**
 * TEMPLATE: kopiraj kao src/app/api/admin/login/route.ts
 * Zamijeni MODULE_ROOT s putanjom do modula, npr. '@/modules/booking-admin'
 */
import { NextRequest, NextResponse } from 'next/server';
import {
  verifyPassword,
  getAdminToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
} from 'MODULE_ROOT/lib/admin-auth';
import {
  checkLoginAllowed,
  clearLoginFailures,
  formatLockoutMessage,
  getClientIp,
  recordLoginFailure,
} from 'MODULE_ROOT/lib/login-rate-limit';

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, '', { maxAge: 0, path: '/' });
  return response;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const gate = checkLoginAllowed(ip);
  if (!gate.allowed) {
    return NextResponse.json(
      { error: formatLockoutMessage(gate.retryAfterSec) },
      {
        status: 429,
        headers: { 'Retry-After': String(gate.retryAfterSec) },
      },
    );
  }

  let password: unknown;
  try {
    const body = await request.json();
    password = body?.password;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (typeof password !== 'string' || !verifyPassword(password)) {
    const afterFail = recordLoginFailure(ip);
    if (!afterFail.allowed) {
      return NextResponse.json(
        { error: formatLockoutMessage(afterFail.retryAfterSec) },
        {
          status: 429,
          headers: { 'Retry-After': String(afterFail.retryAfterSec) },
        },
      );
    }
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  clearLoginFailures(ip);

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: '/',
  });

  return response;
}
