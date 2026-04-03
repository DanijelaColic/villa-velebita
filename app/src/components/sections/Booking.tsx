import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { MIN_NIGHTS } from '@/modules/booking-admin/booking.config';

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
                <strong className="text-oak">Dolazak (check-in):</strong> 14:00 – 23:00
                &nbsp;|&nbsp;
                <strong className="text-oak">Odlazak (check-out):</strong> 09:00 – 11:00
              </p>
              <p>
                <strong className="text-oak">Minimalni boravak:</strong> {MIN_NIGHTS} noći
              </p>
              <p>
                <strong className="text-oak">Popust 7+ noći:</strong> 10% popusta — javite se za
                ponudu
              </p>
              <p className="text-stone/90">
                Detalji o plaćanju, otkazivanju i IBAN prikazuju se nakon slanja upita.
              </p>
            </div>
          }
        />
      </div>
    </SectionWrapper>
  );
}
