import type { AppLocale } from '@/i18n/routing';

export type ArticleStatus = 'draft' | 'published';

/** TipTap JSON dokument – struktura se validira u editoru/API-ju */
export type TipTapDoc = {
  type: 'doc';
  content?: TipTapNode[];
};

export type TipTapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
};

export type TipTapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

export type Article = {
  id: string;
  slug: string;
  status: ArticleStatus;
  cover_path: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleTranslation = {
  id: string;
  article_id: string;
  locale: AppLocale;
  title: string;
  excerpt: string;
  content: TipTapDoc | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

/** Članak s prijevodima – admin detalj / forma */
export type ArticleWithTranslations = Article & {
  translations: ArticleTranslation[];
};

/** Kartica / lista na javnom frontendu */
export type ArticleListItem = {
  id: string;
  slug: string;
  published_at: string | null;
  cover_path: string | null;
  title: string;
  excerpt: string;
};

/** Puni članak za javni prikaz (jedan locale + fallback) */
export type PublicArticle = {
  id: string;
  slug: string;
  published_at: string | null;
  updated_at: string;
  cover_path: string | null;
  locale: AppLocale;
  title: string;
  excerpt: string;
  content: TipTapDoc | null;
  seo_title: string | null;
  seo_description: string | null;
};

export type SiteTextRow = {
  key: string;
  locale: AppLocale;
  value: string;
  updated_at: string;
};

export type PageSeoRow = {
  page_key: string;
  locale: AppLocale;
  title: string | null;
  description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_alt: string | null;
  updated_at: string;
};

export type PageSeoFields = Pick<
  PageSeoRow,
  'title' | 'description' | 'og_title' | 'og_description' | 'og_image_alt'
>;

/** Payload za create/update članka iz admina */
export type ArticleUpsertInput = {
  slug: string;
  status: ArticleStatus;
  cover_path?: string | null;
  published_at?: string | null;
  translations: Array<{
    locale: AppLocale;
    title: string;
    excerpt: string;
    content: TipTapDoc | null;
    seo_title?: string | null;
    seo_description?: string | null;
  }>;
};
