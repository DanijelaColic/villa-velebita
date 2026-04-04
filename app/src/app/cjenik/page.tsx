import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Pricing } from '@/components/sections/Pricing';

const canonical = 'https://villavelebita.hr/cjenik';

export const metadata: Metadata = {
  title: 'Cjenik i uvjeti najma',
  description:
    'Cijena noćenja Villa Velebita (cijela kuća), minimalni boravak, popusti, što je uključeno u cijenu i rezervacija bez provizije.',
  alternates: { canonical },
  openGraph: {
    url: canonical,
    title: 'Cjenik | Villa Velebita',
    description: 'Transparentne cijene za kuću za odmor u Lici — direktno kod vlasnika.',
  },
};

export default function CjenikPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <Pricing bookingHref="/booking" />
      </main>
      <Footer />
    </>
  );
}
