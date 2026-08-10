import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticatedFromRequest } from '@/modules/booking-admin/lib/admin-auth';
import { isTipTapDoc } from '@/modules/cms/lib/tiptap-text';
import {
  getOpenAiConfig,
  isTranslateTargetLocale,
  translateArticleFromHr,
  type ArticleSourceForTranslate,
} from '@/modules/cms/lib/translate-article';

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticatedFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const config = getOpenAiConfig();
  if (!config.ok) {
    return NextResponse.json({ error: config.error }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Neispravan JSON' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const title = typeof data.title === 'string' ? data.title : '';
  const excerpt = typeof data.excerpt === 'string' ? data.excerpt : '';
  const seo_title = typeof data.seo_title === 'string' ? data.seo_title : '';
  const seo_description =
    typeof data.seo_description === 'string' ? data.seo_description : '';

  let content: ArticleSourceForTranslate['content'] = null;
  if (data.content !== null && data.content !== undefined && data.content !== '') {
    if (!isTipTapDoc(data.content)) {
      return NextResponse.json(
        { error: 'Sadržaj nije valjani TipTap dokument.' },
        { status: 400 },
      );
    }
    content = data.content;
  }

  if (!title.trim()) {
    return NextResponse.json(
      { error: 'Najprije upiši hrvatski naslov, pa pokreni prijevod.' },
      { status: 400 },
    );
  }

  let targets: Array<'en' | 'de' | 'it'> = ['en', 'de', 'it'];
  if (Array.isArray(data.targets) && data.targets.length > 0) {
    const parsed = data.targets.filter(
      (t): t is 'en' | 'de' | 'it' =>
        typeof t === 'string' && isTranslateTargetLocale(t),
    );
    if (parsed.length === 0) {
      return NextResponse.json(
        { error: 'Neispravni ciljni jezici (dozvoljeno: en, de, it).' },
        { status: 400 },
      );
    }
    targets = parsed;
  }

  try {
    const translations = await translateArticleFromHr(
      { title, excerpt, content, seo_title, seo_description },
      targets,
    );
    return NextResponse.json({ translations, model: config.model });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Prijevod nije uspio.';
    console.error('[articles/translate]', message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
