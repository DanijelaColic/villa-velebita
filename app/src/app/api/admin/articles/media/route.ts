import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { CMS_MEDIA_BUCKET } from '@/modules/cms/constants';

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);

const MAX_BYTES = 8 * 1024 * 1024;

function getExtension(fileName: string) {
  const parts = fileName.split('.');
  if (parts.length < 2) return '';
  return parts.at(-1)?.toLowerCase() ?? '';
}

/** POST multipart: file — upload naslovnice u cms-media. */
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

  const extension = getExtension(file.name);
  const storagePath = `covers/${Date.now()}-${crypto.randomUUID()}${
    extension ? `.${extension}` : ''
  }`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = createServiceClient();

  const { error: uploadError } = await supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from(CMS_MEDIA_BUCKET)
    .getPublicUrl(storagePath);

  return NextResponse.json(
    {
      storage_path: storagePath,
      public_url: urlData.publicUrl,
    },
    { status: 201 },
  );
}

/** DELETE JSON: { storage_path } — ukloni datoteku iz storagea. */
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
  const { error } = await supabase.storage.from(CMS_MEDIA_BUCKET).remove([storagePath]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
