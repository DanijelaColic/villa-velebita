import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AppImage } from '@/components/ui/AppImage';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import { getValidLocale } from '@/i18n/messages';
import { InternalLinks } from '@/components/seo/InternalLinks';
import {
  getCmsMediaPublicUrl,
  getPublishedArticles,
} from '@/modules/cms/lib/get-articles';
import {
  NEWS_FALLBACK_COVER,
  NEWS_HUB_BY_LOCALE,
} from '@/modules/cms/news-copy';
import {
  getPageSeoOverride,
  mergePageSeo,
} from '@/modules/cms/lib/get-page-seo';
import { GUIDE_SECONDARY_CTA } from '@/modules/seo/guides/guide-cta-copy';

export async function generateMetadata(): Promise<Metadata> {
  const locale = getValidLocale(await getLocale());
  const content = NEWS_HUB_BY_LOCALE[locale];
  const localizedPath = locale === 'hr' ? '/novosti' : `/${locale}/novosti`;
  const override = await getPageSeoOverride(locale, 'news');
  const seo = mergePageSeo(
    {
      title: `${content.title} | Villa Velebita`,
      description: content.description,
      ogTitle: `${content.title} | Villa Velebita`,
      ogDescription: content.description,
      ogImageAlt: content.title,
    },
    override,
  );

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: localizedPath,
      languages: {
        hr: '/novosti',
        en: '/en/novosti',
        de: '/de/novosti',
        it: '/it/novosti',
        'x-default': '/novosti',
      },
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: localizedPath,
      images: [{ url: NEWS_FALLBACK_COVER, alt: seo.ogImageAlt }],
    },
  };
}

function formatPublishedAt(value: string | null, locale: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(locale === 'hr' ? 'hr-HR' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function NovostiPage() {
  const locale = getValidLocale(await getLocale());
  const content = NEWS_HUB_BY_LOCALE[locale];
  const articles = await getPublishedArticles(locale);
  const tFooter = await getTranslations('footer');
  const secondaryCta = GUIDE_SECONDARY_CTA[locale];
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: content.title, pathname: '/novosti' },
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone">
            {content.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold text-oak sm:text-4xl">
            {content.title}
          </h1>
          <p className="mb-8 leading-relaxed text-stone">{content.description}</p>

          {articles.length === 0 ? (
            <p className="rounded-card border border-stone-pale bg-white px-5 py-10 text-center text-stone shadow-card">
              {content.empty}
            </p>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => {
                const cover =
                  getCmsMediaPublicUrl(article.cover_path) ?? NEWS_FALLBACK_COVER;
                const dateLabel = formatPublishedAt(article.published_at, locale);

                return (
                  <article
                    key={article.id}
                    className="overflow-hidden rounded-card border border-stone-pale bg-white shadow-card"
                  >
                    <Link href={`/novosti/${article.slug}`} className="group block">
                      <div className="relative aspect-[21/9] w-full bg-stone-pale">
                        <AppImage
                          src={cover}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 896px"
                        />
                      </div>
                      <div className="p-5">
                        <h2 className="mb-2 font-display text-xl text-oak transition-colors group-hover:text-terracotta">
                          {article.title}
                        </h2>
                        {article.excerpt ? (
                          <p className="mb-3 line-clamp-2 text-sm text-stone">
                            {article.excerpt}
                          </p>
                        ) : null}
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-xs text-stone">
                            {dateLabel
                              ? `${content.publishedLabel}: ${dateLabel}`
                              : null}
                          </p>
                          <span className="text-sm font-semibold text-terracotta transition-colors group-hover:text-terracotta-dark">
                            {content.readMore}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          <InternalLinks currentPath="/novosti" />

          <div className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="mb-2 font-display text-xl text-oak">{secondaryCta.title}</h2>
            <p className="mb-4 text-sm leading-relaxed text-stone">
              {secondaryCta.description}
            </p>
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
