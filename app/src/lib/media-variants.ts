/**
 * Path konvencija za optimizirane Storage variante (bez DB migracije).
 *
 * Legacy:  `abc123.jpg`
 * Thumb:   `abc123-thumb.webp`
 * Large:   `abc123-large.webp`
 * Orig:    `abc123-orig.jpg` (opcionalno, backup)
 *
 * Novi upload: `opt/{ts}-{uuid}-thumb.webp` + `-large.webp`;
 * DB `storage_path` = `opt/{ts}-{uuid}-large.webp` (ili legacy original).
 */

export type MediaVariant = 'thumb' | 'large' | 'original';

const THUMB_RE = /-thumb\.webp$/i;
const LARGE_RE = /-large\.webp$/i;
const ORIG_RE = /-orig\.[^.]+$/i;

/** Bazni path bez -thumb/-large/-orig sufiksa i bez ekstenzije. */
export function getMediaBasePath(storagePath: string): string {
  if (THUMB_RE.test(storagePath)) return storagePath.replace(THUMB_RE, '');
  if (LARGE_RE.test(storagePath)) return storagePath.replace(LARGE_RE, '');
  if (ORIG_RE.test(storagePath)) return storagePath.replace(ORIG_RE, '');
  return storagePath.replace(/\.[^.]+$/, '');
}

export function getMediaVariantPath(
  storagePath: string,
  variant: MediaVariant,
): string {
  if (!storagePath || storagePath.startsWith('/') || storagePath.startsWith('http')) {
    return storagePath;
  }

  if (variant === 'original') {
    if (ORIG_RE.test(storagePath)) return storagePath;
    if (THUMB_RE.test(storagePath) || LARGE_RE.test(storagePath)) {
      // Originalni upload path nije poznat iz variant imena — vrati large kao najbolji full.
      return getMediaVariantPath(storagePath, 'large');
    }
    return storagePath;
  }

  const base = getMediaBasePath(storagePath);
  if (variant === 'thumb') return `${base}-thumb.webp`;
  return `${base}-large.webp`;
}

/** Svi mogući storage pathovi vezani uz jedan gallery/cms zapis (za delete). */
export function listRelatedStoragePaths(storagePath: string): string[] {
  if (!storagePath || storagePath.startsWith('/') || storagePath.startsWith('http')) {
    return storagePath ? [storagePath] : [];
  }

  const base = getMediaBasePath(storagePath);
  const paths = new Set<string>([
    storagePath,
    `${base}-thumb.webp`,
    `${base}-large.webp`,
  ]);

  // Legacy original s uobičajenim ekstenzijama.
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']) {
    paths.add(`${base}.${ext}`);
    paths.add(`${base}-orig.${ext}`);
  }

  return [...paths];
}

export function buildVersionedMediaBase(prefix = 'opt'): string {
  return `${prefix}/${Date.now()}-${crypto.randomUUID()}`;
}
