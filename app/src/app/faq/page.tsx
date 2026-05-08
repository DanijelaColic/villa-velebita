import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { FAQ } from '@/components/sections/FAQ';
import {
  getBreadcrumbStructuredData,
  getPageMetadata,
} from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/faq',
    namespace: 'metadata.pages.faq',
  });
}

export default async function FaqPage() {
  const locale = await getLocale();
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: 'FAQ', pathname: '/faq' },
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
        <FAQ />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <InternalLinks currentPath="/faq" />
        </div>
      </main>
      <Footer />
    </>
  );
}
