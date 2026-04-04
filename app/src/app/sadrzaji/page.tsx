import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Amenities } from '@/components/sections/Amenities';
import { Experiences } from '@/components/sections/Experiences';
import { CaffeBarPlitvice } from '@/components/sections/CaffeBarPlitvice';

const canonical = 'https://villavelebita.hr/sadrzaji';

export const metadata: Metadata = {
  title: 'Sadržaji i aktivnosti',
  description:
    'Pogodnosti Villa Velebita: jacuzzi, kuhinja, WiFi, parkiranje, pečenjara. Aktivnosti u Lici: Plitvice, Gacka, planinarenje, zipline i lokalne preporuke.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'Sadržaji i aktivnosti | Villa Velebita',
    description: 'Što kuća nudi i što raditi u okolici — Vrhovine, Lika.',
  },
};

export default function SadrzajiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <Amenities />
        <Experiences />
        <CaffeBarPlitvice />
      </main>
      <Footer />
    </>
  );
}
