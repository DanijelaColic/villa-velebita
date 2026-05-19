import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { GUIDES } from './guides-content';
import { GUIDES_ENRICHED } from './guides-enriched-data';
import type { GuideArticleMerged } from './guide-types';

type GuideEnrichedSlug = keyof typeof GUIDES_ENRICHED;

function isGuideEnrichedSlug(slug: string): slug is GuideEnrichedSlug {
  return Object.prototype.hasOwnProperty.call(GUIDES_ENRICHED, slug);
}

export function getGuideBySlug(
  locale: AppLocale,
  slug: string,
): GuideArticleMerged | undefined {
  const requestedLocale = routing.locales.includes(locale) ? locale : routing.defaultLocale;

  const localizedMatch = GUIDES.find(
    (guide) => guide.locale === requestedLocale && guide.slug === slug,
  );

  const article =
    localizedMatch ??
    GUIDES.find((guide) => guide.locale === routing.defaultLocale && guide.slug === slug);

  if (!article || !isGuideEnrichedSlug(slug)) {
    return undefined;
  }

  return {
    ...article,
    ...GUIDES_ENRICHED[slug][article.locale],
  };
}
