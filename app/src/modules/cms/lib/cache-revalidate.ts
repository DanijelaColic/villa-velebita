import { revalidateTag } from 'next/cache';
import type { CmsCacheTag } from './cache-tags';

/** Next 16: drugi arg "max" = stale-while-revalidate (preporučeno). Samo server/route handlers. */
export function revalidateCmsTag(tag: CmsCacheTag): void {
  revalidateTag(tag, 'max');
}
