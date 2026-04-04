import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Tajni ključ za linkove „pregled rezervacije + QR” u mailu.
 * Postavi BOOKING_VIEW_SECRET u .env (npr. openssl rand -hex 32).
 */
export function createBookingViewToken(bookingId: string, ttlSec = 365 * 86400): string | null {
  const secret = process.env.BOOKING_VIEW_SECRET?.trim();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const payload = Buffer.from(JSON.stringify({ b: bookingId, e: exp }), 'utf8').toString(
    'base64url',
  );
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

/** Vraća booking UUID ili null ako je token neispravan / istekao. */
export function verifyBookingViewToken(token: string): string | null {
  const secret = process.env.BOOKING_VIEW_SECRET?.trim();
  if (!secret) return null;

  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expectedHex = createHmac('sha256', secret).update(payload).digest('hex');
  if (sig.length !== expectedHex.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expectedHex, 'utf8'))) return null;
  } catch {
    return null;
  }

  try {
    const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      b?: string;
      e?: number;
    };
    if (typeof json.b !== 'string' || typeof json.e !== 'number') return null;
    if (json.e < Math.floor(Date.now() / 1000)) return null;
    return json.b;
  } catch {
    return null;
  }
}
