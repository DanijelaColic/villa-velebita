import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { MapPin, Navigation, Mountain, Waves, Wifi } from 'lucide-react';
import { getGallerySections } from '@/lib/gallery-sections';

/** Početna: uži izrez galerije + jedinstveni uvod (puna galerija na /galerija). */
export function GalleryTeaser() {
  const sections = getGallerySections();
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
        label="Galerija"
        title="Pogled iznutra i vani"
        subtitle="Rustikalni detalji, sobe, vanjski jacuzzi i lički krajolik — u punoj galeriji je sve po sobama."
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
          <Link href="/galerija">Otvori cijelu galeriju</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/** Početna: kratak uvod; puni tekst i raspored na /smjestaj. */
export function AboutTeaser() {
  return (
    <SectionWrapper id="o-smjestaju" bg="cream">
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeading label="O smještaju" title="Villa Velebita" />
        <div className="space-y-5 text-stone text-base md:text-lg leading-relaxed mb-8 text-left md:text-center">
          <p>
            Villa Velebita je kameno-drvena kuća smještena na 840 m nadmorske visine, idealna za do 9 gostiju,
            raspoređena na tri etaže s vanjskim jacuzzijem — savršena baza za istraživanje Plitvica i Like.
          </p>
          <p>
            Prostrana kuća od 155 m² nudi tri spavaće sobe, dnevni boravak s kutnom garniturom na razvlačenje,
            prostor za druženje s velikim hrastovim stolom te dvije moderno opremljene kupaonice s hidromasažnim
            tušem.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/smjestaj">Saznajte više o smještaju</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/galerija">Galerija</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Početna: adresa + karta; prošireno na /lokacija. */
export function LocationTeaser() {
  return (
    <SectionWrapper id="lokacija" bg="white">
      <SectionHeading
        label="Lokacija"
        title="Rudopolje, Vrhovine"
        subtitle="Karta, upute i udaljenost od Plitvica — sve na jednom mjestu."
      />
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-card overflow-hidden shadow-warm aspect-4/3 lg:aspect-auto lg:min-h-[280px]">
          <iframe
            title="Villa Velebita – lokacija (pregled)"
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
              <p className="text-stone text-sm">53223 Vrhovine, Hrvatska</p>
              <a
                href="https://maps.google.com/?q=Rudopolje+124,+53223+Vrhovine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark font-medium mt-2 transition-colors"
              >
                <Navigation className="size-3.5" />
                Otvori u Google Maps
              </a>
            </div>
          </div>
          <p className="text-stone text-sm leading-relaxed">
            Stranica lokacije objašnjava kako nas najlakše pronaći i što je u blizini — bez ponavljanja cijelog
            teksta ovdje.
          </p>
          <Button asChild>
            <Link href="/lokacija">Lokacija i upute</Link>
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

/** Početna: sažetak; puna stranica Sadržaji uključuje opremu kuće i aktivnosti u okolici. */
export function AmenitiesTeaser() {
  const items = [
    {
      icon: <Waves className="size-6" />,
      title: 'Vanjski jacuzzi i pečenjara',
      desc: 'Opustanje na otvorenom i rustikalna kuhinja pod vedrim nebom.',
    },
    {
      icon: <Wifi className="size-6" />,
      title: 'Opremljena kuća',
      desc: 'WiFi, kuhinja, TV, parkiranje — sve što treba za obitelj ili grupu.',
    },
    {
      icon: <Mountain className="size-6" />,
      title: 'Lika kao destinacija za aktivni odmor',
      desc: 'Plitvice, rijeka Gacka, planinarenje i autentični lokalni doživljaji — sve na jednom mjestu.',
    },
  ];

  return (
    <SectionWrapper id="sadrzaji" bg="cream">
      <SectionHeading
        label="Sadržaji"
        title="Kuća i okolica"
        subtitle="Ovdje ukratko: oprema kuće i što raditi u regiji — sve na jednoj stranici Sadržaji."
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
          <Link href="/sadrzaji">Sadržaji i aktivnosti</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}

/** Početna: dvije teme; FAQPage schema ostaje samo na /faq. */
export function FAQTeaser() {
  return (
    <SectionWrapper id="faq" bg="cream">
      <SectionHeading
        label="FAQ"
        title="Česta pitanja ukratko"
        subtitle="Ovdje samo uvod — kompletan popis s odgovorima i strukturiranim podacima za tražilice na /faq."
      />
      <div className="max-w-2xl mx-auto space-y-6 text-stone leading-relaxed mb-10">
        <div className="bg-white rounded-card p-6 shadow-card">
          <p className="font-semibold text-oak mb-2">Koliko ste udaljeni od Plitvica?</p>
          <p className="text-sm">
            Otprilike 20 minuta vožnje do ulaza u park — pogodna baza za jednodnevne izlete.
          </p>
        </div>
        <div className="bg-white rounded-card p-6 shadow-card">
          <p className="font-semibold text-oak mb-2">Koliko gostiju primate?</p>
          <p className="text-sm">
            Kuća je namijenjena do 9 gostiju (7+2); detalji o sobama i krevetima u FAQ-u i na stranici smještaja.
          </p>
        </div>
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href="/faq">Sva česta pitanja</Link>
        </Button>
      </div>
    </SectionWrapper>
  );
}
