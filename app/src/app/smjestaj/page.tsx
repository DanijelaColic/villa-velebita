import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { About } from '@/components/sections/About';
import { FloorPlan } from '@/components/sections/FloorPlan';
import { HouseRules } from '@/components/sections/HouseRules';
import { getPageMetadata } from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/smjestaj',
    namespace: 'metadata.pages.accommodation',
  });
}

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
