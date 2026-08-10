'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, RefreshCw, Save } from 'lucide-react';
import clsx from 'clsx';
import type { AppLocale } from '@/i18n/routing';
import {
  CMS_LOCALES,
  EDITABLE_PAGE_SEO_KEYS,
} from '@/modules/cms/constants';
import type { PageSeoAdminRow } from '@/modules/cms/lib/get-page-seo';

const LOCALE_LABELS: Record<AppLocale, string> = {
  hr: 'HR',
  en: 'EN',
  de: 'DE',
  it: 'IT',
};

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

type DraftFields = {
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  og_image_alt: string;
};

type DraftMap = Record<string, DraftFields>;

function rowId(pageKey: string, locale: string) {
  return `${pageKey}::${locale}`;
}

function fieldsFromRow(row: PageSeoAdminRow): DraftFields {
  return {
    title: row.title,
    description: row.description,
    og_title: row.og_title,
    og_description: row.og_description,
    og_image_alt: row.og_image_alt,
  };
}

function isDirty(a: DraftFields, b: DraftFields) {
  return (
    a.title !== b.title ||
    a.description !== b.description ||
    a.og_title !== b.og_title ||
    a.og_description !== b.og_description ||
    a.og_image_alt !== b.og_image_alt
  );
}

export default function AdminPageSeoManager({ showToast }: Props) {
  const [rows, setRows] = useState<PageSeoAdminRow[]>([]);
  const [draft, setDraft] = useState<DraftMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [localeTab, setLocaleTab] = useState<AppLocale>('hr');
  const [pageKey, setPageKey] = useState<string>(EDITABLE_PAGE_SEO_KEYS[0].pageKey);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/page-seo');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju (HTTP ${res.status}). ${
          (body as { error?: string }).error ??
          'Provjeri CMS SQL shemu (page_seo).'
        }`,
      );
      setLoading(false);
      return;
    }
    const data = (await res.json()) as PageSeoAdminRow[];
    setRows(data);
    const next: DraftMap = {};
    for (const row of data) {
      next[rowId(row.page_key, row.locale)] = fieldsFromRow(row);
    }
    setDraft(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchRows();
  }, [fetchRows]);

  const activeRow = useMemo(
    () => rows.find((r) => r.page_key === pageKey && r.locale === localeTab),
    [rows, pageKey, localeTab],
  );

  const activeId = rowId(pageKey, localeTab);
  const activeDraft = draft[activeId] ?? {
    title: '',
    description: '',
    og_title: '',
    og_description: '',
    og_image_alt: '',
  };

  const dirtyIds = useMemo(() => {
    const dirty = new Set<string>();
    for (const row of rows) {
      const id = rowId(row.page_key, row.locale);
      const current = draft[id];
      if (current && isDirty(current, fieldsFromRow(row))) dirty.add(id);
    }
    return dirty;
  }, [rows, draft]);

  const updateField = (field: keyof DraftFields, value: string) => {
    setDraft((prev) => ({
      ...prev,
      [activeId]: { ...activeDraft, [field]: value },
    }));
  };

  const handleSave = async () => {
    if (dirtyIds.size === 0) {
      showToast('Nema promjena za spremiti.');
      return;
    }

    setSaving(true);
    const items = Array.from(dirtyIds).map((id) => {
      const [pk, locale] = id.split('::');
      const fields = draft[id];
      return {
        page_key: pk,
        locale,
        ...fields,
      };
    });

    const res = await fetch('/api/admin/page-seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      showToast(
        (data as { error?: string }).error ?? 'Spremanje nije uspjelo.',
        'error',
      );
      return;
    }

    const nextRows = data as PageSeoAdminRow[];
    setRows(nextRows);
    const nextDraft: DraftMap = {};
    for (const row of nextRows) {
      nextDraft[rowId(row.page_key, row.locale)] = fieldsFromRow(row);
    }
    setDraft(nextDraft);
    showToast('SEO podaci su spremljeni.');
  };

  const defaults = activeRow?.defaults;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">SEO stranica</h2>
          <p className="text-sm text-gray-500">
            Prazno polje = zadani SEO iz prijevoda. Spremi samo izmijenjene stranice.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void fetchRows()}
            className="rounded-full p-1.5 text-gray-500 hover:text-gray-800"
            title="Osvježi"
          >
            <RefreshCw size={16} />
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving || dirtyIds.size === 0}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            Spremi{dirtyIds.size > 0 ? ` (${dirtyIds.size})` : ''}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={pageKey}
          onChange={(e) => setPageKey(e.target.value)}
          className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
        >
          {EDITABLE_PAGE_SEO_KEYS.map((item) => (
            <option key={item.pageKey} value={item.pageKey}>
              {item.labelHr}
            </option>
          ))}
        </select>

        <div className="flex w-fit gap-1 rounded-full bg-gray-100 p-0.5">
          {CMS_LOCALES.map((locale) => (
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
            </button>
          ))}
        </div>

        {dirtyIds.has(activeId) && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            Izmijenjeno
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          Učitavanje…
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          {(
            [
              ['title', 'SEO naslov', defaults?.title],
              ['description', 'SEO opis', defaults?.description],
              ['og_title', 'Open Graph naslov', defaults?.og_title],
              ['og_description', 'Open Graph opis', defaults?.og_description],
              ['og_image_alt', 'Open Graph alt teksta slike', defaults?.og_image_alt],
            ] as const
          ).map(([field, label, fallback]) => {
            const multiline = field === 'description' || field === 'og_description';
            return (
              <div key={field}>
                <label className="mb-1 block text-xs font-medium text-gray-600">
                  {label}
                </label>
                {multiline ? (
                  <textarea
                    value={activeDraft[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    rows={2}
                    placeholder={fallback ?? ''}
                    className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                ) : (
                  <input
                    value={activeDraft[field]}
                    onChange={(e) => updateField(field, e.target.value)}
                    placeholder={fallback ?? ''}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                )}
                {fallback ? (
                  <p className="mt-1 text-[11px] text-gray-400">Zadano: {fallback}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
