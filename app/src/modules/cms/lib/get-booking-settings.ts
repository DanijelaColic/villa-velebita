import { createServiceClient } from '@/lib/supabase';
import {
  MIN_NIGHTS as CONFIG_MIN_NIGHTS,
  CLEANING_FEE as CONFIG_CLEANING_FEE,
  LONG_STAY_DISCOUNT_NIGHTS as CONFIG_LONG_STAY_NIGHTS,
  LONG_STAY_DISCOUNT_RATE as CONFIG_LONG_STAY_RATE,
  SPECIAL_PRICE_PERIODS as CONFIG_SPECIAL_PRICE_PERIODS,
  apartments,
  type SpecialPricePeriod,
} from '@/modules/booking-admin/booking.config';
import type { Apartment } from '@/modules/booking-admin/types';

export type { SpecialPricePeriod };

export const BOOKING_SETTING_KEYS = {
  basePrice: 'booking.base_price_per_night',
  minNights: 'booking.min_nights',
  cleaningFee: 'booking.cleaning_fee',
  longStayNights: 'booking.long_stay_discount_nights',
  longStayPercent: 'booking.long_stay_discount_percent',
  specialPeriods: 'booking.special_price_periods',
} as const;

export type BookingSettings = {
  basePricePerNight: number;
  minNights: number;
  cleaningFee: number;
  longStayDiscountNights: number;
  /** Postotak 0–100 (npr. 10 = 10%) */
  longStayDiscountPercent: number;
};

const DEFAULT_BASE_PRICE = apartments[0]?.priceOffSeason ?? 270;
const DEFAULT_LONG_STAY_PERCENT = Math.round(CONFIG_LONG_STAY_RATE * 100);

export function getDefaultBookingSettings(): BookingSettings {
  return {
    basePricePerNight: DEFAULT_BASE_PRICE,
    minNights: CONFIG_MIN_NIGHTS,
    cleaningFee: CONFIG_CLEANING_FEE,
    longStayDiscountNights: CONFIG_LONG_STAY_NIGHTS,
    longStayDiscountPercent: DEFAULT_LONG_STAY_PERCENT,
  };
}

export function longStayRateFromSettings(settings: BookingSettings): number {
  return settings.longStayDiscountPercent / 100;
}

/** Parametri za calculatePrice (čišćenje + popust). */
export function priceFeesFromSettings(settings: BookingSettings) {
  return {
    cleaningFee: settings.cleaningFee,
    longStayDiscountNights: settings.longStayDiscountNights,
    longStayDiscountRate: longStayRateFromSettings(settings),
  };
}

export function getDefaultSpecialPricePeriods(): SpecialPricePeriod[] {
  return CONFIG_SPECIAL_PRICE_PERIODS.map((p) => ({ ...p }));
}

function parsePositiveNumber(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === '') return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return n;
}

function parseNonNegativeNumber(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === '') return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return n;
}

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  const n = Math.round(parsePositiveNumber(raw, fallback));
  if (n < 1) return fallback;
  return n;
}

const YMD_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidYmd(s: string): boolean {
  if (!YMD_RE.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y &&
    dt.getMonth() === m - 1 &&
    dt.getDate() === d
  );
}

function parseSpecialPeriodsJson(
  raw: string | undefined,
): SpecialPricePeriod[] | null {
  if (raw === undefined) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const periods: SpecialPricePeriod[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== 'object') continue;
      const row = item as Record<string, unknown>;
      const from = typeof row.from === 'string' ? row.from : '';
      const to = typeof row.to === 'string' ? row.to : '';
      const label = typeof row.label === 'string' ? row.label.trim() : '';
      const price =
        typeof row.pricePerNight === 'number'
          ? row.pricePerNight
          : typeof row.pricePerNight === 'string'
            ? Number(row.pricePerNight)
            : NaN;
      if (!isValidYmd(from) || !isValidYmd(to) || !label) continue;
      if (!Number.isFinite(price) || price < 1) continue;
      if (from > to) continue;
      periods.push({
        from,
        to,
        label,
        pricePerNight: Math.round(price * 100) / 100,
      });
    }
    return periods.sort((a, b) => a.from.localeCompare(b.from));
  } catch {
    return null;
  }
}

const SETTINGS_KEYS = [
  BOOKING_SETTING_KEYS.basePrice,
  BOOKING_SETTING_KEYS.minNights,
  BOOKING_SETTING_KEYS.cleaningFee,
  BOOKING_SETTING_KEYS.longStayNights,
  BOOKING_SETTING_KEYS.longStayPercent,
] as const;

