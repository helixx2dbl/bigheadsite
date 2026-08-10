"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import InfoLink from "./InfoLink";

const ladder = [
  {
    n: "1",
    title: "Every scan pays you back",
    body: "Each head bought with your code takes a dollar off yours — until your order is completely free.",
  },
  {
    n: "2",
    title: "Then you start stacking points",
    body: "Every head keeps earning you points you can redeem for cool stuff, like $25 Visa gift cards.",
  },
  {
    n: "3",
    title: "Then... Profit??",
    body: "Spend it on more heads. Spend it on a jet ski. Live más, baja blast at will — we're not your financial advisor.",
  },
];

const answers = [
  "Scan my code and get one!",
  "That's me. I'm the head guy.",
  "One scan and this could be you.",
  "Scan it — we could be twinsies.",
  "My face literally pays for itself.",
  "The QR code's on the stick, chief.",
  "Every scan gets me closer to a jet ski.",
  "Do it for the group photo.",
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
              Pick a referral handle — like a gamertag — and we print it as QR
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
