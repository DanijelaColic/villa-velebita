'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import {
  RECIPIENT_IBAN,
  RECIPIENT_NAME,
  RECIPIENT_BIC,
  RECIPIENT_BANK_NAME,
  DEPOSIT_PERCENT,
  BALANCE_DAYS_BEFORE_CHECK_IN,
} from '@/modules/booking-admin/booking.config';

const DEPOSIT_PCT_FAQ = Math.round(DEPOSIT_PERCENT * 100);
const BALANCE_PCT_FAQ = 100 - DEPOSIT_PCT_FAQ;

const FAQ_ITEM_KEYS = [
  'distance',
  'capacity',
  'included',
  'minStay',
  'pets',
  'checkInOut',
  'jacuzzi',
  'payment',
  'cancellation',
] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = FAQ_ITEM_KEYS.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`, {
      depositPercent: DEPOSIT_PCT_FAQ,
      iban: RECIPIENT_IBAN,
      recipientName: RECIPIENT_NAME,
      bankName: RECIPIENT_BANK_NAME,
      bic: RECIPIENT_BIC,
      balancePercent: BALANCE_PCT_FAQ,
      balanceDays: BALANCE_DAYS_BEFORE_CHECK_IN,
    }),
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
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

      <SectionHeading
        titleAs="h1"
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      <div className="max-w-3xl mx-auto divide-y divide-stone-pale">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
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
                <p className="text-stone text-sm md:text-base leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