/** Učitaj postavke iz DB-a (fallback na booking.config). */
export async function getBookingSettings(): Promise<BookingSettings> {
  const defaults = getDefaultBookingSettings();

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', [...SETTINGS_KEYS]);

    if (error) {
      console.error('Failed to fetch booking settings:', error.message);
      return defaults;
    }

    const map = new Map((data ?? []).map((row) => [row.key as string, row.value as string]));

    const percent = Math.round(
      parseNonNegativeNumber(
        map.get(BOOKING_SETTING_KEYS.longStayPercent),
        defaults.longStayDiscountPercent,
      ),
    );

    return {
      basePricePerNight: parsePositiveNumber(
        map.get(BOOKING_SETTING_KEYS.basePrice),
        defaults.basePricePerNight,
      ),
      minNights: parsePositiveInt(
        map.get(BOOKING_SETTING_KEYS.minNights),
        defaults.minNights,
      ),
      cleaningFee:
        Math.round(
          parseNonNegativeNumber(
            map.get(BOOKING_SETTING_KEYS.cleaningFee),
            defaults.cleaningFee,
          ) * 100,
        ) / 100,
      longStayDiscountNights: parsePositiveInt(
        map.get(BOOKING_SETTING_KEYS.longStayNights),
        defaults.longStayDiscountNights,
      ),
      longStayDiscountPercent: Math.min(100, Math.max(0, percent)),
    };
  } catch (err) {
    console.error('Failed to fetch booking settings:', err);
    return defaults;
  }
}

/**
 * Posebni periodi iz DB-a.
 * Nema retka → fallback na SPECIAL_PRICE_PERIODS u kodu.
 * Prazan JSON array → namjerno bez perioda.
 */
export async function getSpecialPricePeriods(): Promise<SpecialPricePeriod[]> {
  const defaults = getDefaultSpecialPricePeriods();

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .eq('key', BOOKING_SETTING_KEYS.specialPeriods)
      .maybeSingle();

    if (error) {
      console.error('Failed to fetch special price periods:', error.message);
      return defaults;
    }

    if (!data) return defaults;

    const parsed = parseSpecialPeriodsJson(data.value as string);
    return parsed ?? defaults;
  } catch (err) {
    console.error('Failed to fetch special price periods:', err);
    return defaults;
  }
}

/** Apartman s override cijenom iz postavki (oba sezona = flat rate). */
export function applyBasePriceToApartment(
  apartment: Apartment,
  basePricePerNight: number,
): Apartment {
  return {
    ...apartment,
    priceOffSeason: basePricePerNight,
    priceHighSeason: basePricePerNight,
  };
}

export function getApartmentWithSettings(
  slug: string,
  settings: BookingSettings,
): Apartment | undefined {
  const apt = apartments.find((a) => a.slug === slug);
  if (!apt) return undefined;
  return applyBasePriceToApartment(apt, settings.basePricePerNight);
}

export type BookingSettingsInput = {
  basePricePerNight: number;
  minNights: number;
  cleaningFee: number;
  longStayDiscountNights: number;
  longStayDiscountPercent: number;
};

function parseNumberField(raw: unknown): number {
  if (typeof raw === 'number') return raw;
  if (typeof raw === 'string') return Number(raw);
  return NaN;
}

export function validateBookingSettingsInput(
  body: unknown,
): { ok: true; data: BookingSettingsInput } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Neispravan JSON' };
  }

  const data = body as Record<string, unknown>;
  const base = parseNumberField(data.basePricePerNight);
  const minNights = Math.round(parseNumberField(data.minNights));
  const cleaningFee = parseNumberField(data.cleaningFee);
  const longStayNights = Math.round(parseNumberField(data.longStayDiscountNights));
  const longStayPercent = Math.round(parseNumberField(data.longStayDiscountPercent));

  if (!Number.isFinite(base) || base < 1 || base > 50_000) {
    return {
      ok: false,
      error: 'Osnovna cijena mora biti između 1 i 50 000 €.',
    };
  }
  if (!Number.isFinite(minNights) || minNights < 1 || minNights > 30) {
    return {
      ok: false,
      error: 'Minimalni boravak mora biti između 1 i 30 noći.',
    };
  }
  if (!Number.isFinite(cleaningFee) || cleaningFee < 0 || cleaningFee > 50_000) {
    return {
      ok: false,
      error: 'Čišćenje mora biti između 0 i 50 000 €.',
    };
  }
  if (!Number.isFinite(longStayNights) || longStayNights < 2 || longStayNights > 60) {
    return {
      ok: false,
      error: 'Prag popusta mora biti između 2 i 60 noći.',
    };
  }
  if (!Number.isFinite(longStayPercent) || longStayPercent < 0 || longStayPercent > 50) {
    return {
      ok: false,
      error: 'Popust mora biti između 0 i 50 %.',
    };
  }

  return {
    ok: true,
    data: {
      basePricePerNight: Math.round(base * 100) / 100,
      minNights,
      cleaningFee: Math.round(cleaningFee * 100) / 100,
      longStayDiscountNights: longStayNights,
      longStayDiscountPercent: longStayPercent,
    },
  };
}

