import type {Metadata} from 'next';
import type {Locale} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {routing} from './routing';

const SITE_URL = 'https://villavelebita.hr';
const SITE_NAME = 'Villa Velebita';
const HERO_OG_IMAGE_PATH = '/images/hero/exterior-08.jpg';

const OPEN_GRAPH_LOCALES: Record<string, string> = {
  hr: 'hr_HR',
  en: 'en_US',
  de: 'de_DE',
  it: 'it_IT',
};

const KEYWORDS_BY_LOCALE: Record<string, string[]> = {
  hr: [
    'kuća za odmor Lika',
    'smještaj blizu Plitvičkih jezera',
    'villa Vrhovine',
    'odmor Rudopolje',
    'zipline Pazi Medo',
    'kuća za iznajmljivanje Lika',
    'privatni smještaj Plitvice',
    'villa s jacuzzijem Hrvatska',
  ],
  en: [
    'holiday house Lika',
    'accommodation near Plitvice Lakes',
    'villa Vrhovine',
    'Rudopolje getaway',
    'Plitvice private accommodation',
    'Croatia villa with jacuzzi',
    'vacation rental Croatia',
    'holiday house near Plitvice Lakes',
  ],
  de: [
    'Ferienhaus Lika',
    'Unterkunft nahe Plitvicer Seen',
    'Villa Vrhovine',
    'Urlaub Rudopolje',
    'private Unterkunft Plitvice',
    'Villa mit Whirlpool Kroatien',
    'Ferienhaus Kroatien',
    'Urlaubshaus nahe Plitvicer Seen',
  ],
  it: [
    'casa vacanze Lika',
    'alloggio vicino ai Laghi di Plitvice',
    'villa Vrhovine',
    'vacanza Rudopolje',
    'alloggio privato Plitvice',
    'villa con jacuzzi Croazia',
    'casa vacanze Croazia',
    'casa vicino ai Laghi di Plitvice',
  ],
};

function getLocalizedPath(locale: Locale, pathname: string) {
  const normalizedPath = pathname === '/' ? '' : pathname;

  if (locale === routing.defaultLocale) {
    return normalizedPath || '/';
  }

  return `/${locale}${normalizedPath}`;
}

function getLanguageAlternates(pathname: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, getLocalizedPath(locale, pathname)]),
  );
}

function getOpenGraphLocale(locale: Locale) {
  return OPEN_GRAPH_LOCALES[locale] ?? OPEN_GRAPH_LOCALES[routing.defaultLocale];
}

function getKeywords(locale: Locale) {
  return KEYWORDS_BY_LOCALE[locale] ?? KEYWORDS_BY_LOCALE[routing.defaultLocale];
}

function getSharedImageMetadata(locale: Locale, alt: string) {
  return {
    images: [
      {
        url: HERO_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt,
      },
    ],
    locale: getOpenGraphLocale(locale),
  };
}

export async function getRootMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata.layout'});

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    keywords: getKeywords(locale),
    authors: [{name: SITE_NAME}],
    creator: SITE_NAME,
    verification: {
      google: '4ugte3dwYu7RDKWlmZ68Bb_xAAa1m5sODy_5f-MrLr8',
    },
    alternates: {
      canonical: getLocalizedPath(locale, '/'),
      languages: getLanguageAlternates('/'),
    },
    openGraph: {
      type: 'website',
      url: getLocalizedPath(locale, '/'),
      siteName: SITE_NAME,
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      ...getSharedImageMetadata(locale, t('openGraph.imageAlt')),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: [HERO_OG_IMAGE_PATH],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

type PageMetadataOptions = {
  locale: Locale;
  pathname: string;
  namespace: string;
  robots?: Metadata['robots'];
};

export async function getPageMetadata({
  locale,
  pathname,
  namespace,
  robots,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({locale, namespace});
  const localizedPath = getLocalizedPath(locale, pathname);

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: localizedPath,
      languages: getLanguageAlternates(pathname),
    },
    openGraph: {
      url: localizedPath,
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      ...getSharedImageMetadata(locale, t('openGraph.imageAlt')),
    },
    ...(robots ? {robots} : {}),
  };
}

export async function getStructuredData(locale: Locale) {
  const t = await getTranslations({locale, namespace: 'metadata.structuredData'});

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SITE_NAME,
    description: t('description'),
    url: SITE_URL,
    telephone: '+385919295907',
    email: 'Ivica.cacic485@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rudopolje 124',
      addressLocality: 'Vrhovine',
      postalCode: '53223',
      addressCountry: 'HR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.8624957,
      longitude: 15.4748033,
    },
    image: `${SITE_URL}${HERO_OG_IMAGE_PATH}`,
    priceRange: 'EUR',
    currenciesAccepted: 'EUR',
    numberOfRooms: 3,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: 9,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: t('amenities.jacuzzi'), value: true },
      { '@type': 'LocationFeatureSpecification', name: t('amenities.wifi'), value: true },
      { '@type': 'LocationFeatureSpecification', name: t('amenities.parking'), value: true },
      { '@type': 'LocationFeatureSpecification', name: t('amenities.grill'), value: true },
      { '@type': 'LocationFeatureSpecification', name: t('amenities.kitchen'), value: true },
      { '@type': 'LocationFeatureSpecification', name: t('amenities.linen'), value: true },
    ],
    checkinTime: '14:00',
    checkoutTime: '10:00',
    petsAllowed: false,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+385919295907',
      contactType: 'reservations',
      availableLanguage: ['Croatian', 'English', 'German', 'Italian'],
    },
  };
}
