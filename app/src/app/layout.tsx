import type { Metadata } from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages, setRequestLocale} from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import {getRootMetadata, getStructuredData} from '@/i18n/metadata';
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  // next-intl: omogućuje static rendering kad je locale poznat (npr. [locale] + generateStaticParams).
  setRequestLocale(locale);

  return getRootMetadata(locale);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // Isto kao u [locale]/layout — bez ovoga root getLocale često forsira cijeli app u dynamic.
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = await getStructuredData(locale);

  return (
    <html
      lang={locale}
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
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
