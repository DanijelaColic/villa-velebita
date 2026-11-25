import sharp from 'sharp';

/** Dugi cache za verzijirane pathove (immutable filename). */
export const MEDIA_CACHE_CONTROL = 'public, max-age=31536000, immutable';

export const THUMB_MAX_WIDTH = 480;
export const LARGE_MAX_WIDTH = 1600;

export type OptimizedImageVariants = {
  thumbWebp: Buffer;
  largeWebp: Buffer;
  thumbContentType: 'image/webp';
  largeContentType: 'image/webp';
};

/** Generira thumb (~480) i large (~1600) WebP. EXIF rotacija uključena. */
export async function optimizeImageVariants(
  input: Buffer,
): Promise<OptimizedImageVariants> {
  const pipeline = sharp(input, { failOn: 'none' }).rotate();

  const [thumbWebp, largeWebp] = await Promise.all([
    pipeline
      .clone()
      .resize({
        width: THUMB_MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 78, effort: 4 })
      .toBuffer(),
    pipeline
      .clone()
      .resize({
        width: LARGE_MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 80, effort: 4 })
      .toBuffer(),
  ]);

  return {
    thumbWebp,
    largeWebp,
    thumbContentType: 'image/webp',
    largeContentType: 'image/webp',
  };
}
