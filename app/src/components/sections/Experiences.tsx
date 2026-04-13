import fs from 'node:fs';
import path from 'node:path';
import { getTranslations } from 'next-intl/server';
import { ExperiencesClient, type ExperienceCategory } from './ExperiencesClient';

type CategoryWithFolder = Omit<ExperienceCategory, 'images'> & {
  folder: string;
};

export async function Experiences() {
  const t = await getTranslations('experiencesSection');
  const basePublicDir = path.join(process.cwd(), 'public', 'images', 'experiences');
  const categories: CategoryWithFolder[] = [
    {
      id: 'priroda',
      label: t('categories.nature.label'),
      color: 'bg-forest',
      title: t('categories.nature.title'),
      intro: t('categories.nature.intro'),
      imageAlt: t('categories.nature.imageAlt'),
      folder: 'netaknuta-licka-divljina',
      activities: [
        { name: t('categories.nature.activities.i1.name'), distance: t('categories.nature.activities.i1.distance'), highlight: true },
        { name: t('categories.nature.activities.i2.name'), distance: t('categories.nature.activities.i2.distance') },
        { name: t('categories.nature.activities.i3.name'), distance: t('categories.nature.activities.i3.distance') },
        { name: t('categories.nature.activities.i4.name'), distance: t('categories.nature.activities.i4.distance') },
        { name: t('categories.nature.activities.i5.name'), distance: t('categories.nature.activities.i5.distance') },
        { name: t('categories.nature.activities.i6.name'), distance: t('categories.nature.activities.i6.distance') },
      ],
    },
    {
      id: 'aktivnosti',
      label: t('categories.activities.label'),
      color: 'bg-terracotta',
      title: t('categories.activities.title'),
      intro: t('categories.activities.intro'),
      imageAlt: t('categories.activities.imageAlt'),
      folder: 'adrenalin-i-avantura',
      activities: [
        { name: t('categories.activities.activities.i1.name'), distance: t('categories.activities.activities.i1.distance'), highlight: true },
        { name: t('categories.activities.activities.i2.name'), distance: t('categories.activities.activities.i2.distance') },
        { name: t('categories.activities.activities.i3.name'), distance: t('categories.activities.activities.i3.distance') },
        { name: t('categories.activities.activities.i4.name'), distance: t('categories.activities.activities.i4.distance') },
        { name: t('categories.activities.activities.i5.name'), distance: t('categories.activities.activities.i5.distance') },
        { name: t('categories.activities.activities.i6.name'), distance: t('categories.activities.activities.i6.distance') },
      ],
    },
    {
      id: 'gastronomija',
      label: t('categories.gastronomy.label'),
      color: 'bg-gold',
      title: t('categories.gastronomy.title'),
      intro: t('categories.gastronomy.intro'),
      imageAlt: t('categories.gastronomy.imageAlt'),
      folder: 'okusi-like',
      activities: [
        { name: t('categories.gastronomy.activities.i1.name'), distance: t('categories.gastronomy.activities.i1.distance'), highlight: true },
        { name: t('categories.gastronomy.activities.i2.name'), distance: t('categories.gastronomy.activities.i2.distance') },
        { name: t('categories.gastronomy.activities.i3.name'), distance: t('categories.gastronomy.activities.i3.distance') },
        { name: t('categories.gastronomy.activities.i4.name'), distance: t('categories.gastronomy.activities.i4.distance') },
        { name: t('categories.gastronomy.activities.i5.name'), distance: t('categories.gastronomy.activities.i5.distance') },
        { name: t('categories.gastronomy.activities.i6.name'), distance: t('categories.gastronomy.activities.i6.distance') },
      ],
    },
    {
      id: 'izleti',
      label: t('categories.trips.label'),
      color: 'bg-oak',
      title: t('categories.trips.title'),
      intro: t('categories.trips.intro'),
      imageAlt: t('categories.trips.imageAlt'),
      folder: 'sve-sto-vrijedi-vidjeti',
      activities: [
        { name: t('categories.trips.activities.i1.name'), distance: t('categories.trips.activities.i1.distance'), highlight: true },
        { name: t('categories.trips.activities.i2.name'), distance: t('categories.trips.activities.i2.distance') },
        { name: t('categories.trips.activities.i3.name'), distance: t('categories.trips.activities.i3.distance') },
        { name: t('categories.trips.activities.i4.name'), distance: t('categories.trips.activities.i4.distance') },
        { name: t('categories.trips.activities.i5.name'), distance: t('categories.trips.activities.i5.distance') },
        { name: t('categories.trips.activities.i6.name'), distance: t('categories.trips.activities.i6.distance') },
      ],
    },
  ];

  const categoriesWithImages: ExperienceCategory[] = categories.map(cat => {
    const diskDir = path.join(basePublicDir, cat.folder);
    let files: string[] = [];

    try {
      files = fs
        .readdirSync(diskDir, { withFileTypes: true })
        .filter(d => d.isFile())
        .map(d => d.name)
        .filter(name => /\.(jpe?g|png|webp|gif|avif)$/i.test(name))
        .sort((a, b) => a.localeCompare(b, 'hr'));
    } catch {
      files = [];
    }

    const coverIdx = files.findIndex(f => /^cover\./i.test(f));
    if (coverIdx > 0) {
      const [cover] = files.splice(coverIdx, 1);
      files.unshift(cover);
    }

    const images = files.map(file => `/images/experiences/${cat.folder}/${file}`);

    return {
      id: cat.id,
      label: cat.label,
      color: cat.color,
      title: cat.title,
      intro: cat.intro,
      imageAlt: cat.imageAlt,
      images,
      activities: cat.activities,
    };
  });

  return <ExperiencesClient categories={categoriesWithImages} />;
}
