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
  {
    key: 'faq.heading.title',
    labelHr: 'FAQ – naslov',
    group: 'faq',
  },
  {
    key: 'faq.heading.subtitle',
    labelHr: 'FAQ – podnaslov',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.distance.question',
    labelHr: 'FAQ – udaljenost (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.distance.answer',
    labelHr: 'FAQ – udaljenost (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.capacity.question',
    labelHr: 'FAQ – kapacitet (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.capacity.answer',
    labelHr: 'FAQ – kapacitet (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.included.question',
    labelHr: 'FAQ – uključeno (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.included.answer',
    labelHr: 'FAQ – uključeno (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.minStay.question',
    labelHr: 'FAQ – min. boravak (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.minStay.answer',
    labelHr: 'FAQ – min. boravak (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.pets.question',
    labelHr: 'FAQ – ljubimci (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.pets.answer',
    labelHr: 'FAQ – ljubimci (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.checkInOut.question',
    labelHr: 'FAQ – check-in/out (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.checkInOut.answer',
    labelHr: 'FAQ – check-in/out (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.jacuzzi.question',
    labelHr: 'FAQ – jacuzzi (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.jacuzzi.answer',
    labelHr: 'FAQ – jacuzzi (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.payment.question',
    labelHr: 'FAQ – plaćanje (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.payment.answer',
    labelHr: 'FAQ – plaćanje (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'faq.items.cancellation.question',
    labelHr: 'FAQ – otkazivanje (pitanje)',
    group: 'faq',
  },
  {
    key: 'faq.items.cancellation.answer',
    labelHr: 'FAQ – otkazivanje (odgovor)',
    group: 'faq',
    multiline: true,
  },
  {
    key: 'contact.heading.title',
    labelHr: 'Kontakt – naslov',
    group: 'contact',
  },
  {
    key: 'contact.heading.subtitle',
    labelHr: 'Kontakt – podnaslov',
    group: 'contact',
    multiline: true,
  },
  {
    key: 'contact.intro',
    labelHr: 'Kontakt – uvodni tekst',
    group: 'contact',
    multiline: true,
  },
  // ── Email predlošci (bookingEmail.*) ────────────────────────────
  {
    key: 'bookingEmail.received.subject',
    labelHr: 'Email (upit) – naslov (subject)',
    group: 'email',
  },
  {
    key: 'bookingEmail.received.greeting',
    labelHr: 'Email (upit) – pozdrav ({name})',
    group: 'email',
  },
  {
    key: 'bookingEmail.received.intro',
    labelHr: 'Email (upit) – uvodni tekst',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.received.depositNote',
    labelHr: 'Email (upit) – napomena uz uplatu',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.confirmed.subject',
    labelHr: 'Email (potvrda) – naslov (subject)',
    group: 'email',
  },
  {
    key: 'bookingEmail.confirmed.badge',
    labelHr: 'Email (potvrda) – badge / istaknuto',
    group: 'email',
  },
  {
    key: 'bookingEmail.confirmed.greeting',
    labelHr: 'Email (potvrda) – pozdrav ({name})',
    group: 'email',
  },
  {
    key: 'bookingEmail.confirmed.intro',
    labelHr: 'Email (potvrda) – uvodni tekst',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.confirmed.depositNote',
    labelHr: 'Email (potvrda) – napomena uz uplatu',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.shared.paymentTitle',
    labelHr: 'Email – naslov bloka plaćanja',
    group: 'email',
  },
  {
    key: 'bookingEmail.shared.questions',
    labelHr: 'Email – tekst „Za pitanja”',
    group: 'email',
  },
  {
    key: 'bookingEmail.shared.attachmentsBody',
    labelHr: 'Email – opis QR privitaka',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.shared.publicView.button',
    labelHr: 'Email – gumb javnog pregleda',
    group: 'email',
  },
  {
    key: 'bookingEmail.shared.publicView.hint',
    labelHr: 'Email – hint ispod gumba pregleda',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.terms.cancellationTitle',
    labelHr: 'Email – naslov otkazivanja',
    group: 'email',
  },
  {
    key: 'bookingEmail.terms.cancellationLines.0',
    labelHr: 'Email – otkazivanje (1. red)',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.terms.cancellationLines.1',
    labelHr: 'Email – otkazivanje (2. red)',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.terms.invoiceLabel',
    labelHr: 'Email – oznaka „Računi”',
    group: 'email',
  },
  {
    key: 'bookingEmail.terms.invoiceText',
    labelHr: 'Email – tekst o računima',
    group: 'email',
    multiline: true,
  },
  {
    key: 'bookingEmail.owner.subject',
    labelHr: 'Email (vlasnik) – naslov (subject)',
    group: 'email',
  },
  {
    key: 'bookingEmail.owner.title',
    labelHr: 'Email (vlasnik) – naslov u tijelu',
    group: 'email',
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
  {
    pageKey: 'villaPlitvice',
    labelHr: 'Villa Plitvice (landing)',
    messagePath: 'metadata.pages.villaPlitvice',
  },
  {
    pageKey: 'guides',
    labelHr: 'Vodiči (/vodic)',
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
  faq: 'FAQ',
  contact: 'Kontakt',
  email: 'Email predlošci',
};
