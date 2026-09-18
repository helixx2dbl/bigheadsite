"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BuildButton from "./BuildButton";
import InfoLink from "./InfoLink";

const steps = [
  {
    n: "01",
    title: "Upload a photo",
    body: "Any clear shot works. Our builder cuts out the head automatically. It only takes seconds.",
    accent: "bg-berry",
    icon: "/icons/upload.svg",
    faq: "photo",
    iconW: 239,
    iconH: 216,
  },
  {
    n: "02",
    title: "Preview it BIG",
    body: "See your head on the stick instantly. Not feeling it? Swap in a new photo and try again.",
    accent: "bg-teal",
    icon: "/icons/cutout.svg",
    iconW: 279,
    iconH: 241,
  },
  {
    n: "03",
    title: "We build it",
    body: "Every BigHead is about 24\" tall, printed on premium corrugated stock that survives the wildest cheering.",
    accent: "bg-berry",
    icon: "/icons/printing.svg",
    faq: "size",
    iconW: 256,
    iconH: 220,
  },
  {
    n: "04",
    title: "It ships to you",
    body: "Ships flat in 1-2 business days with the stick and a strip of industrial-strength 3M tape. Press it on and you\u2019re done - flat-packing is what keeps it from arriving bent.",
    accent: "bg-teal",
    icon: "/icons/shipping.svg",
    faq: "shipping",
    iconW: 328,
    iconH: 178,
  },
];

export default function HowItWorks() {
  return (
    <section data-section="how-it-works" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center font-script text-3xl text-berry"
        >
          how it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-center text-4xl font-black text-ink md:text-5xl"
        >
          Photo to doorstep in four easy steps
        </motion.h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-cream-deep p-7 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${step.accent} text-lg font-black text-cream`}
                >
                  {step.n}
                </span>
                <Image
                  src={step.icon}
                  alt=""
                  aria-hidden
                  width={step.iconW}
                  height={step.iconH}
                  unoptimized
                  className="h-20 w-auto"
                />
              </div>
              <h3 className="mt-5 flex items-center gap-2 text-xl font-extrabold text-ink">
                {step.title}
                {step.faq && <InfoLink faq={step.faq} className="text-teal-deep" />}
              </h3>
              <p className="mt-3 font-semibold leading-relaxed text-ink/65">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Group split-pay callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mx-6 mt-16 grid items-center gap-8 border-0 border-dashed border-cream/50 bg-teal p-6 pt-10 sm:mx-0 sm:rounded-3xl sm:border-[3px] sm:p-8 sm:pt-10 md:grid-cols-2 md:p-12 md:pt-12"
        >
          <div className="absolute -top-6 left-6 -rotate-2 rounded-full bg-berry px-6 py-2.5 font-script text-xl text-cream shadow-lg md:left-10 md:text-2xl">
            Ordering for the Group?
          </div>
          <div>
            <h3 className="text-2xl font-black text-cream md:text-3xl">
              Front the order,
              <br />
              get paid back fast.
              <InfoLink faq="split" className="ml-2 align-middle text-cream" />
            </h3>
            <p className="mt-4 font-semibold leading-relaxed text-cream/80">
              Check out once for the whole crew and we hand you a link with the
              cost per head already worked out, shipping included. Add your
              Venmo, Cash App, PayPal or Zelle and the crew squares up with you
              directly, or they can pay us by card and we refund that share of
              your order automatically.
            </p>
          </div>

          {/* Example repay message */}
          <div className="rounded-2xl bg-cream p-4 shadow-xl sm:p-6 md:rotate-1">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/head.svg"
                alt=""
                aria-hidden
                width={26}
                height={55}
                unoptimized
                className="h-11 w-auto"
              />
              <div>
                <p className="text-sm font-black text-ink">
                  Rick sent you a repay link
                </p>
                <p className="break-all text-xs font-bold text-ink/50">
                  app.bigheadbuilder.com/split/a3f9c1&hellip;
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-cream-deep p-4 text-sm font-semibold leading-relaxed text-ink/80">
              &ldquo;You owe me for 2 heads from race day, $48.00 covers both,
              shipping split.&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Venmo", "Cash App", "PayPal", "Zelle", "Pay on BigHead"].map((method) => (
                <span
                  key={method}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold ${
                    method === "Pay on BigHead"
                      ? "bg-berry text-cream"
                      : "border-2 border-ink/15 text-ink/70"
                  }`}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="font-script text-3xl text-teal md:text-4xl">
            &ldquo;I have the best idea for a Big Head!&rdquo;
          </p>
          <div className="mt-6">
            <BuildButton cta="how-it-works" label="Get Started Then!" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
