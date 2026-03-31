'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export type GalleryMedia = {
  src: string;
  type: 'image' | 'video';
  alt: string;
  caption: string;
};

export type GallerySection = {
  id: string;
  title: string;
  description: string;
  media: GalleryMedia[];
};

export function GalleryClient({ sections }: { sections: GallerySection[] }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState<Record<string, number>>({});
  const [lightbox, setLightbox] = useState<{ sectionId: string; index: number } | null>(
    null,
  );

  const getActiveIndex = useCallback(
    (section: GallerySection) => {
      const idx = activeMediaIndex[section.id] ?? 0;
      return Math.min(Math.max(idx, 0), Math.max(section.media.length - 1, 0));
    },
    [activeMediaIndex],
  );

  const setIndex = useCallback((sectionId: string, nextIndex: number) => {
    setActiveMediaIndex(prev => ({ ...prev, [sectionId]: nextIndex }));
  }, []);

  const close = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox(current => {
      if (!current) return null;
      const section = sections.find(s => s.id === current.sectionId);
      if (!section || section.media.length === 0) return current;
      return {
        ...current,
        index: (current.index - 1 + section.media.length) % section.media.length,
      };
    });
  }, [sections]);

  const next = useCallback(() => {
    setLightbox(current => {
      if (!current) return null;
      const section = sections.find(s => s.id === current.sectionId);
      if (!section || section.media.length === 0) return current;
      return {
        ...current,
        index: (current.index + 1) % section.media.length,
      };
    });
  }, [sections]);

  return (
    <>
      <SectionWrapper id="galerija" bg="cream-dark">
        <SectionHeading
          label="Galerija"
          title="Svaki kutak prica svoju pricu"
          subtitle="Autentican rustikalni stil spojen s modernim komforom - pogledajte sami."
        />

        <div className="space-y-12 md:space-y-14">
          {sections.map(section => (
            <div key={section.id} className="space-y-4">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-oak">
                  {section.title}
                </h3>
                <p className="mt-2 text-stone">{section.description}</p>
              </div>

              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-card overflow-hidden shadow-warm group bg-cream">
                  {(() => {
                    const currentIndex = getActiveIndex(section);
                    const totalMedia = section.media.length;

                    const showPrevious = () => {
                      if (totalMedia <= 1) return;
                      setIndex(section.id, (currentIndex - 1 + totalMedia) % totalMedia);
                    };

                    const showNext = () => {
                      if (totalMedia <= 1) return;
                      setIndex(section.id, (currentIndex + 1) % totalMedia);
                    };

                    if (totalMedia === 0) {
                      return (
                        <div className="absolute inset-0 flex items-center justify-center text-stone">
                          Slike/video nisu pronadeni.
                        </div>
                      );
                    }

                    const activeMedia = section.media[currentIndex];

                    return (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setLightbox({ sectionId: section.id, index: currentIndex })
                          }
                          className="absolute inset-0 z-10 cursor-zoom-in"
                          aria-label={`Otvori: ${activeMedia.alt}`}
                        />

                        {activeMedia.type === 'image' ? (
                          <Image
                            src={activeMedia.src}
                            alt={activeMedia.alt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 70vw"
                          />
                        ) : (
                          <video
                            src={activeMedia.src}
                            className="h-full w-full object-cover"
                            controls
                            preload="metadata"
                            playsInline
                            muted
                          />
                        )}

                        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-oak/0 transition-all duration-300 group-hover:bg-oak/30">
                          {activeMedia.type === 'video' ? (
                            <Play className="size-8 text-cream" />
                          ) : (
                            <ZoomIn className="size-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg" />
                          )}
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none bg-linear-to-t from-oak/80 to-transparent p-3">
                          <p className="text-cream text-sm font-medium">
                            {activeMedia.caption}
                          </p>
                        </div>

                        {totalMedia > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={showPrevious}
                              className="absolute left-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-oak/55 p-2 text-cream transition-colors hover:bg-oak/75"
                              aria-label="Prethodni"
                            >
                              <ChevronLeft className="size-5" />
                            </button>
                            <button
                              type="button"
                              onClick={showNext}
                              className="absolute right-3 top-1/2 z-30 -translate-y-1/2 rounded-full bg-oak/55 p-2 text-cream transition-colors hover:bg-oak/75"
                              aria-label="Sljedeci"
                            >
                              <ChevronRight className="size-5" />
                            </button>

                            <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
                              {section.media.map((_, mediaIndex) => (
                                <button
                                  key={`${section.id}-dot-${mediaIndex}`}
                                  type="button"
                                  onClick={() => setIndex(section.id, mediaIndex)}
                                  className={cn(
                                    'size-2.5 rounded-full transition-colors',
                                    mediaIndex === currentIndex
                                      ? 'bg-cream'
                                      : 'bg-cream/45',
                                  )}
                                  aria-label={`Prikazi ${mediaIndex + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>

                {section.media.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {section.media.map((item, mediaIndex) => {
                      const isActive = mediaIndex === getActiveIndex(section);
                      return (
                        <button
                          key={`${section.id}-thumb-${mediaIndex}`}
                          type="button"
                          onClick={() => setIndex(section.id, mediaIndex)}
                          className={cn(
                            'relative aspect-square overflow-hidden rounded-md border-2 transition-all',
                            isActive
                              ? 'border-terracotta shadow-warm'
                              : 'border-transparent hover:border-terracotta/50',
                          )}
                          aria-label={`Prikazi ${mediaIndex + 1}`}
                        >
                          {item.type === 'image' ? (
                            <Image
                              src={item.src}
                              alt={`${item.alt} ${mediaIndex + 1}`}
                              fill
                              className="object-cover"
                              sizes="120px"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-oak/80 flex items-center justify-center">
                              <Play className="size-6 text-cream" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {lightbox !== null &&
        (() => {
          const activeSection = sections.find(section => section.id === lightbox.sectionId);
          if (!activeSection || activeSection.media.length === 0) return null;

          const safeIndex = Math.min(
            Math.max(lightbox.index, 0),
            activeSection.media.length - 1,
          );
          const activeMedia = activeSection.media[safeIndex];

          return (
            <div
              className="fixed inset-0 z-100 flex items-center justify-center bg-black/95"
              onClick={close}
            >
              <button
                className="absolute top-4 right-4 p-2 text-cream/70 transition-colors hover:text-cream"
                onClick={close}
                aria-label="Zatvori"
              >
                <X className="size-8" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-cream/70 backdrop-blur-sm transition-colors hover:text-cream"
                onClick={e => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Prethodni"
              >
                <ChevronLeft className="size-8" />
              </button>

              <div
                className="relative mx-8 aspect-video max-h-[85vh] w-full max-w-5xl overflow-hidden rounded-card"
                onClick={e => e.stopPropagation()}
              >
                {activeMedia.type === 'image' ? (
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                ) : (
                  <video
                    src={activeMedia.src}
                    className="h-full w-full object-contain bg-black"
                    controls
                    autoPlay
                    playsInline
                  />
                )}
              </div>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-cream/70 backdrop-blur-sm transition-colors hover:text-cream"
                onClick={e => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Sljedeci"
              >
                <ChevronRight className="size-8" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <p className="text-cream font-medium">{activeMedia.caption}</p>
                <p className="mt-1 text-sm text-cream/50">
                  {safeIndex + 1} / {activeSection.media.length}
                </p>
              </div>
            </div>
          );
        })()}
    </>
  );
}
