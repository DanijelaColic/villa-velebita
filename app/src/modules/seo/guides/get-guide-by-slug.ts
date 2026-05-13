import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { GUIDES } from './guides-content';

export function getGuideBySlug(locale: AppLocale, slug: string) {
  const requestedLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const localizedMatch = GUIDES.find(
    (guide) => guide.locale === requestedLocale && guide.slug === slug,
  );

  if (localizedMatch) {
    return localizedMatch;
  }

  return GUIDES.find(
    (guide) => guide.locale === routing.defaultLocale && guide.slug === slug,
  );
}
