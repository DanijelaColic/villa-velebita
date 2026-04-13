'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export type ExperienceCategory = {
  id: string;
  label: string;
  color: string;
  title: string;
  intro: string;
  imageAlt: string;
  images: string[];
  activities: Array<{ name: string; distance: string; highlight?: boolean }>;
};

export function ExperiencesClient({ categories }: { categories: ExperienceCategory[] }) {
  const t = useTranslations('experiencesSection');
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  function getActiveIndex(category: ExperienceCategory) {
    const idx = activeImageIndex[category.id] ?? 0;
    return Math.min(Math.max(idx, 0), Math.max(category.images.length - 1, 0));
  }

  function setIndex(categoryId: string, nextIndex: number) {
    setActiveImageIndex(prev => ({ ...prev, [categoryId]: nextIndex }));
  }

  return (
    <SectionWrapper id="aktivnosti" bg="cream-dark">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      <div className="space-y-16 md:space-y-24">
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className={cn(
              'grid md:grid-cols-2 gap-8 md:gap-14 items-center',
              i % 2 === 1 && 'md:[&>*:first-child]:order-2',
            )}
          >
            {/* Image slider: automatski ucitava sve slike u folderu */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-card overflow-hidden shadow-warm group bg-cream">
                {(() => {
                  const currentIndex = getActiveIndex(cat);
                  const totalImages = cat.images.length;

                  const showPrevious = () => {
                    if (totalImages <= 1) return;
                    const next = (currentIndex - 1 + totalImages) % totalImages;
                    setIndex(cat.id, next);
                  };

                  const showNext = () => {
                    if (totalImages <= 1) return;
                    const next = (currentIndex + 1) % totalImages;
                    setIndex(cat.id, next);
                  };

                  if (totalImages === 0) {
                    return (
                      <div className="absolute inset-0 flex items-center justify-center text-stone">
                        {t('empty')}
                      </div>
                    );
                  }

                  return (
                    <>
                      <Image
                        src={cat.images[currentIndex]}
                        alt={cat.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {totalImages > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={showPrevious}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-oak/55 text-cream p-2 hover:bg-oak/75 transition-colors"
                            aria-label={t('controls.previous')}
                          >
                            <ChevronLeft className="size-5" />
                          </button>
                          <button
                            type="button"
                            onClick={showNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-oak/55 text-cream p-2 hover:bg-oak/75 transition-colors"
                            aria-label={t('controls.next')}
                          >
                            <ChevronRight className="size-5" />
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
                            {cat.images.map((_, imageIndex) => (
                              <button
                                key={`${cat.id}-${imageIndex}`}
                                type="button"
                                onClick={() => setIndex(cat.id, imageIndex)}
                                className={cn(
                                  'size-2.5 rounded-full transition-colors',
                                  imageIndex === currentIndex ? 'bg-cream' : 'bg-cream/45',
                                )}
                                aria-label={t('controls.show', { index: imageIndex + 1 })}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  );
                })()}

                <div className="absolute inset-0 bg-linear-to-t from-oak/50 to-transparent" />
                <span
                  className={cn(
                    'absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-cream px-3 py-1.5 rounded-full',
                    cat.color,
                  )}
                >
                  {cat.label}
                </span>
              </div>

              {/* Thumbnail traka: prikazuje sve slike iz foldera */}
              {cat.images.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {cat.images.map((img, imageIndex) => {
                    const isActive = imageIndex === getActiveIndex(cat);
                    return (
                      <button
                        key={`${cat.id}-thumb-${imageIndex}`}
                        type="button"
                        onClick={() => setIndex(cat.id, imageIndex)}
                        className={cn(
                          'relative aspect-square overflow-hidden rounded-md border-2 transition-all',
                          isActive
                            ? 'border-terracotta shadow-warm'
                            : 'border-transparent hover:border-terracotta/50',
                        )}
                        aria-label={t('controls.show', { index: imageIndex + 1 })}
                      >
                        <Image
                          src={img}
                          alt={`${cat.imageAlt} ${imageIndex + 1}`}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Text */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-oak mb-4">
                {cat.title}
              </h3>
              <p className="text-stone leading-relaxed mb-6">{cat.intro}</p>

              <ul className="space-y-2.5">
                {cat.activities.map(a => (
                  <li key={a.name} className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2">
                      <MapPin
                        className={cn(
                          'size-4 mt-0.5 shrink-0',
                          a.highlight ? 'text-terracotta' : 'text-stone-light',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm',
                          a.highlight ? 'font-semibold text-oak' : 'text-stone',
                        )}
                      >
                        {a.name}
                      </span>
                    </div>
                    <span className="text-xs text-stone-light whitespace-nowrap shrink-0 pt-0.5">
                      {a.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

