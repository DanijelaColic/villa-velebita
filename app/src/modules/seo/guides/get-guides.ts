import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { GUIDES } from './guides-content';
import { GUIDES_ENRICHED } from './guides-enriched-data';
import type { GuideListItem } from './guide-types';

type GuideEnrichedSlug = keyof typeof GUIDES_ENRICHED;

function isGuideEnrichedSlug(slug: string): slug is GuideEnrichedSlug {
  return Object.prototype.hasOwnProperty.call(GUIDES_ENRICHED, slug);
}

export function getGuides(locale: AppLocale): GuideListItem[] {
  const requestedLocale = routing.locales.includes(locale)
    ? locale
    : routing.defaultLocale;

  const localizedGuides = GUIDES.filter((guide) => guide.locale === requestedLocale);
  const guidesForLocale = localizedGuides.length > 0
    ? localizedGuides
    : GUIDES.filter((guide) => guide.locale === routing.defaultLocale);

  return guidesForLocale
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .map(({ slug, title, description, publishedAt, readingTime }) => {
      const coverImage = isGuideEnrichedSlug(slug)
        ? GUIDES_ENRICHED[slug][requestedLocale].coverImage
        : GUIDES_ENRICHED['sto-posjetiti-blizu-plitvickih-jezera'][routing.defaultLocale]
            .coverImage;

      return {
        slug,
        title,
        description,
        publishedAt,
        readingTime,
        coverImage,
      };
    });
}
