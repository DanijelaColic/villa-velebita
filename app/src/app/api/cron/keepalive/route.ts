import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/modules/booking-admin/lib/supabase';

/**
 * Vercel Cron: lagani SELECT prema Supabaseu da free projekt ne ode u pause.
 * Schedule: vercel.json → jednom dnevno (Hobby limit).
 *
 * Zaštita: Authorization: Bearer $CRON_SECRET
 * (Vercel šalje automatski ako je CRON_SECRET postavljen u project env.)
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const authHeader = request.headers.get('authorization');

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error, count } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      at: new Date().toISOString(),
      bookingsCount: count ?? null,
    });
  } catch (err) {
    console.error('[GET /api/cron/keepalive]', err);
    return NextResponse.json(
      { ok: false, error: 'Supabase keepalive failed' },
      { status: 500 },
    );
  }
}
