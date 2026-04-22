import { createServiceClient } from '@/lib/supabase';
import type { GalleryCategoryKey } from '@/lib/gallery-categories';

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

export async function getGalleryItems(): Promise<GalleryItem[]> {
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

export function getPublicMediaUrl(storagePath: string) {
  const supabase = createServiceClient();
  const { data } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}
