import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTranslations } from 'next-intl/server';
import {
  Clock, PawPrint, Cigarette, Volume2, CheckCircle2, XCircle,
} from 'lucide-react';

export async function HouseRules() {
  const t = await getTranslations('houseRulesSection');
  const rules = [
    {
      icon: <Clock className="size-6" />,
      title: t('cards.checkin.title'),
      color: 'text-forest',
      bg: 'bg-forest/10',
      items: [
        { ok: true, text: t('cards.checkin.items.i1') },
        { ok: true, text: t('cards.checkin.items.i2') },
        { ok: true, text: t('cards.checkin.items.i3') },
      ],
    },
    {
      icon: <PawPrint className="size-6" />,
      title: t('cards.pets.title'),
      color: 'text-terracotta',
      bg: 'bg-terracotta/10',
      items: [
        { ok: true, text: t('cards.pets.items.i1') },
        { ok: true, text: t('cards.pets.items.i2') },
        { ok: false, text: t('cards.pets.items.i3') },
      ],
    },
    {
      icon: <Cigarette className="size-6" />,
      title: t('cards.smoking.title'),
      color: 'text-stone',
      bg: 'bg-stone/10',
      items: [
        { ok: true, text: t('cards.smoking.items.i1') },
        { ok: true, text: t('cards.smoking.items.i2') },
        { ok: false, text: t('cards.smoking.items.i3') },
      ],
    },
    {
      icon: <Volume2 className="size-6" />,
      title: t('cards.noise.title'),
      color: 'text-gold',
      bg: 'bg-gold/10',
      items: [
        { ok: true, text: t('cards.noise.items.i1') },
        { ok: true, text: t('cards.noise.items.i2') },
        { ok: false, text: t('cards.noise.items.i3') },
      ],
    },
  ];

  return (
    <SectionWrapper id="kucni-red" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {rules.map(rule => (
          <div
            key={rule.title}
            className="bg-white rounded-card p-6 shadow-card"
          >
            <div className={`inline-flex p-2.5 rounded-btn mb-4 ${rule.bg} ${rule.color}`}>
              {rule.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-oak mb-4">
              {rule.title}
            </h3>
            <ul className="space-y-2.5">
              {rule.items.map(item => (
                <li key={item.text} className="flex items-start gap-2.5 text-sm">
                  {item.ok ? (
                    <CheckCircle2 className="size-4 text-forest mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="size-4 text-terracotta mt-0.5 shrink-0" />
                  )}
                  <span className={item.ok ? 'text-stone' : 'text-stone/70'}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-5 bg-cream-dark rounded-card border border-stone-pale text-center text-sm text-stone">
        {t('note')}
      </div>
    </SectionWrapper>
  );
}
