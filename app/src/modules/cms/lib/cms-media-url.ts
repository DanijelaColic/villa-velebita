import { CMS_MEDIA_BUCKET } from '../constants';
import {
  getMediaVariantPath,
  type MediaVariant,
} from '@/lib/media-variants';
import { buildPublicStorageUrl } from '@/lib/storage-public-url';

/** Public URL za CMS media — safe za client (nema next/cache / Supabase server). */
export function getCmsMediaPublicUrl(
  storagePath: string | null | undefined,
  variant: MediaVariant = 'original',
): string | null {
  if (!storagePath) return null;
  if (storagePath.startsWith('/') || storagePath.startsWith('http')) {
    return storagePath;
  }
  const path =
    variant === 'original'
      ? storagePath
      : getMediaVariantPath(storagePath, variant);
  const url = buildPublicStorageUrl(CMS_MEDIA_BUCKET, path);
  return url || null;
}

export function getCmsMediaThumbUrl(storagePath: string | null | undefined) {
  return getCmsMediaPublicUrl(storagePath, 'thumb');
}

export function getCmsMediaLargeUrl(storagePath: string | null | undefined) {
  return getCmsMediaPublicUrl(storagePath, 'large');
}
