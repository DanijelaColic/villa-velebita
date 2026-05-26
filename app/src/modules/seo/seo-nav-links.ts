import type { AppLocale } from '@/i18n/routing';
import { GUIDE_HUB_BY_LOCALE } from '@/modules/seo/guides/guides-content';
import { getLandingPageContent } from '@/modules/seo/landing-pages/content';
import { LANDING_PAGE_PATHS } from '@/modules/seo/landing-pages/landing-enriched-types';

export type SeoNavLink = {
  href: string;
  label: string;
};

/** Vodič + SEO landing stranice — jedan izvor za footer, početnu i InternalLinks. */
export function getSeoNavLinks(locale: AppLocale): SeoNavLink[] {
  const hub = GUIDE_HUB_BY_LOCALE[locale];

  return [
    { href: '/vodic', label: hub.title },
    ...LANDING_PAGE_PATHS.map((key) => ({
      href: `/${key}`,
      label: getLandingPageContent(key, locale).breadcrumbLabel,
    })),
  ];
}
