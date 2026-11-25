import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { GALLERY_BUCKET } from '@/lib/gallery';
import {
  DEFAULT_GALLERY_CATEGORY,
  isGalleryCategoryKey,
} from '@/lib/gallery-categories';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { CMS_CACHE_TAGS } from '@/modules/cms/lib/cache-tags';
import { revalidateCmsTag } from '@/modules/cms/lib/cache-revalidate';
import { buildVersionedMediaBase } from '@/lib/media-variants';
import {
  MEDIA_CACHE_CONTROL,
  optimizeImageVariants,
} from '@/lib/optimize-image';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

function getFileExtension(fileName: string) {
  const split = fileName.split('.');
  if (split.length < 2) return '';
  return split.at(-1)?.toLowerCase() ?? '';
}

function getMediaType(mimeType: string): 'image' | 'video' {
  return mimeType.startsWith('video/') ? 'video' : 'image';
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll('files').filter(item => item instanceof File) as File[];
  const altText = (formData.get('alt_text') as string | null)?.trim() ?? null;
  const title = (formData.get('title') as string | null)?.trim() ?? null;
  const categoryKeyInput = (formData.get('category_key') as string | null)?.trim() ?? '';
  const categoryKey = isGalleryCategoryKey(categoryKeyInput)
    ? categoryKeyInput
    : DEFAULT_GALLERY_CATEGORY;

  if (files.length === 0) {
    return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
  }

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || file.name}` },
        { status: 400 },
      );
    }
  }

  const supabase = createServiceClient();
  const { data: maxSortRows, error: sortError } = await supabase
    .from('gallery_items')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1);

  if (sortError) return NextResponse.json({ error: sortError.message }, { status: 500 });

  let nextSortOrder = (maxSortRows?.[0]?.sort_order ?? -1) + 1;
  const insertedRows = [];

  for (const file of files) {
    const mediaType = getMediaType(file.type);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadedPaths: string[] = [];

    let storagePath: string;

    try {
      if (mediaType === 'image') {
        // Automatska optimizacija — klijent ne mora ništa ručno raditi.
        const variants = await optimizeImageVariants(fileBuffer);
        const base = buildVersionedMediaBase('opt');
        const thumbPath = `${base}-thumb.webp`;
        const largePath = `${base}-large.webp`;

        const { error: thumbError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(thumbPath, variants.thumbWebp, {
            contentType: variants.thumbContentType,
            cacheControl: MEDIA_CACHE_CONTROL,
            upsert: false,
          });
        if (thumbError) {
          return NextResponse.json({ error: thumbError.message }, { status: 500 });
        }
        uploadedPaths.push(thumbPath);

        const { error: largeError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(largePath, variants.largeWebp, {
            contentType: variants.largeContentType,
            cacheControl: MEDIA_CACHE_CONTROL,
            upsert: false,
          });
        if (largeError) {
          await supabase.storage.from(GALLERY_BUCKET).remove(uploadedPaths);
          return NextResponse.json({ error: largeError.message }, { status: 500 });
        }
        uploadedPaths.push(largePath);

        // Canonical path = large (thumb/large se izvode konvencijom).
        storagePath = largePath;
      } else {
        const extension = getFileExtension(file.name);
        storagePath = `${Date.now()}-${crypto.randomUUID()}${
          extension ? `.${extension}` : ''
        }`;
        const { error: uploadError } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(storagePath, fileBuffer, {
            contentType: file.type,
            cacheControl: MEDIA_CACHE_CONTROL,
            upsert: false,
          });
        if (uploadError) {
          return NextResponse.json({ error: uploadError.message }, { status: 500 });
        }
        uploadedPaths.push(storagePath);
      }
    } catch (err) {
      if (uploadedPaths.length > 0) {
        await supabase.storage.from(GALLERY_BUCKET).remove(uploadedPaths);
      }
      const message =
        err instanceof Error ? err.message : 'Optimizacija slike nije uspjela.';
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const fallbackAlt = `${mediaType === 'video' ? 'Video' : 'Image'} ${nextSortOrder + 1}`;

    const { data: inserted, error: insertError } = await supabase
      .from('gallery_items')
      .insert({
        storage_path: storagePath,
        category_key: categoryKey,
        media_type: mediaType,
        alt_text: altText || fallbackAlt,
        title: title || null,
        sort_order: nextSortOrder,
      })
      .select('*')
      .single();

    if (insertError) {
      await supabase.storage.from(GALLERY_BUCKET).remove(uploadedPaths);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    insertedRows.push(inserted);
    nextSortOrder += 1;
  }

  revalidateCmsTag(CMS_CACHE_TAGS.gallery);
  return NextResponse.json(insertedRows, { status: 201 });
}
