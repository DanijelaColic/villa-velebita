import { createServiceClient } from '@/lib/supabase';
import type { AppLocale } from '@/i18n/routing';
import { getMessagesForLocale, getValidLocale } from '@/i18n/messages';
import {
  CMS_LOCALES,
  EDITABLE_PAGE_SEO_KEY_SET,
  EDITABLE_PAGE_SEO_KEYS,
  type EditablePageSeoKey,
} from '../constants';
import { NEWS_HUB_BY_LOCALE } from '../news-copy';
import { getMessagePathValue } from './get-site-texts';
import type { PageSeoFields } from '../types';

export type PageSeoOverride = PageSeoFields;

export type PageSeoAdminRow = {
  page_key: EditablePageSeoKey;
  locale: AppLocale;
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image_alt: string;
  defaults: PageSeoFields;
};

function emptyFields(): PageSeoFields {
  return {
    title: null,
    description: null,
    og_title: null,
    og_description: null,
    og_image_alt: null,
  };
}

/** Defaults iz messages (ili NEWS_HUB za novosti). */
export function getDefaultPageSeo(
  locale: AppLocale,
  pageKey: EditablePageSeoKey,
): PageSeoFields {
  const meta = EDITABLE_PAGE_SEO_KEYS.find((item) => item.pageKey === pageKey);
  if (!meta) return emptyFields();

  if (pageKey === 'news' || !meta.messagePath) {
    const hub = NEWS_HUB_BY_LOCALE[locale];
    return {
      title: `${hub.title} | Villa Velebita`,
      description: hub.description,
      og_title: `${hub.title} | Villa Velebita`,
      og_description: hub.description,
      og_image_alt: hub.title,
    };
  }

  const messages = getMessagesForLocale(locale);
  const base = meta.messagePath;

  if (pageKey === 'home') {
    return {
      title: getMessagePathValue(messages, `${base}.title.default`) || null,
      description: getMessagePathValue(messages, `${base}.description`) || null,
      og_title: getMessagePathValue(messages, `${base}.openGraph.title`) || null,
      og_description:
        getMessagePathValue(messages, `${base}.openGraph.description`) || null,
      og_image_alt:
        getMessagePathValue(messages, `${base}.openGraph.imageAlt`) || null,
    };
  }

  return {
    title: getMessagePathValue(messages, `${base}.title`) || null,
    description: getMessagePathValue(messages, `${base}.description`) || null,
    og_title: getMessagePathValue(messages, `${base}.openGraph.title`) || null,
    og_description:
      getMessagePathValue(messages, `${base}.openGraph.description`) || null,
    og_image_alt:
      getMessagePathValue(messages, `${base}.openGraph.imageAlt`) || null,
  };
}

export async function getPageSeoOverride(
  locale: string,
  pageKey: EditablePageSeoKey | string,
): Promise<PageSeoOverride | null> {
  if (!EDITABLE_PAGE_SEO_KEY_SET.has(pageKey)) return null;

  const appLocale = getValidLocale(locale);
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('page_seo')
    .select('title, description, og_title, og_description, og_image_alt')
    .eq('page_key', pageKey)
    .eq('locale', appLocale)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch page_seo:', error.message);
    return null;
  }
  if (!data) return null;

  const hasAny = Object.values(data).some(
    (v) => typeof v === 'string' && v.trim() !== '',
  );
  if (!hasAny) return null;

  return {
    title: data.title?.trim() || null,
    description: data.description?.trim() || null,
    og_title: data.og_title?.trim() || null,
    og_description: data.og_description?.trim() || null,
    og_image_alt: data.og_image_alt?.trim() || null,
  };
}

/** Spoji defaults s DB overrideom (prazna override polja → default). */
export function mergePageSeo(
  defaults: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
  },
  override: PageSeoOverride | null,
): {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
} {
  if (!override) return defaults;

  return {
    title: override.title?.trim() || defaults.title,
    description: override.description?.trim() || defaults.description,
    ogTitle: override.og_title?.trim() || override.title?.trim() || defaults.ogTitle,
    ogDescription:
      override.og_description?.trim() ||
      override.description?.trim() ||
      defaults.ogDescription,
    ogImageAlt: override.og_image_alt?.trim() || defaults.ogImageAlt,
  };
}

export function pageKeyFromNamespace(
  namespace: string,
): EditablePageSeoKey | null {
  if (namespace === 'metadata.layout') return 'home';
  const match = namespace.match(/^metadata\.pages\.([a-zA-Z0-9]+)$/);
  if (!match) return null;
  const key = match[1];
  if (EDITABLE_PAGE_SEO_KEY_SET.has(key)) return key as EditablePageSeoKey;
  return null;
}

export async function getPageSeoForAdmin(): Promise<PageSeoAdminRow[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('page_seo').select('*');

  if (error) {
    console.error('Failed to fetch page_seo for admin:', error.message);
  }

  const stored = new Map<string, PageSeoFields>();
  for (const row of data ?? []) {
    stored.set(`${row.page_key}::${row.locale}`, {
      title: row.title,
      description: row.description,
      og_title: row.og_title,
      og_description: row.og_description,
      og_image_alt: row.og_image_alt,
    });
  }

  const rows: PageSeoAdminRow[] = [];
  for (const item of EDITABLE_PAGE_SEO_KEYS) {
    for (const locale of CMS_LOCALES) {
      const defaults = getDefaultPageSeo(locale, item.pageKey);
      const saved = stored.get(`${item.pageKey}::${locale}`);
      rows.push({
        page_key: item.pageKey,
        locale,
        title: saved?.title ?? '',
        description: saved?.description ?? '',
        og_title: saved?.og_title ?? '',
        og_description: saved?.og_description ?? '',
        og_image_alt: saved?.og_image_alt ?? '',
        defaults,
      });
    }
  }
  return rows;
}
