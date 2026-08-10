'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export type FaqDisplayItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: FaqDisplayItem[];
};

export default function FAQAccordion({ title, subtitle, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <SectionWrapper id="faq" bg="cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionHeading titleAs="h1" title={title} subtitle={subtitle} />

      <div className="max-w-3xl mx-auto divide-y divide-stone-pale">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-start justify-between gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-oak text-base md:text-lg leading-snug group-hover:text-terracotta transition-colors duration-150">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    'size-5 text-terracotta shrink-0 mt-0.5 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  isOpen ? 'max-h-96 pb-5' : 'max-h-0',
                )}
                aria-hidden={!isOpen}
              >
                <p className="text-stone text-sm md:text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
