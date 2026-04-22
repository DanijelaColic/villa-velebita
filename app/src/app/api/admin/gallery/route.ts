import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { GALLERY_BUCKET } from '@/lib/gallery';
import {
  DEFAULT_GALLERY_CATEGORY,
  isGalleryCategoryKey,
} from '@/lib/gallery-categories';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';

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
  if (!isAdminAuthenticatedFromRequest(request)) {
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
  if (!isAdminAuthenticatedFromRequest(request)) {
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
    const extension = getFileExtension(file.name);
    const storagePath = `${Date.now()}-${crypto.randomUUID()}${extension ? `.${extension}` : ''}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(GALLERY_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const mediaType = getMediaType(file.type);
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
      await supabase.storage.from(GALLERY_BUCKET).remove([storagePath]);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    insertedRows.push(inserted);
    nextSortOrder += 1;
  }

  return NextResponse.json(insertedRows, { status: 201 });
}
