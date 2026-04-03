'use client';

import { useState } from 'react';
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
  CANCELLATION_POLICY_LINES_HR,
  INVOICE_POLICY_HR,
} from '@/modules/booking-admin/booking.config';

const DEPOSIT_PCT_FAQ = Math.round(DEPOSIT_PERCENT * 100);
const BALANCE_PCT_FAQ = 100 - DEPOSIT_PCT_FAQ;

const FAQ_ITEMS = [
  {
    question: 'Koliko je Villa Velebita udaljena od Plitvičkih jezera?',
    answer:
      'Villa Velebita se nalazi u Rudopolju, svega 20 minuta vožnje od ulaza u Nacionalni park Plitvička jezera (Ulaz 1). Lokacija je savršena kao baza za jednodnevne izlete na Plitvice, ali i za istraživanje Like, Velebita i okolnih atrakcija.',
  },
  {
    question: 'Koliko gostiju može boraviti u villi?',
    answer:
      'Kuća je predviđena za do 13 gostiju — tri spavaće sobe, razvlačna garnitura u dnevnom boravku i dodatni ležajevi. Pogodna je za veće obitelji ili grupe prijatelja.',
  },
  {
    question: 'Što je uključeno u cijenu najma?',
    answer:
      'U cijenu su uključeni: posteljina i ručnici, završno čišćenje, šamponi i toaletni pribor, besplatni WiFi, besplatno parkiranje, korištenje vanjskog jacuzzija, roštilj i rustikalna pečenjara. Nema skrivenih troškova.',
  },
  {
    question: 'Kakav je minimalni boravak?',
    answer:
      'Minimalni boravak su 3 noći. Osnovna cijena je 560 € po noći za cijelu kuću (do 13 osoba). Za rezervacije od 7 ili više noći dobivate popust od 10%.',
  },
  {
    question: 'Prihvaćate li kućne ljubimce?',
    answer:
      'Naravno, kućni ljubimci su dobrodošli 😊Primamo manje pasmine uz prethodnu najavu, kako bismo osigurali ugodan boravak za sve goste.',
  },
  {
    question: 'Kada je check-in, a kada check-out?',
    answer:
      'Check-in je od 14:00, a check-out do 11:00. Za raniji dolazak ili kasniji odlazak, javite se unaprijed — nastojimo izaći u susret prema mogućnostima.',
  },
  {
    question: 'Kako funkcionira jacuzzi?',
    answer:
      'Vanjski jacuzzi se grije na drva — ekološki i autentičan ličko iskustvo. Paljenje vatre i grijanje vode traje otprilike 1,5–2 sata. Drva su dostupna na imanju.',
  },
  {
    question: 'Može li se platiti karticom?',
    answer: `Rezervacija se potvrđuje uplatom ${DEPOSIT_PCT_FAQ}% depozita bankovnom transakcijom na IBAN ${RECIPIENT_IBAN} (primatelj ${RECIPIENT_NAME}, ${RECIPIENT_BANK_NAME}). Za uplate iz inozemstva potreban je BIC/SWIFT: ${RECIPIENT_BIC}. Preostalih ${BALANCE_PCT_FAQ}% ukupne cijene potrebno je uplatiti najkasnije ${BALANCE_DAYS_BEFORE_CHECK_IN} dana prije dolaska, također na isti IBAN. Kartično plaćanje nije u ponudi.`,
  },
  {
    question: 'Kako glase uvjeti otkazivanja i kada dobivam račun?',
    answer: `${CANCELLATION_POLICY_LINES_HR.join(' ')} ${INVOICE_POLICY_HR}`,
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
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
        label="Česta pitanja"
        title="Sve što trebate znati"
        subtitle="Odgovori na najčešće upite gostiju — ako ne nađete odgovor, nazovite nas direktno."
      />

      <div className="max-w-3xl mx-auto divide-y divide-stone-pale">
        {FAQ_ITEMS.map((item, index) => {
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
