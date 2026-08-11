import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { CMS_LOCALES } from '@/modules/cms/constants';
import {
  parseArticleUpsertBody,
  resolvePublishedAt,
} from '@/modules/cms/lib/article-validation';
import type { ArticleWithTranslations } from '@/modules/cms/types';

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*, translations:article_translations(*)')
    .order('updated_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []) as ArticleWithTranslations[]);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticatedFromRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
  const publishedAt = resolvePublishedAt(input.status, null, input.published_at);

  const { data: article, error: insertError } = await supabase
    .from('articles')
    .insert({
      slug: input.slug,
      status: input.status,
      cover_path: input.cover_path ?? null,
      published_at: publishedAt,
    })
    .select('*')
    .single();

  if (insertError) {
    const isDuplicate = insertError.code === '23505';
    return NextResponse.json(
      {
        error: isDuplicate
          ? 'Članak s tim slugom već postoji.'
          : insertError.message,
      },
      { status: isDuplicate ? 409 : 500 },
    );
  }

  const translationRows = CMS_LOCALES.map((locale) => {
    const t = input.translations.find((item) => item.locale === locale);
    return {
      article_id: article.id,
      locale,
      title: t?.title ?? '',
      excerpt: t?.excerpt ?? '',
      content: t?.content ?? null,
      seo_title: t?.seo_title ?? null,
      seo_description: t?.seo_description ?? null,
    };
  });

  const { data: translations, error: translationError } = await supabase
    .from('article_translations')
    .insert(translationRows)
    .select('*');

  if (translationError) {
    await supabase.from('articles').delete().eq('id', article.id);
    return NextResponse.json({ error: translationError.message }, { status: 500 });
  }

  const result: ArticleWithTranslations = {
    ...article,
    translations: translations ?? [],
  };

  return NextResponse.json(result, { status: 201 });
}
