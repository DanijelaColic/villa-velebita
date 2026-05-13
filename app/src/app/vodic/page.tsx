import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import { getGuides } from '@/modules/seo/guides/get-guides';
import { GUIDE_HUB_BY_LOCALE } from '@/modules/seo/guides/guides-content';
import { getValidLocale } from '@/i18n/messages';
import { GUIDE_HUB_UI, GUIDE_SECONDARY_CTA } from '@/modules/seo/guides/guide-cta-copy';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getValidLocale(await getLocale());
  const content = GUIDE_HUB_BY_LOCALE[locale];
  const localizedPath = locale === 'hr' ? '/vodic' : `/${locale}/vodic`;

  return {
    title: `${content.title} | Villa Velebita`,
    description: content.description,
    alternates: {
      canonical: localizedPath,
    },
    openGraph: {
      title: `${content.title} | Villa Velebita`,
      description: content.description,
      url: localizedPath,
      images: ['/images/hero/exterior-08.jpg'],
    },
  };
}

export default async function VodicPage() {
  const locale = getValidLocale(await getLocale());
  const content = GUIDE_HUB_BY_LOCALE[locale];
  const guides = getGuides(locale);
  const tFooter = await getTranslations('footer');
  const hubUi = GUIDE_HUB_UI[locale];
  const secondaryCta = GUIDE_SECONDARY_CTA[locale];
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: content.title, pathname: '/vodic' },
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="mx-auto max-w-4xl py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            {hubUi.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-oak mb-3">
            {content.title}
          </h1>
          <p className="text-stone leading-relaxed mb-8">{content.description}</p>

          <div className="grid gap-4">
            {guides.map((guide) => (
              <article
                key={guide.slug}
                className="rounded-card border border-stone-pale bg-white p-5 shadow-card"
              >
                <h2 className="font-display text-xl text-oak mb-2">{guide.title}</h2>
                <p className="text-sm text-stone mb-3">{guide.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-stone">
                    {guide.publishedAt} · {guide.readingTime}
                  </p>
                  <Link
                    href={`/vodic/${guide.slug}`}
                    className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
                  >
                    {hubUi.readGuide}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Same commercial path as guide articles: booking + pricing + location. */}
          <div className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl text-oak mb-2">{secondaryCta.title}</h2>
            <p className="text-stone text-sm leading-relaxed mb-4">{secondaryCta.description}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/booking"
                className="inline-flex rounded-full bg-terracotta px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                {secondaryCta.bookingLabel}
              </Link>
              <Link
                href="/cjenik"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {tFooter('links.pricing')}
              </Link>
              <Link
                href="/lokacija"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {tFooter('links.location')}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
