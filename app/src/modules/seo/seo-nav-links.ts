import type { AppLocale } from '@/i18n/routing';
import { GUIDE_HUB_BY_LOCALE } from '@/modules/seo/guides/guides-content';
import { NEWS_HUB_BY_LOCALE } from '@/modules/cms/news-copy';
import { getLandingPageContent } from '@/modules/seo/landing-pages/content';
import { LANDING_PAGE_PATHS } from '@/modules/seo/landing-pages/landing-enriched-types';

export type SeoNavLink = {
  href: string;
  label: string;
};

/** Vodič + novosti + SEO landing stranice — jedan izvor za footer, početnu i InternalLinks. */
export function getSeoNavLinks(locale: AppLocale): SeoNavLink[] {
  const hub = GUIDE_HUB_BY_LOCALE[locale];
  const news = NEWS_HUB_BY_LOCALE[locale];

  return [
    { href: '/vodic', label: hub.title },
    { href: '/novosti', label: news.title },
    ...LANDING_PAGE_PATHS.map((key) => ({
      href: `/${key}`,
      label: getLandingPageContent(key, locale).breadcrumbLabel,
    })),
  ];
}
