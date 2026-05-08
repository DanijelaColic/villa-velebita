import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type InternalLinksProps = {
  currentPath: '/smjestaj' | '/lokacija' | '/cjenik' | '/faq';
};

const LINK_ITEMS = [
  { href: '/smjestaj', labelKey: 'accommodation' },
  { href: '/lokacija', labelKey: 'location' },
  { href: '/cjenik', labelKey: 'pricing' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/booking', labelKey: 'booking' },
] as const;

export async function InternalLinks({ currentPath }: InternalLinksProps) {
  const t = await getTranslations('navbar');
  const links = LINK_ITEMS.filter((item) => item.href !== currentPath);

  return (
    <nav
      aria-label={t('menuLabel')}
      className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card"
    >
      {/* Lightweight internal linking block to strengthen crawl paths between key pages. */}
      <ul className="flex flex-wrap gap-2.5">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full border border-stone-pale px-3 py-1.5 text-sm text-oak transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {t(`links.${item.labelKey}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
