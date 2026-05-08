import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { About } from '@/components/sections/About';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { HouseRules } from '@/components/sections/HouseRules';
import { InternalLinks } from '@/components/seo/InternalLinks';
import {
  getBreadcrumbStructuredData,
  getPageMetadata,
} from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/smjestaj',
    namespace: 'metadata.pages.accommodation',
  });
}

export default async function SmjestajPage() {
  const locale = await getLocale();
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: 'Smjestaj', pathname: '/smjestaj' },
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
        <About bookingHref="/booking" galleryHref="/galerija" />
        <FloorPlan />
        <HouseRules />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <InternalLinks currentPath="/smjestaj" />
        </div>
      </main>
      <Footer />
    </>
  );
}
