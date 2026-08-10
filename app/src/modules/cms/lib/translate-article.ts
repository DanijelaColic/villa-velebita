import type { AppLocale } from '@/i18n/routing';
import type { TipTapDoc, TipTapNode } from '../types';
import { isTipTapDoc, normalizeTipTapDoc } from './tiptap-text';

export type ArticleSourceForTranslate = {
  title: string;
  excerpt: string;
  content: TipTapDoc | null;
  seo_title: string;
  seo_description: string;
};

export type ArticleTranslationResult = {
  title: string;
  excerpt: string;
  content: TipTapDoc | null;
  seo_title: string;
  seo_description: string;
};

const TARGET_LABELS: Record<'en' | 'de' | 'it', string> = {
  en: 'English',
  de: 'German',
  it: 'Italian',
};

export function getOpenAiConfig():
  | { ok: true; apiKey: string; model: string }
  | { ok: false; error: string } {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      error:
        'OPENAI_API_KEY nije postavljen u .env.local. Dodaj ključ pa ponovi.',
    };
  }
  const model = process.env.OPENAI_TRANSLATE_MODEL?.trim() || 'gpt-4o-mini';
  return { ok: true, apiKey, model };
}

/** Sakuplja text leafove iz TipTap stabla (redoslijed DFS). */
export function extractTextLeaves(doc: TipTapDoc | null): string[] {
  if (!doc?.content?.length) return [];
  const leaves: string[] = [];

  const walk = (node: TipTapNode) => {
    if (node.type === 'text' && typeof node.text === 'string' && node.text.length > 0) {
      leaves.push(node.text);
    }
    node.content?.forEach(walk);
  };

  doc.content.forEach(walk);
  return leaves;
}

/** Upiše prevedene leafove natrag u klon TipTap doca. */
export function applyTextLeaves(
  doc: TipTapDoc,
  leaves: string[],
): TipTapDoc | null {
  const clone = structuredClone(doc) as TipTapDoc;
  let i = 0;

  const walk = (node: TipTapNode) => {
    if (node.type === 'text' && typeof node.text === 'string' && node.text.length > 0) {
      if (i < leaves.length) {
        node.text = leaves[i] ?? node.text;
        i += 1;
      }
    }
    node.content?.forEach(walk);
  };

  clone.content?.forEach(walk);

  if (i !== leaves.length) {
    return null;
  }

  return normalizeTipTapDoc(clone);
}

type PayloadForLocale = {
  title: string;
  excerpt: string;
  seo_title: string;
  seo_description: string;
  body_parts: string[];
};

function buildUserPayload(source: ArticleSourceForTranslate): PayloadForLocale {
  return {
    title: source.title,
    excerpt: source.excerpt,
    seo_title: source.seo_title,
    seo_description: source.seo_description,
    body_parts: extractTextLeaves(source.content),
  };
}

function parseLocalePayload(
  raw: unknown,
  expectedParts: number,
): PayloadForLocale | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.title !== 'string') return null;
  if (typeof o.excerpt !== 'string') return null;
  if (typeof o.seo_title !== 'string') return null;
  if (typeof o.seo_description !== 'string') return null;
  if (!Array.isArray(o.body_parts)) return null;
  if (o.body_parts.length !== expectedParts) return null;
  if (!o.body_parts.every((p) => typeof p === 'string')) return null;

  return {
    title: o.title,
    excerpt: o.excerpt,
    seo_title: o.seo_title,
    seo_description: o.seo_description,
    body_parts: o.body_parts as string[],
  };
}

async function callOpenAiJson(opts: {
  apiKey: string;
  model: string;
  system: string;
  user: string;
}): Promise<unknown> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: opts.model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: opts.system },
        { role: 'user', content: opts.user },
      ],
    }),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: { message?: string };
    choices?: Array<{ message?: { content?: string } }>;
  };

  if (!res.ok) {
    throw new Error(
      data.error?.message ?? `OpenAI greška (HTTP ${res.status}).`,
    );
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('OpenAI nije vratio sadržaj.');
  }

  try {
    return JSON.parse(content) as unknown;
  } catch {
    throw new Error('OpenAI odgovor nije valjani JSON.');
  }
}

/**
 * Prevedi HR članak na EN/DE/IT.
 * TipTap struktura (bold, naslovi, liste) ostaje; prevode se samo text leafovi.
 */
export async function translateArticleFromHr(
  source: ArticleSourceForTranslate,
  targets: Array<'en' | 'de' | 'it'> = ['en', 'de', 'it'],
): Promise<Record<'en' | 'de' | 'it', ArticleTranslationResult>> {
  const config = getOpenAiConfig();
  if (!config.ok) {
    throw new Error(config.error);
  }

  if (!source.title.trim()) {
    throw new Error('Hrvatski naslov je obavezan za prijevod.');
  }

  const payload = buildUserPayload(source);
  const expectedParts = payload.body_parts.length;

  const system = `You are a professional translator for a Croatian holiday villa website (Villa Velebita, Lika / Plitvice area).
Translate the given Croatian article fields into the requested languages.
Keep tone warm, clear, and suitable for tourism guests.
Do NOT translate proper nouns that should stay: Villa Velebita, Plitvice, Lika, Croatia brand names when they are names.
Preserve any {placeholder} tokens exactly.
Return ONLY valid JSON with this shape:
{
  "en": { "title": "...", "excerpt": "...", "seo_title": "...", "seo_description": "...", "body_parts": ["..."] },
  "de": { ... },
  "it": { ... }
}
Include ONLY the requested locale keys.
body_parts MUST have exactly the same number of strings as the source (same order), each string being the translation of the corresponding source part.
seo_title/seo_description may be empty strings if the source is empty.`;

  const user = JSON.stringify({
    source_locale: 'hr',
    target_locales: targets.map((t) => TARGET_LABELS[t]),
    target_keys: targets,
    source: payload,
  });

  const parsed = await callOpenAiJson({
    apiKey: config.apiKey,
    model: config.model,
    system,
    user,
  });

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Neočekivani format prijevoda.');
  }

  const root = parsed as Record<string, unknown>;
  const result = {} as Record<'en' | 'de' | 'it', ArticleTranslationResult>;

  for (const locale of targets) {
    const localePayload = parseLocalePayload(root[locale], expectedParts);
    if (!localePayload) {
      throw new Error(
        `Prijevod za ${locale.toUpperCase()} nije valjan (broj dijelova sadržaja ili polja).`,
      );
    }

    let content: TipTapDoc | null = null;
    if (source.content && isTipTapDoc(source.content) && expectedParts > 0) {
      content = applyTextLeaves(source.content, localePayload.body_parts);
      if (!content) {
        throw new Error(
          `Nije uspjelo spojiti TipTap sadržaj za ${locale.toUpperCase()}.`,
        );
      }
    }

    result[locale] = {
      title: localePayload.title.trim(),
      excerpt: localePayload.excerpt.trim(),
      content,
      seo_title: localePayload.seo_title.trim(),
      seo_description: localePayload.seo_description.trim(),
    };
  }

  return result;
}

export function isTranslateTargetLocale(
  value: string,
): value is 'en' | 'de' | 'it' {
  return value === 'en' || value === 'de' || value === 'it';
}

export type { AppLocale };
