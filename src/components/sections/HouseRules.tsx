import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Clock, PawPrint, Cigarette, Volume2, CheckCircle2, XCircle,
} from 'lucide-react';

const rules = [
  {
    icon: <Clock className="size-6" />,
    title: 'Check-in & Check-out',
    color: 'text-forest',
    bg: 'bg-forest/10',
    items: [
      { ok: true,  text: 'Check-in od 14:00 h' },
      { ok: true,  text: 'Check-out do 11:00 h' },
      { ok: true,  text: 'Kasni check-in moguć uz dogovor' },
    ],
  },
  {
    icon: <PawPrint className="size-6" />,
    title: 'Kućni ljubimci',
    color: 'text-terracotta',
    bg: 'bg-terracotta/10',
    items: [
      { ok: true,  text: 'Kućni ljubimci dobrodošli (male pasmine)' },
      { ok: true,  text: 'Molimo najaviti unaprijed' },
      { ok: false, text: 'Velike pasmine nisu dozvoljene' },
    ],
  },
  {
    icon: <Cigarette className="size-6" />,
    title: 'Pušenje',
    color: 'text-stone',
    bg: 'bg-stone/10',
    items: [
      { ok: true,  text: 'Pušenje dozvoljeno u prizemlju' },
      { ok: true,  text: 'Pušenje dozvoljeno u sjenici (vani)' },
      { ok: false, text: 'Pušenje nije dozvoljeno na katovima' },
    ],
  },
  {
    icon: <Volume2 className="size-6" />,
    title: 'Glasna zabava',
    color: 'text-gold',
    bg: 'bg-gold/10',
    items: [
      { ok: true,  text: 'Glazba i zabava do 24:00 h' },
      { ok: true,  text: 'Noćni mir od ponoći' },
      { ok: false, text: 'Glasna glazba nakon ponoći nije dopuštena' },
    ],
  },
];

export function HouseRules() {
  return (
    <SectionWrapper id="kucni-red" bg="cream">
      <SectionHeading
        label="Kućni red"
        title="Malo pravila za savršen odmor"
        subtitle="Poštivanjem kućnog reda pomažete nam u očuvanju ljepote ovog mjesta – i za buduće goste."
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
        Zbog blizine{' '}
        <strong className="text-oak">Nacionalnog parka Plitvička jezera</strong>{' '}
        i očuvanja prirode, molimo goste da se pridržavaju kućnog reda.
        Hvala na razumijevanju i uljudnom boravku.
      </div>
    </SectionWrapper>
  );
}
