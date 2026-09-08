"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import InfoLink from "./InfoLink";
import { REFERRAL_PERCENT } from "@/lib/pricing";

// One number drives both sides of this — REFERRAL_PERCENT, which mirrors the app's
// AFFILIATE_CODE_PERCENTAMOUNT. The old copy promised a points balance and $25 Visa
// gift cards; neither exists anywhere in the app, so both are gone.
const ladder = [
  {
    n: "1",
    title: "They scan, they save",
    body: `Your code rides on the back of every head you order. Anyone who scans it takes ${REFERRAL_PERCENT}% off their own order, automatically at checkout.`,
  },
  {
    n: "2",
    title: "You get the same back",
    body: `Whatever they save, we refund to your card \u2014 ${REFERRAL_PERCENT}% of what they spend. Not a credit, not a coupon. Actual money, back where it came from.`,
  },
  {
    n: "3",
    title: "Until yours is free",
    body: "It keeps paying out until your own order is fully refunded. Get enough of the crew scanning and your head cost you nothing.",
  },
];

const answers = [
  "All the cool kids are doing it!",
  "That's me. I'm the head guy. The BIG head guy.",
  "One scan and this could be you.",
  "First we get the scans, then we get the khakis.",
  "My face literally pays for itself.",  
  "Every scan gets me closer to a jet ski.",
  "Do it for the chat.",
  "Scan now, thank me at the tailgate.",
  "This head is my side hustle.",
];

function RotatingAnswer() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % answers.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mt-4 flex min-h-[5.5rem] items-center overflow-hidden md:min-h-[4.5rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-4 border-berry pl-4 font-script text-2xl leading-snug text-cream md:text-3xl"
        >
          &ldquo;{answers[index]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const useCases = [
  "40th birthdays",
  "Marathon sidelines",
  "Graduation crowds",
  "WWE-style superfans",
  "Tailgates",
  "Kids hustling at the park",
  "Retirement parties",
  "Family reunions",
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Referral() {
  return (
    <section className="overflow-hidden bg-teal-deep py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Copy + earnings ladder */}
          <div>
            <motion.p {...fadeUp} className="font-script text-3xl text-cream/80">
              get paid to show off
            </motion.p>
            <motion.h2
              {...fadeUp}
              className="mt-4 text-4xl font-black leading-tight text-cream md:text-5xl"
            >
              Every head ships with your own QR code.
            </motion.h2>
            <motion.p {...fadeUp} className="mt-6 text-lg font-semibold text-cream/75">
              Pick a referral handle, like a gamertag, and we print it as QR
              stickers on your order. Big heads attract big questions, and when
              someone asks, the answer is easy:
            </motion.p>
            <motion.div {...fadeUp}>
              <RotatingAnswer />
            </motion.div>

            <div className="mt-10 space-y-4">
              {ladder.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="flex gap-4 rounded-2xl bg-cream/10 p-4 backdrop-blur-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-berry text-base font-black text-cream">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-extrabold text-cream">
                      {step.title}
                      {step.n === "2" && (
                        <InfoLink faq="referral" className="text-cream" />
                      )}
                    </h3>
                    <p className="mt-1 font-semibold leading-snug text-cream/70">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* QR sticker card */}
          <div className="relative mx-auto w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] bg-cream p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/brand/logo.svg"
                  alt="BigHead Builder"
                  width={56}
                  height={64}
                  unoptimized
                  className="h-auto w-14"
                />
                <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-teal-deep">
                  Referral sticker
                </span>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border-4 border-ink/10">
                <Image
                  src="/brand/qr.png"
                  alt="Sample referral QR code"
                  width={500}
                  height={500}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-5 text-center text-2xl font-black tracking-tight text-ink">
                @BIGRICK52
              </p>
              <p className="mt-1 text-center text-sm font-bold uppercase tracking-[0.2em] text-berry">
                Scan my code &amp; get one
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -top-6 left-0 rounded-full bg-berry px-5 py-3 font-script text-lg text-cream shadow-lg md:-left-6 md:text-xl"
            >
              free money, basically
            </motion.div>
          </div>
        </div>

        {/* Use cases */}
        <motion.div {...fadeUp} className="mt-20 text-center">
          <p className="font-script text-2xl text-cream/80">
            where the scans happen
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {useCases.map((useCase) => (
              <span
                key={useCase}
                className="rounded-full border-2 border-teal/30 bg-cream px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-teal-deep"
              >
                {useCase}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
