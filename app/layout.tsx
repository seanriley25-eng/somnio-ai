import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Somnio | AI Dream Interpreter & Symbol Dictionary",
  description: "Unlock the secrets of your subconscious with daily AI-powered dream analysis. Discover the meaning behind recurring symbols and themes.",
  openGraph: {
    title: "Somnio | AI Dream Interpreter & Symbol Dictionary",
    description: "Unlock the secrets of your subconscious with daily AI-powered dream analysis. Discover the meaning behind recurring symbols and themes.",
    images: ["/og"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Somnio | AI Dream Interpreter & Symbol Dictionary",
    description: "Unlock the secrets of your subconscious with daily AI-powered dream analysis. Discover the meaning behind recurring symbols and themes.",
    images: ["/og"],
  },
  keywords: ["dream interpretation", "AI dream analysis", "dream symbols", "dream dictionary", "subconscious mind", "recurring dreams", "dream meaning"],
  authors: [{ name: "Somnio" }],
  creator: "Somnio",
  publisher: "Somnio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* AdSense account verification */}
        <meta name="google-adsense-account" content="ca-pub-8082302563728806" />

        {/*
          Google Consent Mode v2 — must run BEFORE adsbygoogle.js loads.
          Default: all ad/analytics storage denied until the user accepts
          in the cookie banner. Functionality + security cookies are always
          granted (required for auth sessions to work).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage':           'denied',
                'ad_user_data':         'denied',
                'ad_personalization':   'denied',
                'analytics_storage':    'denied',
                'functionality_storage':'granted',
                'security_storage':     'granted',
                'wait_for_update':       500
              });
              gtag('js', new Date());
            `,
          }}
        />

        {/* Google AdSense — raw <script>, NOT next/script strategy="afterInteractive" */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8082302563728806"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Navigation />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
