/**
 * booking.config.ts — konfiguracija za Villa Velebita
 */

import type { Apartment } from './types';

// ── Brand ──────────────────────────────────────────────────────────
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Villa Velebita';
export const SITE_LOCATION = process.env.NEXT_PUBLIC_SITE_LOCATION ?? 'Lika, Hrvatska';

export const LOGO_PATH = process.env.NEXT_PUBLIC_LOGO_PATH ?? '/logo.png';

// ── Kontakt ───────────────────────────────────────────────────────
export const OWNER_EMAIL = process.env.OWNER_EMAIL ?? '';
export const OWNER_PHONE = process.env.OWNER_PHONE ?? '+385 91 929 5907';
export const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP_URL ?? 'https://wa.me/385919295907';

// ── Plaćanje (HUB3 / SEPA QR) ────────────────────────────────────
export const RECIPIENT_IBAN = process.env.RECIPIENT_IBAN ?? '';
export const RECIPIENT_NAME = process.env.RECIPIENT_NAME ?? '';

// ── Poslovni uvjeti ───────────────────────────────────────────────
/** 30% depozit */
export const DEPOSIT_PERCENT = 0.3;

/** Minimalni boravak: 3 noći */
export const MIN_NIGHTS = 3;

/**
 * Visoka sezona: prazno jer je cijena ista cijele godine (560 €/noć flat rate).
 * Za sezonske razlike dodaj npr. [7, 8].
 */
export const HIGH_SEASON_MONTHS: number[] = [];

export const HIGH_SEASON_LABEL = 'Visoka sezona';
export const OFF_SEASON_LABEL = 'Van sezone';

// ── Admin ─────────────────────────────────────────────────────────
export const ADMIN_COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? 'villa_velebita_admin';
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const CSV_EXPORT_PREFIX = process.env.NEXT_PUBLIC_CSV_PREFIX ?? 'villa-velebita-rezervacije-';

// ── Checkout URL ──────────────────────────────────────────────────
export const BOOKING_SUCCESS_REDIRECT: string | null = null;

// ── Villa (jedna jedinica — cijela kuća) ──────────────────────────
export const apartments: Apartment[] = [
  {
    slug: 'villa-velebita',
    name: 'Villa Velebita',
    tagline: 'Cijela villa za vas — privatnost, priroda, komfor.',
    description:
      'Cijela villa s 3 spavaće sobe, 2 kupaone, potpuno opremljenom kuhinjom, dnevnim boravkom, vanjskim jauzzijem, roštiljem i pečenjarom. Idealno za obitelji i grupe do 9 osoba.',
    capacity: 9,
    capacityNote: 'do 9 osoba',
    size: 160,
    beds: '3 spavaće sobe (7 ležaja + dječji krevetić)',
    view: false,
    balcony: false,
    floors: 2,
    priceOffSeason: 560,
    priceHighSeason: 560,
    fullyBooked: false,
    amenities: [
      'Besplatni WiFi',
      'Klima uređaj',
      'TV / Netflix',
      'Potpuno opremljena kuhinja',
      'Besplatno parkiranje',
      'Vanjski jacuzzi',
      'Roštilj i pečenjara',
      'Terasa',
      'Krevetić za bebu (besplatno, na upit)',
    ],
    images: [
      '/images/exterior/exterior-01.jpg',
      '/images/exterior/exterior-02.jpg',
      '/images/exterior/jacuzzi.jpg',
    ],
  },
];

// ── Helper funkcije ───────────────────────────────────────────────

export function getApartment(slug: string): Apartment | undefined {
  return apartments.find((a) => a.slug === slug);
}

export function getAvailableApartments(): Apartment[] {
  return apartments.filter((a) => !a.fullyBooked);
}

export function getPriceForDate(apartment: Apartment, date: Date): number {
  const month = date.getMonth() + 1;
  return HIGH_SEASON_MONTHS.includes(month)
    ? apartment.priceHighSeason
    : apartment.priceOffSeason;
}
