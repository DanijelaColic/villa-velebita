import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { MapPin, Navigation, Mountain, Waves, Wifi } from 'lucide-react';
import { getGallerySections } from '@/lib/gallery-sections';

/** Početna: uži izrez galerije + jedinstveni uvod (puna galerija na /galerija). */
export async function GalleryTeaser() {
  const t = await getTranslations('landingTeasers.gallery');
  const sections = getGallerySections([
    {
      id: 'kuca-ulaz',
      folder: '01-kuca-i-ulaz',
      title: t('sections.houseEntrance.title'),
      description: t('sections.houseEntrance.description'),
    },
    {
      id: 'prizemlje',
      folder: '02-prizemlje-priprema-obroka-i-druzenje',
      title: t('sections.groundFloor.title'),
      description: t('sections.groundFloor.description'),
    },
    {
      id: 'kat-opustanje',
      folder: '03-kat-za-opustanje',
      title: t('sections.floorRelax.title'),
      description: t('sections.floorRelax.description'),
    },
    {
      id: 'potkrovlje',
      folder: '04-potkrovlje-pogledi-izlasci-zalasci',
      title: t('sections.attic.title'),
      description: t('sections.attic.description'),
    },
    {
      id: 'vanjska-sjenica',
      folder: '05-vanjska-sjenica-druzenje',
      title: t('sections.gazebo.title'),
      description: t('sections.gazebo.description'),
    },
    {
      id: 'pogledi-priroda',
      folder: '07-pogledi-i-priroda',
      title: t('sections.nature.title'),
      description: t('sections.nature.description'),
    },
  ]);
  const picks: { src: string; alt: string }[] = [];
  for (const s of sections) {
    for (const m of s.media) {
      if (m.type === 'image' && picks.length < 6) {
        picks.push({ src: m.src, alt: m.alt });
      }
      if (picks.length >= 6) break;
    }
    if (picks.length >= 6) break;
  }

  return (
    <SectionWrapper id="galerija" bg="cream-dark">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {picks.map((item, i) => (
          <Link
            key={`${item.src}-${i}`}
            href="/galerija"
            className="relative aspect-4/3 rounded-card overflow-hidden shadow-warm group"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </Link>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/galerija">{t('cta')}</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/** Početna: kratak uvod; puni tekst i raspored na /smjestaj. */
export async function AboutTeaser() {
  const t = await getTranslations('landingTeasers.about');
  return (
    <SectionWrapper id="o-smjestaju" bg="cream">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading label={t('heading.label')} title={t('heading.title')} />
        <div className="space-y-5 text-stone text-base md:text-lg leading-relaxed mb-8 text-left md:text-center">
          <p>{t('paragraphs.p1')}</p>
          <p>{t('paragraphs.p2')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/smjestaj">{t('cta.primary')}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/galerija">{t('cta.secondary')}</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Početna: adresa + karta; prošireno na /lokacija. */
export async function LocationTeaser() {
  const t = await getTranslations('landingTeasers.location');
  return (
    <SectionWrapper id="lokacija" bg="white">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-card overflow-hidden shadow-warm aspect-4/3 lg:aspect-auto lg:min-h-[280px]">
          <iframe
            title={t('mapTitle')}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2822.0!2d15.4722284!3d44.8624995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4763e06b24611ead:0xa5a1f0748cbd99bb!2sRudopolje+124%2C+53220+Vrhovine!5e0!3m2!1shr!2shr!4v1743340797000!5m2!1shr!2shr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[240px]"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-cream rounded-card">
            <MapPin className="size-5 text-terracotta mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-oak">Rudopolje 124</p>
              <p className="text-stone text-sm">{t('addressLine')}</p>
              <a
                href="https://maps.google.com/?q=Rudopolje+124,+53223+Vrhovine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark font-medium mt-2 transition-colors"
              >
                <Navigation className="size-3.5" />
                {t('openMaps')}
              </a>
            </div>
          </div>
          <p className="text-stone text-sm leading-relaxed">
            {t('description')}
          </p>
          <Button asChild>
            <Link href="/lokacija">{t('cta')}</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Početna: sažetak; puna stranica Sadržaji uključuje opremu kuće i aktivnosti u okolici. */
export async function AmenitiesTeaser() {
  const t = await getTranslations('landingTeasers.amenities');
  const items = [
    {
      icon: <Waves className="size-6" />,
      title: t('items.jacuzzi.title'),
      desc: t('items.jacuzzi.description'),
    },
    {
      icon: <Wifi className="size-6" />,
      title: t('items.house.title'),
      desc: t('items.house.description'),
    },
    {
      icon: <Mountain className="size-6" />,
      title: t('items.region.title'),
      desc: t('items.region.description'),
    },
  ];

  return (
    <SectionWrapper id="sadrzaji" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {items.map(item => (
          <div key={item.title} className="bg-white rounded-card p-6 shadow-card">
            <div className="text-terracotta mb-3">{item.icon}</div>
            <h3 className="font-display text-lg font-semibold text-oak mb-2">{item.title}</h3>
            <p className="text-sm text-stone leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="/sadrzaji">{t('cta')}</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/** Početna: dvije teme; FAQPage schema ostaje samo na /faq. */
export async function FAQTeaser() {
  const t = await getTranslations('landingTeasers.faq');
  return (
    <SectionWrapper id="faq" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />
      <div className="max-w-2xl mx-auto space-y-6 text-stone leading-relaxed mb-10">
        <div className="bg-white rounded-card p-6 shadow-card">
          <p className="font-semibold text-oak mb-2">{t('items.distance.question')}</p>
          <p className="text-sm">{t('items.distance.answer')}</p>
        </div>
        <div className="bg-white rounded-card p-6 shadow-card">
          <p className="font-semibold text-oak mb-2">{t('items.capacity.question')}</p>
          <p className="text-sm">{t('items.capacity.answer')}</p>
        </div>
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href="/faq">{t('cta')}</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
