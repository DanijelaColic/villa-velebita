import { getGallerySections } from '@/lib/gallery-sections';
import { getTranslations } from 'next-intl/server';
import { GalleryClient } from './GalleryClient';

export async function Gallery() {
  const t = await getTranslations('gallerySection');
  const sections = getGallerySections([
    {
      id: 'kuca-ulaz',
      folder: '01-kuca-i-ulaz',
      title: t('sections.houseEntrance.title'),
      description: t('sections.houseEntrance.description'),
    },
    {
      id: 'prizemlje',
      folder: '02-prizemlje-priprema-obroka-i-druzenje',
      title: t('sections.groundFloor.title'),
      description: t('sections.groundFloor.description'),
    },
    {
      id: 'kat-opustanje',
      folder: '03-kat-za-opustanje',
      title: t('sections.floorRelax.title'),
      description: t('sections.floorRelax.description'),
    },
    {
      id: 'potkrovlje',
      folder: '04-potkrovlje-pogledi-izlasci-zalasci',
      title: t('sections.attic.title'),
      description: t('sections.attic.description'),
    },
    {
      id: 'vanjska-sjenica',
      folder: '05-vanjska-sjenica-druzenje',
      title: t('sections.gazebo.title'),
      description: t('sections.gazebo.description'),
    },
    {
      id: 'pogledi-priroda',
      folder: '07-pogledi-i-priroda',
      title: t('sections.nature.title'),
      description: t('sections.nature.description'),
    },
  ]);

  return <GalleryClient sections={sections} />;
}
