import { AppImage as Image } from '@/components/ui/AppImage';
import { getTranslations } from 'next-intl/server';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Flame, Mountain, TreePine, Waves } from 'lucide-react';

type AboutProps = {
  /** Na podstranicama npr. /booking i /galerija umjesto # sidra na početnoj. */
  bookingHref?: string;
  galleryHref?: string;
};

export async function About({
  bookingHref = '#rezervacije',
  galleryHref = '#galerija',
}: AboutProps = {}) {
  const t = await getTranslations('aboutSection');
  const highlights = [
    {
      icon: <Mountain className="size-6" />,
      title: t('highlights.altitude.title'),
      desc: t('highlights.altitude.description'),
    },
    {
      icon: <TreePine className="size-6" />,
      title: t('highlights.style.title'),
      desc: t('highlights.style.description'),
    },
    {
      icon: <Waves className="size-6" />,
      title: t('highlights.jacuzzi.title'),
      desc: t('highlights.jacuzzi.description'),
    },
    {
      icon: <Flame className="size-6" />,
      title: t('highlights.grill.title'),
      desc: t('highlights.grill.description'),
    },
  ];

  return (
    <SectionWrapper id="o-smjestaju" bg="cream">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text column */}
        <div>
          <SectionHeading
            label={t('heading.label')}
            title={t('heading.title')}
            align="left"
          />

          <div className="space-y-5 text-stone text-base md:text-lg leading-relaxed">
            <p>{t('paragraphs.p1')}</p>
            <p>{t('paragraphs.p2')}</p>
            <p>{t('paragraphs.p3')}</p>
            <p>{t('paragraphs.p4')}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={bookingHref}>{t('cta.booking')}</a>
            </Button>
            <Button variant="outline" asChild>
              <a href={galleryHref}>{t('cta.gallery')}</a>
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="relative">
          <div className="relative aspect-4/5 rounded-card overflow-hidden shadow-warm">
            <Image
              src="/images/O%20smje%C5%A1taju/Kuca1.jpeg"
              alt={t('imageAlt.house')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -left-6 bg-terracotta text-cream rounded-card p-5 shadow-warm hidden md:block">
            <p className="font-display text-3xl font-semibold">2026.</p>
            <p className="text-sm text-cream/80 mt-0.5">{t('renovated')}</p>
          </div>
          {/* Second image – terasa */}
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-card overflow-hidden shadow-warm hidden lg:block">
            <Image
              src="/images/O%20smje%C5%A1taju/jacuzzi.jpeg"
              alt={t('imageAlt.jacuzzi')}
              fill
              className="object-cover"
              sizes="160px"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Highlights grid */}
      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map(h => (
          <div
            key={h.title}
            className="bg-white rounded-card p-6 shadow-card hover:shadow-hover transition-shadow duration-300 group"
          >
            <div className="text-terracotta mb-3 group-hover:scale-110 transition-transform duration-200">
              {h.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-oak mb-2">
              {h.title}
            </h3>
            <p className="text-sm text-stone leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
