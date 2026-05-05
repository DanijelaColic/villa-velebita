import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Location } from '@/components/sections/Location';
import { Booking } from '@/components/sections/Booking';
import { AppImage as Image } from '@/components/ui/AppImage';
import { Button } from '@/components/ui/Button';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { getTranslations } from 'next-intl/server';
import {
  CheckCircle2,
  Clock3,
  Flame,
  ShieldCheck,
  Star,
  Waves,
  Wifi,
} from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle2,
    key: 'fastCheckIn',
  },
  {
    icon: ShieldCheck,
    key: 'bookDirect',
  },
  {
    icon: Star,
    key: 'comfort',
  },
  {
    icon: Clock3,
    key: 'availability',
  },
];

const amenities = [
  { icon: Waves, key: 'jacuzzi' },
  { icon: Flame, key: 'grillTerrace' },
  { icon: Wifi, key: 'wifi' },
  { icon: CheckCircle2, key: 'parking' },
];

const shortGallery = [
  {
    id: 'landing-1-cover',
    src: '/images/landing/landing-1-cover.png',
    alt: 'Eksterijer vile',
  },
  {
    id: 'landing-2-dining',
    src: '/images/landing/landing-2-dining.png',
    alt: 'Blagovaonica i kuhinja',
  },
  {
    id: 'landing-3-living',
    src: '/images/landing/landing-3-living.png',
    alt: 'Dnevni boravak',
  },
  {
    id: 'landing-4-bedroom',
    src: '/images/landing/landing-4-bedroom.png',
    alt: 'Spavaća soba s pogledom',
  },
  {
    id: 'landing-5-jacuzzi',
    src: '/images/landing/landing-5-jacuzzi.png',
    alt: 'Vanjski jacuzzi',
  },
  {
    id: 'landing-6-plitvice',
    src: '/images/landing/landing-6-plitvice.png',
    alt: 'Plitvička jezera',
  },
];

export default async function VillaPlitvicePage() {
  const t = await getTranslations();

  return (
    <>
      <Navbar />
      <main>
        <Hero promoText={t('villaPlitviceLanding.heroPromo')} />

        <SectionWrapper bg="white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {benefits.map(benefit => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.key}
                  className="bg-cream rounded-card p-5 shadow-card"
                >
                  <Icon className="size-5 text-terracotta mb-3" />
                  <h2 className="font-semibold text-oak text-base leading-tight break-words">
                    {t(`villaPlitviceLanding.benefits.${benefit.key}.title`)}
                  </h2>
                  <p className="text-sm text-stone mt-1">
                    {t(`villaPlitviceLanding.benefits.${benefit.key}.text`)}
                  </p>
                </article>
              );
            })}
          </div>
        </SectionWrapper>

        <SectionWrapper bg="oak">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1.4fr_1fr] gap-6 items-stretch">
            <article className="bg-cream rounded-card p-6 sm:p-8 shadow-warm">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
                {t('villaPlitviceLanding.pricing.label')}
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-oak leading-tight">
                270€{' '}
                <span className="text-stone text-2xl sm:text-3xl">
                  {t('villaPlitviceLanding.pricing.perNight')}
                </span>
              </h2>
              <p className="mt-3 text-stone text-sm sm:text-base">
                {t('villaPlitviceLanding.pricing.description')}
              </p>
              <p className="mt-2 text-terracotta-dark text-sm font-semibold">
                {t('villaPlitviceLanding.pricing.bestPriceNote')}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild className="h-auto py-3 text-center whitespace-normal leading-tight">
                  <a href="#rezervacije">{t('villaPlitviceLanding.cta.checkAvailability')}</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-auto py-3 text-center whitespace-normal leading-tight"
                >
                  <a href="#cta-direct">{t('villaPlitviceLanding.cta.bookDirect')}</a>
                </Button>
              </div>
            </article>
            <article className="bg-terracotta rounded-card p-6 sm:p-8 shadow-warm text-cream">
              <p className="text-xs font-semibold uppercase tracking-widest text-cream/80 mb-2 break-words">
                {t('villaPlitviceLanding.pricing.directTitle')}
              </p>
              <ul className="space-y-2 text-sm text-cream/95">
                {[
                  t('villaPlitviceLanding.pricing.directItems.noFees'),
                  t('villaPlitviceLanding.pricing.directItems.fastConfirm'),
                  t('villaPlitviceLanding.pricing.directItems.directContact'),
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 leading-snug">
                    <CheckCircle2 className="size-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
                {t('villaPlitviceLanding.gallery.label')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-oak">
                {t('villaPlitviceLanding.gallery.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {shortGallery.map(item => (
                <figure
                  key={item.id}
                  className="relative overflow-hidden rounded-card aspect-[4/3]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="cream-dark">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-2">
                {t('villaPlitviceLanding.amenities.label')}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-oak">
                {t('villaPlitviceLanding.amenities.title')}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {amenities.map(amenity => {
                const Icon = amenity.icon;

                return (
                  <article
                    key={amenity.key}
                    className="bg-white rounded-card p-5 shadow-card text-center"
                  >
                    <Icon className="size-5 text-terracotta mx-auto mb-2" />
                    <p className="text-sm font-medium text-oak leading-tight break-words">
                      {t(`villaPlitviceLanding.amenities.items.${amenity.key}`)}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        <Location />

        <SectionWrapper id="cta-direct" bg="forest" className="py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl text-cream">
              {t('villaPlitviceLanding.finalCta.title')}
            </h2>
            <p className="mt-3 text-cream/80 text-sm sm:text-base">
              {t('villaPlitviceLanding.finalCta.description')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Button
                size="lg"
                asChild
                className="h-auto py-3 text-center whitespace-normal leading-tight"
              >
                <a href="#rezervacije">{t('villaPlitviceLanding.cta.checkAvailability')}</a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-cream text-forest hover:bg-cream-dark h-auto py-3 text-center whitespace-normal leading-tight"
              >
                <a
                  href="https://wa.me/385919295907"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('villaPlitviceLanding.cta.whatsapp')}
                </a>
              </Button>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper bg="cream" className="pt-10 pb-2">
          <p className="text-center text-oak font-medium">
            {t('villaPlitviceLanding.bookingIntro')}
          </p>
        </SectionWrapper>

        <Booking />
      </main>
      <Footer />
    </>
  );
}
