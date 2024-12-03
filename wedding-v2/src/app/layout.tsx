import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anita and Jesus Forever",
  description: "Celebrate the love story of Anita and Jesus with details about their wedding day, RSVP, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/csw7mgq.css"/>

        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <title>Anita & Jesus Forever</title>
        <meta name="description" content="Celebrate the love story of Anita and Jesus with details about their wedding day, RSVP, and more." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="Anita, Jesus, Wedding, Forever, Love Story" />
        <link rel="canonical" href="https://www.anitajesus4ever.com/" />

        <meta property="og:title" content="Anita & Jesus Forever" />
        <meta property="og:description" content="Join us in celebrating the wedding of Anita and Jesus. Explore event details, RSVP, and send your wishes." />
        <meta property="og:image" content="/img/hero.jpg" />
        <meta property="og:url" content="https://www.anitajesus4ever.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anita & Jesus Forever" />
        <meta name="twitter:description" content="Discover Anita and Jesus' wedding story. RSVP and explore event details." />
        <meta name="twitter:image" content="/img/hero.jpg" />
        <meta name="twitter:url" content="https://www.anitajesus4ever.com/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
