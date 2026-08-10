import { createServiceClient } from '@/lib/supabase';
import type { AppLocale } from '@/i18n/routing';
import { getMessagesForLocale, getValidLocale } from '@/i18n/messages';
import {
  CMS_LOCALES,
  EDITABLE_SITE_TEXT_KEY_SET,
  EDITABLE_SITE_TEXT_KEYS,
  type EditableSiteTextKey,
} from '../constants';

/** Čita nested string iz messages JSON-a po dot pathu. */
export function getMessagePathValue(
  messages: unknown,
  path: string,
): string {
  const parts = path.split('.');
  let current: unknown = messages;

  for (const part of parts) {
    if (!current || typeof current !== 'object') return '';
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : '';
}

export function getDefaultSiteText(
  locale: AppLocale,
  key: EditableSiteTextKey | string,
): string {
  return getMessagePathValue(getMessagesForLocale(locale), key);
}

/** Override mapa key → value za jedan locale (samo whitelist ključevi). */
export async function getSiteTextOverrides(
  locale: string,
): Promise<Record<string, string>> {
  const appLocale = getValidLocale(locale);
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from('site_texts')
    .select('key, value')
    .eq('locale', appLocale);

  if (error) {
    console.error('Failed to fetch site_texts:', error.message);
    return {};
  }

  const map: Record<string, string> = {};
  for (const row of data ?? []) {
    if (
      EDITABLE_SITE_TEXT_KEY_SET.has(row.key) &&
      typeof row.value === 'string' &&
      row.value.trim() !== ''
    ) {
      map[row.key] = row.value;
    }
  }
  return map;
}

/** Vrijednost s DB overrideom ili messages fallback. */
export function resolveSiteText(
  overrides: Record<string, string>,
  key: EditableSiteTextKey,
  fallback: string,
): string {
  const override = overrides[key];
  if (override !== undefined && override.trim() !== '') return override;
  return fallback;
}

/** Jednostavna zamjena {placeholder} — za FAQ odgovore s cijenama iz postavki. */
export function fillSiteTextTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
    template,
  );
}

export type SiteTextAdminRow = {
  key: EditableSiteTextKey;
  locale: AppLocale;
  value: string;
  defaultValue: string;
};

/** Svi whitelist ključevi × jezici za admin formu. */
export async function getSiteTextsForAdmin(): Promise<SiteTextAdminRow[]> {
  const supabase = createServiceClient();
  const { data, error } = await supabase.from('site_texts').select('key, locale, value');

  if (error) {
    console.error('Failed to fetch site_texts for admin:', error.message);
  }

  const stored = new Map<string, string>();
  for (const row of data ?? []) {
    stored.set(`${row.key}::${row.locale}`, row.value ?? '');
  }

  const rows: SiteTextAdminRow[] = [];
  for (const item of EDITABLE_SITE_TEXT_KEYS) {
    for (const locale of CMS_LOCALES) {
      const mapKey = `${item.key}::${locale}`;
      rows.push({
        key: item.key,
        locale,
        value: stored.get(mapKey) ?? '',
        defaultValue: getDefaultSiteText(locale, item.key),
      });
    }
  }
  return rows;
}
