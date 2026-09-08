import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

// The marketing site's own domain — NOT app.bigheadbuilder.com, which is the builder.
// metadataBase is what turns the relative og:image path below into the absolute url every
// social scraper requires; without it Next emits a relative path and previews come back
// blank. Confirm this hostname before launch — canonical and sitemap urls are built from it.
const SITE_URL = "https://bigheadbuilder.com";

const TITLE = "BigHead Builder | Big Heads on a Stick";
const DESCRIPTION =
  "Turn any photo into a giant head on a stick. Upload a photo, we cut out the head, hand-assemble it, and ship it to your door.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "BigHead Builder",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        // 1200x630, the size both Facebook and Twitter/X crop to. Alt text matters here:
        // it is read out on the sharing platform, not just on our page.
        url: "/brand/social-card.jpg",
        width: 1200,
        height: 630,
        alt: "A crowd at an Ironman finish line holding giant printed heads on sticks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/brand/social-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${pacifico.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
