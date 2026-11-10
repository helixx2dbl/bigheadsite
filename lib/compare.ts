// The "why ours" comparison: the three things a BigHead has that the typical big-head-on-a-
// stick site does not, side by side. Plain data in a plain module, same reason as lib/faqs.ts:
// the section that renders it is a client component, and anything server-side (schema, a
// future FAQ answer) can read the values without going through a client-reference proxy.
//
// The "others" column describes what the competing sites were found selling when Tyler
// reviewed them (2026-11-10): 16" heads on foam board or cardboard, with a proof that is
// either a paid add-on or emailed after the order. It is deliberately phrased as "usually"
// and "often" — it is a fair summary of the market, not a claim about any one named
// company, and this section must never name one.
//
// Our column is drawn from the same figures the rest of the site uses: SIZE_INCHES from
// lib/pricing.ts, and the board the shop actually prints on (6mm corrugated plastic, which
// is what "Coroplast" is a brand name for). Keep HowItWorks step 03, the durability FAQ and
// Product schema's `material` in step with BOARD_MATERIAL — they are the other places the
// board is described.
import { SIZE_INCHES } from "@/lib/pricing";

export const BOARD_THICKNESS_MM = 6;
export const BOARD_MATERIAL = `${BOARD_THICKNESS_MM}mm corrugated plastic board`;

// What the typical competitor sells, for the comparison copy.
export const OTHERS_SIZE_INCHES = 16;

export type CompareRow = {
  id: string;
  /** The thing being compared, e.g. "Size". */
  label: string;
  /** Our column: the big line, then the supporting line. */
  ours: { headline: string; detail: string };
  /** Their column, same shape. */
  theirs: { headline: string; detail: string };
  /** Optional deep link into the FAQ, by entry id. */
  faq?: string;
};

export const COMPARE_ROWS: readonly CompareRow[] = [
  {
    id: "size",
    label: "Size",
    ours: {
      headline: `${SIZE_INCHES}" tall`,
      detail: "About three times life size. Spottable from the far bleachers.",
    },
    theirs: {
      headline: `Usually ${OTHERS_SIZE_INCHES}"`,
      detail: "Half the face area. A big photo, not a big head.",
    },
    faq: "size",
  },
  {
    id: "material",
    label: "Material",
    ours: {
      headline: BOARD_MATERIAL,
      detail:
        "The stuff yard signs are made of. Rigid, light, shrugs off rain and spilled beer, and lasts the whole season.",
    },
    theirs: {
      headline: "Foam board or cardboard",
      detail: "Dents, creases, and goes soft the first time it gets wet.",
    },
    faq: "durability",
  },
  {
    id: "proof",
    label: "Digital proof",
    ours: {
      headline: "Live, before you pay. Free.",
      detail:
        "The builder cuts out the head and shows you the exact result in seconds, so you know it looks right before we print it.",
    },
    theirs: {
      headline: "Often an extra charge, or none at all",
      detail: "A proof emailed after you order, if you pay for one. Otherwise you find out when the box arrives.",
    },
    faq: "photo",
  },
];
