import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE } from '../booking.config';

export { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE };

/** Usporedba preko SHA-256 + timingSafeEqual (ista duljina digest-a; bez curenja duljine lozinke). */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!expected || typeof input !== 'string') return false;

  const a = createHash('sha256').update(input, 'utf8').digest();
  const b = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(a, b);
}

export function getAdminToken(): string {
  return process.env.ADMIN_TOKEN ?? '';
}

/** Provjera u Server Componentima (async, koristi next/headers) */
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME);
  const token = getAdminToken();
  return !!token && cookie?.value === token;
}

/** Provjera u API Route Handlerima (sinkrona, iz NextRequest) */
export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME);
  const token = getAdminToken();
  return !!token && cookie?.value === token;
}
