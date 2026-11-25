import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { CMS_MEDIA_BUCKET } from '@/modules/cms/constants';
import { buildVersionedMediaBase, listRelatedStoragePaths } from '@/lib/media-variants';
import {
  MEDIA_CACHE_CONTROL,
  optimizeImageVariants,
} from '@/lib/optimize-image';
import { buildPublicStorageUrl } from '@/lib/storage-public-url';

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);

const MAX_BYTES = 8 * 1024 * 1024;

/** POST multipart: file — upload naslovnice u cms-media (auto WebP thumb+large). */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Nedostaje datoteka.' }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: 'Dozvoljene su samo slike (JPEG, PNG, WebP, GIF, AVIF).' },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'Slika je prevelika (max 8 MB).' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = createServiceClient();
  const uploadedPaths: string[] = [];

  try {
    const variants = await optimizeImageVariants(buffer);
    const base = buildVersionedMediaBase('covers');
    const thumbPath = `${base}-thumb.webp`;
    const largePath = `${base}-large.webp`;

    const { error: thumbError } = await supabase.storage
      .from(CMS_MEDIA_BUCKET)
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
      .from(CMS_MEDIA_BUCKET)
      .upload(largePath, variants.largeWebp, {
        contentType: variants.largeContentType,
        cacheControl: MEDIA_CACHE_CONTROL,
        upsert: false,
      });
    if (largeError) {
      await supabase.storage.from(CMS_MEDIA_BUCKET).remove(uploadedPaths);
      return NextResponse.json({ error: largeError.message }, { status: 500 });
    }
    uploadedPaths.push(largePath);

    // Canonical = large (thumb se izvodi konvencijom).
    const storagePath = largePath;
    const publicUrl = buildPublicStorageUrl(CMS_MEDIA_BUCKET, storagePath);

    return NextResponse.json(
      {
        storage_path: storagePath,
        public_url: publicUrl,
      },
      { status: 201 },
    );
  } catch (err) {
    if (uploadedPaths.length > 0) {
      await supabase.storage.from(CMS_MEDIA_BUCKET).remove(uploadedPaths);
    }
    const message =
      err instanceof Error ? err.message : 'Optimizacija slike nije uspjela.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE JSON: { storage_path } — ukloni datoteku (+ thumb/large varijante) iz storagea. */
export async function DELETE(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { storage_path?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  const storagePath = body.storage_path?.trim();
  if (!storagePath || storagePath.startsWith('http') || storagePath.startsWith('/')) {
    return NextResponse.json({ error: 'Neispravan storage_path.' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const related = listRelatedStoragePaths(storagePath);
  const { error } = await supabase.storage.from(CMS_MEDIA_BUCKET).remove(related);

  if (error) {
    const { error: singleError } = await supabase.storage
      .from(CMS_MEDIA_BUCKET)
      .remove([storagePath]);
    if (singleError) {
      return NextResponse.json({ error: singleError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
