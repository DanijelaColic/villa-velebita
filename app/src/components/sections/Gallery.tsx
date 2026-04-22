import { getGalleryItems, getPublicMediaUrl } from '@/lib/gallery';
import { GALLERY_CATEGORIES, getGalleryCategoryLabel } from '@/lib/gallery-categories';
import { getTranslations } from 'next-intl/server';
import { GalleryClient } from './GalleryClient';

export async function Gallery() {
  const t = await getTranslations('gallerySection');
  const items = await getGalleryItems();
  const sections = GALLERY_CATEGORIES.map((category) => {
    const mediaInCategory = items.filter((item) => item.category_key === category.key);
    return {
      id: category.key,
      title: getGalleryCategoryLabel(category.key),
      description: '',
      media: mediaInCategory.map((item, index) => ({
        src: getPublicMediaUrl(item.storage_path),
        type: item.media_type,
        alt: item.alt_text || `${getGalleryCategoryLabel(category.key)} ${index + 1}`,
        caption: item.title || item.alt_text || getGalleryCategoryLabel(category.key),
      })),
    };
  }).filter((section) => section.media.length > 0);

  return <GalleryClient sections={sections} />;
}
