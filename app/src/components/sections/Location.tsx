import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MapPin, Navigation, Clock } from 'lucide-react';

const distances = [
  { category: 'Priroda', items: [
    { name: 'Nacionalni park Plitvička jezera', time: '20 min', km: '~22 km' },
    { name: 'Majerovo vrelo – izvor Gacke', time: '10 min', km: '~8 km' },
    { name: 'Rijeka Gacka', time: '5 min', km: '~4 km' },
    { name: 'Utočište medvjeda Kuterevo', time: '30 min', km: '~28 km' },
  ]},
  { category: 'Aktivnosti', items: [
    { name: 'Zipline "Pazi Medo"', time: '1 min', km: 'tik uz kuću' },
    { name: 'Lovište jelena Ličko Lešće', time: '5 min', km: '~3 km' },
    { name: 'Skijalište Mukinje', time: '20 min', km: '~20 km' },
  ]},
  { category: 'Servisi', items: [
    { name: 'Konzum Vrhovine', time: '5 min', km: '~2 km' },
    { name: 'Pošta Vrhovine', time: '5 min', km: '~2 km' },
    { name: 'Dom zdravlja Otočac', time: '20 min', km: '~20 km' },
    { name: 'More (Senj / Karlobag)', time: '55 min', km: '~55 km' },
  ]},
  { category: 'Restorani', items: [
    { name: 'Restoran Big Bear', time: '3 min', km: '~2 km' },
    { name: 'Restoran Jelen', time: '5 min', km: '~3 km' },
    { name: 'Restorani Otočac', time: '20 min', km: '~15 km' },
  ]},
];

export function Location() {
  return (
    <SectionWrapper id="lokacija" bg="white">
      <SectionHeading
        label="Lokacija"
        title="U srcu svega"
        subtitle="Rudopolje 124, 53223 Vrhovine – savršena baza za istraživanje Plitvica i cijele Like."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Map embed */}
        <div className="rounded-card overflow-hidden shadow-warm aspect-[4/3]">
          <iframe
            title="Villa Velebita – lokacija na karti"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.0!2d15.2900!3d44.8870!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47632d0c0d0d0d0d%3A0x0!2sRudopolje+124%2C+53223+Vrhovine!5e0!3m2!1shr!2shr!4v1710000000000!5m2!1shr!2shr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        {/* Distances */}
        <div className="space-y-6">
          <div className="flex items-start gap-3 p-4 bg-cream rounded-card">
            <MapPin className="size-5 text-terracotta mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-oak">Rudopolje 124</p>
              <p className="text-stone text-sm">53223 Vrhovine, Hrvatska</p>
              <a
                href="https://maps.google.com/?q=Rudopolje+124,+53223+Vrhovine"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark font-medium mt-2 transition-colors"
              >
                <Navigation className="size-3.5" />
                Otvori u Google Maps
              </a>
            </div>
          </div>

          {distances.map(group => (
            <div key={group.category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone mb-3">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.items.map(item => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between py-2 border-b border-stone-pale/60 last:border-0"
                  >
                    <span className="text-sm text-oak">{item.name}</span>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-xs text-stone">{item.km}</span>
                      <span className="flex items-center gap-1 text-xs text-forest font-medium">
                        <Clock className="size-3" />
                        {item.time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
