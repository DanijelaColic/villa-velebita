import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import {
  CMS_LOCALES,
  EDITABLE_SITE_TEXT_KEY_SET,
} from '@/modules/cms/constants';
import { getSiteTextsForAdmin } from '@/modules/cms/lib/get-site-texts';
import type { AppLocale } from '@/i18n/routing';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rows = await getSiteTextsForAdmin();
    return NextResponse.json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Greška pri učitavanju.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

type UpsertItem = { key: string; locale: string; value: string };

/** PUT body: { items: [{ key, locale, value }] } — upsert ili brisanje praznih. */
export async function PUT(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { items?: UpsertItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: 'Nedostaje items[].' }, { status: 400 });
  }

  const supabase = createServiceClient();
  const toUpsert: Array<{ key: string; locale: AppLocale; value: string }> = [];
  const toDelete: Array<{ key: string; locale: AppLocale }> = [];

  for (const item of body.items) {
    if (!item || typeof item !== 'object') {
      return NextResponse.json({ error: 'Neispravan item.' }, { status: 400 });
    }
    const key = typeof item.key === 'string' ? item.key : '';
    const locale = typeof item.locale === 'string' ? item.locale : '';
    const value = typeof item.value === 'string' ? item.value : '';

    if (!EDITABLE_SITE_TEXT_KEY_SET.has(key)) {
      return NextResponse.json({ error: `Ključ nije dozvoljen: ${key}` }, { status: 400 });
    }
    if (!(CMS_LOCALES as readonly string[]).includes(locale)) {
      return NextResponse.json({ error: `Nepoznat jezik: ${locale}` }, { status: 400 });
    }

    const appLocale = locale as AppLocale;
    if (value.trim() === '') {
      toDelete.push({ key, locale: appLocale });
    } else {
      toUpsert.push({ key, locale: appLocale, value });
    }
  }

  if (toUpsert.length > 0) {
    const { error } = await supabase.from('site_texts').upsert(toUpsert, {
      onConflict: 'key,locale',
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  for (const row of toDelete) {
    const { error } = await supabase
      .from('site_texts')
      .delete()
      .eq('key', row.key)
      .eq('locale', row.locale);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const rows = await getSiteTextsForAdmin();
  return NextResponse.json(rows);
}
