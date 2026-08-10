import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { InternalLinks } from '@/components/seo/InternalLinks';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { getPageMetadata } from '@/i18n/metadata';
import { getBookingSettings, getSpecialPricePeriods, priceFeesFromSettings } from '@/modules/cms/lib/get-booking-settings';
import { getPaymentSettings } from '@/modules/cms/lib/get-payment-settings';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/booking',
    namespace: 'metadata.pages.booking',
  });
}

type Props = {
  searchParams: Promise<{ apartment?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const t = await getTranslations('bookingPage');
  const { apartment } = await searchParams;
  const [bookingSettings, specialPricePeriods, payment] = await Promise.all([
    getBookingSettings(),
    getSpecialPricePeriods(),
    getPaymentSettings(),
  ]);
  const priceFees = priceFeesFromSettings(bookingSettings);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
              {t('eyebrow')}
            </p>
            <h1 className="font-display text-3xl font-semibold text-oak mb-2">
              {t('title')}
            </h1>
            <p className="text-stone">{t('description')}</p>
          </div>
          <BookingWidget
            initialSlug={apartment ?? 'villa-velebita'}
            minNights={bookingSettings.minNights}
            basePricePerNight={bookingSettings.basePricePerNight}
            specialPricePeriods={specialPricePeriods}
            priceFees={priceFees}
            payment={payment}
          />
          <InternalLinks currentPath="/booking" />
        </div>
      </main>
      <Footer />
    </>
  );
}
