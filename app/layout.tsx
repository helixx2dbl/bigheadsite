import type { Metadata } from "next";
import { Nunito, Pacifico } from "next/font/google";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { BUILD_HREF } from "@/lib/pricing";
import {
  EVENT_CTA_CLICK,
  FACEBOOK_PIXEL_ID,
  GA4_ID,
  GOOGLE_ADS_CLICK_LABEL,
  GOOGLE_ADS_ID,
} from "@/lib/analytics";
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

// Tag ids and GA4 event names live in lib/analytics.ts — the section tracker needs them too.

// Derived from the one place the builder's address lives, so a move of the app host moves
// what counts as "clicking through" with it.
const APP_HOST = new URL(BUILD_HREF).hostname;

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
  // Meta verifies at the registrable-domain level and looks for this on the root domain,
  // which is this site — not app.bigheadbuilder.com. The app's index.php carries the same
  // token so whichever host Meta happens to fetch resolves; keep the two in step.
  verification: {
    other: {
      "facebook-domain-verification": "578a9aiejg1d37trnudylejbkiy9pj",
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
      lang="en"
      className={`${nunito.variable} ${pacifico.variable} h-full antialiased`}
    >
      {/*
        A RAW script tag in a real <head>, not next/script.
        next/script's beforeInteractive was tried first and does not do what is wanted on a
        static export: it emits the snippet as a serialised payload
        ((self.__next_s=...).push([...])) at the top of <body>, so it only runs once Next's
        own runtime has loaded and processed it. For a tracking beacon that is strictly
        worse — a visitor who bounces before hydration is never counted, and the whole
        point of the pixel on this page is to catch exactly those people.
        Written out verbatim so it matches the snippet Meta's Events Manager gives you, and
        the builder's app/index.php, line for line.
      */}
      <head>
        {/* Organization + WebSite: site-wide identity, so every page carries them. The
            page-specific Product and FAQPage blocks live in app/page.tsx. @id values cross
            reference, which is what lets Google treat them as one graph rather than three
            unrelated islands. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FACEBOOK_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />

        {/*
          gtag.js is loaded async from Google's own host, so this stays a plain <script src>
          rather than being inlined. The config block below has to run AFTER it in document
          order — gtag() queues into dataLayer, so order matters for the queue, not for the
          fetch.

          The IIFE after the configs handles clicks into the builder, and sends TWO events
          off one listener: a GA4 cta_click on every press (which CTA is pulling its weight)
          and the Google Ads click-through conversion once per page load (did this visitor
          cross over). Splitting the guard is the whole point — see the comments inside.

          It is ONE delegated listener on document rather than an onClick on each CTA, so
          every link into the builder counts — Nav, Hero, FinalCta, PageHeader, BuildButton,
          find-my-order, and any added later — with nothing to remember per component. A new
          CTA only needs data-cta to be named correctly in reporting; it is counted either
          way. Deliberately NOT Google's gtag_report_conversion(url) helper: that cancels the
          click and navigates from event_callback, which leaves the link dead whenever
          gtag.js is blocked (ad blockers, so a real share of visitors) and breaks cmd-click
          to a new tab. transport_type 'beacon' lets the Ads hit outlive the navigation
          instead, so the link is never touched; GA4 does that on its own and does not take
          the parameter. Capture phase so a component calling stopPropagation cannot hide the
          click, and auxclick for middle-click new tabs. No value and no empty
          transaction_id — a hardcoded 1.0 is fiction, and Ads falls back to the action's
          configured default.
        */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');
gtag('config', '${GOOGLE_ADS_ID}');
(function(){
  var fired = false;
  function onClick(e){
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.hostname !== '${APP_HOST}') return;

    // GA4 first, and on EVERY click. This answers a different question from the Ads
    // conversion below, so it deliberately does not share the one-shot guard: "which
    // CTA earns its place" needs each press counted, while "did this visitor click
    // through" needs exactly one. send_to pins it to the G- property, because an event
    // with no send_to goes to every configured destination — including AW-, which would
    // litter the Ads account with an event it has no conversion action for.
    // cta_location comes from data-cta on the link; 'untagged' is a real answer that
    // says a new CTA shipped without one, and is easier to spot than a missing event.
    gtag('event', '${EVENT_CTA_CLICK}', {
      send_to: '${GA4_ID}',
      cta_location: a.getAttribute('data-cta') || 'untagged',
      link_url: a.href
    });

    if (fired) return;
    fired = true;
    gtag('event', 'conversion', {
      send_to: '${GOOGLE_ADS_ID}/${GOOGLE_ADS_CLICK_LABEL}',
      transport_type: 'beacon'
    });
  }
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick, true);
})();`,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        {/* Fallback for scripts-off; Meta's standard snippet ships this alongside the pixel. */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- a 1x1 beacon, not an
              image: next/image would rewrite the url through the optimizer and the
              request would never reach Meta. */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
