'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader2, RefreshCw, Save } from 'lucide-react';
import clsx from 'clsx';
import type { AppLocale } from '@/i18n/routing';
import {
  CMS_LOCALES,
  EDITABLE_SITE_TEXT_KEYS,
  SITE_TEXT_GROUPS,
} from '@/modules/cms/constants';
import type { SiteTextAdminRow } from '@/modules/cms/lib/get-site-texts';

const LOCALE_LABELS: Record<AppLocale, string> = {
  hr: 'HR',
  en: 'EN',
  de: 'DE',
  it: 'IT',
};

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

type DraftMap = Record<string, string>; // `${key}::${locale}` → value

function rowId(key: string, locale: string) {
  return `${key}::${locale}`;
}

export default function AdminSiteTextsManager({ showToast }: Props) {
  const [rows, setRows] = useState<SiteTextAdminRow[]>([]);
  const [draft, setDraft] = useState<DraftMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [localeTab, setLocaleTab] = useState<AppLocale>('hr');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  const fetchRows = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/site-texts');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju (HTTP ${res.status}). ${
          (body as { error?: string }).error ??
          'Provjeri CMS SQL shemu (site_texts).'
        }`,
      );
      setLoading(false);
      return;
    }
    const data = (await res.json()) as SiteTextAdminRow[];
    setRows(data);
    const next: DraftMap = {};
    for (const row of data) {
      next[rowId(row.key, row.locale)] = row.value;
    }
    setDraft(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchRows();
  }, [fetchRows]);

  const dirtyKeys = useMemo(() => {
    const dirty = new Set<string>();
    for (const row of rows) {
      const id = rowId(row.key, row.locale);
      const current = draft[id] ?? '';
      if (current !== row.value) dirty.add(id);
    }
    return dirty;
  }, [rows, draft]);

  const visibleKeys = useMemo(() => {
    return EDITABLE_SITE_TEXT_KEYS.filter(
      (item) => groupFilter === 'all' || item.group === groupFilter,
    );
  }, [groupFilter]);

  const handleSave = async () => {
    if (dirtyKeys.size === 0) {
      showToast('Nema promjena za spremiti.');
      return;
    }

    setSaving(true);
    const items = Array.from(dirtyKeys).map((id) => {
      const [key, locale] = id.split('::');
      return { key, locale, value: draft[id] ?? '' };
    });

    const res = await fetch('/api/admin/site-texts', {
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

    const nextRows = data as SiteTextAdminRow[];
    setRows(nextRows);
    const nextDraft: DraftMap = {};
    for (const row of nextRows) {
      nextDraft[rowId(row.key, row.locale)] = row.value;
    }
    setDraft(nextDraft);
    showToast('Tekstovi su spremljeni.');
  };

  const groups = Object.entries(SITE_TEXT_GROUPS);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">
            Tekstovi stranice
          </h2>
          <p className="text-sm text-gray-500">
            Prazno polje = zadani tekst iz prijevoda. Spremi samo promijenjena polja.
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
            disabled={saving || dirtyKeys.size === 0}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            Spremi{dirtyKeys.size > 0 ? ` (${dirtyKeys.size})` : ''}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
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

        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
        >
          <option value="all">Sve sekcije</option>
          {groups.map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          Učitavanje…
        </div>
      ) : (
        <div className="space-y-4">
          {visibleKeys.map((meta) => {
            const id = rowId(meta.key, localeTab);
            const row = rows.find(
              (r) => r.key === meta.key && r.locale === localeTab,
            );
            const value = draft[id] ?? '';
            const isDirty = dirtyKeys.has(id);
            const multiline = 'multiline' in meta && meta.multiline;

            return (
              <div
                key={id}
                className={clsx(
                  'rounded-xl border bg-white p-4 shadow-sm',
                  isDirty ? 'border-primary/40' : 'border-gray-100',
                )}
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {meta.labelHr}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono">{meta.key}</p>
                  </div>
                  {isDirty && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                      Izmijenjeno
                    </span>
                  )}
                </div>

                {multiline ? (
                  <textarea
                    value={value}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [id]: e.target.value }))
                    }
                    rows={3}
                    placeholder={row?.defaultValue || 'Zadani tekst…'}
                    className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                ) : (
                  <input
                    value={value}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [id]: e.target.value }))
                    }
                    placeholder={row?.defaultValue || 'Zadani tekst…'}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                )}

                {row?.defaultValue ? (
                  <p className="mt-2 text-[11px] text-gray-400">
                    Zadano: {row.defaultValue}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
