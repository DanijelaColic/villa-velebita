import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export const CMS_MEDIA_BUCKET = 'cms-media';

export const ARTICLE_STATUSES = ['draft', 'published'] as const;

export const CMS_LOCALES: readonly AppLocale[] = routing.locales;

/**
 * Whitelist uredivih tekstova na stranici.
 * key = putanja u messages JSON-u (dot notation).
 * labelHr = oznaka u adminu za netehničkog korisnika.
 */
export const EDITABLE_SITE_TEXT_KEYS = [
  {
    key: 'hero.titlePrefix',
    labelHr: 'Hero – naslov (prvi dio)',
    group: 'hero',
  },
  {
    key: 'hero.titleAccent',
    labelHr: 'Hero – naslov (istaknuti dio)',
    group: 'hero',
  },
  {
    key: 'hero.subtitle',
    labelHr: 'Hero – podnaslov',
    group: 'hero',
    multiline: true,
  },
  {
    key: 'hero.location',
    labelHr: 'Hero – lokacija',
    group: 'hero',
  },
  {
    key: 'hero.cta.booking',
    labelHr: 'Hero – gumb rezervacije',
    group: 'hero',
  },
  {
    key: 'hero.cta.explore',
    labelHr: 'Hero – gumb istraži',
    group: 'hero',
  },
  {
    key: 'bookingSection.heading.title',
    labelHr: 'Rezervacija – naslov sekcije',
    group: 'booking',
  },
  {
    key: 'bookingSection.heading.subtitle',
    labelHr: 'Rezervacija – podnaslov sekcije',
    group: 'booking',
    multiline: true,
  },
  {
    key: 'footer.description',
    labelHr: 'Footer – opis',
    group: 'footer',
    multiline: true,
  },
] as const;

export type EditableSiteTextKey =
  (typeof EDITABLE_SITE_TEXT_KEYS)[number]['key'];

export const EDITABLE_SITE_TEXT_KEY_SET = new Set<string>(
  EDITABLE_SITE_TEXT_KEYS.map((item) => item.key),
);

/**
 * Stranice čiji se SEO može uređivati u adminu.
 * page_key mapira na metadata.pages.* u messages (osim home → metadata.layout).
 */
export const EDITABLE_PAGE_SEO_KEYS = [
  {
    pageKey: 'home',
    labelHr: 'Početna',
    messagePath: 'metadata.layout',
  },
  {
    pageKey: 'accommodation',
    labelHr: 'Smještaj',
    messagePath: 'metadata.pages.accommodation',
  },
  {
    pageKey: 'gallery',
    labelHr: 'Galerija',
    messagePath: 'metadata.pages.gallery',
  },
  {
    pageKey: 'amenities',
    labelHr: 'Sadržaji',
    messagePath: 'metadata.pages.amenities',
  },
  {
    pageKey: 'location',
    labelHr: 'Lokacija',
    messagePath: 'metadata.pages.location',
  },
  {
    pageKey: 'pricing',
    labelHr: 'Cjenik',
    messagePath: 'metadata.pages.pricing',
  },
  {
    pageKey: 'faq',
    labelHr: 'FAQ',
    messagePath: 'metadata.pages.faq',
  },
  {
    pageKey: 'booking',
    labelHr: 'Rezervacija',
    messagePath: 'metadata.pages.booking',
  },
  {
    pageKey: 'news',
    labelHr: 'Novosti (lista)',
    messagePath: null,
  },
] as const;

export type EditablePageSeoKey =
  (typeof EDITABLE_PAGE_SEO_KEYS)[number]['pageKey'];

export const EDITABLE_PAGE_SEO_KEY_SET = new Set<string>(
  EDITABLE_PAGE_SEO_KEYS.map((item) => item.pageKey),
);

export const SITE_TEXT_GROUPS: Record<string, string> = {
  hero: 'Hero (početna)',
  booking: 'Sekcija rezervacije',
  footer: 'Podnožje',
};
