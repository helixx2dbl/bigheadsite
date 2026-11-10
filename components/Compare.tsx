"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPARE_ROWS } from "@/lib/compare";
import BuildButton from "./BuildButton";
import InfoLink from "./InfoLink";

// Us against the typical big-head site, on the three things that actually differ: the
// size of the head, what it is printed on, and whether you get to see it before you pay.
// The copy lives in lib/compare.ts; this file is only the layout.
//
// Layout is ONE grid rather than a <table>, because the two breakpoints need different
// shapes and a table cannot restack. On md+ it is three columns — feature / ours / theirs —
// with ours in the middle so it is the first thing the eye lands on after the label. On a
// phone the feature label takes a full row of its own and the two answers sit side by side
// under it, which keeps every cell wide enough to read; the label column header is simply
// hidden there since there is nothing for it to head.
//
// Our column is the teal "sticker". On md+ it runs as one continuous slab down the grid: the
// header cell rounds the top, the last row rounds the bottom, and the rows in between are
// square. On a phone the label rows interrupt it, so each teal cell is its own rounded card
// instead — a flat-bottomed header over a square-topped row read as a slab with a bite out
// of it. It is per-cell styling either way (a grid has no column element to paint), so the
// classes are computed from the row index.

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function Check() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="var(--cream)" />
      <path
        d="M5 9.5l2.6 2.6L13 6.5"
        stroke="var(--teal)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="h-5 w-5 shrink-0 text-ink/30" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6.2 6.2l5.6 5.6M11.8 6.2l-5.6 5.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Compare() {
  const last = COMPARE_ROWS.length - 1;

  return (
    <section data-section="compare" className="bg-cream-deep py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.p {...fadeUp} className="text-center font-script text-3xl text-berry">
          why ours?
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-4xl font-black text-ink md:text-5xl"
        >
          Not all big heads are built the same.
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-center text-lg font-semibold text-ink/65"
        >
          We looked at what everyone else is selling. Here is where a BigHead is
          different, and why it matters once it is out of the box.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 gap-x-3 md:grid-cols-[1fr_1.3fr_1.1fr] md:gap-x-5"
        >
          {/* Header row. The label column's header exists only to hold the grid's shape
              on desktop; on a phone the labels are their own rows and it is hidden. */}
          <div className="hidden md:block" aria-hidden />
          <div className="flex items-center justify-center gap-2.5 rounded-3xl bg-teal px-3 py-4 text-center md:rounded-b-none md:gap-3 md:px-6 md:pb-4 md:pt-6">
            <Image
              src="/brand/head.svg"
              alt=""
              aria-hidden
              width={26}
              height={55}
              unoptimized
              className="h-9 w-auto md:h-11"
            />
            <p className="text-base font-black leading-tight text-cream md:text-xl">
              BigHead Builder
            </p>
          </div>
          <div className="flex items-end justify-center px-3 pb-3 pt-5 text-center md:px-6 md:pb-4 md:pt-6">
            <p className="text-base font-black leading-tight text-ink/45 md:text-xl">
              The other guys
            </p>
          </div>

          {COMPARE_ROWS.map((row, i) => {
            const isLast = i === last;
            return (
              // A fragment per row would be cleaner, but each cell needs its own grid
              // placement; the label spans both answer columns on a phone.
              <div key={row.id} className="contents">
                <div
                  className={`col-span-2 flex items-center gap-2 pb-2 pt-7 md:col-span-1 md:py-6 md:pr-4 ${
                    i === 0 ? "" : "md:border-t-2 md:border-ink/10"
                  }`}
                >
                  <h3 className="text-sm font-black uppercase tracking-wide text-ink/55 md:text-base md:normal-case md:tracking-normal md:text-ink">
                    {row.label}
                  </h3>
                  {row.faq && <InfoLink faq={row.faq} className="text-teal-deep" />}
                </div>

                <div
                  className={`rounded-3xl bg-teal px-4 py-5 md:rounded-none md:px-6 md:py-6 ${
                    isLast ? "md:rounded-b-3xl md:pb-8" : "md:border-b-2 md:border-cream/15"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5">
                      <Check />
                    </span>
                    <p className="text-base font-black leading-snug text-cream md:text-xl">
                      {row.ours.headline}
                    </p>
                  </div>
                  <p className="mt-2.5 text-sm font-semibold leading-relaxed text-cream/80 md:text-base">
                    {row.ours.detail}
                  </p>
                </div>

                <div
                  className={`px-3 py-5 md:px-6 md:py-6 ${
                    isLast ? "" : "border-b-2 border-ink/10"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5">
                      <Cross />
                    </span>
                    <p className="text-base font-extrabold leading-snug text-ink/60 md:text-lg">
                      {row.theirs.headline}
                    </p>
                  </div>
                  <p className="mt-2.5 text-sm font-semibold leading-relaxed text-ink/50 md:text-base">
                    {row.theirs.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div {...fadeUp} className="mt-12 text-center">
          <p className="font-script text-2xl text-teal md:text-3xl">
            bigger, tougher, and you see it first
          </p>
          <div className="mt-6">
            <BuildButton cta="compare" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
