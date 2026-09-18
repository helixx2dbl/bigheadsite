"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BUILD_HREF,
  PRICE_FROM,
  PRICE_SHIPPING_PER_BOX,
  SHIPPING_HEADS_PER_BOX,
  SHIP_DAYS_LABEL,
  SIZE_INCHES,
} from "@/lib/pricing";

export default function FinalCta() {
  return (
    <section id="build" data-section="final-cta" className="px-6 pb-24 pt-10 md:pb-32 md:pt-14">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-teal px-8 py-20 text-center shadow-2xl md:px-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 z-0 h-64 w-64 rounded-full bg-cream/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-12 z-0 h-72 w-72 rounded-full bg-berry/25"
        />

        <div className="relative z-10">
          {/* Parade of dancing heads */}
          <div
            aria-hidden
            className="flex items-end justify-center gap-3 md:gap-6"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -14, 0],
                  rotate: i % 2 === 0 ? [-8, 8, -8] : [8, -8, 8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.15,
                  ease: "easeInOut",
                  delay: i * 0.14,
                }}
                style={{ transformOrigin: "bottom center" }}
              >
                <Image
                  src="/brand/head.svg"
                  alt=""
                  width={57}
                  height={120}
                  unoptimized
                  className="h-24 w-auto drop-shadow-lg md:h-32"
                />
              </motion.div>
            ))}
          </div>
          <h2 className="mt-3 font-script text-4xl text-cream md:text-6xl">
            Ready to get big?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg font-semibold text-cream/85">
            Building your BigHead takes about two minutes. Upload a photo, watch
            the magic cut-out, and we handle the rest: QR referral stickers
            included, so your head can start paying for itself.
          </p>
          <p className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-black text-cream md:text-base">
            <span>{SIZE_INCHES}&quot; tall</span>
            <span className="text-cream/35" aria-hidden>
              ·
            </span>
            <span>from ${PRICE_FROM}</span>
            <span className="text-cream/35" aria-hidden>
              ·
            </span>
            <span>{SHIP_DAYS_LABEL}</span>
          </p>
          <a
            href={BUILD_HREF}
            data-cta="final-cta"
            className="mt-10 inline-block whitespace-nowrap rounded-full bg-cream px-10 py-4 text-lg font-black text-teal-deep shadow-lg transition-transform hover:scale-105"
          >
            Build yours
          </a>
          {/* Was a rush-printing + expedited-shipping promise. Neither exists in
              the app — there is no service selector at any step — so it is gone
              rather than softened. */}
          <p className="mx-auto mt-6 max-w-md text-sm font-bold leading-snug text-cream/75">
            Built to order in 1-2 business days, then 2-6 days to your door.
            Shipping is a flat ${PRICE_SHIPPING_PER_BOX} per box of up to{" "}
            {SHIPPING_HEADS_PER_BOX} heads, anywhere in the US.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
