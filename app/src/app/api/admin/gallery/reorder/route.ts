import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as { ids?: string[] };
  const ids = body.ids ?? [];

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'Missing ids' }, { status: 400 });
  }

  const supabase = createServiceClient();

  for (let index = 0; index < ids.length; index += 1) {
    const { error } = await supabase
      .from('gallery_items')
      .update({ sort_order: index })
      .eq('id', ids[index]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
