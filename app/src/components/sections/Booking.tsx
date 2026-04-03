import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import {
  MIN_NIGHTS,
  DEPOSIT_PERCENT,
  RECIPIENT_NAME,
  RECIPIENT_BIC,
  RECIPIENT_BANK_NAME,
  BALANCE_DAYS_BEFORE_CHECK_IN,
  CANCELLATION_POLICY_LINES_HR,
  INVOICE_POLICY_HR,
} from '@/modules/booking-admin/booking.config';

const DEPOSIT_PCT = Math.round(DEPOSIT_PERCENT * 100);
const BALANCE_PCT = 100 - DEPOSIT_PCT;

export function Booking() {
  return (
    <SectionWrapper id="rezervacije" bg="cream">
      <SectionHeading
        label="Rezervacija"
        title="Rezervirajte direktno"
        subtitle="Bez platformi, bez provizija. Direktno s vlasnikom po najboljoj cijeni."
      />

      {/* Inline rules text prilagođen za Villa Velebita */}
      <div className="max-w-2xl mx-auto">
        <BookingWidget
          initialSlug="villa-velebita"
          rulesText={
            <div className="bg-cream-dark rounded-xl p-4 text-xs text-stone space-y-1">
              <p>
                <strong className="text-oak">Dolazak:</strong> 14:00 – 23:00
                &nbsp;|&nbsp;
                <strong className="text-oak">Odlazak:</strong> 09:00 – 11:00
              </p>
              <p>
                <strong className="text-oak">Minimalni boravak:</strong> {MIN_NIGHTS} noći
              </p>
              <p>
                <strong className="text-oak">Plaćanje:</strong> {DEPOSIT_PCT}% depozita pri
                rezervaciji na IBAN (primatelj: {RECIPIENT_NAME}); preostalih {BALANCE_PCT}% uplatiti
                najkasnije {BALANCE_DAYS_BEFORE_CHECK_IN} dana prije dolaska.{' '}
                <strong className="text-oak">Banka:</strong> {RECIPIENT_BANK_NAME} — BIC/SWIFT{' '}
                {RECIPIENT_BIC} (uplate iz inozemstva).
              </p>
              <p>
                <strong className="text-oak">Otkazivanje (depozit):</strong>
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-stone ml-0.5">
                {CANCELLATION_POLICY_LINES_HR.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p>
                <strong className="text-oak">Računi:</strong> {INVOICE_POLICY_HR}
              </p>
              <p>
                <strong className="text-oak">Popust 7+ noći:</strong> 10% popusta — javite se za
                ponudu
              </p>
            </div>
          }
        />
      </div>
    </SectionWrapper>
  );
}
