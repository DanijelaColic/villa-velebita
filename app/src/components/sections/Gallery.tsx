import {
  getGalleryItems,
  getGalleryLargeUrl,
  getGalleryThumbUrl,
  getPublicMediaUrl,
} from '@/lib/gallery';
import { GALLERY_CATEGORIES, getGalleryCategoryLabel } from '@/lib/gallery-categories';
import { GalleryClient } from './GalleryClient';

export async function Gallery() {
  const items = await getGalleryItems();
  const sections = GALLERY_CATEGORIES.map((category) => {
    const mediaInCategory = items.filter((item) => item.category_key === category.key);
    return {
      id: category.key,
      title: getGalleryCategoryLabel(category.key),
      description: '',
      media: mediaInCategory.map((item, index) => {
        const originalSrc = getPublicMediaUrl(item.storage_path);
        const isVideo = item.media_type === 'video';
        return {
          // Grid: thumb; lightbox: large; video: original path.
          thumbSrc: isVideo ? originalSrc : getGalleryThumbUrl(item.storage_path),
          largeSrc: isVideo ? originalSrc : getGalleryLargeUrl(item.storage_path),
          fallbackSrc: originalSrc,
          type: item.media_type,
          alt: item.alt_text || `${getGalleryCategoryLabel(category.key)} ${index + 1}`,
          caption: item.title || item.alt_text || getGalleryCategoryLabel(category.key),
        };
      }),
    };
  }).filter((section) => section.media.length > 0);

  return <GalleryClient sections={sections} />;
}
