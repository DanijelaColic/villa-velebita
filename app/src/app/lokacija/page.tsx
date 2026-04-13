import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SubpageHeader } from '@/components/SubpageHeader';
import { Location } from '@/components/sections/Location';
import { getPageMetadata } from '@/i18n/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return getPageMetadata({
    locale,
    pathname: '/lokacija',
    namespace: 'metadata.pages.location',
  });
}

export default async function LokacijaPage() {
  const t = await getTranslations('locationPage');

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-20">
        <SubpageHeader
          title={t('title')}
          description={t('description')}
        />
        <Location />
      </main>
      <Footer />
    </>
  );
}
