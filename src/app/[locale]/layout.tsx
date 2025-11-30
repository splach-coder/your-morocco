import { NextIntlClientProvider, hasLocale, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/app/[locale]/components/Header";
import "../globals.css";
import WhatsAppButton from './components/WhatsAppButton';

import Script from 'next/script';
import AnalyticsListener from '@/lib/AnalyticsListener';
import Footer from './components/Footer';

// ---  SEO Metadata
export const metadata = {
  title: {
    default: 'Your Morocco | Authentic Moroccan Experiences & Tours',
    template: '%s | Your Morocco',
  },
  description:
    'Embark on a journey through ancient cities, vast deserts, and vibrant cultures. Our curated tours emphasize quality, comfort, and unforgettable memories, tailored to your desires.',
  keywords: [
    'Your Morocco',
    'Morocco tours',
    'Morocco travel',
    'Desert tours',
    'Atlas Mountains',
    'Moroccan experiences',
    'Marrakech tours',
    'Sahara desert',
    'Morocco adventures',
  ],
  openGraph: {
    title: 'Your Morocco | Authentic Moroccan Experiences & Tours',
    description:
      'Discover authentic Moroccan experiences with expert local guides. From vibrant souks to serene desert landscapes.',
    url: 'https://www.your-morocco.com',
    siteName: 'Your Morocco',
    images: [
      {
        url: 'https://www.your-morocco.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Morocco | Authentic Moroccan Experiences & Tours',
    description:
      'Discover authentic Moroccan experiences with expert local guides through Morocco.',
    site: '@your-morocco',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

function HeaderWithTranslations({ locale }: { locale: string }) {
  const t = useTranslations('Header');

  const translations = {
    home: t('home'),
    services: t('services'),
    tours: t('tours'),
    excursions: t('excursions'),
    activities: t('activities'),
    contact: t('contact'),
  };

  return <Header locale={locale} translations={translations} />;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google Analytics (GA4) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname
            });
          `}
        </Script>
      </head>
      <body cz-shortcut-listen="true">
        <AnalyticsListener />
        <HeaderWithTranslations locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
