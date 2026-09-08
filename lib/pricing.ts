// Commercial details, mirrored from the builder app's CONFIG so the marketing
// copy can never promise something checkout won't honour.
//
// Source of truth: bigheadbuilder/app/app/Config.js in the bigheadbuilderapps
// repo — BIGHEAD_PRODUCT_DATA, BIGHEAD_DUPLICATE_PRODUCT_DATA and
// BIGHEAD_HUMANCUT_PRODUCT_DATA. Prices are held in CENTS here exactly as they
// are there, so a change on either side is an obvious diff rather than a float
// that drifted. Render them with usd().
const PRICE_FIRST_CENTS = 2500;
const PRICE_DUPLICATE_CENTS = 1750;
const PRICE_HUMAN_CUT_CENTS = 500;

// "$25", but "$17.50" — marketing copy wants the cents only when they exist.
export function usd(aCents: number): string {
  return aCents % 100 === 0
    ? String(aCents / 100)
    : (aCents / 100).toFixed(2);
}

export const SIZE_INCHES = 24;

// The headline number: the first print of any one design.
export const PRICE_FROM = usd(PRICE_FIRST_CENTS);

// IMPORTANT: the discount is per DESIGN, not per order. The app charges the
// full price for the first copy of each face and the duplicate price only for
// additional copies of that SAME face — so five different faces is five times
// the full price, not a volume tier. The site used to advertise order-quantity
// tiers ("5 for the crew", "20 for the section") that the builder has never
// implemented; do not reintroduce them.
export const PRICE_DUPLICATE = usd(PRICE_DUPLICATE_CENTS);
export const DUPLICATE_SAVE_PERCENT = Math.round(
  (1 - PRICE_DUPLICATE_CENTS / PRICE_FIRST_CENTS) * 100
);

// Shipping is FREE as of 2026-09-08 — a deliberate call while volume is low, to be
// revisited once it isn't.
//
// This mirrors the app: BuildPanel_Address.js builds the shipping line as
// SHIPPING_PRODUCT_PRICEPERKIT * total heads, and that constant is now 0. The two must
// move together. They were out of step once already — the constant was 300 while this
// page advertised free shipping — because SHIPPING_PRODUCT_CUSTOM is *declared* with
// price 0 and the address step overwrites it before the line reaches the cart. Reading
// the declaration alone is not enough; read the address step.
export const PRICE_SHIPPING_FREE = true;

// Rows for the pricing block in Intro. Deliberately phrased around designs and
// copies, since that is the axis the app actually prices on.
export type PriceRow = {
  label: string;
  /** null renders no dollar amount — the row is carried by its note. */
  price: string | null;
  note?: string;
};

export const PRICE_ROWS: readonly PriceRow[] = [
  { label: "First print of a design", price: PRICE_FROM },
  {
    label: "Each extra copy of that design",
    price: PRICE_DUPLICATE,
    note: `save ${DUPLICATE_SAVE_PERCENT}%`,
  },
];

// Deliberately NOT a third row. As a line item reading "Shipping — free" it looked like a
// $0 charge; it is the one genuinely free thing on the page, so it gets its own banner
// under the table instead.
export const SHIPPING_BANNER = {
  headline: "Free shipping. Every order.",
  detail: "No minimum, no thresholds, anywhere in the US.",
};

// Optional add-on: if the automatic cutout doesn't nail a photo, the customer
// can pay a designer to hand-cut it on the fix panel. One fee per design.
export const PRICE_HUMAN_CUT = usd(PRICE_HUMAN_CUT_CENTS);

// Referral: ONE number drives both sides. It is the discount the person scanning the QR
// gets, and the referrer is then refunded that same dollar amount.
//
// Mirrors AFFILIATE_CODE_PERCENTAMOUNT in the app (Services_Affiliates defaults it to 10),
// and 10 is also what the printed QR card art has always said — so the cards already in
// circulation are correct.
//
// Careful with the wording: the referrer's refund is a percentage of the FRIEND'S order,
// not of their own. Services_Affiliates refunds $aCouponItem["discount"], i.e. exactly what
// the friend saved. A friend placing a large order therefore returns more than 10% of what
// the referrer originally paid, capped at their remaining balance. Do not write copy that
// promises "10% of your order back" — it is 10% of theirs.
export const REFERRAL_PERCENT = 10;

// Turnaround. Operational, not derivable from the app — nothing in the builder
// states a delivery time, and these have not been validated against the pipeline
// as it now runs (masters cron -> human clipping -> once-daily dispatch batch).
// Treat as unconfirmed until ops says otherwise.
// Split into the bare figure and its unit. The Intro stat row sets the value at display
// size in a narrow third of a column, so "1-2 business days" wrapped onto three lines and
// stretched the whole row. BUILD_DAYS is the big number; BUILD_DAYS_LABEL stays whole for
// running prose.
export const BUILD_DAYS = "1-2";
export const BUILD_DAYS_LABEL = "1-2 business days";
export const SHIP_DAYS_LABEL = "Ships in 1-2 business days";
export const TRANSIT_DAYS_LABEL = "2-5 days";

// There is no rush or expedited option in the app: no service selector at any
// step, and the products carry one hardcoded fedex_2day config. Do not put a
// faster promise on the site until one exists.
export const RUSH_AVAILABLE = false;

// The builder is a separate deploy from this marketing site, so every CTA is a
// cross-domain absolute URL — not a Next route. (Printed referral cards point
// at /qr/<code> on the same host, which parks the coupon and auto-applies it at
// checkout, so links into the app must keep the domain intact.)
export const BUILD_HREF = "https://app.bigheadbuilder.com/";

// "Find my order". There are no customer accounts — the nav used to show a mock LOGIN that
// flipped to a fake avatar, promising an account system the product has never had. Orders
// are keyed on email, so this goes to the app's finder: enter the email you ordered with and
// it mails you a link to your orders.
export const FIND_ORDER_HREF = "https://app.bigheadbuilder.com/find";
