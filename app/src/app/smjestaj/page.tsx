import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { About } from '@/components/sections/About';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { HouseRules } from '@/components/sections/HouseRules';

const canonical = 'https://villavelebita.hr/smjestaj';

export const metadata: Metadata = {
  title: 'Smještaj',
  description:
    'Opis Villa Velebita: kameno-drvena kuća za do 9 gostiju, tri etaže, jacuzzi, raspored prostorija i kućni red — Rudopolje, Vrhovine.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'Smještaj | Villa Velebita',
    description: 'Autentična kuća za odmor u Lici: kapacitet, etaže, oprema i pravila boravka.',
  },
};

export default function SmjestajPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <About bookingHref="/booking" galleryHref="/galerija" />
        <FloorPlan />
        <HouseRules />
      </main>
      <Footer />
    </>
  );
}
