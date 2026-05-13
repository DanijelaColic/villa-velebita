import type { AppLocale } from '@/i18n/routing';

/** Shared copy for booking + cjenik + lokacija CTAs on guide hub and article pages. */
export const GUIDE_SECONDARY_CTA: Record<
  AppLocale,
  { title: string; description: string; bookingLabel: string }
> = {
  hr: {
    title: 'Planiranje boravka',
    description:
      'Pregledaj cijene i lokaciju prije rezervacije, zatim odaberi termin koji ti odgovara.',
    bookingLabel: 'Rezerviraj',
  },
  en: {
    title: 'Plan your stay',
    description: 'Review pricing and location before booking your preferred dates.',
    bookingLabel: 'Book now',
  },
  de: {
    title: 'Aufenthalt planen',
    description:
      'Preise und Lage prüfen, danach direkt den passenden Termin buchen.',
    bookingLabel: 'Jetzt buchen',
  },
  it: {
    title: 'Organizza il soggiorno',
    description:
      'Consulta prezzi e posizione prima di prenotare le date che preferisci.',
    bookingLabel: 'Prenota',
  },
};

export const GUIDE_HUB_UI: Record<
  AppLocale,
  { eyebrow: string; readGuide: string }
> = {
  hr: { eyebrow: 'Vodič', readGuide: 'Pročitaj vodič' },
  en: { eyebrow: 'Guide', readGuide: 'Read guide' },
  de: { eyebrow: 'Reiseführer', readGuide: 'Artikel lesen' },
  it: { eyebrow: 'Guida', readGuide: 'Leggi la guida' },
};
