import { getGallerySections } from '@/lib/gallery-sections';
import { GalleryClient } from './GalleryClient';

export function Gallery() {
  const sections = getGallerySections();
  return <GalleryClient sections={sections} />;
}
