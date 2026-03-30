import Image from 'next/image';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

const categories = [
  {
    id: 'priroda',
    label: 'Priroda',
    color: 'bg-forest',
    title: 'Netaknuta lička divljina',
    intro:
      'Lika je jedna od najočuvanijih regija Hrvatske – here je priroda još uvijek na prvom mjestu. Oko kuće se rasprostiru prostrane šume, livade i planinski pejzaži koji mijenjaju lice sa svakim godišnjim dobom.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    imageAlt: 'Netaknuta ličke šume i planinski pejzaž',
    activities: [
      { name: 'Nacionalni park Plitvička jezera', distance: '20 min vožnje', highlight: true },
      { name: 'Majerovo vrelo – izvor rijeke Gacke', distance: '10 min' },
      { name: 'Rijeka Gacka – kristalno čista voda', distance: '5 min' },
      { name: 'Planinarenje i pješačke staze', distance: 'od kuće' },
      { name: 'Vidikovci i panoramski pogledi', distance: 'u blizini' },
      { name: 'Šume, livade, svjež planinski zrak', distance: '840 m n.v.' },
    ],
  },
  {
    id: 'aktivnosti',
    label: 'Aktivnosti',
    color: 'bg-terracotta',
    title: 'Adrenalin i avantura',
    intro:
      'Za one koji traže više od pasivnog odmora – Rudopolje i okolica nude čitav spektar aktivnih doživljaja. Od najduljeg ziplinea u Europi do vožnje kvadovima kroz netaknutu prirodu.',
    image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&q=80',
    imageAlt: 'Zipline avantura u prirodi',
    activities: [
      { name: 'Zipline "Pazi Medo" – najduži u Europi', distance: 'tik uz kuću', highlight: true },
      { name: 'Vožnja kvadovima i motorima', distance: 'u okolici' },
      { name: 'Biciklističke rute kroz Liku', distance: 'od kuće' },
      { name: 'Ribolov na rijeci Gacki', distance: '5 min' },
      { name: 'Skijalište Mukinje (Plitvice)', distance: '20 min' },
      { name: 'Utočište medvjeda Kuterevo', distance: '30 min' },
    ],
  },
  {
    id: 'gastronomija',
    label: 'Gastronomija',
    color: 'bg-gold',
    title: 'Okusi Like',
    intro:
      'Lička kuhinja nosi duh planina i tradicije. Jagnjetina s ražnja, peka, domaći sir i vrhnje, lovačka juha – ovo su okusi koji se pamte. U blizini kuće nalaze se izvrsni restorani koji donose te okuse na vaš tanjur.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    imageAlt: 'Tradicionalna lička hrana na roštilju',
    activities: [
      { name: 'Restoran Big Bear (kamp)', distance: '2 km', highlight: true },
      { name: 'Restoran Jelen', distance: '3 km' },
      { name: 'Restorani u Otočcu', distance: '15 km' },
      { name: 'Vlastiti roštilj i pečenjara u kući', distance: 'u dvorištu' },
      { name: 'Konzum (Vrhovine / Otočac)', distance: '2–15 km' },
    ],
  },
  {
    id: 'izleti',
    label: 'Izleti',
    color: 'bg-oak',
    title: 'Sve što vrijedi vidjeti',
    intro:
      'Villa Velebita savršena je baza za istraživanje cijele regije. U sat vremena vožnje dostupne su najpopularnije atrakcije Likeile i Kvarnera – od UNESCO prirodne baštine do jadranskih plaža.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageAlt: 'Plitvička jezera – UNESCO svjetska baština',
    activities: [
      { name: 'Plitvička jezera (UNESCO)', distance: '20 min', highlight: true },
      { name: 'Lovište jelena lopatara Ličko Lešće', distance: '5 min' },
      { name: 'More – Senj / Karlobag', distance: '55 km' },
      { name: 'Grad Otočac', distance: '20 km' },
      { name: 'Pošta Vrhovine', distance: '2 km' },
      { name: 'Dom zdravlja Otočac', distance: '20 km' },
    ],
  },
];

export function Experiences() {
  return (
    <SectionWrapper id="aktivnosti" bg="cream-dark">
      <SectionHeading
        label="Doživljaji i aktivnosti"
        title="Odmor koji se ne zaboravlja"
        subtitle="Priroda, adrenalin, gastronomija i kultura – sve na dohvat ruke iz Ville Velebita."
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
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-warm group">
              <Image
                src={cat.image}
                alt={cat.imageAlt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oak/50 to-transparent" />
              <span
                className={cn(
                  'absolute top-4 left-4 text-xs font-semibold uppercase tracking-widest text-cream px-3 py-1.5 rounded-full',
                  cat.color,
                )}
              >
                {cat.label}
              </span>
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
