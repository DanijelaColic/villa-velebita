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
/** Zadano za produkciju; override preko RECIPIENT_* u .env */
export const RECIPIENT_IBAN =
  process.env.RECIPIENT_IBAN || 'HR7324840083235678378';
export const RECIPIENT_NAME = process.env.RECIPIENT_NAME || 'Ivana Ćaćić';
export const RECIPIENT_BIC = process.env.RECIPIENT_BIC || 'RZBHHR2X';
export const RECIPIENT_BANK_NAME =
  process.env.RECIPIENT_BANK_NAME || 'Raiffeisen banka d.d. (RBA)';

/** Uvjeti otkazivanja — depozit (HR, jedan izvor za web + FAQ) */
export const CANCELLATION_POLICY_LINES_HR = [
  'Do 14 dana prije dolaska — povrat 100% uplaćenog depozita.',
  '7–14 dana prije dolaska — povrat 50% depozita.',
  'Manje od 7 dana prije dolaska — depozit se ne vraća.',
] as const;

export const INVOICE_POLICY_HR =
  'Računi se izdaju prilikom dolaska ili odlaska gostiju.';

/** Kratki opis iznad kalendara (početna + /booking) */
export const BOOKING_VILLA_LONG_DESCRIPTION_HR =
  '155 m² na tri etaže, do 9 gostiju: tri spavaće sobe, dnevni boravak s garniturom na razvlačenje, prostor za druženje i dvije kupaonice s hidromasažnim tušem.';

/** Isti smisao za gostiju e-mail (EN) */
export const CANCELLATION_POLICY_LINES_EN = [
  'Up to 14 days before arrival — 100% refund of the deposit paid.',
  '7–14 days before arrival — 50% of the deposit refunded.',
  'Less than 7 days before arrival — deposit is non-refundable.',
] as const;

export const INVOICE_POLICY_EN =
  'Invoices are issued at guest check-in or check-out.';

// ── Poslovni uvjeti ───────────────────────────────────────────────
/** 30% depozit pri rezervaciji */
export const DEPOSIT_PERCENT = 0.3;

/** Ostatak (70% = ukupno − depozit) — uplatiti najkasnije ovoliko dana prije dolaska */
export const BALANCE_DAYS_BEFORE_CHECK_IN = 3;

/** Minimalni boravak: 3 noći */
export const MIN_NIGHTS = 3;

/** Dug boravak: od 7 noći odobrava se 10% popusta na ukupan iznos */
export const LONG_STAY_DISCOUNT_NIGHTS = 7;
export const LONG_STAY_DISCOUNT_RATE = 0.1;

/**
 * Visoka sezona: prazno jer je cijena ista cijele godine (490 €/noć flat rate).
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
      'Cijela villa na tri etaže (155 m²), tri spavaće sobe, dvije kupaonice, potpuno opremljena kuhinja, dnevni boravak, vanjski jacuzzi, roštilj i pečenjara. Idealno za obitelji i grupe do 13 osoba.',
    capacity: 13,
    capacityNote: 'do 13 osoba',
    size: 155,
    beds: '3 spavaće sobe, razvlačna garnitura, dodatni ležajevi',
    view: false,
    balcony: false,
    floors: 3,
    priceOffSeason: 490,
    priceHighSeason: 490,
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
