// Every tag id the site fires, in one place. They were inline in app/layout.tsx until
// the section tracker needed the GA4 id too, and an id copy-pasted into a second file
// is an id that eventually disagrees with itself.

// The SAME Meta pixel the builder fires (in the bigheadbuilderapps repo:
// app/index.php's fbq init, CONFIG.FACEBOOK_PIXEL_ID, and server side
// mAppInformation["FACEBOOK_PIXEL"]). One pixel across both hosts is deliberate: a visitor
// lands here and converts over there, so splitting them would cut the funnel in half and
// leave this page with no attributable revenue.
//
// This page fires PageView only. Every conversion event — Lead, AddToCart,
// InitiateCheckout, AddPaymentInfo, Purchase — happens in the builder, because that is
// where the funnel actually is. Nothing here should start firing those.
export const FACEBOOK_PIXEL_ID = "1710224520061524";

// Google tag. TWO destinations off ONE gtag.js load, which is how Google wants it done:
// G- is GA4 (analytics), AW- is Google Ads (conversions). Both get their own gtag('config')
// call against the same dataLayer.
//
// The builder carries the SAME G- and AW- ids (app/index.php) and fires the real Purchase
// conversion there (label SFEtCLn4zfEcEI_yudhE, with the order total and the order id).
export const GA4_ID = "G-XG8FW8WJKG";
export const GOOGLE_ADS_ID = "AW-18439108879";

// Google Ads "click through to the builder" conversion. An INTERACTION, not a purchase: it
// fires when someone follows any link into app.bigheadbuilder.com, and must never share a
// label with the Purchase conversion above or every visit to the builder counts as a sale.
// In Google Ads this action should be SECONDARY (observed, not bid on) and count ONE per
// click — otherwise bidding optimises for clicks rather than orders.
export const GOOGLE_ADS_CLICK_LABEL = "5kx0CISvzfEcEI_yudhE";

// GA4 event names. Neither is a Google-reserved name, and both carry a parameter that has
// to be registered as a custom dimension in the GA4 UI before it shows up anywhere except
// Realtime and DebugView. See README_ANALYTICS.md.
export const EVENT_CTA_CLICK = "cta_click";
export const EVENT_SECTION_VIEW = "section_view";

// gtag() is defined by the inline snippet in app/layout.tsx, which runs in <head> before
// any component mounts. Typed here so the tracker can call it without a local `any`.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
