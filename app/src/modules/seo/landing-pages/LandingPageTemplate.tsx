import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import type { AppLocale } from '@/i18n/routing';
import { getGuides } from '@/modules/seo/guides/get-guides';
import { getLandingPageContent, type LandingPageKey } from './content';

type LandingPageTemplateProps = {
  pageKey: LandingPageKey;
  locale: AppLocale;
};

export function LandingPageTemplate({ pageKey, locale }: LandingPageTemplateProps) {
  const content = getLandingPageContent(pageKey, locale);
  const pathname = `/${pageKey}`;
  const relatedGuides = getGuides(locale).slice(0, 3);
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: content.breadcrumbLabel, pathname },
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <article className="mx-auto max-w-4xl py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            Plitvice & Lika
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-oak mb-4">
            {content.h1}
          </h1>
          <p className="text-stone leading-relaxed mb-8">{content.intro}</p>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-oak mb-3">
                  {section.heading}
                </h2>
                <p className="text-stone leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl font-semibold text-oak mb-2">
              Rezervacija i planiranje boravka
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-4">
              Pogledaj cijene, dostupnost i lokaciju prije rezervacije kako bi plan putovanja bio
              jednostavan i bez iznenadenja.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/booking"
                className="inline-flex rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                {content.ctaLabel}
              </Link>
              <Link
                href="/cjenik"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Cjenik
              </Link>
              <Link
                href="/galerija"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Galerija
              </Link>
              <Link
                href="/lokacija"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                Lokacija
              </Link>
            </div>
          </section>

          <section className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl font-semibold text-oak mb-2">
              Procitaj i vodice za Plitvice i Liku
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-4">
              Ako planiras boravak, ovi vodiči ti pomazu sloziti bolji raspored i povezati
              aktivnosti s pravim smjestajem.
            </p>
            <ul className="space-y-2">
              {relatedGuides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={`/vodic/${guide.slug}`}
                    className="text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <InternalLinks currentPath={pathname} />
        </article>
      </main>
      <Footer />
    </>
  );
}
