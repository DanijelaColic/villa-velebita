import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Tag, Users, CalendarDays, Sparkles } from 'lucide-react';

const included = [
  'Posteljina i ručnici',
  'Završno čišćenje',
  'Šamponi, sapun, WC papir',
  'Besplatni WiFi',
  'Besplatno parkiranje',
  'Vanjski jacuzzi',
  'Roštilj i pečenjara',
  'Krevetić za bebu (besplatno, na upit)',
];

const rules = [
  { icon: <Users className="size-4" />, label: 'Kapacitet', value: '7+2 osobe (do 9)' },
  { icon: <CalendarDays className="size-4" />, label: 'Min. boravak', value: '3 noći' },
  { icon: <Tag className="size-4" />, label: 'Cijena/noć', value: '590 € (cijela kuća)' },
  { icon: <Sparkles className="size-4" />, label: 'Popust 7+ noći', value: '10% popusta' },
];

export function Pricing() {
  return (
    <SectionWrapper id="cijene" bg="oak">
      <SectionHeading
        label="Cijene i uvjeti"
        title="Transparentne cijene, bez skrivenih troškova"
        subtitle="Iznajmljujete cijelu kuću – sve što vidite je vaše."
        light
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main price card */}
        <div className="lg:col-span-2 bg-cream rounded-card p-8 shadow-warm">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-stone mb-2">
                Cijena najma
              </p>
              <div className="flex items-end gap-2">
                <span className="font-display text-6xl font-semibold text-oak">590</span>
                <span className="text-xl text-stone mb-2">€ / noć</span>
              </div>
              <p className="text-stone text-sm mt-1">Cijela kuća · do 9 osoba · 62 € po osobi (590/9)</p>
            </div>
            <div className="bg-terracotta/10 border border-terracotta/20 rounded-card px-5 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-terracotta mb-1">
                Rezerviraj 7+ noći
              </p>
              <p className="font-display text-3xl font-semibold text-terracotta">−10%</p>
              <p className="text-xs text-stone mt-1">= 504 € / noć</p>
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
              Uključeno u cijenu
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
              Rezervirajte direktno
            </p>
            <p className="text-cream/80 text-sm leading-relaxed mb-6">
              Rezervacijom direktno kod nas dobivate najnižu cijenu i
              personaliziranu uslugu.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Bez provizija platformi',
                'Direktna komunikacija s vlasnikom',
                'Fleksibilnost oko dolaska',
                'Savjeti o lokalnoj ponudi',
              ].map(item => (
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
              <a href="#rezervacije">Provjerite dostupnost</a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full text-cream hover:bg-cream/10"
            >
              <a href="https://wa.me/385919295907" target="_blank" rel="noopener noreferrer">
                Pišite na WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-6 text-center text-xs text-stone-light">
        Cijene su iskazane u eurima. Osnovna cijena je 590 € po noći za cijelu kuću (do 9 osoba), odnosno
        62 € po osobi (590/9). Minimalni boravak 3 noći. Popust od 10% za rezervacije 7 i više noći.
        Krevetić za bebu je besplatan (na upit), a za posebne zahtjeve (kućni ljubimci) javite se unaprijed.
      </p>
    </SectionWrapper>
  );
}
