import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/sections/Gallery';

const canonical = 'https://villavelebita.hr/galerija';

export const metadata: Metadata = {
  title: 'Galerija fotografija',
  description:
    'Fotografije unutrašnjosti, soba, vanjskog jacuzzija, sjenice i okoliša Villa Velebita u Rudopolju kraj Vrhovina — kuća za odmor blizu Plitvica.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'Galerija | Villa Velebita',
    description: 'Pogledajte kuću za odmor u Lici — sobe, jacuzzi, rustikalni detalji i priroda.',
  },
};

export default function GalerijaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
