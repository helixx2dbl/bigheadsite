"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BUILD_HREF,
  PRICE_FROM,
  SHIP_DAYS_LABEL,
  SIZE_INCHES,
} from "@/lib/pricing";

function StampLetter({
  children,
  delay,
}: {
  children: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 3.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.28,
        ease: [0.22, 1.4, 0.36, 1],
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

function StampWord({
  word,
  start,
  step,
}: {
  word: string;
  start: number;
  step: number;
}) {
  return (
    <span className="inline-block">
      {word.split("").map((ch, i) => (
        <StampLetter key={i} delay={start + i * step}>
          {ch}
        </StampLetter>
      ))}
    </span>
  );
}

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [minTimeUp, setMinTimeUp] = useState(false);
  const ready = imageLoaded && minTimeUp;

  // Always show the loader for at least 1.5s, even on a warm cache.
  useEffect(() => {
    const id = setTimeout(() => setMinTimeUp(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // Don't hang forever if onLoad somehow misses.
  useEffect(() => {
    const id = setTimeout(() => setImageLoaded(true), 4000);
    return () => clearTimeout(id);
  }, []);

  // Letter stamp timings (seconds after photo is ready)
  const wayStart = 0.85;
  const wayStep = 0.08;
  const biggerStart = wayStart + 3 * wayStep + 0.12;
  const biggerStep = 0.05;
  const subDelay = biggerStart + 7 * biggerStep + 0.15;

  return (
    <section className="relative h-screen overflow-hidden bg-cream">
      {/* Loader — full sticker logo so the brand still gets a beat */}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-cream"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
              transition={{
                repeat: Infinity,
                duration: 1.15,
                ease: "easeInOut",
              }}
              style={{ transformOrigin: "bottom center" }}
            >
              <Image
                src="/brand/logo-sticker.svg"
                alt="BigHead Builder"
                width={280}
                height={312}
                unoptimized
                priority
                className="h-auto w-44 drop-shadow-lg md:w-56"
              />
            </motion.div>
            <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.25em] text-ink/50">
              Getting big…
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo — framed card that fades in once loaded */}
      <motion.div
        initial={false}
        animate={
          ready
            ? { opacity: 1, scale: 1, rotate: -2.5 }
            : { opacity: 0, scale: 1.06, rotate: 0 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-[42%] z-10 h-[42vh] w-[78vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden border-[14px] border-white shadow-2xl md:h-[48vh] md:w-[36vw] md:border-[22px]"
      >
        <Image
          src="/photos/331A8865.jpg"
          alt="Kid on a boat holding a giant BigHead on a stick"
          fill
          priority
          sizes="(min-width: 768px) 36vw, 78vw"
          className="object-cover object-[50%_20%]"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-ink/20" />
      </motion.div>

      {/* Headline + CTA once ready */}
      {ready && (
        <div className="absolute inset-0 z-20 flex select-none flex-col items-center justify-center pt-16 md:pt-20">
          <motion.h1
            initial={{ opacity: 0, scale: 3.6 }}
            animate={{ opacity: 1, scale: [3.6, 0.85, 1.12, 0.97, 1] }}
            transition={{
              opacity: { duration: 0.12 },
              scale: {
                duration: 0.72,
                times: [0, 0.45, 0.68, 0.85, 1],
                ease: [0.22, 1.4, 0.36, 1],
              },
            }}
            className="relative font-black uppercase leading-none tracking-tight text-ink drop-shadow-[0_4px_18px_rgba(38,52,58,0.35)] text-[12vw] md:text-[9vw]"
          >
            Your face.
          </motion.h1>

          <div className="h-[28vh] md:h-[32vh]" aria-hidden />

          <h1 className="relative flex gap-[0.22em] font-black uppercase leading-none tracking-tight text-berry drop-shadow-[0_4px_18px_rgba(38,52,58,0.35)] text-[12vw] md:text-[9vw]">
            <StampWord word="Way" start={wayStart} step={wayStep} />
            <StampWord word="bigger." start={biggerStart} step={biggerStep} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subDelay, duration: 0.45 }}
            className="mt-5 flex max-w-lg flex-col items-center px-6 text-center"
          >
            <p className="text-base font-extrabold text-teal-deep md:text-xl">
              Giant heads on a stick, built from your photos.
            </p>
            <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-black text-ink md:text-base">
              <span className="text-berry">{SIZE_INCHES}&quot; tall</span>
              <span className="text-ink/25" aria-hidden>
                ·
              </span>
              <span>
                From <span className="text-berry">${PRICE_FROM}</span>
              </span>
              <span className="text-ink/25" aria-hidden>
                ·
              </span>
              <span>{SHIP_DAYS_LABEL}</span>
            </p>
            <a
              href={BUILD_HREF}
              className="mt-6 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-105 hover:bg-berry-deep"
            >
              Build yours
            </a>
          </motion.div>
        </div>
      )}
    </section>
  );
}
