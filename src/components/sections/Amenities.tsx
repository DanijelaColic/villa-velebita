import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Wifi, Car, Waves, Flame, Coffee, Microwave, Wind,
  Baby, Tv, Utensils, ShowerHead, TreePine, Thermometer,
  Cigarette, PawPrint, Clock, CheckCircle2,
} from 'lucide-react';

const amenityGroups = [
  {
    title: 'Kuhinja',
    items: [
      { icon: <Utensils className="size-5" />, label: 'Indukcijska ploča' },
      { icon: <Microwave className="size-5" />, label: 'Mikrovalna pećnica' },
      { icon: <Wind className="size-5" />, label: 'Perilica za suđe' },
      { icon: <Thermometer className="size-5" />, label: 'Hladnjak' },
      { icon: <Coffee className="size-5" />, label: 'Aparat za kavu' },
      { icon: <Coffee className="size-5" />, label: 'Kuhalo za vodu' },
    ],
  },
  {
    title: 'Tehnologija',
    items: [
      { icon: <Wifi className="size-5" />, label: 'Besplatni WiFi' },
      { icon: <Tv className="size-5" />, label: 'TV (3×, uklj. plazma)' },
    ],
  },
  {
    title: 'Vanjski prostori',
    items: [
      { icon: <Waves className="size-5" />, label: 'Vanjski jacuzzi (hot tub)' },
      { icon: <Flame className="size-5" />, label: 'Roštilj' },
      { icon: <Utensils className="size-5" />, label: 'Rustikalna pečenjara' },
      { icon: <TreePine className="size-5" />, label: 'Dvorište 800 m²' },
      { icon: <Car className="size-5" />, label: 'Besplatno parkiranje' },
    ],
  },
  {
    title: 'Kupaonica & udobnost',
    items: [
      { icon: <ShowerHead className="size-5" />, label: 'Hidromasažni tuševi (2×)' },
      { icon: <CheckCircle2 className="size-5" />, label: 'Posteljina i ručnici' },
      { icon: <CheckCircle2 className="size-5" />, label: 'Šamponi, sapun, WC papir' },
      { icon: <Baby className="size-5" />, label: 'Dječji krevetić' },
    ],
  },
  {
    title: 'Pravila & info',
    items: [
      { icon: <PawPrint className="size-5" />, label: 'Kućni ljubimci (male pasmine)' },
      { icon: <Cigarette className="size-5" />, label: 'Pušenje u prizemlju/sjenici' },
      { icon: <Clock className="size-5" />, label: 'Check-in 14:00 / Check-out 11:00' },
      { icon: <CheckCircle2 className="size-5" />, label: 'Čišćenje uključeno u cijenu' },
    ],
  },
];

export function Amenities() {
  return (
    <SectionWrapper id="sadrzaji" bg="cream">
      <SectionHeading
        label="Sadržaji i pogodnosti"
        title="Sve što trebate – bez kompromisa"
        subtitle="Kuhinja, wellness, tehnologija, vanjski prostori – Villa Velebita je opremljena za potpun komfor."
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
              Kapacitet
            </p>
            <p className="font-display text-5xl font-semibold">7+2</p>
            <p className="text-cream/80 mt-2 leading-relaxed">
              Službeni kapacitet za 7+2 osobe, zahvaljujući dodatnim ležajevima
              može ugostiti do 9 gostiju.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-cream/20 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-semibold">155 m²</p>
              <p className="text-cream/70">Površina kuće</p>
            </div>
            <div>
              <p className="font-semibold">800 m²</p>
              <p className="text-cream/70">Okućnica</p>
            </div>
            <div>
              <p className="font-semibold">3 etaže</p>
              <p className="text-cream/70">Raspored prostora</p>
            </div>
            <div>
              <p className="font-semibold">2 kupaonice</p>
              <p className="text-cream/70">Hidromasažni tuševi</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
