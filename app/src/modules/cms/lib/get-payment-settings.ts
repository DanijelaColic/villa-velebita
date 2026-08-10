import { createServiceClient } from '@/lib/supabase';
import {
  RECIPIENT_IBAN as CONFIG_IBAN,
  RECIPIENT_NAME as CONFIG_NAME,
  RECIPIENT_BIC as CONFIG_BIC,
  RECIPIENT_BANK_NAME as CONFIG_BANK,
} from '@/modules/booking-admin/booking.config';

export const PAYMENT_SETTING_KEYS = {
  iban: 'payment.iban',
  recipientName: 'payment.recipient_name',
  bic: 'payment.bic',
  bankName: 'payment.bank_name',
} as const;

export type PaymentSettings = {
  iban: string;
  recipientName: string;
  bic: string;
  bankName: string;
};

export function getDefaultPaymentSettings(): PaymentSettings {
  return {
    iban: CONFIG_IBAN,
    recipientName: CONFIG_NAME,
    bic: CONFIG_BIC,
    bankName: CONFIG_BANK,
  };
}

function pickString(raw: string | undefined, fallback: string): string {
  if (raw === undefined) return fallback;
  const trimmed = raw.trim();
  return trimmed === '' ? fallback : trimmed;
}

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const defaults = getDefaultPaymentSettings();

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', Object.values(PAYMENT_SETTING_KEYS));

    if (error) {
      console.error('Failed to fetch payment settings:', error.message);
      return defaults;
    }

    const map = new Map((data ?? []).map((row) => [row.key as string, row.value as string]));

    return {
      iban: pickString(map.get(PAYMENT_SETTING_KEYS.iban), defaults.iban),
      recipientName: pickString(
        map.get(PAYMENT_SETTING_KEYS.recipientName),
        defaults.recipientName,
      ),
      bic: pickString(map.get(PAYMENT_SETTING_KEYS.bic), defaults.bic),
      bankName: pickString(map.get(PAYMENT_SETTING_KEYS.bankName), defaults.bankName),
    };
  } catch (err) {
    console.error('Failed to fetch payment settings:', err);
    return defaults;
  }
}

export type PaymentSettingsInput = PaymentSettings;

export function validatePaymentSettingsInput(
  body: unknown,
): { ok: true; data: PaymentSettingsInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Neispravan JSON' };
  }

  const data = body as Record<string, unknown>;
  const iban = typeof data.iban === 'string' ? data.iban.trim().replace(/\s+/g, '') : '';
  const recipientName =
    typeof data.recipientName === 'string' ? data.recipientName.trim() : '';
  const bic = typeof data.bic === 'string' ? data.bic.trim().replace(/\s+/g, '') : '';
  const bankName = typeof data.bankName === 'string' ? data.bankName.trim() : '';

  if (!iban || iban.length < 15 || iban.length > 34) {
    return { ok: false, error: 'IBAN mora imati između 15 i 34 znaka.' };
  }
  if (!/^[A-Z]{2}[0-9A-Z]+$/i.test(iban)) {
    return { ok: false, error: 'IBAN nije u ispravnom formatu.' };
  }
  if (!recipientName || recipientName.length > 120) {
    return { ok: false, error: 'Ime primatelja je obavezno (max 120 znakova).' };
  }
  if (!bic || bic.length < 8 || bic.length > 11) {
    return { ok: false, error: 'BIC/SWIFT mora imati 8–11 znakova.' };
  }
  if (!bankName || bankName.length > 120) {
    return { ok: false, error: 'Naziv banke je obavezan (max 120 znakova).' };
  }

  return {
    ok: true,
    data: {
      iban: iban.toUpperCase(),
      recipientName,
      bic: bic.toUpperCase(),
      bankName,
    },
  };
}

export async function savePaymentSettings(
  input: PaymentSettingsInput,
): Promise<PaymentSettings> {
  const supabase = createServiceClient();
  const rows = [
    { key: PAYMENT_SETTING_KEYS.iban, value: input.iban },
    { key: PAYMENT_SETTING_KEYS.recipientName, value: input.recipientName },
    { key: PAYMENT_SETTING_KEYS.bic, value: input.bic },
    { key: PAYMENT_SETTING_KEYS.bankName, value: input.bankName },
  ];

  const { error } = await supabase.from('site_settings').upsert(rows, {
    onConflict: 'key',
  });

  if (error) throw new Error(error.message);
  return input;
}
