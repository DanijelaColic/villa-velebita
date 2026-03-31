'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

type CaffeBarPlitviceClientProps = {
  images: string[];
};

export function CaffeBarPlitviceClient({ images }: CaffeBarPlitviceClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = images.length;
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(totalImages - 1, 0));

  const showPrevious = () => {
    if (totalImages <= 1) return;
    setActiveIndex((safeIndex - 1 + totalImages) % totalImages);
  };

  const showNext = () => {
    if (totalImages <= 1) return;
    setActiveIndex((safeIndex + 1) % totalImages);
  };

  return (
    <SectionWrapper id="caffe-bar-plitvice" bg="cream">
      <SectionHeading
        label="Posebna preporuka"
        title="Caffe bar Plitvice"
        subtitle="Mali kutak s velikom toplinom domaćina na putu prema Nacionalnom parku Plitvička jezera."
      />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 space-y-4 text-stone leading-relaxed">
          <p>
            Na putu prema Nacionalnom parku Plitvička jezera, nalazi se jedno posebno
            mjesto koje gosti dugo pamte - Caffe bar Plitvice.
          </p>
          <p>
            Tamo vas uvijek dočekuje nasmijana Sniježa, uz toplinu domaćeg ličkog
            ambijenta i miris svježe kave. No ono što ovo mjesto čini još posebnijim je
            pažnja prema gostima - svi koji odsjednu u Villa Velebita imaju posebnu
            dobrodošlicu.
          </p>
          <p>
            Uz pokaz boravka, Villa Velebita časti svakog gosta besplatnom kavom ili
            čašicom domaće rakije - iskrenim znakom dobrodošlice koji dolazi od srca.
          </p>
          <p className="font-medium text-oak">
            Jer ovdje niste samo prolaznik - ovdje ste gost kojeg se dočekuje kao
            prijatelja.
          </p>
        </div>

        <div className="lg:col-span-5 space-y-3">
          {totalImages > 0 ? (
            <>
              {/* Glavna slika slidera: cover.* je prva ako postoji */}
              <div className="relative aspect-4/3 rounded-card overflow-hidden shadow-warm group bg-cream">
                <Image
                  src={images[safeIndex]}
                  alt={`Caffe bar Plitvice ${safeIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />

                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-oak/55 text-cream p-2 hover:bg-oak/75 transition-colors"
                      aria-label="Prethodna slika"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-oak/55 text-cream p-2 hover:bg-oak/75 transition-colors"
                      aria-label="Sljedeća slika"
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                      {images.map((_, imageIndex) => (
                        <button
                          key={`caffe-bar-dot-${imageIndex}`}
                          type="button"
                          onClick={() => setActiveIndex(imageIndex)}
                          className={cn(
                            'size-2.5 rounded-full transition-colors',
                            imageIndex === safeIndex ? 'bg-cream' : 'bg-cream/45',
                          )}
                          aria-label={`Prikaži sliku ${imageIndex + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail traka za brzo listanje svih slika */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {images.map((img, imageIndex) => {
                  const isActive = imageIndex === safeIndex;
                  return (
                    <button
                      key={`caffe-bar-thumb-${imageIndex}`}
                      type="button"
                      onClick={() => setActiveIndex(imageIndex)}
                      className={cn(
                        'relative aspect-square overflow-hidden rounded-md border-2 transition-all',
                        isActive
                          ? 'border-terracotta shadow-warm'
                          : 'border-transparent hover:border-terracotta/50',
                      )}
                      aria-label={`Prikaži sliku ${imageIndex + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`Caffe bar Plitvice thumbnail ${imageIndex + 1}`}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rounded-card border border-stone/20 bg-white p-6 text-sm text-stone">
              <p className="font-medium text-oak mb-2">Dodaj fotografije caffe bara</p>
              <p>
                Ubaci slike u folder <code>/public/images/caffe-bar-plitvice/</code>, pa
                će se automatski prikazati u ovoj sekciji.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
