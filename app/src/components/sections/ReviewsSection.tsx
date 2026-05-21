import { Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const REVIEW_KEYS = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'] as const;

function StarRating({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${count} / 5`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'size-4 shrink-0',
            i < count ? 'fill-terracotta text-terracotta' : 'fill-stone-pale text-stone-pale',
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

/** Početna: recenzije gostiju. */
export async function ReviewsSection() {
  const t = await getTranslations('reviewsSection');

  return (
    <SectionWrapper id="recenzije" bg="white">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEW_KEYS.map((key) => {
          const rating = Number(t(`items.${key}.rating`));

          return (
            <li
              key={key}
              className="flex flex-col rounded-card border border-stone-pale bg-cream p-5 shadow-card"
            >
              <StarRating count={Number.isFinite(rating) ? rating : 5} />
              <p className="mt-4 flex-1 text-sm text-stone leading-relaxed">
                {t(`items.${key}.text`)}
              </p>
              <footer className="mt-4 border-t border-stone-pale pt-4">
                <p className="font-semibold text-oak text-sm">{t(`items.${key}.name`)}</p>
                <p className="text-xs text-stone mt-0.5">
                  {t(`items.${key}.meta`)}
                </p>
              </footer>
            </li>
          );
        })}
      </ul>
    </SectionWrapper>
  );
}
