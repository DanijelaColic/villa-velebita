import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { Pricing } from '@/components/sections/Pricing';
import {
  getBreadcrumbStructuredData,
  getPageMetadata,
} from '@/i18n/metadata';
import {
  LONG_STAY_DISCOUNT_NIGHTS,
  LONG_STAY_DISCOUNT_RATE,
  MIN_NIGHTS,
  apartments,
} from '@/modules/booking-admin/booking.config';

const BASE_URL = 'https://villavelebita.hr';
const DEFAULT_LOCALE = 'hr';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/cjenik',
    namespace: 'metadata.pages.pricing',
  });
}

export default async function CjenikPage() {
  const locale = await getLocale();
  const villa = apartments[0];
  const localizedPath = locale === DEFAULT_LOCALE ? '/cjenik' : `/${locale}/cjenik`;
  const breadcrumbJsonLd = getBreadcrumbStructuredData(locale, [
    { name: 'Villa Velebita', pathname: '/' },
    { name: 'Cjenik', pathname: '/cjenik' },
  ]);

  // Pricing structured data helps search engines understand nightly rate and booking terms.
  const pricingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    url: `${BASE_URL}${localizedPath}`,
    itemOffered: {
      '@type': 'Accommodation',
      name: villa.name,
      description: villa.description,
      occupancy: {
        '@type': 'QuantitativeValue',
        maxValue: villa.capacity,
      },
    },
    priceCurrency: 'EUR',
    price: villa.priceOffSeason.toString(),
    category: 'https://schema.org/Accommodation',
    eligibleDuration: {
      '@type': 'QuantitativeValue',
      value: MIN_NIGHTS,
      unitText: 'NIGHT',
    },
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      maxValue: villa.capacity,
    },
    eligibleCustomerType: 'https://schema.org/BusinessAudience',
    validFrom: new Date().toISOString(),
    description: `Flat rate ${villa.priceOffSeason} EUR per night with ${
      LONG_STAY_DISCOUNT_RATE * 100
    }% discount for stays of ${LONG_STAY_DISCOUNT_NIGHTS}+ nights.`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        {/* Breadcrumb structured data for rich results and clearer page hierarchy. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
        />
        <Pricing bookingHref="/booking" />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <InternalLinks currentPath="/cjenik" />
        </div>
      </main>
      <Footer />
    </>
  );
}
