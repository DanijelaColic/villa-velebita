/** Cache tagovi za javne CMS readove (unstable_cache). Bez next/cache importa — safe za dijeljenje. */
export const CMS_CACHE_TAGS = {
  siteTexts: 'cms:site-texts',
  bookingSettings: 'cms:booking-settings',
  specialPricePeriods: 'cms:special-price-periods',
  paymentSettings: 'cms:payment-settings',
  gallery: 'cms:gallery',
  articles: 'cms:articles',
  pageSeo: 'cms:page-seo',
} as const;

export type CmsCacheTag = (typeof CMS_CACHE_TAGS)[keyof typeof CMS_CACHE_TAGS];

/** TTL fallback (sekunde) ako on-demand revalidate propusti. */
export const CMS_CACHE_REVALIDATE_SECONDS = 900;
