import { Mail, MapPin, Phone } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { localizePath } from '@/i18n/pathnames';
import { getValidLocale } from '@/i18n/messages';

const NAV_LINKS = [
  { href: '/smjestaj', labelKey: 'accommodation' },
  { href: '/galerija', labelKey: 'gallery' },
  { href: '/sadrzaji', labelKey: 'amenities' },
  { href: '/lokacija', labelKey: 'location' },
  { href: '/cjenik', labelKey: 'pricing' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/booking', labelKey: 'booking' },
  { href: '/#kontakt', labelKey: 'contact' },
];

export async function Footer() {
  const locale = getValidLocale(await getLocale());
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();
  const contactHref = `${localizePath('/', locale)}#kontakt`;

  return (
    <footer className="bg-oak text-cream" aria-label={t('ariaLabel')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-display text-2xl font-semibold text-cream mb-2">
              {t('brand')}
            </p>
            <p className="text-sm text-cream/60 uppercase tracking-widest mb-4">
              {t('location')}
            </p>
            <p className="text-stone-light text-sm leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/50 mb-4">
              {t('navTitle')}
            </p>
            <nav aria-label={t('navigationAriaLabel')}>
              <ul className="space-y-2">
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    {link.href === '/#kontakt' ? (
                      <a
                        href={contactHref}
                        className="text-sm text-stone-light hover:text-cream transition-colors duration-150"
                      >
                        {t(`links.${link.labelKey}`)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-stone-light hover:text-cream transition-colors duration-150"
                      >
                        {t(`links.${link.labelKey}`)}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/50 mb-4">
              {t('contactTitle')}
            </p>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="size-4 text-terracotta mt-0.5 shrink-0" />
                <div className="text-sm text-stone-light leading-snug">
                  <span className="font-medium text-cream">{t('address.line1')}</span>
                  <br />
                  {t('address.line2')}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="size-4 text-terracotta shrink-0" />
                <a
                  href="tel:+385919295907"
                  className="text-sm text-stone-light hover:text-cream transition-colors duration-150"
                >
                  091 929 5907
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="size-4 text-terracotta shrink-0" />
                <a
                  href="mailto:Ivica.cacic485@gmail.com"
                  className="text-sm text-stone-light hover:text-cream transition-colors duration-150 break-all"
                >
                  Ivica.cacic485@gmail.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xs text-cream/40">
              © {year} {t('brand')}. {t('copyright')}
            </p>
            <p className="text-xs text-cream/40 mt-1">
              {t('builtByPrefix')}{' '}
              <a
                href="https://www.enkr.hr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-light hover:text-cream transition-colors duration-150"
              >
                ENKR
              </a>
              {t('builtBySuffix')}
            </p>
          </div>
          <a
            href="https://wa.me/385919295907"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-light hover:text-cream transition-colors duration-150"
          >
            {t('whatsappLabel')}: 091 929 5907
          </a>
        </div>
      </div>
    </footer>
  );
}
