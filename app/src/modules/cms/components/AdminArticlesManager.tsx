'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import clsx from 'clsx';
import type { ArticleWithTranslations } from '@/modules/cms/types';
import ArticleForm from './ArticleForm';

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

function hrTitle(article: ArticleWithTranslations) {
  return (
    article.translations.find((t) => t.locale === 'hr')?.title ||
    article.translations.find((t) => t.title)?.title ||
    '(bez naslova)'
  );
}

function previewHref(article: ArticleWithTranslations) {
  const base = `/novosti/${article.slug}`;
  return article.status === 'published' ? base : `${base}?preview=1`;
}

function formatDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const LOCALE_SHORT = ['hr', 'en', 'de', 'it'] as const;

function LocaleDots({ article }: { article: ArticleWithTranslations }) {
  return (
    <div className="flex items-center gap-1" title="Zeleno = prevedeno, narančasto = koristi se HR">
      {LOCALE_SHORT.map((locale) => {
        const t = article.translations.find((item) => item.locale === locale);
        const filled = !!t?.title?.trim();
        return (
          <span
            key={locale}
            className={clsx(
              'inline-flex size-5 items-center justify-center rounded text-[9px] font-bold uppercase',
              filled
                ? 'bg-green-100 text-green-800'
                : 'bg-amber-100 text-amber-800',
            )}
          >
            {locale}
          </span>
        );
      })}
    </div>
  );
}

export default function AdminArticlesManager({ showToast }: Props) {
  const [articles, setArticles] = useState<ArticleWithTranslations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<ArticleWithTranslations | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/articles');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju (HTTP ${res.status}). ${
          (body as { error?: string }).error ??
          'Provjeri autentikaciju i je li CMS SQL pokrenut u Supabaseu.'
        }`,
      );
      setLoading(false);
      return;
    }
    setArticles((await res.json()) as ArticleWithTranslations[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchArticles();
  }, [fetchArticles]);

  const handleDelete = async (article: ArticleWithTranslations) => {
    const title = hrTitle(article);
    if (!window.confirm(`Obrisati članak „${title}”?`)) return;

    setDeletingId(article.id);
    const res = await fetch(`/api/admin/articles/${article.id}`, {
      method: 'DELETE',
    });
    setDeletingId(null);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      showToast((body as { error?: string }).error ?? 'Brisanje nije uspjelo.', 'error');
      return;
    }

    setArticles((prev) => prev.filter((a) => a.id !== article.id));
    showToast('Članak je obrisan.');
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">Novosti</h2>
          <p className="text-sm text-gray-500">
            HR je obavezan. EN/DE/IT su opcionalni — prazno = na webu se prikaže hrvatski.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void fetchArticles()}
            className="rounded-full p-1.5 text-gray-500 transition-colors hover:text-gray-800"
            title="Osvježi"
          >
            <RefreshCw size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary-light"
          >
            <Plus size={15} />
            Novi članak
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          Učitavanje…
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
          <p className="mb-1 text-lg text-gray-500">Nema članaka</p>
          <p className="text-sm text-gray-400">
            Kliknite „Novi članak” za prvu objavu.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">Naslov</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Slug</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Jezici</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Objavljeno</th>
                <th className="px-4 py-3 font-medium text-right">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50/80">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {hrTitle(article)}
                  </td>
                  <td className="hidden px-4 py-3 font-mono text-xs text-gray-500 sm:table-cell">
                    {article.slug}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <LocaleDots article={article} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        'rounded-full px-2 py-0.5 text-xs font-medium',
                        article.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800',
                      )}
                    >
                      {article.status === 'published' ? 'Objavljeno' : 'Skica'}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-gray-500 md:table-cell">
                    {formatDate(article.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={previewHref(article)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-secondary"
                        title={
                          article.status === 'published'
                            ? 'Otvori na webu'
                            : 'Pregled skice (samo admin)'
                        }
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(article);
                          setShowForm(true);
                        }}
                        className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary"
                        title="Uredi"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(article)}
                        disabled={deletingId === article.id}
                        className="rounded-full p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="Obriši"
                      >
                        {deletingId === article.id ? (
                          <Loader2 size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <ArticleForm
          article={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={(saved) => {
            setArticles((prev) => {
              const idx = prev.findIndex((a) => a.id === saved.id);
              if (idx === -1) return [saved, ...prev];
              const next = [...prev];
              next[idx] = saved;
              return next;
            });
            setShowForm(false);
            setEditing(null);
          }}
          showToast={showToast}
        />
      )}
    </>
  );
}
