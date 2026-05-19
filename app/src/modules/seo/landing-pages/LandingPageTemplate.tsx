import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { AppImage } from '@/components/ui/AppImage';
import { Link } from '@/i18n/navigation';
import { getBreadcrumbStructuredData } from '@/i18n/metadata';
import type { AppLocale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { getGuides } from '@/modules/seo/guides/get-guides';
import { getLandingPageContent, type LandingPageKey } from './content';
import { LANDING_RESERVATION_HEADING } from './landing-template-ui';

type LandingPageTemplateProps = {
  pageKey: LandingPageKey;
  locale: AppLocale;
};

export async function LandingPageTemplate({ pageKey, locale }: LandingPageTemplateProps) {
  const content = getLandingPageContent(pageKey, locale);
  const pathname = `/${pageKey}`;
  const relatedGuides = getGuides(locale).slice(0, 3);
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: content.breadcrumbLabel, pathname },
  ]);
  const tFooter = await getTranslations('footer');

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((item) => ({
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <article className="mx-auto max-w-4xl py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            {content.eyebrow}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-oak mb-4">
            {content.h1}
          </h1>
          <p className="text-stone leading-relaxed mb-8">{content.intro}</p>

          <div className="mb-10 overflow-hidden rounded-card border border-stone-pale bg-white shadow-card">
            <div className="relative aspect-[21/9] w-full bg-stone-pale">
              <AppImage
                src={content.heroImage.src}
                alt={content.heroImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>

          <ul className="mb-10 grid gap-3 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <li
                key={item}
                className="rounded-card border border-stone-pale bg-white px-4 py-3 text-sm font-medium text-oak shadow-card"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="space-y-10">
            {content.sections.map((section) => (
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
              {content.activitiesSectionTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {content.activities.map((card) => (
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
                      sizes="(max-width: 640px) 100vw, 432px"
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
            <h2 className="font-display text-2xl font-semibold text-oak mb-3">{content.midCtaTitle}</h2>
            <p className="text-stone leading-relaxed mb-5">{content.midCtaBody}</p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href="/booking"
                className="inline-flex rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                {content.midCtaPrimaryLabel}
              </Link>
              <Link
                href="/galerija"
                className="inline-flex rounded-full border border-stone-pale px-5 py-2.5 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {content.midCtaGalleryLabel}
              </Link>
            </div>
          </section>

          <section className="mt-12 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl font-semibold text-oak mb-2">
              {LANDING_RESERVATION_HEADING[locale]}
            </h2>
            <p className="text-stone text-sm leading-relaxed mb-4">{content.reservationIntro}</p>
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
                {tFooter('links.pricing')}
              </Link>
              <Link
                href="/galerija"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {tFooter('links.gallery')}
              </Link>
              <Link
                href="/lokacija"
                className="inline-flex rounded-full border border-stone-pale px-4 py-2 text-sm font-semibold text-oak transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {tFooter('links.location')}
              </Link>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-oak mb-3">
              {content.faqSectionTitle}
            </h2>
            <div className="space-y-2">
              {content.faqs.map((item) => (
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

          <section className="mt-10 rounded-card border border-stone-pale bg-white p-5 shadow-card">
            <h2 className="font-display text-xl font-semibold text-oak mb-2">{content.guidesBlockTitle}</h2>
            <p className="text-stone text-sm leading-relaxed mb-4">{content.guidesBlockIntro}</p>
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
