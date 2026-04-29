'use client';

import { useCallback, useState } from 'react';
import { AppImage as Image } from '@/components/ui/AppImage';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';

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
  const t = useTranslations('gallerySection');
  const [lightbox, setLightbox] = useState<{ sectionId: string; index: number } | null>(
    null,
  );

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
          label={t('heading.label')}
          title={t('heading.title')}
          subtitle={t('heading.subtitle')}
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
                {section.media.length === 0 ? (
                  <div className="rounded-card border border-dashed border-stone/30 bg-cream px-4 py-8 text-center text-stone">
                    {t('empty')}
                  </div>
                ) : (
                  <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                    {section.media.map((item, mediaIndex) => (
                      <button
                        key={`${section.id}-media-${mediaIndex}`}
                        type="button"
                        onClick={() =>
                          setLightbox({ sectionId: section.id, index: mediaIndex })
                        }
                        className="group relative h-36 w-52 shrink-0 snap-start overflow-hidden rounded-card shadow-warm bg-cream cursor-zoom-in"
                        aria-label={t('controls.open', { alt: item.alt })}
                      >
                        {item.type === 'image' ? (
                          <Image
                            src={item.src}
                            alt={`${item.alt} ${mediaIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="208px"
                            unoptimized
                          />
                        ) : (
                          <video
                            src={item.src}
                            className="h-full w-full object-cover"
                            preload="metadata"
                            playsInline
                            muted
                          />
                        )}
                        <div className="absolute inset-0 bg-oak/0 group-hover:bg-oak/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          {item.type === 'video' ? (
                            <Play className="size-7 text-cream drop-shadow-lg" />
                          ) : (
                            <ZoomIn className="size-7 text-cream opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                          )}
                        </div>
                      </button>
                    ))}
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
                aria-label={t('controls.close')}
              >
                <X className="size-8" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-cream/70 backdrop-blur-sm transition-colors hover:text-cream"
                onClick={e => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={t('controls.previous')}
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
                    unoptimized
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
                aria-label={t('controls.next')}
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
