import type { TipTapDoc, TipTapNode } from '../types';

/** Pretvara plain text (prazan red = novi paragraf) u TipTap JSON. */
export function plainTextToTipTapDoc(text: string): TipTapDoc | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\n/g, ' ').trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return {
    type: 'doc',
    content: paragraphs.map(
      (paragraph): TipTapNode => ({
        type: 'paragraph',
        content: [{ type: 'text', text: paragraph }],
      }),
    ),
  };
}

/** TipTap JSON → plain text (za textarea dok TipTap nije spojen). */
export function tipTapDocToPlainText(doc: TipTapDoc | null | undefined): string {
  if (!doc?.content?.length) return '';

  const blocks: string[] = [];

  for (const node of doc.content) {
    const text = extractNodeText(node).trim();
    if (text) blocks.push(text);
  }

  return blocks.join('\n\n');
}

function extractNodeText(node: TipTapNode): string {
  if (node.type === 'text') return node.text ?? '';
  if (!node.content?.length) return '';
  return node.content.map(extractNodeText).join('');
}

export function isTipTapDoc(value: unknown): value is TipTapDoc {
  if (!value || typeof value !== 'object') return false;
  const doc = value as TipTapDoc;
  return doc.type === 'doc' && (doc.content === undefined || Array.isArray(doc.content));
}

/** True ako dokument nema vidljivog teksta (prazni paragrafi). */
export function isEmptyTipTapDoc(doc: TipTapDoc | null | undefined): boolean {
  if (!doc) return true;
  return tipTapDocToPlainText(doc).trim().length === 0;
}

/** Prazan TipTap doc → null; inače doc. */
export function normalizeTipTapDoc(doc: TipTapDoc | null | undefined): TipTapDoc | null {
  if (!doc || isEmptyTipTapDoc(doc)) return null;
  return doc;
}
