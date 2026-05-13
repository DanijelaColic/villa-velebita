import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getGalleryItems, getPublicMediaUrl } from '@/lib/gallery';
import { GUIDES } from '@/modules/seo/guides/guides-content';

const BASE_URL = 'https://villavelebita.hr';

const MAX_SITEMAP_IMAGES = 100;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { pathname: '/', changeFrequency: 'weekly', priority: 1 },
    { pathname: '/smjestaj', changeFrequency: 'monthly', priority: 0.95 },
    { pathname: '/sadrzaji', changeFrequency: 'monthly', priority: 0.9 },
    { pathname: '/galerija', changeFrequency: 'monthly', priority: 0.9 },
    { pathname: '/lokacija', changeFrequency: 'monthly', priority: 0.9 },
    { pathname: '/cjenik', changeFrequency: 'monthly', priority: 0.9 },
    { pathname: '/faq', changeFrequency: 'monthly', priority: 0.85 },
    { pathname: '/booking', changeFrequency: 'weekly', priority: 0.9 },
    { pathname: '/smjestaj-plitvicka-jezera', changeFrequency: 'weekly', priority: 0.9 },
    { pathname: '/kuca-za-odmor-plitvice', changeFrequency: 'weekly', priority: 0.88 },
    { pathname: '/villa-jacuzzi-plitvice', changeFrequency: 'weekly', priority: 0.88 },
    { pathname: '/smjestaj-za-9-osoba-plitvice', changeFrequency: 'weekly', priority: 0.86 },
    { pathname: '/vodic', changeFrequency: 'weekly', priority: 0.8 },
  ] as const;
  const guideRoutes = Array.from(new Set(GUIDES.map((guide) => `/vodic/${guide.slug}`))).map(
    (pathname) => ({
      pathname,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }),
  );
  const allRoutes = [...staticRoutes, ...guideRoutes];

  const toLocalizedPath = (locale: string, pathname: string) => {
    const normalizedPath = pathname === '/' ? '' : pathname;

    if (locale === routing.defaultLocale) {
      return normalizedPath || '/';
    }

    return `/${locale}${normalizedPath}`;
  };

  const getLanguageAlternates = (pathname: string) =>
    ({
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, `${BASE_URL}${toLocalizedPath(locale, pathname)}`]),
      ),
      'x-default': `${BASE_URL}${toLocalizedPath(routing.defaultLocale, pathname)}`,
    });

  // Image URLs are attached to key landing URLs to improve media discoverability in search.
  const galleryImageUrls = (await getGalleryItems())
    .filter((item) => item.media_type === 'image')
    .slice(0, MAX_SITEMAP_IMAGES)
    .map((item) => getPublicMediaUrl(item.storage_path));

  const getRouteImages = (pathname: string) => {
    if (pathname === '/' || pathname === '/galerija') {
      return galleryImageUrls;
    }

    return undefined;
  };

  return allRoutes.map(({ pathname, changeFrequency, priority }) => {
    const defaultLocalePath = toLocalizedPath(routing.defaultLocale, pathname);

    return {
      url: `${BASE_URL}${defaultLocalePath}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      images: getRouteImages(pathname),
      alternates: {
        languages: getLanguageAlternates(pathname),
      },
    };
  });
}
