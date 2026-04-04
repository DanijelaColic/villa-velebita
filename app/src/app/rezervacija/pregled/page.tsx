import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import {
  SITE_NAME,
  DEPOSIT_PERCENT,
  BALANCE_DAYS_BEFORE_CHECK_IN,
} from '@/modules/booking-admin/booking.config';
import { loadBookingPublicView } from '@/modules/booking-admin/lib/booking-public-view';

export const metadata: Metadata = {
  title: `Pregled rezervacije | ${SITE_NAME}`,
  description: 'Podaci o rezervaciji i QR kodovi za uplatu depozita.',
  robots: { index: false, follow: false },
};

const DEP_PCT = Math.round(DEPOSIT_PERCENT * 100);
const BAL_PCT = 100 - DEP_PCT;

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function RezervacijaPregledPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token?.trim()) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
          <div className="max-w-lg mx-auto py-10">
            <h1 className="font-display text-2xl font-semibold text-oak mb-3">Nedostaje poveznica</h1>
            <p className="text-stone text-base leading-relaxed">
              Otvorite poveznicu iz e-pošte koju ste dobili nakon rezervacije.
            </p>
          </div>
        </main>
      </>
    );
  }

  const data = await loadBookingPublicView(token);

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream pt-20 px-4 pb-16">
          <div className="max-w-lg mx-auto py-10">
            <h1 className="font-display text-2xl font-semibold text-oak mb-3">
              Poveznica nije valjana
            </h1>
            <p className="text-stone text-base leading-relaxed">
              Link je možda istekao ili je već korišten pogrešan URL. Ako trebate pomoć, javite nam se
              e-poštom.
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
            Vaša rezervacija
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
              <span className="text-sm text-stone/80">Gost</span>
              <span className="font-medium text-oak text-lg">{data.guestName}</span>
            </div>
            <Row label="Dolazak" value={`${data.checkInStr} (od 14:00)`} />
            <Row label="Odlazak" value={`${data.checkOutStr} (do 11:00)`} />
            <Row label="Noćenja" value={String(data.nights)} />
            <div className="border-t border-stone-100 pt-3 mt-2 flex justify-between items-baseline gap-4">
              <span className="text-stone/80">Ukupno</span>
              <span className="font-semibold text-oak text-xl">{data.totalPrice} €</span>
            </div>
            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span className="text-stone/80">Depozit ({DEP_PCT}%)</span>
              <span className="font-semibold text-secondary">{data.deposit} €</span>
            </div>
            <div className="flex justify-between gap-4 text-sm sm:text-base">
              <span className="text-stone/80">Ostatak ({BAL_PCT}%)</span>
              <span className="font-medium text-oak">{data.balance} €</span>
            </div>
            <p className="text-xs text-stone/70 pt-1">
              Ostatak platite najkasnije {BALANCE_DAYS_BEFORE_CHECK_IN} dana prije dolaska.
            </p>
          </div>

          {data.status !== 'cancelled' && (
            <div className="mt-8 space-y-4">
              <h2 className="font-display text-lg font-semibold text-oak">Plaćanje depozita</h2>
              <p className="text-stone text-sm leading-relaxed">
                Model / poziv na broj: <strong className="text-oak">{data.reference}</strong>
              </p>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 text-sm space-y-2">
                <p className="font-medium text-oak">{data.recipientName}</p>
                <p className="font-mono break-all">IBAN: {data.recipientIban}</p>
                <p>Banka: {data.recipientBank}</p>
                <p>
                  BIC/SWIFT {data.recipientBic}{' '}
                  <span className="text-stone/80">(uplate iz inozemstva)</span>
                </p>
              </div>

              {data.hub3 && (
                <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center">
                  <p className="text-xs font-semibold text-oak mb-3">Hrvatske banke (HUB3)</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.hub3}
                    alt="HUB3 barkod za uplatu depozita"
                    className="max-w-full h-auto mx-auto"
                  />
                </div>
              )}
              {data.epc && (
                <div className="bg-white border border-stone-200 rounded-2xl p-4 text-center">
                  <p className="text-xs font-semibold text-oak mb-3">EU / SEPA (QR)</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.epc}
                    alt="SEPA QR za uplatu depozita"
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
