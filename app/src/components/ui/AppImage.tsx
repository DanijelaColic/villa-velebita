import NextImage from 'next/image';
import type { ComponentProps } from 'react';

type AppImageProps = Omit<ComponentProps<typeof NextImage>, 'unoptimized'> & {
  unoptimized?: boolean;
};

export function AppImage({ unoptimized = true, ...props }: AppImageProps) {
  return <NextImage {...props} unoptimized={unoptimized} />;
}

