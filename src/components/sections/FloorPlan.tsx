import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const floors = [
  {
    level: '00',
    name: 'Prizemlje',
    badge: 'Zajednički prostor',
    badgeColor: 'bg-terracotta',
    description:
      'Srce kuće – prostrani prostor za druženje s velikim hrastovim stolom idealnim za zajedničke obroke i večernja slavlja. Potpuno opremljena kuhinja, WC i plazma TV. Direktan izlaz na natkrivenu terasu s pogledom na cijelo Rudopolje.',
    smoking: true,
    rooms: [
      { name: 'Prostor za druženje', detail: 'Hrastov stol, plazma TV' },
      { name: 'Kuhinja', detail: 'Potpuno opremljena, indukcijska ploča' },
      { name: 'WC' , detail: null },
      { name: 'Natkrivena terasa', detail: 'Pogled na Rudopolje i zipline' },
    ],
    image: '/images/rooms/prizemlje1.jpg',
    imageAlt: 'Prizemlje – prostor za druženje s hrastovim stolom',
  },
  {
    level: '01',
    name: 'Prvi kat',
    badge: 'Dnevni boravak',
    badgeColor: 'bg-forest',
    description:
      'Mirniji, opuštajući ambijent rezerviran za odmor. Prostrani dnevni boravak s velikom udobnom kutnom garniturom (200×270 cm) idealna za filmske večeri ili jutarnju kavu. Spavaća soba s dva odvojena kreveta nudi privatnost unutar grupe.',
    smoking: false,
    rooms: [
      { name: 'Dnevni boravak', detail: 'Kutna garnitura 200×270 cm, TV' },
      { name: 'Spavaća soba', detail: '2 odvojena kreveta' },
      { name: 'Kupaonica', detail: 'Hidromasažni tuš' },
      { name: 'Predsoblje', detail: null },
    ],
    image: '/images/rooms/dnevni-boravak.jpg',
    imageAlt: 'Dnevni boravak s kutnom garniturom na prvom katu',
  },
  {
    level: '02',
    name: 'Potkrovlje',
    badge: 'Spavaće sobe',
    badgeColor: 'bg-oak',
    description:
      'Privatno utočište za odmor i san. Dvije velike spavaće sobe s masivnim hrastovim krevetima dimenzija 2×2 metra pružaju luksuznu udobnost. Jedna soba opremljena je dječjim krevetićem, a u drugoj je dodatni pomoćni ležaj.',
    smoking: false,
    rooms: [
      { name: 'Master spavaća', detail: 'Hrastov krevet 2×2 m, TV' },
      { name: 'Spavaća soba 2', detail: 'Hrastov krevet 2×2 m, dječji krevetić' },
      { name: 'Kupaonica', detail: 'Hidromasažni tuš' },
    ],
    image: '/images/rooms/spavaca-2b.jpg',
    imageAlt: 'Spavaća soba s masivnim hrastovim krevetom u potkrovlju',
  },
];

export function FloorPlan() {
  return (
    <SectionWrapper id="raspored" bg="white">
      <SectionHeading
        label="Raspored kuće"
        title="Tri etaže, svaka sa svojom pričom"
        subtitle="155 m² pažljivo uređenog prostora za do 9 gostiju – udobnost i privatnost za sve."
      />

      <div className="space-y-10 md:space-y-14">
        {floors.map((floor, i) => (
          <div
            key={floor.level}
            className={cn(
              'grid md:grid-cols-2 gap-8 md:gap-12 items-center',
              i % 2 === 1 && 'md:[&>*:first-child]:order-2',
            )}
          >
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-4xl font-bold text-stone-pale select-none">
                  {floor.level}
                </span>
                <div>
                  <span
                    className={cn(
                      'inline-block text-xs font-semibold uppercase tracking-widest text-cream px-2.5 py-1 rounded-full mb-1',
                      floor.badgeColor,
                    )}
                  >
                    {floor.badge}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-oak">
                    {floor.name}
                  </h3>
                </div>
              </div>

              <p className="text-stone leading-relaxed mb-6">{floor.description}</p>

              <ul className="space-y-2">
                {floor.rooms.map(room => (
                  <li key={room.name} className="flex items-start gap-2 text-sm">
                    <span className="mt-1 size-1.5 rounded-full bg-terracotta shrink-0" />
                    <span>
                      <strong className="text-oak">{room.name}</strong>
                      {room.detail && (
                        <span className="text-stone"> – {room.detail}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              {floor.smoking && (
                <p className="mt-4 text-xs text-stone-light italic">
                  * Pušenje dopušteno u prizemlju i sjenici
                </p>
              )}
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-warm">
              <Image
                src={floor.image}
                alt={floor.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
