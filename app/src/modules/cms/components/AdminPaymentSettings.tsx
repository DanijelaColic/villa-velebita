'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, RefreshCw, Save } from 'lucide-react';

type Props = {
  showToast: (message: string, type?: 'success' | 'error') => void;
};

type PaymentFields = {
  iban: string;
  recipientName: string;
  bic: string;
  bankName: string;
};

type PaymentResponse = PaymentFields & {
  defaults: PaymentFields;
};

const EMPTY: PaymentFields = {
  iban: '',
  recipientName: '',
  bic: '',
  bankName: '',
};

export default function AdminPaymentSettings({ showToast }: Props) {
  const [form, setForm] = useState<PaymentFields>(EMPTY);
  const [defaults, setDefaults] = useState<PaymentFields>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dirty, setDirty] = useState(false);

  const applyResponse = (data: PaymentResponse) => {
    setForm({
      iban: data.iban,
      recipientName: data.recipientName,
      bic: data.bic,
      bankName: data.bankName,
    });
    setDefaults(data.defaults);
    setDirty(false);
  };

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/payment-settings');
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        `Greška pri učitavanju (HTTP ${res.status}). ${
          (body as { error?: string }).error ??
          'Provjeri tablicu site_settings.'
        }`,
      );
      setLoading(false);
      return;
    }
    applyResponse((await res.json()) as PaymentResponse);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  const update = (patch: Partial<PaymentFields>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const res = await fetch('/api/admin/payment-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);

    if (!res.ok) {
      const message = (data as { error?: string }).error ?? 'Spremanje nije uspjelo.';
      setError(message);
      showToast(message, 'error');
      return;
    }

    applyResponse(data as PaymentResponse);
    showToast('Podaci za uplatu su spremljeni.');
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-xl font-semibold text-gray-900">
            Podaci za uplatu (IBAN)
          </h2>
          <p className="text-sm text-gray-500">
            Koriste se u emailu, QR kodovima, FAQ-u i na ekranu nakon rezervacije.
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
              Primatelj (ime)
            </label>
            <input
              type="text"
              value={form.recipientName}
              onChange={(e) => update({ recipientName: e.target.value })}
              required
              maxLength={120}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">Zadano: {defaults.recipientName}</p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">IBAN</label>
            <input
              type="text"
              value={form.iban}
              onChange={(e) => update({ iban: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-gray-400">Zadano: {defaults.iban}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">
                BIC / SWIFT
              </label>
              <input
                type="text"
                value={form.bic}
                onChange={(e) => update({ bic: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 font-mono text-sm focus:border-primary focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">Zadano: {defaults.bic}</p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Banka</label>
              <input
                type="text"
                value={form.bankName}
                onChange={(e) => update({ bankName: e.target.value })}
                required
                maxLength={120}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <p className="mt-1 text-[11px] text-gray-400">Zadano: {defaults.bankName}</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || !dirty}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            Spremi uplatne podatke
          </button>
        </form>
      )}
    </div>
  );
}
