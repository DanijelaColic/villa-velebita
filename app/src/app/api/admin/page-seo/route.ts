import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import {
  CMS_LOCALES,
  EDITABLE_PAGE_SEO_KEY_SET,
} from '@/modules/cms/constants';
import { getPageSeoForAdmin } from '@/modules/cms/lib/get-page-seo';
import type { AppLocale } from '@/i18n/routing';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const rows = await getPageSeoForAdmin();
    return NextResponse.json(rows);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Greška pri učitavanju.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

type UpsertItem = {
  page_key: string;
  locale: string;
  title?: string | null;
  description?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image_alt?: string | null;
};

function clean(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

/** PUT body: { items: [...] } — upsert; sva prazna polja → delete reda. */
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

  for (const item of body.items) {
    if (!item || typeof item !== 'object') {
      return NextResponse.json({ error: 'Neispravan item.' }, { status: 400 });
    }

    const pageKey = typeof item.page_key === 'string' ? item.page_key : '';
    const locale = typeof item.locale === 'string' ? item.locale : '';

    if (!EDITABLE_PAGE_SEO_KEY_SET.has(pageKey)) {
      return NextResponse.json(
        { error: `Stranica nije dozvoljena: ${pageKey}` },
        { status: 400 },
      );
    }
    if (!(CMS_LOCALES as readonly string[]).includes(locale)) {
      return NextResponse.json({ error: `Nepoznat jezik: ${locale}` }, { status: 400 });
    }

    const appLocale = locale as AppLocale;
    const row = {
      page_key: pageKey,
      locale: appLocale,
      title: clean(item.title),
      description: clean(item.description),
      og_title: clean(item.og_title),
      og_description: clean(item.og_description),
      og_image_alt: clean(item.og_image_alt),
    };

    const allEmpty =
      !row.title &&
      !row.description &&
      !row.og_title &&
      !row.og_description &&
      !row.og_image_alt;

    if (allEmpty) {
      const { error } = await supabase
        .from('page_seo')
        .delete()
        .eq('page_key', pageKey)
        .eq('locale', appLocale);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      const { error } = await supabase.from('page_seo').upsert(row, {
        onConflict: 'page_key,locale',
      });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
  }

  const rows = await getPageSeoForAdmin();
  return NextResponse.json(rows);
}
