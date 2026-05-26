import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/sections/Gallery';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { getPageMetadata } from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/galerija',
    namespace: 'metadata.pages.gallery',
  });
}

export default function GalerijaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <Gallery />
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <InternalLinks currentPath="/galerija" />
        </div>
      </main>
      <Footer />
    </>
  );
}
