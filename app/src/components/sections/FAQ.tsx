import { getLocale, getTranslations } from 'next-intl/server';
import {
  DEPOSIT_PERCENT,
  BALANCE_DAYS_BEFORE_CHECK_IN,
} from '@/modules/booking-admin/booking.config';
import { getBookingSettings } from '@/modules/cms/lib/get-booking-settings';
import { getPaymentSettings } from '@/modules/cms/lib/get-payment-settings';
import {
  fillSiteTextTemplate,
  getDefaultSiteText,
  getSiteTextOverrides,
  resolveSiteText,
} from '@/modules/cms/lib/get-site-texts';
import { getValidLocale } from '@/i18n/messages';
import type { EditableSiteTextKey } from '@/modules/cms/constants';
import FAQAccordion from './FAQAccordion';

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

export async function FAQ() {
  const locale = getValidLocale(await getLocale());
  const t = await getTranslations('faq');
  const [settings, overrides, payment] = await Promise.all([
    getBookingSettings(),
    getSiteTextOverrides(locale),
    getPaymentSettings(),
  ]);

  const vars = {
    depositPercent: DEPOSIT_PCT_FAQ,
    iban: payment.iban,
    recipientName: payment.recipientName,
    bankName: payment.bankName,
    bic: payment.bic,
    balancePercent: BALANCE_PCT_FAQ,
    balanceDays: BALANCE_DAYS_BEFORE_CHECK_IN,
    cleaningFee: settings.cleaningFee,
    minNights: settings.minNights,
    basePrice: settings.basePricePerNight,
    discountNights: settings.longStayDiscountNights,
    discountPercent: settings.longStayDiscountPercent,
  };

  const title = resolveSiteText(
    overrides,
    'faq.heading.title',
    t('heading.title'),
  );
  const subtitle = resolveSiteText(
    overrides,
    'faq.heading.subtitle',
    t('heading.subtitle'),
  );

  const items = FAQ_ITEM_KEYS.map((key) => {
    const questionKey = `faq.items.${key}.question` as EditableSiteTextKey;
    const answerKey = `faq.items.${key}.answer` as EditableSiteTextKey;
    const question = resolveSiteText(
      overrides,
      questionKey,
      getDefaultSiteText(locale, questionKey) || t(`items.${key}.question`),
    );
    const answerTemplate = resolveSiteText(
      overrides,
      answerKey,
      getDefaultSiteText(locale, answerKey) || t(`items.${key}.answer`, vars),
    );
    return {
      question,
      answer: fillSiteTextTemplate(answerTemplate, vars),
    };
  });

  return (
    <FAQAccordion title={title} subtitle={subtitle} items={items} />
  );
}
