import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { getPageMetadata } from '@/i18n/metadata';

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
          <BookingWidget initialSlug={apartment ?? 'villa-velebita'} />
        </div>
      </main>
    </>
  );
}
