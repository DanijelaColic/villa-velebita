import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      {label && (
        <span
          className={cn(
            'inline-block text-xs font-sans font-semibold uppercase tracking-[0.2em] mb-3',
            light ? 'text-stone-light' : 'text-terracotta',
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-5xl font-semibold',
          light ? 'text-cream' : 'text-oak',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base md:text-lg max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-stone-light' : 'text-stone',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
