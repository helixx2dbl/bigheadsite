"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Testimonial = {
  src: string;
  quote: string;
  events: string[];
  heads: number;
  refunded: number;
  /** Landscape photo: renders a wider 4:3 card instead of the 3:4 default. */
  wide?: boolean;
};

const testimonials: Testimonial[] = [
  {
    src: "/photos/IMG_4713.jpg",
    quote:
      "Held my own head at the finish line. Confused everyone. Worth it.",
    events: ["Ironman"],
    heads: 3,
    refunded: 26,
  },
  {
    src: "/photos/IMG_5543.jpg",
    quote:
      "First game of the season, St Brown with 2 TDs. Could he do it without me? We may never know.",
    events: ["NFL", "Detroit Lions", "Stadium Swim"],
    heads: 1,
    refunded: 4,
  },
  {
    src: "/photos/IMG_0106.jpg",
    quote: "Two heads, one boat, zero regrets.",
    events: ["Lake day", "CDA"],
    heads: 2,
    refunded: 11,
  },
  {
    src: "/photos/IMG_5401.jpg",
    quote: "Have you seen Brooks? Has ANYONE seen Brooks?",
    events: ["Bachelor party", "MGM Grand Lazy River"],
    heads: 1,
    refunded: 0,
  },
  {
    src: "/photos/IMG_4696.jpg",
    quote:
      "Got three scans at one tailgate. This thing literally pays for itself.",
    events: ["Tailgate"],
    heads: 5,
    refunded: 58,
  },
];

// The metric used to be a points balance. There is no points system in the app —
// the referral program pays a percentage back to the card — so these show money.
function formatBack(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function MetaItem({
  icon,
  children,
}: {
  icon: "head" | "star";
  children: string;
}) {
  const isStar = icon === "star";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-bold sm:text-sm ${
        isStar ? "text-berry" : "text-ink/60"
      }`}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke={isStar ? "var(--berry)" : "var(--teal)"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 shrink-0"
        aria-hidden
      >
        {icon === "head" && (
          <>
            <circle cx="10" cy="7" r="4.5" />
            <path d="M10 11.5V18" />
          </>
        )}
        {icon === "star" && (
          <path d="M10 2.5l2.3 4.7 5.2.75-3.75 3.66.88 5.16L10 14.33l-4.63 2.44.88-5.16L2.5 7.95l5.2-.75L10 2.5z" />
        )}
      </svg>
      {children}
    </span>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="overflow-hidden bg-cream-deep py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-teal sm:text-3xl">
            don&apos;t take our word for it
          </p>
          <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl md:text-4xl">
            Straight from the superfans
          </h2>
        </div>

        <div className="mt-10 min-h-[22rem] sm:mt-12 sm:min-h-[26rem] md:min-h-[19rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -90 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:flex-row md:gap-14"
            >
              <div
                className={`${
                  t.wide ? "w-72 md:w-[22rem]" : "w-52 md:w-64"
                } shrink-0 -rotate-2 rounded-2xl bg-white p-2 pb-2.5 shadow-xl sm:p-3 sm:pb-4`}
              >
                <div
                  className={`relative ${
                    t.wide ? "aspect-[4/3]" : "aspect-[3/4]"
                  } overflow-hidden rounded-xl`}
                >
                  <Image
                    src={t.src}
                    alt="A BigHead out in the wild, sent in by a customer"
                    fill
                    sizes={
                      t.wide
                        ? "(min-width: 768px) 352px, 288px"
                        : "(min-width: 768px) 256px, 208px"
                    }
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="max-w-md text-center md:text-left">
                <div className="flex -translate-y-1 flex-wrap justify-center gap-2 md:justify-start">
                  {t.events.map((event) => (
                    <span
                      key={event}
                      className="inline-block rounded-full border-2 border-teal/30 bg-cream px-3 py-0.5 text-[0.7rem] font-extrabold uppercase tracking-wide text-teal-deep sm:px-3.5 sm:py-1 sm:text-xs"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                <blockquote className="mt-3 text-xl font-extrabold leading-snug text-ink sm:text-2xl md:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t-2 border-ink/5 pt-4 md:justify-start">
                  <MetaItem icon="head">
                    {`${t.heads} ${t.heads === 1 ? "head" : "heads"} ordered`}
                  </MetaItem>
                  <MetaItem icon="star">
                    {`${formatBack(t.refunded)} back`}
                  </MetaItem>
                </div>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-berry" : "w-2.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
