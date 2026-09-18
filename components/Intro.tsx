"use client";

import { motion } from "framer-motion";
import BuildButton from "./BuildButton";
import InfoLink from "./InfoLink";
import {
  BUILD_DAYS,
  PRICE_FROM,
  PRICE_ROWS,
  SHIPPING_BANNER,
  SIZE_INCHES,
} from "@/lib/pricing";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Intro() {
  return (
    <section data-section="intro" className="mx-auto max-w-6xl px-6 pb-24 pt-14 md:pb-36 md:pt-20">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <motion.p {...fadeUp} className="font-script text-3xl text-teal">
            made for superfans
          </motion.p>
          {/* The page's ONE h1. The hero's "Your face. / Way bigger." is the bigger type,
              but it renders only after the loader clears — it sits behind client state, so
              it never reaches the served html and a crawler would find no h1 at all. This
              line is server-rendered and describes the product besides. */}
          <motion.h1
            {...fadeUp}
            className="mt-4 text-4xl font-black leading-tight text-ink md:text-5xl"
          >
            Turn any photo into a giant head on a stick.
          </motion.h1>
          <motion.p {...fadeUp} className="mt-6 text-lg font-semibold text-ink/70">
            Race day, graduation, bachelor party, little league: nothing says
            &ldquo;we came for you&rdquo; like your face, giant, on a stick.
            Upload a photo and our builder cuts out the head automatically,
            shows you a live preview, and we hand-assemble the real thing and
            ship it to your door.
          </motion.p>

          {/* Size / price / speed: pulled out of the FAQ */}
          <motion.div
            {...fadeUp}
            className="mt-8 grid grid-cols-3 gap-3 border-y-2 border-ink/10 py-5"
          >
            <div>
              <p className="text-2xl font-black text-berry md:text-3xl">
                {SIZE_INCHES}&quot;
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/55 md:text-sm">
                tall, 3× life size
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-berry md:text-3xl">
                ${PRICE_FROM}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/55 md:text-sm">
                starting price
              </p>
            </div>
            {/* was "2-3 days / with rush shipping" — that figure came from an
                expedited option the app does not offer.
                Only the figure goes on the big line: the full "1-2 business days" wrapped
                to three lines here and dragged the row's height with it. */}
            <div>
              <p className="text-2xl font-black text-berry md:text-3xl">
                {BUILD_DAYS}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/55 md:text-sm">
                business days
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {["Auto head cut-out", "Live preview", "Ships to you"].map(
              (label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-deep"
                >
                  <svg
                    className="h-4.5 w-4.5 shrink-0 text-teal"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden
                  >
                    <circle cx="9" cy="9" r="9" fill="currentColor" />
                    <path
                      d="M5 9.5l2.6 2.6L13 6.5"
                      stroke="var(--cream)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {label}
                </motion.span>
              )
            )}
          </div>

          {/* What it costs. Priced per DESIGN, matching the builder: the first
              print of a face is full price and extra copies of that same face
              are discounted. Not order-quantity tiers. */}
          <motion.div {...fadeUp} className="mt-8 space-y-2.5">
            {PRICE_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2.5 last:border-0"
              >
                <span className="text-sm font-extrabold text-ink md:text-base">
                  {row.label}
                </span>
                <span className="flex shrink-0 items-baseline gap-2 text-sm font-black text-berry md:text-base">
                  {row.price !== null && <span>${row.price}</span>}
                  {row.note && (
                    <span className="text-xs font-bold uppercase tracking-wide text-teal-deep md:text-sm">
                      {row.note}
                    </span>
                  )}
                </span>
              </div>
            ))}

            {/* Shipping gets its own band rather than a third table row. Sat under the two
                per-design prices it would be read as a third per-head charge, which is the
                one thing it is not — it is per BOX. Teal against the cream table, so the
                "same $5 for eight as for one" still lands as a perk. */}
            <div className="!mt-4 flex items-center gap-3 rounded-xl border-2 border-teal/25 bg-teal/8 px-4 py-3">
              <svg
                viewBox="0 0 24 24"
                aria-hidden
                className="h-6 w-6 shrink-0 text-teal-deep"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7h11v9H3z" />
                <path d="M14 10h4l3 3v3h-7z" />
                <circle cx="7" cy="18" r="1.6" />
                <circle cx="17" cy="18" r="1.6" />
              </svg>
              <span>
                <span className="block text-sm font-black text-teal-deep md:text-base">
                  {SHIPPING_BANNER.headline}
                </span>
                <span className="block text-xs font-bold text-ink/55 md:text-sm">
                  {SHIPPING_BANNER.detail}
                </span>
              </span>
            </div>
          </motion.div>

          {/* Group split-pay: question hook then the highlighted pill, inline */}
          <motion.div
            {...fadeUp}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="text-base font-extrabold text-ink">
              Paying for the whole crew?
            </span>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-berry/20 bg-berry/5 px-4 py-2 text-base font-bold text-berry">
              <svg
                viewBox="0 0 28 28"
                className="h-7 w-7 shrink-0 -rotate-12 drop-shadow-sm"
                aria-hidden
              >
                <polygon
                  fill="var(--berry)"
                  points="14,0 16.7,3.9 21,1.9 21.4,6.6 26.1,7 24.1,11.3 28,14 24.1,16.7 26.1,21 21.4,21.4 21,26.1 16.7,24.1 14,28 11.3,24.1 7,26.1 6.6,21.4 1.9,21 3.9,16.7 0,14 3.9,11.3 1.9,7 6.6,6.6 7,1.9 11.3,3.9"
                />
                <text
                  x="14"
                  y="14.5"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--cream)"
                  fontSize="8"
                  fontWeight="900"
                >
                  NEW
                </text>
              </svg>
              Group split-pay
              <InfoLink faq="split" className="ml-0.5 text-berry" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              delay: 0.7,
              type: "spring",
              stiffness: 550,
              damping: 13,
            }}
            className="mt-10 w-fit"
          >
            <BuildButton cta="intro" />
          </motion.div>
        </div>

        <div className="relative mx-auto aspect-[10/9] w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="absolute left-0 top-6 aspect-[3/4] w-3/5 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl"
          >
            <video
              src="/photos/IMG_4836.mp4"
              poster="/photos/IMG_4836_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 70, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="absolute right-0 top-0 aspect-[2/3] w-3/5 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl"
          >
            <video
              src="/photos/IMG_5471.mp4"
              poster="/photos/IMG_5471_poster.jpg"
              aria-label="Giant BigHeads passed around a Vegas pool party"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
