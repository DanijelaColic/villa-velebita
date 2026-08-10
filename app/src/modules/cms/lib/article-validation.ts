import type { AppLocale } from '@/i18n/routing';
import { ARTICLE_STATUSES, CMS_LOCALES } from '../constants';
import type {
  ArticleStatus,
  ArticleUpsertInput,
  TipTapDoc,
} from '../types';
import { isValidSlug } from './slug';
import { isTipTapDoc, normalizeTipTapDoc, plainTextToTipTapDoc } from './tiptap-text';

export type ArticleParseResult =
  | { ok: true; data: ArticleUpsertInput }
  | { ok: false; error: string };

function isAppLocale(value: string): value is AppLocale {
  return (CMS_LOCALES as readonly string[]).includes(value);
}

function isArticleStatus(value: string): value is ArticleStatus {
  return (ARTICLE_STATUSES as readonly string[]).includes(value);
}

function normalizeContent(raw: unknown): TipTapDoc | null {
  if (raw === null || raw === undefined || raw === '') return null;
  if (typeof raw === 'string') return plainTextToTipTapDoc(raw);
  if (isTipTapDoc(raw)) return normalizeTipTapDoc(raw);
  return null;
}

/** Validira i normalizira body za create/update članka. */
export function parseArticleUpsertBody(body: unknown): ArticleParseResult {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Neispravan JSON body' };
  }

  const data = body as Record<string, unknown>;
  const slug = typeof data.slug === 'string' ? data.slug.trim().toLowerCase() : '';
  const statusRaw = typeof data.status === 'string' ? data.status : 'draft';

  if (!isValidSlug(slug)) {
    return {
      ok: false,
      error: 'Slug mora biti 2–80 znakova (mala slova, brojevi, crtice).',
    };
  }

  if (!isArticleStatus(statusRaw)) {
    return { ok: false, error: 'Status mora biti draft ili published.' };
  }

  if (!Array.isArray(data.translations) || data.translations.length === 0) {
    return { ok: false, error: 'Potrebna je barem jedna prijevodna stavka.' };
  }

  const translations: ArticleUpsertInput['translations'] = [];
  const seenLocales = new Set<AppLocale>();

  for (const item of data.translations) {
    if (!item || typeof item !== 'object') {
      return { ok: false, error: 'Neispravan prijevod.' };
    }

    const t = item as Record<string, unknown>;
    const locale = typeof t.locale === 'string' ? t.locale : '';

    if (!isAppLocale(locale)) {
      return { ok: false, error: `Nepoznat jezik: ${locale}` };
    }
    if (seenLocales.has(locale)) {
      return { ok: false, error: `Dupli prijevod za jezik: ${locale}` };
    }
    seenLocales.add(locale);

    const title = typeof t.title === 'string' ? t.title.trim() : '';
    const excerpt = typeof t.excerpt === 'string' ? t.excerpt.trim() : '';
    const content = normalizeContent(t.content);
    const seo_title =
      typeof t.seo_title === 'string' ? t.seo_title.trim() || null : null;
    const seo_description =
      typeof t.seo_description === 'string'
        ? t.seo_description.trim() || null
        : null;

    translations.push({
      locale,
      title,
      excerpt,
      content,
      seo_title,
      seo_description,
    });
  }

  const hr = translations.find((t) => t.locale === 'hr');
  if (!hr || !hr.title) {
    return {
      ok: false,
      error: 'Hrvatski prijevod mora imati naslov.',
    };
  }

  if (statusRaw === 'published' && !hr.content) {
    return {
      ok: false,
      error: 'Za objavu je potreban sadržaj na hrvatskom.',
    };
  }

  const cover_path =
    data.cover_path === null
      ? null
      : typeof data.cover_path === 'string'
        ? data.cover_path.trim() || null
        : undefined;

  let published_at: string | null | undefined = undefined;
  if ('published_at' in data) {
    if (data.published_at === null || data.published_at === '') {
      published_at = null;
    } else if (typeof data.published_at === 'string') {
      published_at = data.published_at;
    }
  }

  return {
    ok: true,
    data: {
      slug,
      status: statusRaw,
      cover_path,
      published_at,
      translations,
    },
  };
}

/** Ako se objavljuje prvi put, postavi published_at. */
export function resolvePublishedAt(
  status: ArticleStatus,
  existingPublishedAt: string | null | undefined,
  explicit?: string | null,
): string | null {
  if (explicit !== undefined) return explicit;
  if (status === 'published') {
    return existingPublishedAt ?? new Date().toISOString();
  }
  return existingPublishedAt ?? null;
}
