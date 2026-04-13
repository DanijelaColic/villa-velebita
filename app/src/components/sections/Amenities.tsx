import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTranslations } from 'next-intl/server';
import {
  Wifi, Car, Waves, Flame, Coffee, Microwave, Wind,
  Baby, Tv, Utensils, ShowerHead, TreePine, Thermometer,
  Cigarette, PawPrint, Clock, CheckCircle2,
} from 'lucide-react';

export async function Amenities() {
  const t = await getTranslations('amenitiesSection');
  const amenityGroups = [
    {
      title: t('groups.kitchen.title'),
      items: [
        { icon: <Utensils className="size-5" />, label: t('groups.kitchen.items.induction') },
        { icon: <Microwave className="size-5" />, label: t('groups.kitchen.items.microwave') },
        { icon: <Wind className="size-5" />, label: t('groups.kitchen.items.dishwasher') },
        { icon: <Thermometer className="size-5" />, label: t('groups.kitchen.items.fridge') },
        { icon: <Coffee className="size-5" />, label: t('groups.kitchen.items.coffee') },
        { icon: <Coffee className="size-5" />, label: t('groups.kitchen.items.kettle') },
      ],
    },
    {
      title: t('groups.technology.title'),
      items: [
        { icon: <Wifi className="size-5" />, label: t('groups.technology.items.wifi') },
        { icon: <Tv className="size-5" />, label: t('groups.technology.items.tv') },
      ],
    },
    {
      title: t('groups.outdoor.title'),
      items: [
        { icon: <Waves className="size-5" />, label: t('groups.outdoor.items.jacuzzi') },
        { icon: <Flame className="size-5" />, label: t('groups.outdoor.items.grill') },
        { icon: <Utensils className="size-5" />, label: t('groups.outdoor.items.roastery') },
        { icon: <TreePine className="size-5" />, label: t('groups.outdoor.items.yard') },
        { icon: <Car className="size-5" />, label: t('groups.outdoor.items.parking') },
      ],
    },
    {
      title: t('groups.bathroom.title'),
      items: [
        { icon: <ShowerHead className="size-5" />, label: t('groups.bathroom.items.showers') },
        { icon: <CheckCircle2 className="size-5" />, label: t('groups.bathroom.items.linen') },
        { icon: <CheckCircle2 className="size-5" />, label: t('groups.bathroom.items.toiletries') },
        { icon: <Baby className="size-5" />, label: t('groups.bathroom.items.crib') },
      ],
    },
    {
      title: t('groups.rules.title'),
      items: [
        { icon: <PawPrint className="size-5" />, label: t('groups.rules.items.pets') },
        { icon: <Cigarette className="size-5" />, label: t('groups.rules.items.smoking') },
        { icon: <Clock className="size-5" />, label: t('groups.rules.items.checkin') },
        { icon: <CheckCircle2 className="size-5" />, label: t('groups.rules.items.cleaning') },
      ],
    },
  ];

  return (
    <SectionWrapper id="sadrzaji" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenityGroups.map(group => (
          <div key={group.title} className="bg-white rounded-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold text-oak mb-4 pb-3 border-b border-stone-pale">
              {group.title}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map(item => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-stone">
                  <span className="text-terracotta shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Capacity highlight card */}
        <div className="bg-terracotta text-cream rounded-card p-6 shadow-warm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cream/70 mb-2">
              {t('capacity.eyebrow')}
            </p>
            <p className="font-display text-5xl font-semibold">7+2</p>
            <p className="text-cream/80 mt-2 leading-relaxed">
              {t('capacity.description')}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-cream/20 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold">155 m²</p>
              <p className="text-cream/70">{t('capacity.stats.houseArea')}</p>
            </div>
            <div>
              <p className="font-semibold">800 m²</p>
              <p className="text-cream/70">{t('capacity.stats.yard')}</p>
            </div>
            <div>
              <p className="font-semibold">{t('capacity.stats.floorsValue')}</p>
              <p className="text-cream/70">{t('capacity.stats.floors')}</p>
            </div>
            <div>
              <p className="font-semibold">{t('capacity.stats.bathroomsValue')}</p>
              <p className="text-cream/70">{t('capacity.stats.bathrooms')}</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
