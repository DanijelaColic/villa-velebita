import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  bg?: 'cream' | 'cream-dark' | 'oak' | 'forest' | 'white';
  children: React.ReactNode;
}

const bgClasses = {
  cream: 'bg-cream',
  'cream-dark': 'bg-cream-dark',
  oak: 'bg-oak text-cream',
  forest: 'bg-forest text-cream',
  white: 'bg-white',
};

export function SectionWrapper({
  id,
  className,
  bg = 'cream',
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('px-4 sm:px-6 lg:px-8 py-section', bgClasses[bg], className)}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
