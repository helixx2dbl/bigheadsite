// JSON-LD structured data.
//
// Everything here is DERIVED — prices from lib/pricing.ts, questions and answers from the
// same `faqs` array the accordion renders. Schema that restates its facts by hand is how a
// site ends up telling Google a price it stopped charging months ago, and Google treats a
// mismatch between the markup and the visible page as a reason to drop the rich result
// entirely (for FAQPage the answer text must actually appear on the page — which is why the
// accordion had to stop unmounting its answers before any of this could be valid).
import {
  BUILD_HREF,
  PRICE_DUPLICATE,
  PRICE_FROM,
  PRICE_SHIPPING_PER_BOX,
  SIZE_INCHES,
} from "@/lib/pricing";
import { faqs } from "@/lib/faqs";

const SITE_URL = "https://bigheadbuilder.com";

// Strips the tags out of an answer so the schema carries the same words the page shows.
// The answers are plain strings today; this is here so an answer that later gains an <a>
// does not silently put markup into the structured data.
function plain(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "BigHead Builder",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.svg`,
    image: `${SITE_URL}/brand/social-card.jpg`,
    description:
      "Turn any photo into a giant head on a stick. Upload a photo, we cut out the head, hand-assemble it, and ship it to your door.",
    email: "tyler@bigheadbuilder.com",
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "BigHead Builder",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function productSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product`,
    name: "Big Head on a Stick",
    description: `A giant printed cut-out of any face, about ${SIZE_INCHES} inches tall on rigid board, hand-assembled and shipped flat with a stick and mounting tape.`,
    image: [`${SITE_URL}/brand/social-card.jpg`],
    brand: { "@type": "Brand", name: "BigHead Builder" },
    // lowPrice is the duplicate price because that is genuinely the cheapest a head can be
    // bought for — the second and subsequent copies of one design. highPrice is the first
    // print. An AggregateOffer rather than a single Offer, since there is no one price.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: PRICE_DUPLICATE,
      highPrice: PRICE_FROM,
      offerCount: 2,
      availability: "https://schema.org/InStock",
      url: BUILD_HREF,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: PRICE_SHIPPING_PER_BOX,
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          // 1-2 business days to build, 2-6 days in transit — the same figures the
          // shipping policy page states.
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 6, unitCode: "DAY" },
        },
      },
    },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: plain(f.q),
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };
}
