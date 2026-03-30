'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const images = [
  { src: '/images/exterior/exterior-01.jpg',  alt: 'Villa Velebita – autentična kamena fasada', caption: 'Autentična kamena fasada' },
  { src: '/images/exterior/terasa.jpg',        alt: 'Natkrivena terasa s pogledom na Rudopolje', caption: 'Terasa s panoramskim pogledom' },
  { src: '/images/exterior/jacuzzi.jpg',       alt: 'Vanjski jacuzzi na drva ispod sjenice', caption: 'Jacuzzi pod zvjezdanim nebom' },
  { src: '/images/rooms/dnevni-boravak.jpg',   alt: 'Dnevni boravak s kutnom garniturom', caption: 'Prostrani dnevni boravak' },
  { src: '/images/rooms/kuhinja.jpg',          alt: 'Potpuno opremljena kuhinja', caption: 'Opremljena kuhinja' },
  { src: '/images/rooms/spavaca-2.jpg',        alt: 'Spavaća soba s masivnim hrastovim krevetom', caption: 'Master spavaća – hrast 2×2m' },
  { src: '/images/exterior/exterior-04.jpg',   alt: 'Pogled na kuću i okoliš', caption: 'Kuća u prirodi' },
  { src: '/images/rooms/kupaonica-1.jpg',      alt: 'Kupaonica s hidromasažnim tušem', caption: 'Hidromasažni tuš' },
  { src: '/images/exterior/dvoriste.jpg',      alt: 'Prostrano dvorište za rekreaciju', caption: 'Okućnica 800 m²' },
  { src: '/images/rooms/prizemlje1.jpg',       alt: 'Prostor za druženje u prizemlju', caption: 'Prostor za zajednička okupljanja' },
  { src: '/images/rooms/spavaca-3.jpg',        alt: 'Spavaća soba 3 s dječjim krevetićem', caption: 'Spavaća s dječjim krevetićem' },
  { src: '/images/exterior/exterior-07.jpg',   alt: 'Pogled na okućnicu i prirodu', caption: 'Ličke šume i mir' },
];

// Masonry layout: column-span per image (12 images)
const spanClasses = [
  'col-span-2 row-span-2', // 0 – wide hero
  'col-span-1 row-span-1', // 1
  'col-span-1 row-span-1', // 2
  'col-span-1 row-span-2', // 3 – tall
  'col-span-1 row-span-1', // 4
  'col-span-1 row-span-1', // 5
  'col-span-1 row-span-1', // 6
  'col-span-1 row-span-1', // 7
  'col-span-1 row-span-1', // 8
  'col-span-2 row-span-1', // 9 – wide
  'col-span-1 row-span-1', // 10
  'col-span-1 row-span-1', // 11
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() =>
    setLightbox(i => (i !== null ? (i - 1 + images.length) % images.length : null)), []);
  const next = useCallback(() =>
    setLightbox(i => (i !== null ? (i + 1) % images.length : null)), []);

  return (
    <>
      <SectionWrapper id="galerija" bg="cream-dark">
        <SectionHeading
          label="Galerija"
          title="Svaki kutak priča svoju priču"
          subtitle="Autentičan rustikalni stil spojen s modernim komforom – pogledajte sami."
        />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px] gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={cn(
                'relative overflow-hidden rounded-card group cursor-zoom-in',
                spanClasses[i] ?? 'col-span-1 row-span-1',
              )}
              aria-label={`Otvori sliku: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-oak/0 group-hover:bg-oak/30 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="size-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
              </div>
              {/* Caption */}
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-oak/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-cream text-sm font-medium">{img.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-cream/70 hover:text-cream transition-colors p-2"
            onClick={close}
            aria-label="Zatvori"
          >
            <X className="size-8" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Prethodna slika"
          >
            <ChevronLeft className="size-8" />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-5xl max-h-[85vh] mx-8 aspect-video rounded-card overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Sljedeća slika"
          >
            <ChevronRight className="size-8" />
          </button>

          {/* Caption + counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-cream font-medium">{images[lightbox].caption}</p>
            <p className="text-cream/50 text-sm mt-1">{lightbox + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
