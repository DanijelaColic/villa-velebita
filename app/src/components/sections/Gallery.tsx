import fs from 'node:fs';
import path from 'node:path';
import { GalleryClient, type GallerySection } from './GalleryClient';

const mediaExtensions = /\.(jpe?g|png|webp|gif|avif|mp4|webm|mov)$/i;
const videoExtensions = /\.(mp4|webm|mov)$/i;

const sectionMeta = [
  {
    id: 'kuca-ulaz',
    folder: '01-kuca-i-ulaz',
    title: '1) Kuca i ulaz',
    description: 'Prvi dojam dolaska u Villa Velebita.',
  },
  {
    id: 'prizemlje',
    folder: '02-prizemlje-priprema-obroka-i-druzenje',
    title: '2) Prizemlje: priprema obroka i druzenje',
    description: 'Prostor za kuhanje, objed i zajednicke trenutke.',
  },
  {
    id: 'kat-opustanje',
    folder: '03-kat-za-opustanje',
    title: '3) Kat za opustanje',
    description: 'Sobe i kutci namijenjeni mirnom odmoru.',
  },
  {
    id: 'potkrovlje',
    folder: '04-potkrovlje-pogledi-izlasci-zalasci',
    title: '4) Potkrovlje: odmor duse i pogledi',
    description: 'Toplina potkrovlja uz poglede na izlaske i zalaske sunca.',
  },
  {
    id: 'vanjska-sjenica',
    folder: '05-vanjska-sjenica-druzenje',
    title: '5) Vanjska sjenica za nezaboravno druzenje',
    description: 'Vanjski kutak za opustanje i vecernja druzenja.',
  },
  {
    id: 'pogledi-priroda',
    folder: '07-pogledi-i-priroda',
    title: '7) Pogledi i priroda',
    description: 'Zavrsne fotografije prirode i ambijenta Like.',
  },
] as const;

function fileSort(a: string, b: string) {
  const aCover = /^cover\./i.test(a);
  const bCover = /^cover\./i.test(b);
  if (aCover && !bCover) return -1;
  if (!aCover && bCover) return 1;

  const aNum = Number.parseInt(a, 10);
  const bNum = Number.parseInt(b, 10);
  const aIsNum = Number.isFinite(aNum);
  const bIsNum = Number.isFinite(bNum);
  if (aIsNum && bIsNum) return aNum - bNum;
  if (aIsNum && !bIsNum) return -1;
  if (!aIsNum && bIsNum) return 1;

  return a.localeCompare(b, 'hr');
}

export function Gallery() {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'gallery');

  const sections: GallerySection[] = sectionMeta.map(section => {
    const diskDir = path.join(baseDir, section.folder);
    let files: string[] = [];

    try {
      files = fs
        .readdirSync(diskDir, { withFileTypes: true })
        .filter(entry => entry.isFile())
        .map(entry => entry.name)
        .filter(name => mediaExtensions.test(name))
        .sort(fileSort);
    } catch {
      files = [];
    }

    const media = files.map((file, index) => ({
      src: `/images/gallery/${section.folder}/${encodeURIComponent(file)}`,
      type: videoExtensions.test(file) ? ('video' as const) : ('image' as const),
      alt: `${section.title} ${index + 1}`,
      caption: section.title,
    }));

    return {
      id: section.id,
      title: section.title,
      description: section.description,
      media,
    };
  });

  return <GalleryClient sections={sections} />;
}
