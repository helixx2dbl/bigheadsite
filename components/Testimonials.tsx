"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    src: "/photos/IMG_4713.jpg",
    quote:
      "Held my own head at the finish line. Confused everyone. Worth it.",
    tag: "@FINISHLINE_PHIL",
    event: "Ironman",
    heads: 3,
    points: 2150,
  },
  {
    src: "/photos/IMG_4690.jpg",
    quote:
      "Brought my buddy's face to his own 40th. He teared up. Ten out of ten.",
    tag: "@BIGRICK52",
    event: "Birthday",
    heads: 1,
    points: 480,
  },
  {
    src: "/photos/IMG_0106.jpg",
    quote: "Two heads, one boat, zero regrets.",
    tag: "@LAKE_DAY_LARRY",
    event: "Bachelor party",
    heads: 2,
    points: 1020,
  },
  {
    src: "/photos/IMG_4716.jpg",
    quote:
      "Got three scans at one tailgate. This thing literally pays for itself.",
    tag: "@QUESO_QUEEN",
    event: "Tailgate",
    heads: 5,
    points: 4730,
  },
];

function formatPts(n: number) {
  return n.toLocaleString("en-US");
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
      className={`inline-flex items-center gap-2 text-sm font-bold ${
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
          <p className="font-script text-3xl text-teal">
            don&apos;t take our word for it
          </p>
          <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">
            Straight from the superfans
          </h2>
        </div>

        <div className="mt-12 min-h-[26rem] md:min-h-[19rem]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -90 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-14"
            >
              <div className="w-52 shrink-0 -rotate-2 rounded-2xl bg-white p-3 pb-4 shadow-xl md:w-64">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <Image
                    src={t.src}
                    alt={`BigHead in the wild, shared by ${t.tag}`}
                    fill
                    sizes="(min-width: 768px) 256px, 208px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="max-w-md text-center md:text-left">
                <span className="inline-block -translate-y-1 rounded-full border-2 border-teal/30 bg-cream px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-teal-deep">
                  {t.event}
                </span>
                <blockquote className="mt-3 text-2xl font-extrabold leading-snug text-ink md:text-3xl">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-berry">
                  — {t.tag}
                </figcaption>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t-2 border-ink/5 pt-4 md:justify-start">
                  <MetaItem icon="head">
                    {`${t.heads} ${t.heads === 1 ? "head" : "heads"} ordered`}
                  </MetaItem>
                  <MetaItem icon="star">
                    {`${formatPts(t.points)} pts earned`}
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
