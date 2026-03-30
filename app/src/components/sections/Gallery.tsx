'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const images = [
  // Eksterijer
  { src: '/images/O%20smje%C5%A1taju/Kuca1.jpeg',                               alt: 'Villa Velebita – pogled izvana',         caption: 'Autentična kameno-drvena kuća' },
  { src: '/images/O%20smje%C5%A1taju/jacuzzi.jpeg',                              alt: 'Vanjski jacuzzi na drva',               caption: 'Jacuzzi na drva' },
  { src: '/images/gallery/Kuca2.jpeg',                                          alt: 'Villa Velebita – vanjski izgled',        caption: 'Kuća u ličkoj prirodi' },
  { src: '/images/gallery/exterior-02.jpg .jpeg',                               alt: 'Villa Velebita – eksterijer',            caption: 'Kuća i okućnica' },
  { src: '/images/gallery/exterior-03.jpg .jpeg',                               alt: 'Villa Velebita – pogled na kuću',        caption: 'Pogled iz dvorišta' },
  { src: '/images/gallery/exterior-04.jpg .jpeg',                               alt: 'Villa Velebita – okoliš',                caption: 'Lička priroda' },
  { src: '/images/gallery/exterior-05.jpg .jpeg',                               alt: 'Villa Velebita – priroda',               caption: 'Zelenilo i mir' },
  { src: '/images/gallery/exterior-06.jpg .jpeg',                               alt: 'Villa Velebita – kuća i vrt',            caption: 'Okućnica 800 m²' },
  { src: '/images/gallery/exterior-07.jpg .jpeg',                               alt: 'Villa Velebita – detalj fasade',         caption: 'Kameni detalji' },
  { src: '/images/gallery/exterior-08.jpg .jpeg',                               alt: 'Villa Velebita – pogled sa strane',      caption: 'Villa u punoj ljepoti' },
  // Dnevni boravak i prizemlje
  { src: '/images/gallery/dnevni-boravak.jpg  .jpeg',                           alt: 'Dnevni boravak – kutna garnitura',       caption: 'Prostrani dnevni boravak' },
  { src: '/images/gallery/dnevni-boravak2.jpg  .jpeg',                          alt: 'Dnevni boravak – detalj',               caption: 'Topla rustikalna atmosfera' },
  { src: '/images/gallery/dnevni-boravak3.jpg  .jpeg',                          alt: 'Dnevni boravak – pogled',               caption: 'Ugodna dnevna soba' },
  { src: '/images/gallery/dnevni-boravak4.jpg  .jpeg',                          alt: 'Dnevni boravak – detalj namještaja',    caption: 'Hrastov namještaj' },
  { src: '/images/gallery/prizemlje3.jpg .jpeg',                                alt: 'Prizemlje – zajednički prostor',         caption: 'Zajednički prostor' },
  // Spavaće sobe
  { src: '/images/gallery/spavaca-1.jpg .jpeg',                                 alt: 'Spavaća soba 1 – hrastov krevet',       caption: 'Spavaća soba 1' },
  { src: '/images/gallery/spavaca-2.jpg  .jpeg',                                alt: 'Spavaća soba 2 – hrastov krevet',       caption: 'Spavaća soba 2' },
  { src: '/images/gallery/spavaca-2.2.jpg  .jpeg',                              alt: 'Spavaća soba 2 – detalj',               caption: 'Masivni hrast 2×2 m' },
  { src: '/images/gallery/spavaca-3.jpg  .jpeg',                                alt: 'Spavaća soba 3 – dječji krevetić',      caption: 'Spavaća s dječjim krevetićem' },
  // Kupaonica
  { src: '/images/gallery/kupaonica-1.1.jpg.jpeg',                              alt: 'Kupaonica – hidromasažni tuš',          caption: 'Hidromasažni tuš' },
  { src: '/images/gallery/kupaonica-2.jpg .jpeg',                               alt: 'Kupaonica – moderna oprema',            caption: 'Moderna kupaonica' },
  // WhatsApp fotografije
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.10.jpeg',          alt: 'Villa Velebita – interijer',            caption: 'Udoban interijer' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.10 (1).jpeg',      alt: 'Villa Velebita – detalj',               caption: 'Rustikalni detalji' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.10 (2).jpeg',      alt: 'Villa Velebita – prostor',              caption: 'Topla atmosfera' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.11.jpeg',          alt: 'Villa Velebita – soba',                 caption: 'Ugodna soba' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.11 (1).jpeg',      alt: 'Villa Velebita – detalj sobe',          caption: 'Detalj interijera' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.12 (1).jpeg',      alt: 'Villa Velebita – prostor',              caption: 'Prostor za odmor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.17.jpeg',          alt: 'Villa Velebita – interijer',            caption: 'Lijep interijer' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.17 (3).jpeg',      alt: 'Villa Velebita – detalj',               caption: 'Hrastov namještaj' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.18.jpeg',          alt: 'Villa Velebita – soba',                 caption: 'Spavaća soba' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.18 (2).jpeg',      alt: 'Villa Velebita – detalj sobe',          caption: 'Detalj spavaće' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.18 (3).jpeg',      alt: 'Villa Velebita – spavaća soba',         caption: 'Udoban krevet' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.18 (4).jpeg',      alt: 'Villa Velebita – kupaonica',            caption: 'Moderna kupaonica' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.18 (6).jpeg',      alt: 'Villa Velebita – prostor',              caption: 'Prostor za odmor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.19 (1).jpeg',      alt: 'Villa Velebita – vanjski prostor',      caption: 'Vanjski prostor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.21 (3).jpeg',      alt: 'Villa Velebita – terasa',               caption: 'Terasa s pogledom' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.22 (7).jpeg',      alt: 'Villa Velebita – okoliš',               caption: 'Lička priroda' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.23 (3).jpeg',      alt: 'Villa Velebita – detalj',               caption: 'Rustikalna ljepota' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.23 (4).jpeg',      alt: 'Villa Velebita – interijer',            caption: 'Interijer vile' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.23 (5).jpeg',      alt: 'Villa Velebita – detalj',               caption: 'Detalj uređenja' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.23 (7).jpeg',      alt: 'Villa Velebita – prostor',              caption: 'Ugodan prostor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.24.jpeg',          alt: 'Villa Velebita – soba',                 caption: 'Soba za odmor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.24 (1).jpeg',      alt: 'Villa Velebita – detalj',               caption: 'Detalj sobe' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.24 (2).jpeg',      alt: 'Villa Velebita – interijer',            caption: 'Topli interijer' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.25.jpeg',          alt: 'Villa Velebita – prostor',              caption: 'Zajednički prostor' },
  { src: '/images/gallery/WhatsApp Image 2026-03-25 at 08.59.25 (1).jpeg',      alt: 'Villa Velebita – prizemlje',            caption: 'Prizemlje' },
];

// Masonry layout – repeating pattern, extras fallback to col-span-1 row-span-1
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
  'col-span-1 row-span-2', // 11 – tall
  'col-span-1 row-span-1', // 12
  'col-span-1 row-span-1', // 13
  'col-span-2 row-span-1', // 14 – wide
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
