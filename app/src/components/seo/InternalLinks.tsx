import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getValidLocale } from '@/i18n/messages';
import { getSeoNavLinks } from '@/modules/seo/seo-nav-links';

type InternalLinksProps = {
  currentPath: string;
};

const CORE_LINKS = [
  { href: '/smjestaj', labelKey: 'accommodation' },
  { href: '/lokacija', labelKey: 'location' },
  { href: '/cjenik', labelKey: 'pricing' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/booking', labelKey: 'booking' },
] as const;

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

export async function InternalLinks({ currentPath }: InternalLinksProps) {
  const locale = getValidLocale(await getLocale());
  const t = await getTranslations('navbar');
  const normalizedCurrent = normalizePath(currentPath);

  const links = [
    ...getSeoNavLinks(locale),
    ...CORE_LINKS.map((item) => ({
      href: item.href,
      label: t(`links.${item.labelKey}`),
    })),
  ].filter((item) => normalizePath(item.href) !== normalizedCurrent);

  return (
    <nav
      aria-label={t('menuLabel')}
      className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card"
    >
      <ul className="flex flex-wrap gap-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full border border-stone-pale px-3 py-1.5 text-sm text-oak transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
