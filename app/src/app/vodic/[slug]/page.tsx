import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AppImage } from '@/components/ui/AppImage';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import { getGuideBySlug } from '@/modules/seo/guides/get-guide-by-slug';
import { GUIDE_SECONDARY_CTA } from '@/modules/seo/guides/guide-cta-copy';
import { getValidLocale } from '@/i18n/messages';
import { getLandingPageContent } from '@/modules/seo/landing-pages/content';
import { parseLandingPageKeyFromPath } from '@/modules/seo/landing-pages/landing-enriched-types';

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
      images: [{ url: guide.coverImage.src, alt: guide.coverImage.alt }],
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <article className="mx-auto max-w-3xl py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            {guide.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-oak mb-3">
            {guide.title}
          </h1>
          <p className="text-stone leading-relaxed mb-2">{guide.description}</p>
          <p className="text-xs text-stone mb-8">
            {guide.publishedAt} · {guide.readingTime}
          </p>

          <div className="mb-10 overflow-hidden rounded-card border border-stone-pale bg-white shadow-card">
            <div className="relative aspect-[21/9] w-full bg-stone-pale">
              <AppImage
                src={guide.coverImage.src}
                alt={guide.coverImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>

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

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-oak mb-4">
              {guide.activitiesSectionTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {guide.activities.map((card) => (
                <div
                  key={card.title}
                  className="overflow-hidden rounded-card border border-stone-pale bg-white shadow-card"
                >
                  <div className="relative aspect-[16/10] w-full bg-stone-pale">
                    <AppImage
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 360px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-oak mb-2">{card.title}</h3>
                    <p className="text-sm text-stone leading-relaxed">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-card border border-terracotta/25 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-oak mb-3">{guide.midCtaTitle}</h2>
            <p className="text-stone leading-relaxed mb-5">{guide.midCtaBody}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/booking"
                className="inline-flex rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                {guide.midCtaBookingLabel}
              </Link>
              <Link
                href="/galerija"
                className="inline-flex rounded-full border border-stone-pale px-5 py-2.5 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {guide.midCtaGalleryLabel}
              </Link>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-oak mb-3">{guide.faqSectionTitle}</h2>
            <div className="space-y-2">
              {guide.faqs.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-card border border-stone-pale bg-white px-4 py-3 shadow-card open:border-terracotta/30"
                >
                  <summary className="cursor-pointer list-none font-semibold text-oak pr-6 marker:content-none [&::-webkit-details-marker]:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm text-stone leading-relaxed border-t border-stone-pale pt-3">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <div className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl text-oak mb-2">{guide.relatedLandingsTitle}</h2>
            <p className="text-stone text-sm leading-relaxed mb-4">{guide.relatedLandingsIntro}</p>
            <ul className="flex flex-wrap gap-2.5">
              {guide.relatedLandingPages.map((path) => {
                const key = parseLandingPageKeyFromPath(path);
                const label = key
                  ? getLandingPageContent(key, locale).breadcrumbLabel
                  : path.replace(/^\//, '');
                return (
                  <li key={path}>
                    <Link
                      href={path}
                      className="inline-flex rounded-full border border-stone-pale px-3 py-1.5 text-sm text-oak transition-colors hover:border-terracotta hover:text-terracotta"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
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
