import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export async function FloorPlan() {
  const t = await getTranslations('floorPlanSection');
  const floors = [
    {
      level: '00',
      name: t('floors.groundFloor.name'),
      badge: t('floors.groundFloor.badge'),
      badgeColor: 'bg-terracotta',
      description: t('floors.groundFloor.description'),
      smoking: true,
      rooms: [
        { name: t('floors.groundFloor.rooms.room1.name'), detail: t('floors.groundFloor.rooms.room1.detail') },
        { name: t('floors.groundFloor.rooms.room2.name'), detail: t('floors.groundFloor.rooms.room2.detail') },
        { name: t('floors.groundFloor.rooms.room3.name'), detail: null },
        { name: t('floors.groundFloor.rooms.room4.name'), detail: t('floors.groundFloor.rooms.room4.detail') },
      ],
      image: '/images/Prizemlje/WhatsApp Image 2026-03-25 at 08.59.25 (1).jpeg',
      imageAlt: t('floors.groundFloor.imageAlt'),
    },
    {
      level: '01',
      name: t('floors.firstFloor.name'),
      badge: t('floors.firstFloor.badge'),
      badgeColor: 'bg-forest',
      description: t('floors.firstFloor.description'),
      smoking: false,
      rooms: [
        { name: t('floors.firstFloor.rooms.room1.name'), detail: t('floors.firstFloor.rooms.room1.detail') },
        { name: t('floors.firstFloor.rooms.room2.name'), detail: t('floors.firstFloor.rooms.room2.detail') },
        { name: t('floors.firstFloor.rooms.room3.name'), detail: t('floors.firstFloor.rooms.room3.detail') },
        { name: t('floors.firstFloor.rooms.room4.name'), detail: null },
      ],
      image: '/images/rooms/dnevni-boravak.jpg',
      imageAlt: t('floors.firstFloor.imageAlt'),
    },
    {
      level: '02',
      name: t('floors.attic.name'),
      badge: t('floors.attic.badge'),
      badgeColor: 'bg-oak',
      description: t('floors.attic.description'),
      smoking: false,
      rooms: [
        { name: t('floors.attic.rooms.room1.name'), detail: t('floors.attic.rooms.room1.detail') },
        { name: t('floors.attic.rooms.room2.name'), detail: t('floors.attic.rooms.room2.detail') },
        { name: t('floors.attic.rooms.room3.name'), detail: t('floors.attic.rooms.room3.detail') },
      ],
      image: '/images/rooms/spavaca-2b.jpg',
      imageAlt: t('floors.attic.imageAlt'),
    },
  ];

  return (
    <SectionWrapper id="raspored" bg="white">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
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
                  * {t('smokingNote')}
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
