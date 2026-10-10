import { CMS_MEDIA_BUCKET } from '../constants';

/** Public URL za CMS media — safe za client (nema next/cache / Supabase server). */
export function getCmsMediaPublicUrl(
  storagePath: string | null | undefined,
): string | null {
  if (!storagePath) return null;
  if (storagePath.startsWith('/') || storagePath.startsWith('http')) {
    return storagePath;
  }
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) return null;
  return `${baseUrl}/storage/v1/object/public/${CMS_MEDIA_BUCKET}/${encodeURIComponent(storagePath)}`;
}
