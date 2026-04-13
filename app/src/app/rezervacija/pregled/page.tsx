import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import {
  DEPOSIT_PERCENT,
  BALANCE_DAYS_BEFORE_CHECK_IN,
} from '@/modules/booking-admin/booking.config';
import { loadBookingPublicView } from '@/modules/booking-admin/lib/booking-public-view';
import { getPageMetadata } from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/rezervacija/pregled',
    namespace: 'metadata.pages.bookingReview',
    robots: { index: false, follow: false },
  });
}

const DEP_PCT = Math.round(DEPOSIT_PERCENT * 100);
const BAL_PCT = 100 - DEP_PCT;

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function RezervacijaPregledPage({ searchParams }: Props) {
  const locale = await getLocale();
  const t = await getTranslations('bookingReview');
  const { token } = await searchParams;

  if (!token?.trim()) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
          <div className="max-w-lg mx-auto py-10">
            <h1 className="font-display text-2xl font-semibold text-oak mb-3">
              {t('missingLink.title')}
            </h1>
            <p className="text-stone text-base leading-relaxed">
              {t('missingLink.description')}
            </p>
          </div>
        </main>
      </>
    );
  }

  const data = await loadBookingPublicView(token, locale);

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
          <div className="max-w-lg mx-auto py-10">
            <h1 className="font-display text-2xl font-semibold text-oak mb-3">
              {t('invalidLink.title')}
            </h1>
            <p className="text-stone text-base leading-relaxed">
              {t('invalidLink.description')}
            </p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
        <div className="max-w-lg mx-auto py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
            {t('eyebrow')}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-oak mb-2">
            {data.apartmentName}
          </h1>
          <p
            className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-6 ${
              data.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : data.status === 'cancelled'
                  ? 'bg-stone-200 text-stone-700'
                  : 'bg-amber-100 text-amber-900'
            }`}
          >
            {data.statusLabel}
          </p>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-3 text-stone text-base leading-relaxed">
            <div className="flex flex-col gap-1 border-b border-stone-100 pb-3">
              <span className="text-sm text-stone/80">{t('labels.guest')}</span>
              <span className="font-medium text-oak text-lg">{data.guestName}</span>
            </div>
            <Row label={t('labels.checkIn')} value={`${data.checkInStr} (${t('times.checkIn')})`} />
            <Row label={t('labels.checkOut')} value={`${data.checkOutStr} (${t('times.checkOut')})`} />
            <Row label={t('labels.nights')} value={String(data.nights)} />
            <div className="border-t border-stone-100 pt-3 mt-2 flex justify-between items-baseline gap-4">
              <span className="text-stone/80">{t('labels.total')}</span>
              <span className="font-semibold text-oak text-xl">{data.totalPrice} €</span>
            </div>
            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span className="text-stone/80">{t('labels.deposit', { percent: DEP_PCT })}</span>
              <span className="font-semibold text-secondary">{data.deposit} €</span>
            </div>
            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span className="text-stone/80">{t('labels.balance', { percent: BAL_PCT })}</span>
              <span className="font-medium text-oak">{data.balance} €</span>
            </div>
            <p className="text-xs text-stone/70 pt-1">
              {t('balanceNotice', { days: BALANCE_DAYS_BEFORE_CHECK_IN })}
            </p>
          </div>

          {data.status !== 'cancelled' && (
            <div className="mt-8 space-y-4">
              <h2 className="font-display text-lg font-semibold text-oak">{t('payment.title')}</h2>
              <p className="text-stone text-sm leading-relaxed">
                {t('payment.reference')}: <strong className="text-oak">{data.reference}</strong>
              </p>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 text-sm space-y-2">
                <p className="font-medium text-oak">{data.recipientName}</p>
                <p className="font-mono break-all">IBAN: {data.recipientIban}</p>
                <p>{t('payment.bank')}: {data.recipientBank}</p>
                <p>
                  BIC/SWIFT {data.recipientBic}{' '}
                  <span className="text-stone/80">({t('payment.international')})</span>
                </p>
              </div>

              {data.hub3 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center">
                  <p className="text-xs font-semibold text-oak mb-3">{t('payment.hub3Title')}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.hub3}
                    alt={t('payment.hub3Alt')}
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
              )}
              {data.epc && (
                <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center">
                  <p className="text-xs font-semibold text-oak mb-3">{t('payment.epcTitle')}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.epc}
                    alt={t('payment.epcAlt')}
                    className="w-full max-w-[280px] h-auto mx-auto"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-4">
      <span className="text-sm text-stone/80 shrink-0">{label}</span>
      <span className="font-medium text-oak sm:text-right">{value}</span>
    </div>
  );
}
