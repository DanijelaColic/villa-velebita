import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHeader } from '@/components/SubpageHeader';
import { Location } from '@/components/sections/Location';

const canonical = 'https://villavelebita.hr/lokacija';

export const metadata: Metadata = {
  title: 'Lokacija i upute',
  description:
    'Villa Velebita, Rudopolje 124, Vrhovine — karta, Google Maps i udaljenost od Plitvičkih jezera i ostalih atrakcija u Lici.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'Lokacija | Villa Velebita',
    description: 'Pronađite nas u Rudopolju: savršena baza za Plitvice i istraživanje Like.',
  },
};

export default function LokacijaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <SubpageHeader
          title="Lokacija"
          description="Adresa, interaktivna karta i kratki kontekst — Vrhovine, Lika, blizina nacionalnog parka."
        />
        <Location />
      </main>
      <Footer />
    </>
  );
}
