import type { AppLocale } from '@/i18n/routing';

export type NewsHubCopy = {
  title: string;
  description: string;
  eyebrow: string;
  readMore: string;
  empty: string;
  publishedLabel: string;
};

/** UI + SEO hub za /novosti po jeziku. */
export const NEWS_HUB_BY_LOCALE: Record<AppLocale, NewsHubCopy> = {
  hr: {
    title: 'Novosti',
    description:
      'Obavijesti, savjeti za putovanje i novosti iz Villa Velebita — kuće za odmor blizu Plitvičkih jezera.',
    eyebrow: 'Blog',
    readMore: 'Pročitaj više',
    empty: 'Trenutačno nema objavljenih novosti. Pogledajte uskoro.',
    publishedLabel: 'Objavljeno',
  },
  en: {
    title: 'News',
    description:
      'Updates, travel tips and news from Villa Velebita — a holiday home near Plitvice Lakes.',
    eyebrow: 'Blog',
    readMore: 'Read more',
    empty: 'No published articles yet. Check back soon.',
    publishedLabel: 'Published',
  },
  de: {
    title: 'Neuigkeiten',
    description:
      'Updates, Reisetipps und Neuigkeiten von Villa Velebita — Ferienhaus nahe den Plitvicer Seen.',
    eyebrow: 'Blog',
    readMore: 'Weiterlesen',
    empty: 'Derzeit keine veröffentlichten Beiträge. Schauen Sie bald wieder vorbei.',
    publishedLabel: 'Veröffentlicht',
  },
  it: {
    title: 'Novità',
    description:
      'Aggiornamenti, consigli di viaggio e notizie da Villa Velebita — casa vacanze vicino ai Laghi di Plitvice.',
    eyebrow: 'Blog',
    readMore: 'Leggi di più',
    empty: 'Nessun articolo pubblicato al momento. Torna a trovarci presto.',
    publishedLabel: 'Pubblicato',
  },
};

export const NEWS_FALLBACK_COVER = '/images/hero/exterior-08.jpg';
