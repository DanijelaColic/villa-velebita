import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase';
import type { GalleryCategoryKey } from '@/lib/gallery-categories';
import {
  CMS_CACHE_REVALIDATE_SECONDS,
  CMS_CACHE_TAGS,
} from '@/modules/cms/lib/cache-tags';
import {
  getMediaVariantPath,
  type MediaVariant,
} from '@/lib/media-variants';
import { buildPublicStorageUrl } from '@/lib/storage-public-url';

export type GalleryItem = {
  id: string;
  storage_path: string;
  category_key: GalleryCategoryKey;
  alt_text: string | null;
  title: string | null;
  media_type: 'image' | 'video';
  sort_order: number;
  created_at: string;
};

export const GALLERY_BUCKET = 'gallery-media';

async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to fetch gallery items:', error.message);
    return [];
  }

  return (data ?? []) as GalleryItem[];
}

const loadGalleryItems = unstable_cache(
  async () => fetchGalleryItems(),
  ['cms-gallery-items'],
  {
    tags: [CMS_CACHE_TAGS.gallery],
    revalidate: CMS_CACHE_REVALIDATE_SECONDS,
  },
);

// React.cache (request) + unstable_cache (cross-request).
export const getGalleryItems = cache(async function getGalleryItems(): Promise<
  GalleryItem[]
> {
  return loadGalleryItems();
});

export function getPublicMediaUrl(
  storagePath: string,
  variant: MediaVariant = 'original',
) {
  const path =
    variant === 'original'
      ? storagePath
      : getMediaVariantPath(storagePath, variant);
  return buildPublicStorageUrl(GALLERY_BUCKET, path);
}

/** Thumb za grid/teaser; fallback original dok migracija nije gotova (UI onError). */
export function getGalleryThumbUrl(storagePath: string) {
  return getPublicMediaUrl(storagePath, 'thumb');
}

/** Large za lightbox / full view. */
export function getGalleryLargeUrl(storagePath: string) {
  return getPublicMediaUrl(storagePath, 'large');
}

/**
 * Sitemap: samo URL koji sigurno postoji na Storageu.
 * - Novi upload (`…-large.webp`): thumb je uploadan uz large → thumb URL.
 * - Legacy original (`…jpg`): thumb još ne postoji → original URL.
 */
export function getGallerySitemapImageUrl(storagePath: string) {
  if (/-large\.webp$/i.test(storagePath) || /-thumb\.webp$/i.test(storagePath)) {
    return getGalleryThumbUrl(storagePath);
  }
  return getPublicMediaUrl(storagePath);
}
