'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';
import {
  getLocaleFromPath,
  localizePath,
  stripLocalePrefix,
} from '@/i18n/pathnames';
import type { AppLocale } from '@/i18n/routing';

type NavEntry =
  | { kind: 'route'; href: string; labelKey: string }
  | { kind: 'hash'; id: string; labelKey: string };

const navEntries: NavEntry[] = [
  { kind: 'route', href: '/smjestaj', labelKey: 'accommodation' },
  { kind: 'route', href: '/galerija', labelKey: 'gallery' },
  { kind: 'route', href: '/sadrzaji', labelKey: 'amenities' },
  { kind: 'route', href: '/cjenik', labelKey: 'pricing' },
  { kind: 'route', href: '/booking', labelKey: 'booking' },
  { kind: 'hash', id: 'kontakt', labelKey: 'contact' },
];

const localeOptions: AppLocale[] = ['hr', 'en', 'de', 'it'];

export function Navbar() {
  const t = useTranslations('navbar');
  const rawPathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const currentLocale = getLocaleFromPath(rawPathname);
  const pathname = stripLocalePrefix(rawPathname ?? '/');
  const isHome = pathname === '/';
  const homeHref = localizePath('/', currentLocale);

  /** Na početnoj: svijetli tekst iznad heroa dok nije skrol; na svim ostalim rutama uvijek tamni tekst na svijetloj traci. */
  const solidNav = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = cn(
    'text-sm font-medium tracking-wide transition-colors hover:text-terracotta',
    solidNav ? 'text-oak' : 'text-cream/90 drop-shadow',
  );

  const switchLocale = (locale: AppLocale) => {
    if (locale === currentLocale) return;

    // next-intl locale switching needs an explicit cookie write before hard navigation.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;

    const search = window.location.search;
    const hash = window.location.hash;

    // Hard navigation avoids stale next-intl client context after locale changes.
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = `${localizePath(pathname, locale)}${search}${hash}`;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        solidNav
          ? 'bg-cream/95 backdrop-blur-md shadow-card border-b border-stone-pale/60'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={cn(
              'font-display font-semibold text-xl md:text-2xl transition-colors',
              solidNav ? 'text-oak' : 'text-cream drop-shadow-md',
            )}
            onClick={e => {
              setOpen(false);
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            {t('brandPrefix')} <span className="text-terracotta-light">{t('brandAccent')}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navEntries.map(entry => {
              if (entry.kind === 'route') {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className={linkClass}
                    onClick={() => setOpen(false)}
                  >
                    {t(`links.${entry.labelKey}`)}
                  </Link>
                );
              }
              const href = isHome ? `#${entry.id}` : `${homeHref}#${entry.id}`;
              return (
                <a
                  key={entry.id}
                  href={href}
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  {t(`links.${entry.labelKey}`)}
                </a>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div
              className={cn(
                'flex items-center gap-1 rounded-full border px-1 py-1',
                solidNav
                  ? 'border-stone-pale bg-white/70'
                  : 'border-white/20 bg-black/15 backdrop-blur-sm',
              )}
              aria-label={t('localeLabel')}
            >
              {localeOptions.map(locale => {
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => switchLocale(locale)}
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors',
                      isActive
                        ? 'bg-terracotta text-white'
                        : solidNav
                          ? 'text-oak hover:bg-cream-dark'
                          : 'text-cream hover:bg-white/10',
                    )}
                    aria-pressed={isActive}
                  >
                    {t(`locales.${locale}`)}
                  </button>
                );
              })}
            </div>
            <a
              href="tel:+385919295907"
              className={cn(
                'flex items-center gap-1.5 text-sm font-medium transition-colors',
                solidNav ? 'text-oak hover:text-terracotta' : 'text-cream/90 hover:text-cream drop-shadow',
              )}
            >
              <Phone className="size-4" />
              <span>091 929 5907</span>
            </a>
            <Button size="sm" asChild>
              <Link href="/booking">{t('cta.primary')}</Link>
            </Button>
          </div>

          <button
            onClick={() => setOpen(v => !v)}
            className={cn(
              'lg:hidden p-2 rounded-btn transition-colors',
              solidNav ? 'text-oak hover:bg-cream-dark' : 'text-cream hover:bg-white/10',
            )}
            aria-label={t('menuLabel')}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          open ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <nav className="bg-cream border-t border-stone-pale px-4 py-4 flex flex-col gap-1">
          {navEntries.map(entry => {
            if (entry.kind === 'route') {
              return (
                <Link
                  key={entry.href}
                  href={entry.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-oak font-medium rounded-btn hover:bg-cream-dark hover:text-terracotta transition-colors"
                >
                  {t(`links.${entry.labelKey}`)}
                </Link>
              );
            }
            const href = isHome ? `#${entry.id}` : `${homeHref}#${entry.id}`;
            return (
              <a
                key={entry.id}
                href={href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-oak font-medium rounded-btn hover:bg-cream-dark hover:text-terracotta transition-colors"
              >
                {t(`links.${entry.labelKey}`)}
              </a>
            );
          })}
          <div className="mt-2 px-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone">
              {t('localeLabel')}
            </p>
            <div className="flex flex-wrap gap-2">
              {localeOptions.map(locale => {
                const isActive = locale === currentLocale;

                return (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      switchLocale(locale);
                    }}
                    className={cn(
                      'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase transition-colors',
                      isActive
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-stone-pale text-oak hover:bg-cream-dark',
                    )}
                    aria-pressed={isActive}
                  >
                    {t(`locales.${locale}`)}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-pale flex flex-col gap-2">
            <a
              href="tel:+385919295907"
              className="flex items-center gap-2 px-3 py-2 text-oak font-medium"
            >
              <Phone className="size-4 text-terracotta" />
              091 929 5907
            </a>
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setOpen(false)}>
                {t('cta.mobile')}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
