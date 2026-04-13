import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getTranslations } from 'next-intl/server';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { MIN_NIGHTS } from '@/modules/booking-admin/booking.config';

export async function Booking() {
  const t = await getTranslations('bookingSection');

  return (
    <SectionWrapper id="rezervacije" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={t('heading.title')}
        subtitle={t('heading.subtitle')}
      />

      {/* Inline rules text prilagođen za Villa Velebita */}
      <div className="max-w-2xl mx-auto">
        <BookingWidget
          initialSlug="villa-velebita"
          rulesText={
            <div className="bg-cream-dark rounded-xl p-4 text-xs text-stone space-y-1">
              <p>
                <strong className="text-oak">{t('rules.checkInLabel')}</strong> 14:00 – 23:00
                &nbsp;|&nbsp;
                <strong className="text-oak">{t('rules.checkOutLabel')}</strong> 09:00 – 11:00
              </p>
              <p>
                <strong className="text-oak">{t('rules.minStayLabel')}</strong>{' '}
                {t('rules.minStayValue', { count: MIN_NIGHTS })}
              </p>
              <p>
                <strong className="text-oak">{t('rules.discountLabel')}</strong>{' '}
                {t('rules.discountValue')}
              </p>
              <p className="text-stone/90">
                {t('rules.paymentNote')}
              </p>
            </div>
          }
        />
      </div>
    </SectionWrapper>
  );
}
