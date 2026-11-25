'use client';

import { useEffect, useState } from 'react';
import { AppImage as Image } from '@/components/ui/AppImage';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Image>, 'src' | 'onError'> & {
  /** Preferirani (thumb/large) URL. */
  src: string;
  /** Fallback ako preferirani još ne postoji (pre-migracija). */
  fallbackSrc?: string;
};

/**
 * Za Supabase variante: pokušaj thumb/large, pri 404 padni na original.
 * Ne mijenja AppImage globalno — samo Storage mediji.
 */
export function StorageImage({ src, fallbackSrc, alt, ...props }: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      alt={alt}
      src={currentSrc}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
