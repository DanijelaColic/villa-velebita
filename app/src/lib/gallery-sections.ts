import fs from 'node:fs';
import path from 'node:path';
import type { GallerySection } from '@/components/sections/GalleryClient';

const mediaExtensions = /\.(jpe?g|png|webp|gif|avif|mp4|webm|mov)$/i;
const videoExtensions = /\.(mp4|webm|mov)$/i;

export type GallerySectionMeta = {
  id: string;
  folder: string;
  title: string;
  description: string;
};

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

/** Učitava sve sekcije galerije s diska (isto kao prije refaktora u Gallery.tsx). */
export function getGallerySections(sectionMeta: GallerySectionMeta[]): GallerySection[] {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'gallery');

  return sectionMeta.map(section => {
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
}
