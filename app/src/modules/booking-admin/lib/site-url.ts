import { getValidLocale } from '@/i18n/messages';
import { localizePath } from '@/i18n/pathnames';

/** Javni URL stranice (linkovi u e-mailovima, QR pregled). */
export function getPublicSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '')}`;
  return 'http://localhost:3000';
}

export function bookingPublicViewUrl(token: string, locale?: string): string {
  const pathname = localizePath('/rezervacija/pregled', getValidLocale(locale));
  return `${getPublicSiteUrl()}${pathname}?token=${encodeURIComponent(token)}`;
}
