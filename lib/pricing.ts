// Placeholder commercial details: swap when real pricing ships.
// "From" / "as soon as" numbers assume rush printing + expedited shipping
// are available; standard delivery can take longer.
export const SIZE_INCHES = 24;
export const PRICE_FROM = 24;
export const SHIP_DAYS_LABEL = "Ships in 1-2 business days";
export const BUILD_DAYS_LABEL = "1-2 days";
export const RUSH_AVAILABLE = true;

export const QUANTITY_TIERS = [
  { qty: 1, label: "1 for you", price: 24 },
  { qty: 5, label: "5 for the crew", price: 21 },
  { qty: 20, label: "20 for the section", price: 18 },
] as const;

export const BUILD_HREF = "/build";
