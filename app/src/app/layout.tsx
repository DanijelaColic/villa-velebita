import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
});

const HERO_OG_IMAGE_PATH = '/images/hero/exterior-08.jpg';

export const metadata: Metadata = {
  metadataBase: new URL('https://villavelebita.hr'),
  title: {
    default: 'Villa Velebita – Kuća za odmor u srcu Like | Vrhovine',
    template: '%s | Villa Velebita',
  },
  description:
    'Autentična kameno-drvena kuća za odmor u Rudopolju kod Vrhovine. Smještaj za 7+2 osobe, jacuzzi, roštilj, 20 min od Plitvičkih jezera. Rezervirajte direktno.',
  keywords: [
    'kuća za odmor Lika',
    'smještaj blizu Plitvičkih jezera',
    'villa Vrhovine',
    'odmor Rudopolje',
    'zipline Pazi Medo',
    'kuća za iznajmljivanje Lika',
    'privatni smještaj Plitvice',
    'villa s jacuzzijem Hrvatska',
    'vacation rental Croatia',
    'holiday house near Plitvice Lakes',
  ],
  authors: [{ name: 'Villa Velebita' }],
  creator: 'Villa Velebita',
  alternates: {
    canonical: 'https://villavelebita.hr',
  },
  verification: {
    google: '4ugte3dwYu7RDKWlmZ68Bb_xAAa1m5sODy_5f-MrLr8',
  },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://villavelebita.hr',
    siteName: 'Villa Velebita',
    title: 'Villa Velebita – Kuća za odmor u srcu Like',
    description:
      'Autentična kameno-drvena kuća za odmor u Rudopolju. Jacuzzi, roštilj, 20 min od Plitvičkih jezera. Idealno za obitelji do 9 osoba.',
    images: [
      {
        url: HERO_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'Villa Velebita – Kuća za odmor u Lici',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Velebita – Kuća za odmor u srcu Like',
    description: 'Autentična kuća za odmor blizu Plitvičkih jezera. Rezervirajte direktno.',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Villa Velebita',
  description:
    'Autentična kameno-drvena kuća za odmor u Rudopolju, Lika. Smještaj za do 9 osoba s jacuzzijem, roštiljem i pečenjarom, 20 minuta od Plitvičkih jezera.',
  url: 'https://villavelebita.hr',
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
  image: `https://villavelebita.hr${HERO_OG_IMAGE_PATH}`,
  priceRange: '€€€',
  currenciesAccepted: 'EUR',
  numberOfRooms: 3,
  occupancy: {
    '@type': 'QuantitativeValue',
    maxValue: 9,
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Jacuzzi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Besplatni WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Besplatno parkiranje', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Roštilj', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Potpuno opremljena kuhinja', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Posteljina i ručnici', value: true },
  ],
  checkinTime: '14:00',
  checkoutTime: '10:00',
  petsAllowed: false,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+385919295907',
    contactType: 'reservations',
    availableLanguage: ['Croatian', 'English'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hr"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
