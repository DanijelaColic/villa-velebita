import {routing, type AppLocale} from './routing';

function normalizePath(pathname: string) {
  if (!pathname.startsWith('/')) {
    return `/${pathname}`;
  }

  return pathname;
}

export function getLocaleFromPath(pathname: string | null | undefined): AppLocale {
  const normalizedPath = normalizePath(pathname ?? '/');

  for (const locale of routing.locales) {
    if (
      normalizedPath === `/${locale}` ||
      normalizedPath.startsWith(`/${locale}/`)
    ) {
      return locale;
    }
  }

  return routing.defaultLocale;
}

export function stripLocalePrefix(pathname: string) {
  const normalizedPath = normalizePath(pathname);

  for (const locale of routing.locales) {
    if (normalizedPath === `/${locale}`) {
      return '/';
    }

    if (normalizedPath.startsWith(`/${locale}/`)) {
      return normalizedPath.slice(locale.length + 1);
    }
  }

  return normalizedPath;
}

export function localizePath(pathname: string, locale: AppLocale) {
  const basePath = stripLocalePrefix(pathname);

  if (locale === routing.defaultLocale) {
    return basePath;
  }

  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}
