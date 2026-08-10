'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import type { SpecialPricePeriod } from '@/modules/booking-admin/booking.config';

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

type PeriodDraft = SpecialPricePeriod & { id: string };

type PeriodsResponse = {
  periods: SpecialPricePeriod[];
  defaults: SpecialPricePeriod[];
};

function toDrafts(periods: SpecialPricePeriod[]): PeriodDraft[] {
  return periods.map((p) => ({
    ...p,
    id: crypto.randomUUID(),
  }));
}

function emptyPeriod(): PeriodDraft {
  return {
    id: crypto.randomUUID(),
    from: '',
    to: '',
    pricePerNight: 360,
    label: '',
  };
}

export default function AdminSpecialPricePeriods({ showToast }: Props) {
  const [periods, setPeriods] = useState<PeriodDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);

  const fetchPeriods = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/special-price-periods');
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
    const data = (await res.json()) as PeriodsResponse;
    setPeriods(toDrafts(data.periods));
    setDirty(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchPeriods();
  }, [fetchPeriods]);

  const updatePeriod = (id: string, patch: Partial<SpecialPricePeriod>) => {
    setPeriods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    );
    setDirty(true);
  };

  const removePeriod = (id: string) => {
    setPeriods((prev) => prev.filter((p) => p.id !== id));
    setDirty(true);
  };

  const addPeriod = () => {
    setPeriods((prev) => [...prev, emptyPeriod()]);
    setDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = periods.map(({ from, to, pricePerNight, label }) => ({
      from,
      to,
      pricePerNight: Number(pricePerNight),
      label,
    }));

    const res = await fetch('/api/admin/special-price-periods', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ periods: payload }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      const message = (data as { error?: string }).error ?? 'Spremanje nije uspjelo.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    setPeriods(toDrafts((data as PeriodsResponse).periods));
    setDirty(false);
    showToast('Posebni periodi su spremljeni.');
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">
            Posebni periodi
          </h2>
          <p className="text-sm text-gray-500">
            Blagdani, Nova godina, vikendi — ove cijene imaju prednost nad osnovnom cijenom.
            Datumi su inkluzivni (zadnja noć uključena).
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchPeriods()}
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
          className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          {periods.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nema posebnih perioda. Dodaj npr. Božić ili Novu godinu.
            </p>
          ) : (
            <div className="space-y-3">
              {periods.map((period, index) => (
                <div
                  key={period.id}
                  className="grid gap-3 rounded-lg border border-gray-100 bg-gray-50/80 p-3 sm:grid-cols-[1fr_1fr_100px_1fr_auto]"
                >
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-500">
                      Od #{index + 1}
                    </label>
                    <input
                      type="date"
                      value={period.from}
                      onChange={(e) => updatePeriod(period.id, { from: e.target.value })}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-500">
                      Do
                    </label>
                    <input
                      type="date"
                      value={period.to}
                      onChange={(e) => updatePeriod(period.id, { to: e.target.value })}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-500">
                      € / noć
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50000}
                      step={1}
                      value={period.pricePerNight}
                      onChange={(e) =>
                        updatePeriod(period.id, {
                          pricePerNight: Number(e.target.value),
                        })
                      }
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] font-medium text-gray-500">
                      Naziv
                    </label>
                    <input
                      type="text"
                      value={period.label}
                      onChange={(e) => updatePeriod(period.id, { label: e.target.value })}
                      placeholder="npr. Blagdani"
                      maxLength={80}
                      required
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removePeriod(period.id)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      title="Obriši period"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={addPeriod}
              className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Plus size={15} />
              Dodaj period
            </button>
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
              Spremi periode
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
