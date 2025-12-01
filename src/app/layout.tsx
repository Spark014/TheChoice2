import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://the-choice2.vercel.app'),
  title: {
    default: 'The Choice Gems | Exquisite Gems & Jewelry',
    template: '%s | The Choice Gems',
  },
  description: 'Discover our exclusive collection of premium gemstones and handcrafted jewelry. The Choice Gems offers certified precious stones and bespoke designs.',
  keywords: ['gemstones', 'jewelry', 'diamonds', 'sapphires', 'rubies', 'emeralds', 'bespoke jewelry', 'luxury'],
  authors: [{ name: 'The Choice Gems' }],
  creator: 'The Choice Gems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://the-choice2.vercel.app',
    title: 'The Choice Gems | Exquisite Gems & Jewelry',
    description: 'Discover our exclusive collection of premium gemstones and handcrafted jewelry.',
    siteName: 'The Choice Gems',
    images: [
      {
        url: '/brand-logo.png',
        width: 800,
        height: 600,
        alt: 'The Choice Gems Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Choice Gems | Exquisite Gems & Jewelry',
    description: 'Discover our exclusive collection of premium gemstones and handcrafted jewelry.',
    images: ['/brand-logo.png'],
    creator: '@thechoicegems',
  },
  icons: {
    icon: '/brand-logo.png',
    shortcut: '/brand-logo.png',
    apple: '/brand-logo.png',
  },
};

import SmoothScroll from '@/components/ui/SmoothScroll';
import NewsletterPopup from '@/components/ui/NewsletterPopup';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&family=Great+Vibes&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <SmoothScroll>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
          <NewsletterPopup />
        </SmoothScroll>
      </body>
    </html>
  );
}
