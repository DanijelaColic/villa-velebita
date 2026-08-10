'use client';

import { useEffect, useMemo, useState } from 'react';
import { ImagePlus, Loader2, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import { AppImage } from '@/components/ui/AppImage';
import type { AppLocale } from '@/i18n/routing';
import { CMS_LOCALES } from '@/modules/cms/constants';
import { getCmsMediaPublicUrl } from '@/modules/cms/lib/get-articles';
import { slugify } from '@/modules/cms/lib/slug';
import type {
  ArticleStatus,
  ArticleWithTranslations,
  TipTapDoc,
} from '@/modules/cms/types';
import { NEWS_FALLBACK_COVER } from '@/modules/cms/news-copy';
import { isEmptyTipTapDoc } from '@/modules/cms/lib/tiptap-text';
import ArticleRichEditor from './ArticleRichEditor';

const LOCALE_LABELS: Record<AppLocale, string> = {
  hr: 'HR',
  en: 'EN',
  de: 'DE',
  it: 'IT',
};

type TranslationForm = {
  locale: AppLocale;
  title: string;
  excerpt: string;
  content: TipTapDoc | null;
  seo_title: string;
  seo_description: string;
};

type Props = {
  article: ArticleWithTranslations | null;
  onClose: () => void;
  onSaved: (article: ArticleWithTranslations) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
};

function emptyTranslations(): TranslationForm[] {
  return CMS_LOCALES.map((locale) => ({
    locale,
    title: '',
    excerpt: '',
    content: null,
    seo_title: '',
    seo_description: '',
  }));
}

function fromArticle(article: ArticleWithTranslations): TranslationForm[] {
  return CMS_LOCALES.map((locale) => {
    const t = article.translations.find((item) => item.locale === locale);
    return {
      locale,
      title: t?.title ?? '',
      excerpt: t?.excerpt ?? '',
      content: t?.content ?? null,
      seo_title: t?.seo_title ?? '',
      seo_description: t?.seo_description ?? '',
    };
  });
}

/** Prijevod je “popunjen” ako ima naslov (sadržaj opcionalan za oznaku). */
function isLocaleFilled(t: TranslationForm): boolean {
  return t.title.trim().length > 0;
}

function hasContent(t: TranslationForm): boolean {
  return !isEmptyTipTapDoc(t.content);
}

export default function ArticleForm({
  article,
  onClose,
  onSaved,
  showToast,
}: Props) {
  const isEdit = !!article;
  const [slug, setSlug] = useState(article?.slug ?? '');
  const [status, setStatus] = useState<ArticleStatus>(article?.status ?? 'draft');
  const [coverPath, setCoverPath] = useState<string | null>(article?.cover_path ?? null);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [localeTab, setLocaleTab] = useState<AppLocale>('hr');
  const [translations, setTranslations] = useState<TranslationForm[]>(
    article ? fromArticle(article) : emptyTranslations(),
  );
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState('');

  const active = useMemo(
    () => translations.find((t) => t.locale === localeTab) ?? translations[0],
    [translations, localeTab],
  );

  const coverPreview =
    getCmsMediaPublicUrl(coverPath) ?? (coverPath ? coverPath : null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const updateLocale = (locale: AppLocale, patch: Partial<TranslationForm>) => {
    setTranslations((prev) =>
      prev.map((t) => (t.locale === locale ? { ...t, ...patch } : t)),
    );
  };

  const handleHrTitleChange = (title: string) => {
    updateLocale('hr', { title });
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  };

  const filledByLocale = useMemo(() => {
    const map = {} as Record<AppLocale, boolean>;
    for (const t of translations) {
      map[t.locale] = isLocaleFilled(t);
    }
    return map;
  }, [translations]);

  const activeIsEmpty = localeTab !== 'hr' && !isLocaleFilled(active);
  const handleCoverUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploadingCover(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/admin/articles/media', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    setUploadingCover(false);

    if (!res.ok) {
      showToast(
        (data as { error?: string }).error ?? 'Upload naslovnice nije uspio.',
        'error',
      );
      return;
    }

    const newPath = (data as { storage_path: string }).storage_path;

    // Obriši staru naslovnicu iz storagea ako je bila CMS datoteka
    if (coverPath && !coverPath.startsWith('/') && !coverPath.startsWith('http')) {
      void fetch('/api/admin/articles/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storage_path: coverPath }),
      });
    }

    setCoverPath(newPath);
    showToast('Naslovnica je učitana.');
  };

  const handleRemoveCover = async () => {
    if (coverPath && !coverPath.startsWith('/') && !coverPath.startsWith('http')) {
      await fetch('/api/admin/articles/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storage_path: coverPath }),
      });
    }
    setCoverPath(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const body = {
      slug,
      status,
      cover_path: coverPath,
      translations: translations.map((t) => ({
        locale: t.locale,
        title: t.title,
        excerpt: t.excerpt,
        content: t.content,
        seo_title: t.seo_title || null,
        seo_description: t.seo_description || null,
      })),
    };

    const res = await fetch(
      isEdit ? `/api/admin/articles/${article.id}` : '/api/admin/articles',
      {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      const message = (data as { error?: string }).error ?? 'Greška pri spremanju članka.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    showToast(isEdit ? 'Članak je spremljen.' : 'Članak je kreiran.');
    onSaved(data as ArticleWithTranslations);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-8">
      <div
        className="w-full max-w-3xl rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-form-title"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 id="article-form-title" className="font-serif text-lg font-semibold text-gray-900">
            {isEdit ? 'Uredi članak' : 'Novi članak'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Zatvori"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                URL slug
              </label>
              <input
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder="npr. proljetni-popust"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                /novosti/{slug || '…'}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                <option value="draft">Skica</option>
                <option value="published">Objavljeno</option>
              </select>
            </div>
          </div>

          {/* Naslovnica */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Naslovnica
            </label>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <div className="relative aspect-[21/9] w-full bg-stone-pale">
                <AppImage
                  src={coverPreview ?? NEWS_FALLBACK_COVER}
                  alt="Naslovnica"
                  fill
                  className="object-cover"
                  sizes="768px"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 px-3 py-2">
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50">
                  {uploadingCover ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ImagePlus size={14} />
                  )}
                  {coverPath ? 'Zamijeni sliku' : 'Dodaj sliku'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                    className="hidden"
                    disabled={uploadingCover}
                    onChange={(e) => {
                      void handleCoverUpload(e.target.files?.[0]);
                      e.target.value = '';
                    }}
                  />
                </label>
                {coverPath ? (
                  <button
                    type="button"
                    onClick={() => void handleRemoveCover()}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                    Ukloni
                  </button>
                ) : (
                  <span className="text-[11px] text-gray-400">
                    Bez slike koristi se zadana fotografija
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex w-fit gap-1 rounded-full bg-gray-100 p-0.5">
              {CMS_LOCALES.map((locale) => {
                const filled = filledByLocale[locale];
                return (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => setLocaleTab(locale)}
                    className={clsx(
                      'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                      localeTab === locale
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-800',
                    )}
                  >
                    {LOCALE_LABELS[locale]}
                    {locale === 'hr' ? (
                      <span className="ml-1 text-[10px] font-normal text-gray-400">*</span>
                    ) : filled ? (
                      <span
                        className="ml-1 inline-block size-1.5 rounded-full bg-green-500 align-middle"
                        title="Prijevod postoji"
                      />
                    ) : (
                      <span
                        className="ml-1 inline-block size-1.5 rounded-full bg-amber-400 align-middle"
                        title="Nije prevedeno"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-400">
              ● zeleno = prevedeno · ● narančasto = nije prevedeno (na webu se koristi HR)
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4">
            {activeIsEmpty ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                <strong>Nije prevedeno na {LOCALE_LABELS[localeTab]}.</strong>
                {' '}
                Na webu ({localeTab === 'en' ? '/en' : localeTab === 'de' ? '/de' : '/it'}/novosti)
                gost će vidjeti hrvatski tekst dok ovdje ne upišeš prijevod.
                Polja ispod ostavi prazna ili upiši pravi {LOCALE_LABELS[localeTab]} tekst.
              </div>
            ) : null}

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Naslov {localeTab === 'hr' && <span className="text-red-500">*</span>}
              </label>
              <input
                value={active.title}
                onChange={(e) =>
                  localeTab === 'hr'
                    ? handleHrTitleChange(e.target.value)
                    : updateLocale(localeTab, { title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                placeholder={
                  localeTab === 'hr'
                    ? undefined
                    : 'Prazno = na webu se koristi hrvatski naslov'
                }
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Kratki opis (excerpt)
              </label>
              <textarea
                value={active.excerpt}
                onChange={(e) => updateLocale(localeTab, { excerpt: e.target.value })}
                rows={2}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Sadržaj
                {localeTab === 'hr' && status === 'published' && !hasContent(active) ? (
                  <span className="ml-1 text-red-500">* potrebno za objavu</span>
                ) : null}
              </label>
              <ArticleRichEditor
                key={localeTab}
                locale={localeTab}
                content={active.content}
                onChange={(locale, doc) => updateLocale(locale, { content: doc })}
                placeholder={
                  localeTab === 'hr'
                    ? 'Pišite sadržaj članka…'
                    : `Prijevod na ${LOCALE_LABELS[localeTab]} (opcionalno)`
                }
              />
            </div>

            <details className="rounded-lg border border-gray-200 bg-white">
              <summary className="cursor-pointer px-3 py-2 text-xs font-semibold text-gray-600">
                SEO (opcionalno)
              </summary>
              <div className="space-y-3 border-t border-gray-100 px-3 py-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    SEO naslov
                  </label>
                  <input
                    value={active.seo_title}
                    onChange={(e) => updateLocale(localeTab, { seo_title: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    placeholder="Ako prazno → koristi se naslov članka"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">
                    SEO opis
                  </label>
                  <textarea
                    value={active.seo_description}
                    onChange={(e) =>
                      updateLocale(localeTab, { seo_description: e.target.value })
                    }
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    placeholder="Ako prazno → koristi se kratki opis"
                  />
                </div>
              </div>
            </details>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
            >
              Odustani
            </button>
            <button
              type="submit"
              disabled={saving || uploadingCover}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Spremi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
