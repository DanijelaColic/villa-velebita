import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FAQ } from '@/components/sections/FAQ';

const canonical = 'https://villavelebita.hr/faq';

export const metadata: Metadata = {
  title: 'Česta pitanja (FAQ)',
  description:
    'Odgovori o udaljenosti od Plitvica, kapacitetu, cijeni, jacuzziju, plaćanju, ljubimcima i check-inu — Villa Velebita, Vrhovine.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'FAQ | Villa Velebita',
    description: 'Česta pitanja gostiju o kući za odmor u Rudopolju.',
  },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