export async function saveBookingSettings(
  input: BookingSettingsInput,
): Promise<BookingSettings> {
  const supabase = createServiceClient();
  const rows = [
    {
      key: BOOKING_SETTING_KEYS.basePrice,
      value: String(input.basePricePerNight),
    },
    {
      key: BOOKING_SETTING_KEYS.minNights,
      value: String(input.minNights),
    },
    {
      key: BOOKING_SETTING_KEYS.cleaningFee,
      value: String(input.cleaningFee),
    },
    {
      key: BOOKING_SETTING_KEYS.longStayNights,
      value: String(input.longStayDiscountNights),
    },
    {
      key: BOOKING_SETTING_KEYS.longStayPercent,
      value: String(input.longStayDiscountPercent),
    },
  ];

  const { error } = await supabase.from('site_settings').upsert(rows, {
    onConflict: 'key',
  });

  if (error) throw new Error(error.message);

  return { ...input };
}

export function validateSpecialPricePeriodsInput(
  body: unknown,
): { ok: true; data: SpecialPricePeriod[] } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Neispravan JSON' };
  }

  const periodsRaw = (body as { periods?: unknown }).periods;
  if (!Array.isArray(periodsRaw)) {
    return { ok: false, error: 'Očekivan je niz perioda (periods).' };
  }

  if (periodsRaw.length > 100) {
    return { ok: false, error: 'Najviše 100 posebnih perioda.' };
  }

  const periods: SpecialPricePeriod[] = [];

  for (let i = 0; i < periodsRaw.length; i++) {
    const item = periodsRaw[i];
    if (!item || typeof item !== 'object') {
      return { ok: false, error: `Period #${i + 1}: neispravan zapis.` };
    }
    const row = item as Record<string, unknown>;
    const from = typeof row.from === 'string' ? row.from.trim() : '';
    const to = typeof row.to === 'string' ? row.to.trim() : '';
    const label = typeof row.label === 'string' ? row.label.trim() : '';
    const priceRaw = row.pricePerNight;
    const price =
      typeof priceRaw === 'number'
        ? priceRaw
        : typeof priceRaw === 'string'
          ? Number(priceRaw)
          : NaN;

    if (!isValidYmd(from) || !isValidYmd(to)) {
      return {
        ok: false,
        error: `Period #${i + 1}: datumi moraju biti u formatu YYYY-MM-DD.`,
      };
    }
    if (from > to) {
      return {
        ok: false,
        error: `Period #${i + 1}: "od" mora biti prije ili jednak "do".`,
      };
    }
    if (!label || label.length > 80) {
      return {
        ok: false,
        error: `Period #${i + 1}: naziv je obavezan (max 80 znakova).`,
      };
    }
    if (!Number.isFinite(price) || price < 1 || price > 50_000) {
      return {
        ok: false,
        error: `Period #${i + 1}: cijena mora biti između 1 i 50 000 €.`,
      };
    }

    periods.push({
      from,
      to,
      label,
      pricePerNight: Math.round(price * 100) / 100,
    });
  }

  periods.sort((a, b) => a.from.localeCompare(b.from));
  return { ok: true, data: periods };
}

export async function saveSpecialPricePeriods(
  periods: SpecialPricePeriod[],
): Promise<SpecialPricePeriod[]> {
  const supabase = createServiceClient();
  const { error } = await supabase.from('site_settings').upsert(
    {
      key: BOOKING_SETTING_KEYS.specialPeriods,
      value: JSON.stringify(periods),
    },
    { onConflict: 'key' },
  );

  if (error) throw new Error(error.message);
  return periods;
}
