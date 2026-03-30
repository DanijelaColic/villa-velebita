import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Mountain, TreePine, Waves, Zap } from 'lucide-react';

const highlights = [
  {
    icon: <Mountain className="size-6" />,
    title: '840 m nadmorske visine',
    desc: 'Svjež planinski zrak i tišina koja se ne može kupiti.',
  },
  {
    icon: <TreePine className="size-6" />,
    title: 'Autentični lički stil',
    desc: 'Masivni namještaj od starog hrasta, kamen i drvo – tradicija u svakom detalju.',
  },
  {
    icon: <Waves className="size-6" />,
    title: 'Vanjski jacuzzi na drva',
    desc: 'Upalite vatru, grijte vodu i uživajte pod zvjezdanim nebom.',
  },
  {
    icon: <Zap className="size-6" />,
    title: 'Zipline Pazi Medo',
    desc: 'Najduži zipline u Europi – adrenalinska atrakcija odmah pored kuće.',
  },
];

export function About() {
  return (
    <SectionWrapper id="o-smjestaju" bg="cream">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text column */}
        <div>
          <SectionHeading
            label="O smještaju"
            title="Gdje priroda postaje dom"
            align="left"
          />

          <div className="space-y-5 text-stone text-base md:text-lg leading-relaxed">
            <p>
              Zamislite jutro u tišini ličkih planina – šalica kave u ruci, pogled
              na zelene vrhove i jedina buka koja dopire do vas je pjevanje ptica.
              To je jutro u <strong className="text-oak">Villi Velebiti</strong>.
            </p>
            <p>
              Smještena u mirnom Rudopolju na 840 metara nadmorske visine, ova
              autentična kameno-drvena kuća renovirana je 2026. godine uz puno
              poštovanje prema ličkoj tradiciji. Masivni namještaj od starog
              hrasta, kameni zidovi i topla rustikalna atmosfera daju osjećaj
              doma – ali s luksuznim komforom koji očekujete od odmora.
            </p>
            <p>
              Na{' '}
              <strong className="text-oak">155 m² raspoređenih na tri etaže</strong>{' '}
              smjestit će se do 9 gostiju s punom privatnošću. Prostrani dnevni
              boravak, tri spavaće sobe s masivnim hrastovim krevetima,
              hidromasažni tuševi i potpuno opremljena kuhinja – sve je tu.
            </p>
            <p>
              Navečer, dok zvijezde osvjetljavaju ličko nebo, zapalite vanjski
              jacuzzi na drva ispod sjenice. Rituali kao ovaj ne zaboravljaju se
              godinama.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#rezervacije">Rezervirajte odmor</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#galerija">Pogledajte galeriju</a>
            </Button>
          </div>
        </div>

        {/* Image column */}
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-warm">
            <Image
              src="/images/exterior/exterior-02.jpg"
              alt="Villa Velebita – autentična kameno-drvena kuća u Rudopolju"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -left-6 bg-terracotta text-cream rounded-card p-5 shadow-warm hidden md:block">
            <p className="font-display text-3xl font-semibold">2026.</p>
            <p className="text-sm text-cream/80 mt-0.5">Renovirano</p>
          </div>
          {/* Second image – terasa */}
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-card overflow-hidden shadow-warm hidden lg:block">
            <Image
              src="/images/exterior/terasa.jpg"
              alt="Natkrivena terasa s pogledom"
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>
      </div>

      {/* Highlights grid */}
      <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map(h => (
          <div
            key={h.title}
            className="bg-white rounded-card p-6 shadow-card hover:shadow-hover transition-shadow duration-300 group"
          >
            <div className="text-terracotta mb-3 group-hover:scale-110 transition-transform duration-200">
              {h.icon}
            </div>
            <h3 className="font-display text-lg font-semibold text-oak mb-2">
              {h.title}
            </h3>
            <p className="text-sm text-stone leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
