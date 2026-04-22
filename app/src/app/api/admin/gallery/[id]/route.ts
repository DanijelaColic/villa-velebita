import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { GALLERY_BUCKET } from '@/lib/gallery';
import { isGalleryCategoryKey } from '@/lib/gallery-categories';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as {
    alt_text?: string | null;
    title?: string | null;
    category_key?: string;
    sort_order?: number;
  };

  const updates: Record<string, string | number | null> = {};
  if ('alt_text' in body) updates.alt_text = body.alt_text?.trim() || null;
  if ('title' in body) updates.title = body.title?.trim() || null;
  if (typeof body.category_key === 'string' && isGalleryCategoryKey(body.category_key)) {
    updates.category_key = body.category_key;
  }
  if (typeof body.sort_order === 'number') updates.sort_order = body.sort_order;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No updates provided' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('gallery_items')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: existing, error: existingError } = await supabase
    .from('gallery_items')
    .select('id, storage_path')
    .eq('id', id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  const { error: storageError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .remove([existing.storage_path]);

  if (storageError) return NextResponse.json({ error: storageError.message }, { status: 500 });

  const { error: deleteError } = await supabase.from('gallery_items').delete().eq('id', id);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
