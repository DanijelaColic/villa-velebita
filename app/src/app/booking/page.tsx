import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { SITE_NAME } from '@/modules/booking-admin/booking.config';

export const metadata: Metadata = {
  title: `Rezervacija | ${SITE_NAME}`,
  description: `Rezervirajte Villa Velebita direktno. Bez provizija, direktna komunikacija s vlasnikom.`,
};

type Props = {
  searchParams: Promise<{ apartment?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const { apartment } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
              Rezervacija
            </p>
            <h1 className="font-display text-3xl font-semibold text-oak mb-2">
              Rezervirajte direktno
            </h1>
            <p className="text-stone">
              Odaberite datume i pošaljite upit — javimo se u roku 24 sata.
            </p>
          </div>
          <BookingWidget initialSlug={apartment ?? 'villa-velebita'} />
        </div>
      </main>
    </>
  );
}
