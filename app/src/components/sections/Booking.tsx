import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getLocale, getTranslations } from 'next-intl/server';
import BookingWidget from '@/modules/booking-admin/components/BookingWidget';
import { getValidLocale } from '@/i18n/messages';
import {
  getSiteTextOverrides,
  resolveSiteText,
} from '@/modules/cms/lib/get-site-texts';
import { getBookingSettings, getSpecialPricePeriods, priceFeesFromSettings } from '@/modules/cms/lib/get-booking-settings';
import { getPaymentSettings } from '@/modules/cms/lib/get-payment-settings';

export async function Booking() {
  const locale = getValidLocale(await getLocale());
  const t = await getTranslations('bookingSection');
  const [overrides, bookingSettings, specialPricePeriods, payment] = await Promise.all([
    getSiteTextOverrides(locale),
    getBookingSettings(),
    getSpecialPricePeriods(),
    getPaymentSettings(),
  ]);
  const priceFees = priceFeesFromSettings(bookingSettings);
  const title = resolveSiteText(
    overrides,
    'bookingSection.heading.title',
    t('heading.title'),
  );
  const subtitle = resolveSiteText(
    overrides,
    'bookingSection.heading.subtitle',
    t('heading.subtitle'),
  );

  return (
    <SectionWrapper id="rezervacije" bg="cream">
      <SectionHeading
        label={t('heading.label')}
        title={title}
        subtitle={subtitle}
      />

      {/* Inline rules text prilagođen za Villa Velebita */}
      <div className="max-w-2xl mx-auto">
        <BookingWidget
          initialSlug="villa-velebita"
          minNights={bookingSettings.minNights}
          basePricePerNight={bookingSettings.basePricePerNight}
          specialPricePeriods={specialPricePeriods}
          priceFees={priceFees}
          payment={payment}
          rulesText={
            <div className="bg-cream-dark rounded-xl p-4 text-xs text-stone space-y-1">
              <p>
                <strong className="text-oak">{t('rules.checkInLabel')}</strong> 14:00 – 23:00
                &nbsp;|&nbsp;
                <strong className="text-oak">{t('rules.checkOutLabel')}</strong> 09:00 – 11:00
              </p>
              <p>
                <strong className="text-oak">{t('rules.minStayLabel')}</strong>{' '}
                {t('rules.minStayValue', { count: bookingSettings.minNights })}
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
