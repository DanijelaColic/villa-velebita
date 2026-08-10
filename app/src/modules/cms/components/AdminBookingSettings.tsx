'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Save } from 'lucide-react';

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

type SettingsFields = {
  basePricePerNight: number;
  minNights: number;
  cleaningFee: number;
  longStayDiscountNights: number;
  longStayDiscountPercent: number;
};

type SettingsResponse = SettingsFields & {
  defaults: SettingsFields;
};

const EMPTY_DEFAULTS: SettingsFields = {
  basePricePerNight: 270,
  minNights: 2,
  cleaningFee: 100,
  longStayDiscountNights: 7,
  longStayDiscountPercent: 10,
};

export default function AdminBookingSettings({ showToast }: Props) {
  const [basePrice, setBasePrice] = useState('270');
  const [minNights, setMinNights] = useState('2');
  const [cleaningFee, setCleaningFee] = useState('100');
  const [longStayNights, setLongStayNights] = useState('7');
  const [longStayPercent, setLongStayPercent] = useState('10');
  const [defaults, setDefaults] = useState<SettingsFields>(EMPTY_DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);

  const applyResponse = (data: SettingsResponse) => {
    setBasePrice(String(data.basePricePerNight));
    setMinNights(String(data.minNights));
    setCleaningFee(String(data.cleaningFee));
    setLongStayNights(String(data.longStayDiscountNights));
    setLongStayPercent(String(data.longStayDiscountPercent));
    setDefaults(data.defaults);
    setDirty(false);
  };

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/booking-settings');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju (HTTP ${res.status}). ${
          (body as { error?: string }).error ??
          'Provjeri je li tablica site_settings kreirana u Supabaseu.'
        }`,
      );
      setLoading(false);
      return;
    }
    applyResponse((await res.json()) as SettingsResponse);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/booking-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        basePricePerNight: Number(basePrice),
        minNights: Number(minNights),
        cleaningFee: Number(cleaningFee),
        longStayDiscountNights: Number(longStayNights),
        longStayDiscountPercent: Number(longStayPercent),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      const message = (data as { error?: string }).error ?? 'Spremanje nije uspjelo.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    applyResponse(data as SettingsResponse);
    showToast('Cijene i uvjeti su spremljeni.');
  };

  const markDirty = () => setDirty(true);

  return (
    <div className="mb-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">
            Cijene i uvjeti
          </h2>
          <p className="text-sm text-gray-500">
            Osnovna cijena, čišćenje i popust — vrijede za rezervacije, FAQ i cjenik.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchSettings()}
          className="rounded-full p-1.5 text-gray-500 hover:text-gray-800"
          title="Osvježi"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 py-10 text-gray-400">
          <Loader2 size={18} className="animate-spin" />
          Učitavanje…
        </div>
      ) : (
        <form
          onSubmit={(e) => void handleSave(e)}
          className="max-w-xl space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Osnovna cijena (€ / noć)
            </label>
            <input
              type="number"
              min={1}
              max={50000}
              step={1}
              value={basePrice}
              onChange={(e) => {
                setBasePrice(e.target.value);
                markDirty();
              }}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              Zadano u kodu: {defaults.basePricePerNight} € · Blagdanske cijene imaju prednost
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Minimalni broj noći
            </label>
            <input
              type="number"
              min={1}
              max={30}
              step={1}
              value={minNights}
              onChange={(e) => {
                setMinNights(e.target.value);
                markDirty();
              }}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              Zadano u kodu: {defaults.minNights} noći
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Usluga čišćenja (€ / rezervacija)
            </label>
            <input
              type="number"
              min={0}
              max={50000}
              step={1}
              value={cleaningFee}
              onChange={(e) => {
                setCleaningFee(e.target.value);
                markDirty();
              }}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              Zadano u kodu: {defaults.cleaningFee} €
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Popust od (noći)
              </label>
              <input
                type="number"
                min={2}
                max={60}
                step={1}
                value={longStayNights}
                onChange={(e) => {
                  setLongStayNights(e.target.value);
                  markDirty();
                }}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Zadano: {defaults.longStayDiscountNights}+ noći
              </p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                Popust (%)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                step={1}
                value={longStayPercent}
                onChange={(e) => {
                  setLongStayPercent(e.target.value);
                  markDirty();
                }}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">
                Zadano: {defaults.longStayDiscountPercent} %
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !dirty}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}
            Spremi
          </button>
        </form>
      )}
    </div>
  );
}
