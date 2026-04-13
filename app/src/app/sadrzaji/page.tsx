import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Amenities } from '@/components/sections/Amenities';
import { Experiences } from '@/components/sections/Experiences';
import { CaffeBarPlitvice } from '@/components/sections/CaffeBarPlitvice';
import { getPageMetadata } from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/sadrzaji',
    namespace: 'metadata.pages.amenities',
  });
}

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
