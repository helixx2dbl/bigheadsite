"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BuildButton from "./BuildButton";
import InfoLink from "./InfoLink";
import {
  PRICE_FROM,
  QUANTITY_TIERS,
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
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-14 md:pb-36 md:pt-20">
      <div className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <motion.p {...fadeUp} className="font-script text-3xl text-teal">
            made for superfans
          </motion.p>
          <motion.h2
            {...fadeUp}
            className="mt-4 text-4xl font-black leading-tight text-ink md:text-5xl"
          >
            Turn any photo into a giant head on a stick.
          </motion.h2>
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
            <div>
              <p className="text-2xl font-black text-berry md:text-3xl">
                2-3 days
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-ink/55 md:text-sm">
                with rush shipping
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

          {/* Quantity framing */}
          <motion.div {...fadeUp} className="mt-8 space-y-2.5">
            {QUANTITY_TIERS.map((tier) => (
              <div
                key={tier.qty}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2.5 last:border-0"
              >
                <span className="text-sm font-extrabold text-ink md:text-base">
                  {tier.label}
                </span>
                <span className="shrink-0 text-sm font-black text-berry md:text-base">
                  ${tier.price}
                  {tier.qty > 1 ? " ea" : ""}
                </span>
              </div>
            ))}
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
            <BuildButton />
          </motion.div>
        </div>

        <div className="relative mx-auto h-[26rem] w-full max-w-md md:h-[32rem]">
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="absolute left-0 top-6 aspect-[3/4] w-3/5 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl"
          >
            <Image
              src="/photos/IMG_0106.jpg"
              alt="Holding two giant BigHeads on the lake"
              fill
              sizes="(min-width: 768px) 280px, 60vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 70, rotate: 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="absolute right-0 top-24 aspect-[3/4] w-3/5 overflow-hidden rounded-3xl border-[6px] border-white shadow-2xl"
          >
            <video
              src="/photos/IMG_4836.mp4"
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
