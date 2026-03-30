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
  ],
  authors: [{ name: 'Villa Velebita' }],
  creator: 'Villa Velebita',
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
        url: '/images/og-image.jpg',
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
    images: ['/images/og-image.jpg'],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
