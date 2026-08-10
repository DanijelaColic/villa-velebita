import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AppImage } from '@/components/ui/AppImage';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import { getValidLocale } from '@/i18n/messages';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { TipTapRenderer } from '@/modules/cms/components/TipTapRenderer';
import {
  getArticleBySlug,
  getCmsMediaPublicUrl,
  getPublishedArticles,
} from '@/modules/cms/lib/get-articles';
import {
  NEWS_FALLBACK_COVER,
  NEWS_HUB_BY_LOCALE,
} from '@/modules/cms/news-copy';
import { GUIDE_SECONDARY_CTA } from '@/modules/seo/guides/guide-cta-copy';
import { isAdminAuthenticated } from '@/modules/booking-admin/lib/admin-auth';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
};

function formatPublishedAt(value: string | null, locale: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString(locale === 'hr' ? 'hr-HR' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function loadArticle(locale: string, slug: string, wantPreview: boolean) {
  const isAdmin = wantPreview ? await isAdminAuthenticated() : false;
  return getArticleBySlug(locale, slug, { includeDraft: isAdmin });
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = getValidLocale(await getLocale());
  const { slug } = await params;
  const { preview } = await searchParams;
  const wantPreview = preview === '1' || preview === 'true';
  const article = await loadArticle(locale, slug, wantPreview);

  if (!article) return {};

  const isDraftPreview = article.status === 'draft';
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt || title;
  const localizedPath =
    locale === 'hr' ? `/novosti/${article.slug}` : `/${locale}/novosti/${article.slug}`;
  const cover = getCmsMediaPublicUrl(article.cover_path) ?? NEWS_FALLBACK_COVER;

  return {
    title: isDraftPreview ? `[Skica] ${title}` : title,
    description,
    robots: isDraftPreview ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: localizedPath,
      languages: {
        hr: `/novosti/${article.slug}`,
        en: `/en/novosti/${article.slug}`,
        de: `/de/novosti/${article.slug}`,
        it: `/it/novosti/${article.slug}`,
        'x-default': `/novosti/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: localizedPath,
      title,
      description,
      publishedTime: article.published_at ?? undefined,
      modifiedTime: article.updated_at,
      authors: ['Villa Velebita'],
      images: [{ url: cover, alt: article.title }],
    },
  };
}

export default async function NovostiArticlePage({ params, searchParams }: Props) {
  const locale = getValidLocale(await getLocale());
  const { slug } = await params;
  const { preview } = await searchParams;
  const wantPreview = preview === '1' || preview === 'true';
  const article = await loadArticle(locale, slug, wantPreview);

  if (!article) notFound();

  const isDraftPreview = article.status === 'draft';
  const hub = NEWS_HUB_BY_LOCALE[locale];
  const tFooter = await getTranslations('footer');
  const secondaryCta = GUIDE_SECONDARY_CTA[locale];
  const related = isDraftPreview
    ? []
    : (await getPublishedArticles(locale))
        .filter((item) => item.slug !== article.slug)
        .slice(0, 3);
  const cover = getCmsMediaPublicUrl(article.cover_path) ?? NEWS_FALLBACK_COVER;
  const dateLabel = formatPublishedAt(article.published_at, locale);
  const basePath = locale === 'hr' ? '' : `/${locale}`;

  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: hub.title, pathname: '/novosti' },
    { name: article.title, pathname: `/novosti/${article.slug}` },
  ]);

  const blogPostingJsonLd = isDraftPreview
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt || article.title,
        datePublished: article.published_at,
        dateModified: article.updated_at,
        inLanguage: article.locale,
        author: {
          '@type': 'Organization',
          name: 'Villa Velebita',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Villa Velebita',
        },
        mainEntityOfPage: `https://villavelebita.hr${basePath}/novosti/${article.slug}`,
        image: cover.startsWith('http') ? cover : `https://villavelebita.hr${cover}`,
      };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {blogPostingJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
          />
        ) : null}

        <article className="mx-auto max-w-3xl py-8 sm:py-10">
          {isDraftPreview ? (
            <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
              Pregled skice — nije javno objavljeno. Samo ulogirani admin vidi ovu stranicu.
            </div>
          ) : null}

          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone">
            {hub.eyebrow}
          </p>
          <h1 className="mb-3 font-display text-3xl font-semibold text-oak sm:text-4xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mb-2 leading-relaxed text-stone">{article.excerpt}</p>
          ) : null}
          {dateLabel ? (
            <p className="mb-8 text-xs text-stone">
              {hub.publishedLabel}: {dateLabel}
            </p>
          ) : (
            <div className="mb-8" />
          )}

          <div className="mb-10 overflow-hidden rounded-card border border-stone-pale bg-white shadow-card">
            <div className="relative aspect-[21/9] w-full bg-stone-pale">
              <AppImage
                src={cover}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>

          <TipTapRenderer content={article.content} />

          {related.length > 0 ? (
            <section className="mt-12">
              <h2 className="mb-4 font-display text-2xl font-semibold text-oak">
                {hub.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/novosti/${item.slug}`}
                    className="inline-flex rounded-full border border-stone-pale bg-white px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <InternalLinks currentPath={`/novosti/${article.slug}`} />

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
        </article>
      </main>
      <Footer />
    </>
  );
}
