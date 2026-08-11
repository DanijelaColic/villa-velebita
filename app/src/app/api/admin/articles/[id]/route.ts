import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { CMS_LOCALES, CMS_MEDIA_BUCKET } from '@/modules/cms/constants';
import {
  parseArticleUpsertBody,
  resolvePublishedAt,
} from '@/modules/cms/lib/article-validation';
import type { ArticleWithTranslations } from '@/modules/cms/types';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*, translations:article_translations(*)')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Članak nije pronađen' }, { status: 404 });
  }

  return NextResponse.json(data as ArticleWithTranslations);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  const parsed = parseArticleUpsertBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = createServiceClient();

  const { data: existing, error: existingError } = await supabase
    .from('articles')
    .select('id, published_at')
    .eq('id', id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json({ error: 'Članak nije pronađen' }, { status: 404 });
  }

  const publishedAt = resolvePublishedAt(
    input.status,
    existing.published_at,
    input.published_at,
  );

  const articleUpdate: Record<string, unknown> = {
    slug: input.slug,
    status: input.status,
    published_at: publishedAt,
  };
  if (input.cover_path !== undefined) {
    articleUpdate.cover_path = input.cover_path;
  }

  const { data: article, error: updateError } = await supabase
    .from('articles')
    .update(articleUpdate)
    .eq('id', id)
    .select('*')
    .single();

  if (updateError) {
    const isDuplicate = updateError.code === '23505';
    return NextResponse.json(
      {
        error: isDuplicate
          ? 'Članak s tim slugom već postoji.'
          : updateError.message,
      },
      { status: isDuplicate ? 409 : 500 },
    );
  }

  for (const locale of CMS_LOCALES) {
    const t = input.translations.find((item) => item.locale === locale);
    const row = {
      article_id: id,
      locale,
      title: t?.title ?? '',
      excerpt: t?.excerpt ?? '',
      content: t?.content ?? null,
      seo_title: t?.seo_title ?? null,
      seo_description: t?.seo_description ?? null,
    };

    const { error: upsertError } = await supabase
      .from('article_translations')
      .upsert(row, { onConflict: 'article_id,locale' });

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }
  }

  const { data: translations, error: translationsError } = await supabase
    .from('article_translations')
    .select('*')
    .eq('article_id', id);

  if (translationsError) {
    return NextResponse.json({ error: translationsError.message }, { status: 500 });
  }

  const result: ArticleWithTranslations = {
    ...article,
    translations: translations ?? [],
  };

  return NextResponse.json(result);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createServiceClient();

  const { data: existing, error: existingError } = await supabase
    .from('articles')
    .select('id, cover_path')
    .eq('id', id)
    .single();

  if (existingError || !existing) {
    return NextResponse.json({ error: 'Članak nije pronađen' }, { status: 404 });
  }

  const { error: deleteError } = await supabase.from('articles').delete().eq('id', id);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // Obriši naslovnicu iz storagea (ako je CMS upload)
  if (
    existing.cover_path &&
    !existing.cover_path.startsWith('/') &&
    !existing.cover_path.startsWith('http')
  ) {
    await supabase.storage.from(CMS_MEDIA_BUCKET).remove([existing.cover_path]);
  }

  return NextResponse.json({ success: true });
}
