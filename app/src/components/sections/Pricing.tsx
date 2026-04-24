import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { getTranslations } from 'next-intl/server';
import { CheckCircle2, Tag, Users, CalendarDays, Sparkles } from 'lucide-react';

type PricingProps = {
  bookingHref?: string;
};

export async function Pricing({ bookingHref = '#rezervacije' }: PricingProps = {}) {
  const t = await getTranslations('pricingSection');
  const included = [
    t('included.linen'),
    t('included.cleaning'),
    t('included.toiletries'),
    t('included.wifi'),
    t('included.parking'),
    t('included.jacuzzi'),
    t('included.grill'),
    t('included.crib'),
  ];
  const rules = [
    { icon: <Users className="size-4" />, label: t('stats.capacity.label'), value: t('stats.capacity.value') },
    { icon: <CalendarDays className="size-4" />, label: t('stats.minStay.label'), value: t('stats.minStay.value') },
    { icon: <Tag className="size-4" />, label: t('stats.pricePerNight.label'), value: t('stats.pricePerNight.value') },
    { icon: <Sparkles className="size-4" />, label: t('stats.discount.label'), value: t('stats.discount.value') },
  ];

  return (
    <SectionWrapper id="cijene" bg="oak">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
        light
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main price card */}
        <div className="lg:col-span-2 bg-cream rounded-card p-8 shadow-warm">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-stone mb-2">
                {t('priceCard.eyebrow')}
              </p>
              <div className="flex items-end gap-2">
                <span className="font-display text-6xl font-semibold text-oak">270</span>
                <span className="text-xl text-stone mb-2">€ / noć</span>
              </div>
              <p className="text-stone text-sm mt-1">{t('priceCard.note')}</p>
            </div>
            <div className="bg-terracotta/10 border border-terracotta/20 rounded-card px-5 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-terracotta mb-1">
                {t('discountBadge.title')}
              </p>
              <p className="font-display text-3xl font-semibold text-terracotta">−10%</p>
              <p className="text-xs text-stone mt-1">{t('discountBadge.note')}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-8 border-b border-stone-pale">
            {rules.map(r => (
              <div key={r.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-stone text-xs">
                  <span className="text-terracotta">{r.icon}</span>
                  {r.label}
                </div>
                <p className="font-semibold text-oak text-sm">{r.value}</p>
              </div>
            ))}
          </div>

          {/* What's included */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone mb-4">
              {t('includedTitle')}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {included.map(item => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-oak">
                  <CheckCircle2 className="size-4 text-forest shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA card */}
        <div className="bg-terracotta text-cream rounded-card p-8 shadow-warm flex flex-col justify-between">
          <div>
            <p className="font-display text-2xl font-semibold mb-3">
              {t('cta.title')}
            </p>
            <p className="text-cream/80 text-sm leading-relaxed mb-6">
              {t('cta.description')}
            </p>
            <ul className="space-y-2 mb-8">
              {[t('cta.benefits.noFees'), t('cta.benefits.directContact'), t('cta.benefits.flexibility'), t('cta.benefits.localTips')].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-cream/90">
                  <CheckCircle2 className="size-4 shrink-0 text-cream" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-cream text-terracotta hover:bg-cream-dark font-semibold"
            >
              <a href={bookingHref}>{t('cta.checkAvailability')}</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full text-cream hover:bg-cream/10"
            >
              <a href="https://wa.me/385919295907" target="_blank" rel="noopener noreferrer">
                {t('cta.whatsapp')}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-stone-light">
        {t('disclaimer')}
      </p>
    </SectionWrapper>
  );
}
