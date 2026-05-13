import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import { getGuideBySlug } from '@/modules/seo/guides/get-guide-by-slug';
import { GUIDE_SECONDARY_CTA } from '@/modules/seo/guides/guide-cta-copy';
import { getValidLocale } from '@/i18n/messages';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = getValidLocale(await getLocale());
  const { slug } = await params;
  const guide = getGuideBySlug(locale, slug);

  if (!guide) {
    return {};
  }

  const localizedPath = locale === 'hr' ? `/vodic/${guide.slug}` : `/${locale}/vodic/${guide.slug}`;
  const alternates = {
    hr: `/vodic/${guide.slug}`,
    en: `/en/vodic/${guide.slug}`,
    de: `/de/vodic/${guide.slug}`,
    it: `/it/vodic/${guide.slug}`,
    'x-default': `/vodic/${guide.slug}`,
  };

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: {
      canonical: localizedPath,
      languages: alternates,
    },
    openGraph: {
      url: localizedPath,
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt ?? guide.publishedAt,
      authors: ['Villa Velebita'],
    },
  };
}

export default async function VodicArticlePage({ params }: Props) {
  const locale = getValidLocale(await getLocale());
  const { slug } = await params;
  const guide = getGuideBySlug(locale, slug);

  if (!guide) {
    notFound();
  }

  const tFooter = await getTranslations('footer');
  const secondaryCta = GUIDE_SECONDARY_CTA[locale];

  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: 'Vodic', pathname: '/vodic' },
    { name: guide.title, pathname: `/vodic/${guide.slug}` },
  ]);

  const basePath = locale === 'hr' ? '' : `/${locale}`;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    inLanguage: locale,
    author: {
      '@type': 'Organization',
      name: 'Villa Velebita',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Villa Velebita',
    },
    mainEntityOfPage: `https://villavelebita.hr${basePath}/vodic/${guide.slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
        />
        <article className="mx-auto max-w-3xl py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            Guide
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-oak mb-3">
            {guide.title}
          </h1>
          <p className="text-stone leading-relaxed mb-2">{guide.description}</p>
          <p className="text-xs text-stone mb-8">
            {guide.publishedAt} · {guide.readingTime}
          </p>

          <div className="space-y-8">
            {guide.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-oak mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-stone leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl text-oak mb-2">
              Povezane stranice za rezervaciju
            </h2>
            <ul className="flex flex-wrap gap-2.5">
              {guide.relatedLandingPages.map((path) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="inline-flex rounded-full border border-stone-pale px-3 py-1.5 text-sm text-oak transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    {path.replace('/', '')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary commercial CTAs: pricing + location alongside booking (conversion path from guides). */}
          <div className="mt-6 rounded-card border border-stone-pale bg-white p-5 shadow-card">
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
        </article>
      </main>
      <Footer />
    </>
  );
}
