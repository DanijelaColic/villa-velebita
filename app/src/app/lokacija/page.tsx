import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHeader } from '@/components/SubpageHeader';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { Location } from '@/components/sections/Location';
import {
  getBreadcrumbStructuredData,
  getPageMetadata,
} from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/lokacija',
    namespace: 'metadata.pages.location',
  });
}

export default async function LokacijaPage() {
  const locale = await getLocale();
  const t = await getTranslations('locationPage');
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: t('title'), pathname: '/lokacija' },
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        {/* Breadcrumb structured data for rich results and clearer page hierarchy. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <SubpageHeader
          title={t('title')}
          description={t('description')}
        />
        <Location />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <InternalLinks currentPath="/lokacija" />
        </div>
      </main>
      <Footer />
    </>
  );
}
