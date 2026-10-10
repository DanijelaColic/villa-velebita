import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase';
import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import type {
  ArticleListItem,
  PublicArticle,
  TipTapDoc,
} from '../types';
import {
  CMS_CACHE_REVALIDATE_SECONDS,
  CMS_CACHE_TAGS,
} from './cache-tags';

export { getCmsMediaPublicUrl } from './cms-media-url';

function normalizeLocale(locale: string): AppLocale {
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as AppLocale)
    : routing.defaultLocale;
}

type ArticleRow = {
  id: string;
  slug: string;
  status: string;
  cover_path: string | null;
  published_at: string | null;
  updated_at: string;
  translations: Array<{
    locale: string;
    title: string;
    excerpt: string;
    content: TipTapDoc | null;
    seo_title: string | null;
    seo_description: string | null;
  }> | null;
};

function pickTranslation(
  translations: ArticleRow['translations'],
  locale: AppLocale,
) {
  const list = translations ?? [];
  const preferred = list.find((t) => t.locale === locale && t.title.trim());
  if (preferred) return { ...preferred, locale: locale as AppLocale };

  const hr = list.find((t) => t.locale === 'hr' && t.title.trim());
  if (hr) return { ...hr, locale: 'hr' as AppLocale };

  const any = list.find((t) => t.title.trim());
  if (any) return { ...any, locale: any.locale as AppLocale };

  return null;
}

async function fetchPublishedArticles(
  locale: AppLocale,
): Promise<ArticleListItem[]> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('articles')
    .select(
      'id, slug, status, cover_path, published_at, updated_at, translations:article_translations(locale, title, excerpt, content, seo_title, seo_description)',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch articles:', error.message);
    return [];
  }

  const rows = (data ?? []) as ArticleRow[];

  return rows
    .map((row) => {
      const translation = pickTranslation(row.translations, locale);
      if (!translation) return null;
      return {
        id: row.id,
        slug: row.slug,
        published_at: row.published_at,
        cover_path: row.cover_path,
        title: translation.title,
        excerpt: translation.excerpt,
      } satisfies ArticleListItem;
    })
    .filter((item): item is ArticleListItem => item !== null);
}

const loadPublishedArticles = unstable_cache(
  async (locale: AppLocale) => fetchPublishedArticles(locale),
  ['cms-published-articles'],
  {
    tags: [CMS_CACHE_TAGS.articles],
    revalidate: CMS_CACHE_REVALIDATE_SECONDS,
  },
);

/** Objavljeni članci za listu (locale + HR fallback naslova). */
export const getPublishedArticles = cache(
  async function getPublishedArticles(
    locale: string,
  ): Promise<ArticleListItem[]> {
    return loadPublishedArticles(normalizeLocale(locale));
  },
);

/** Jedan članak po slug + locale (fallback na HR). */
export async function getArticleBySlug(
  locale: string,
  slug: string,
  options?: { includeDraft?: boolean },
): Promise<(PublicArticle & { status: 'draft' | 'published' }) | null> {
  const appLocale = normalizeLocale(locale);
  const supabase = createServiceClient();

  let query = supabase
    .from('articles')
    .select(
      'id, slug, status, cover_path, published_at, updated_at, translations:article_translations(locale, title, excerpt, content, seo_title, seo_description)',
    )
    .eq('slug', slug);

  if (!options?.includeDraft) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('Failed to fetch article:', error.message);
    return null;
  }
  if (!data) return null;

  const row = data as ArticleRow;
  const translation = pickTranslation(row.translations, appLocale);
  if (!translation) return null;

  return {
    id: row.id,
    slug: row.slug,
    status: row.status as 'draft' | 'published',
    published_at: row.published_at,
    updated_at: row.updated_at,
    cover_path: row.cover_path,
    locale: translation.locale,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content,
    seo_title: translation.seo_title,
    seo_description: translation.seo_description,
  };
}

/** Objavljeni članak (javni frontend). */
export async function getPublishedArticleBySlug(
  locale: string,
  slug: string,
): Promise<PublicArticle | null> {
  const article = await getArticleBySlug(locale, slug, { includeDraft: false });
  if (!article) return null;
  const { status: _status, ...rest } = article;
  return rest;
}

async function fetchPublishedArticleSlugs(): Promise<string[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Failed to fetch article slugs:', error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug as string);
}

const loadPublishedArticleSlugs = unstable_cache(
  async () => fetchPublishedArticleSlugs(),
  ['cms-published-article-slugs'],
  {
    tags: [CMS_CACHE_TAGS.articles],
    revalidate: CMS_CACHE_REVALIDATE_SECONDS,
  },
);

/** Slugovi za sitemap. */
export const getPublishedArticleSlugs = cache(
  async function getPublishedArticleSlugs(): Promise<string[]> {
    return loadPublishedArticleSlugs();
  },
);
