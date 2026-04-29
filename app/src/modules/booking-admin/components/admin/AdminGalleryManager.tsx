'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppImage as Image } from '@/components/ui/AppImage';
import Link from 'next/link';
import clsx from 'clsx';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Loader2,
  Plus,
  Save,
  Trash2,
  Video,
} from 'lucide-react';
import {
  DEFAULT_GALLERY_CATEGORY,
  GALLERY_CATEGORIES,
  getGalleryCategoryLabel,
  type GalleryCategoryKey,
} from '@/lib/gallery-categories';

type GalleryItem = {
  id: string;
  storage_path: string;
  category_key: GalleryCategoryKey;
  alt_text: string | null;
  title: string | null;
  media_type: 'image' | 'video';
  sort_order: number;
  created_at: string;
};

type GalleryItemWithUrl = GalleryItem & { publicUrl: string };

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

export default function AdminGalleryManager({ showToast }: Props) {
  const [items, setItems] = useState<GalleryItemWithUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [globalAlt, setGlobalAlt] = useState('');
  const [globalTitle, setGlobalTitle] = useState('');
  const [globalCategory, setGlobalCategory] = useState<GalleryCategoryKey>(
    DEFAULT_GALLERY_CATEGORY,
  );
  const [dirtyIds, setDirtyIds] = useState<Set<string>>(new Set());

  const getPublicUrl = useCallback((storagePath: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!baseUrl) return '';
    return `${baseUrl}/storage/v1/object/public/gallery-media/${encodeURIComponent(storagePath)}`;
  }, []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/gallery');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju galerije (HTTP ${res.status}). ${
          body.error ?? 'Provjeri autentikaciju i Supabase vezu.'
        }`,
      );
      setLoading(false);
      return 0;
    }

    const data = (await res.json()) as GalleryItem[];
    setItems(
      data.map(item => ({
        ...item,
        publicUrl: getPublicUrl(item.storage_path),
      })),
    );
    setLoading(false);
    return data.length;
  }, [getPublicUrl]);

  useEffect(() => {
    // Initial load of persisted gallery items.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchItems();
  }, [fetchItems]);

  const hasDirtyChanges = useMemo(() => dirtyIds.size > 0, [dirtyIds.size]);

  const onFileChange = (files: FileList | null) => {
    if (!files) return;

    const accepted = Array.from(files).filter(file => {
      return file.type.startsWith('image/') || file.type.startsWith('video/');
    });

    if (accepted.length !== files.length) {
      showToast('Neke datoteke nisu podržane. Dozvoljene su slike i videi.', 'error');
    }

    setSelectedFiles(accepted);
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    if (globalAlt.trim()) formData.set('alt_text', globalAlt.trim());
    if (globalTitle.trim()) formData.set('title', globalTitle.trim());
    formData.set('category_key', globalCategory);

    const res = await fetch('/api/admin/gallery', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const uploadErrorMessage =
        `Upload nije uspio (HTTP ${res.status}). ${
          body.error ?? 'Datoteka nije spremljena u storage ili DB.'
        }`;
      setError(uploadErrorMessage);
      setUploading(false);
      return;
    }

    setSelectedFiles([]);
    setGlobalAlt('');
    setGlobalTitle('');
    setGlobalCategory(DEFAULT_GALLERY_CATEGORY);
    showToast('Mediji su uspješno dodani u galeriju.');
    await fetchItems();
    setUploading(false);
  };

  const deleteItem = async (item: GalleryItemWithUrl) => {
    if (
      !confirm(
        `Obrisati stavku "${item.title || item.alt_text || item.storage_path}"?\n\nOvo će izbrisati i datoteku iz storage bucketa gallery-media.`,
      )
    ) {
      return;
    }

    const res = await fetch(`/api/admin/gallery/${item.id}`, { method: 'DELETE' });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      showToast(body.error ?? 'Greška pri brisanju.', 'error');
      return;
    }

    showToast('Stavka je obrisana.');
    await fetchItems();
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= items.length) return;

    const updated = [...items];
    [updated[index], updated[nextIndex]] = [updated[nextIndex], updated[index]];
    setItems(updated.map((item, idx) => ({ ...item, sort_order: idx })));
    setDirtyIds(new Set(updated.map(item => item.id)));
  };

  const patchItemField = (
    id: string,
    field: 'alt_text' | 'title' | 'category_key',
    value: string,
  ) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    );
    setDirtyIds(prev => new Set([...prev, id]));
  };

  const saveChanges = async () => {
    if (!hasDirtyChanges) return;

    setSaving(true);
    setError('');

    const reorderRes = await fetch('/api/admin/gallery/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: items.map(item => item.id) }),
    });

    if (!reorderRes.ok) {
      const body = await reorderRes.json().catch(() => ({}));
      setError(body.error ?? 'Greška pri spremanju redoslijeda.');
      setSaving(false);
      return;
    }

    for (const item of items) {
      if (!dirtyIds.has(item.id)) continue;

      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alt_text: item.alt_text,
          title: item.title,
          category_key: item.category_key,
          sort_order: item.sort_order,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? 'Greška pri spremanju podataka.');
        setSaving(false);
        return;
      }
    }

    showToast('Galerija je spremljena.');
    setDirtyIds(new Set());
    await fetchItems();
    setSaving(false);
  };

  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upravljanje galerijom</h2>
        <div className="flex items-center gap-2">
          <Link
            href="/galerija"
            target="_blank"
            className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary text-gray-700 hover:text-primary text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <ExternalLink className="size-4" />
            Otvori frontend galeriju
          </Link>
          <button
            onClick={saveChanges}
            disabled={saving || !hasDirtyChanges}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-medium px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving && <Loader2 className="size-4 animate-spin" />}
            <Save className="size-4" />
            Spremi promjene
          </button>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
        <p className="text-sm font-medium text-blue-900 mb-1">
          Redoslijed u adminu = redoslijed na stranici
        </p>
        <p className="text-xs text-blue-700">
          Koristi gumbe <strong>Gore</strong> i <strong>Dolje</strong>, zatim klikni{' '}
          <strong>Spremi promjene</strong>. Frontend `/galerija` koristi isti `sort_order`.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 mb-5">
        <p className="text-sm font-medium text-gray-800 mb-3">Dodavanje medija</p>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            value={globalTitle}
            onChange={e => setGlobalTitle(e.target.value)}
            placeholder="Naziv (opcionalno)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
          />
          <input
            type="text"
            value={globalAlt}
            onChange={e => setGlobalAlt(e.target.value)}
            placeholder="Alt tekst (opcionalno)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
          />
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={e => onFileChange(e.target.files)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          />
        </div>
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-600 mb-1">Kategorija</label>
          <select
            value={globalCategory}
            onChange={(e) => setGlobalCategory(e.target.value as GalleryCategoryKey)}
            className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
          >
            {GALLERY_CATEGORIES.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={uploadFiles}
          disabled={uploading || selectedFiles.length === 0}
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-light text-white text-sm font-medium px-5 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Dodaj slike
        </button>
        {selectedFiles.length > 0 && (
          <p className="text-xs text-gray-500 mt-2">
            Odabrano: {selectedFiles.length} datoteka
          </p>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 className="size-5 animate-spin mr-2" />
          Učitavanje galerije...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 text-center py-14 px-6">
          <p className="text-gray-700 font-medium mb-1">Galerija je trenutno prazna.</p>
          <p className="text-sm text-gray-500 mb-4">
            Dodaj prve slike ili videe gumbom <strong>Dodaj slike</strong>. Nakon spremanja odmah će se prikazati na frontend galeriji.
          </p>
          <Link
            href="/galerija"
            target="_blank"
            className="inline-flex items-center gap-2 border border-gray-200 bg-white hover:border-primary text-gray-700 hover:text-primary text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            <ExternalLink className="size-4" />
            Pogledaj frontend galeriju
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={clsx(
                'rounded-xl border border-gray-200 bg-white overflow-hidden',
                dirtyIds.has(item.id) && 'ring-2 ring-primary/20',
              )}
            >
              <div className="relative aspect-4/3 bg-gray-100">
                {item.media_type === 'image' ? (
                  <Image
                    src={item.publicUrl}
                    alt={item.alt_text || item.title || 'Galerija'}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <video
                    src={item.publicUrl}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    controls
                  />
                )}
                {item.media_type === 'video' && (
                  <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] text-white">
                    <Video className="size-3" /> Video
                  </span>
                )}
              </div>

              <div className="p-3 space-y-2">
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">Storage path</p>
                  <p className="text-xs text-gray-700 break-all">{item.storage_path}</p>
                </div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">sort_order</p>
                  <p className="text-xs font-semibold text-gray-700">{item.sort_order}</p>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                    Kategorija
                  </label>
                  <select
                    value={item.category_key}
                    onChange={e => patchItemField(item.id, 'category_key', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-white"
                  >
                    {GALLERY_CATEGORIES.map((category) => (
                      <option key={category.key} value={category.key}>
                        {getGalleryCategoryLabel(category.key)}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={item.title ?? ''}
                  onChange={e => patchItemField(item.id, 'title', e.target.value)}
                  placeholder="Naziv (opcionalno)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  value={item.alt_text ?? ''}
                  onChange={e => patchItemField(item.id, 'alt_text', e.target.value)}
                  placeholder="Alt tekst (opcionalno)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="size-3.5" />
                    Gore
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 hover:border-primary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="size-3.5" />
                    Dolje
                  </button>
                  <button
                    onClick={() => void deleteItem(item)}
                    className="ml-auto inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="size-3.5" />
                    Obriši
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
