"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const faqs = [
  {
    id: "size",
    q: "How big are the heads?",
    a: "Big. Each BigHead is about 24 inches tall, roughly three times life size, printed on rigid, lightweight board and mounted on a sturdy stick. Easy to wave for a whole game, impossible to miss from the bleachers.",
  },
  {
    id: "price",
    q: "How much do they cost?",
    a: "$25 for the first print of a design, and $17.50 for every extra copy of that same design \u2014 30% off. So one face printed three times is $25 + $17.50 + $17.50. Three different faces is $25 each, because each one is a new design to cut. Shipping is free, always \u2014 no minimum, no thresholds.",
  },
  {
    id: "photo",
    q: "What kind of photo do I need?",
    a: "A front-facing shot in decent light where the head isn't blocked or blurry. Almost any modern phone photo works great. Our builder shows you a live preview of the cut-out before you pay, so you'll know it looks good before we print it.",
  },
  {
    id: "shipping",
    q: "How long does shipping take?",
    a: "Every head is cut and assembled to order, which takes 1-2 business days, then 2-5 days in transit. Shipping is free anywhere in the US, on every order. Got a hard date coming up? Get in touch before you order and we'll tell you honestly whether we can make it.",
  },
  {
    id: "durability",
    q: "Will it survive rain and rowdy crowds?",
    a: "BigHeads have a weather-resistant coating that shrugs off drizzle, spilled drinks, and confetti. They're built for full seasons of tailgates. Just don't use one as a paddle.",
  },
  {
    id: "referral",
    q: "How does the referral program work?",
    a: "Every head ships with a QR code on the back carrying a discount code that's yours. Anyone who scans it gets 10% off their order, and we refund that same amount \u2014 10% of what they spend \u2014 straight back to your card. It keeps paying out until your own order is fully refunded, so a few scans at one tailgate can cover the whole thing.",
  },
  {
    id: "group",
    q: "Can I order a bunch for a group?",
    a: "Absolutely \u2014 one order can hold up to nine different faces, and as many copies of each as you like. The saving is on copies rather than order size: extra prints of the same face are $17.50 instead of $25. The whole crew ships together in one box.",
  },
  {
    id: "split",
    q: "I fronted the group order. How do I get paid back?",
    a: "After checkout we generate a branded repay link that splits your total per head, shipping included. Send it to the crew: they can pay you back instantly with Venmo, Zelle, or PayPal, or pay through BigHead Builder and we refund that share of your order automatically. The link also carries your order info, so anyone who wants their own head can buy through it, and that purchase refunds you too.",
  },
  {
    id: "pets",
    q: "Does it have to be a human head?",
    a: "Nope. Dogs, cats, babies, grandma, your fantasy league commissioner. If it has a face, we can put it on a stick.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  // Info icons around the site link to #faq-<id>; expand that entry on arrival.
  // The expansion is delayed until the browser's smooth anchor scroll has
  // finished: a layout change mid-scroll cancels the scroll in Chromium.
  useEffect(() => {
    let openTimer: ReturnType<typeof setTimeout>;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const openFromHash = () => {
      const match = window.location.hash.match(/^#faq-(.+)$/);
      if (!match) return;
      const id = match[1];
      const i = faqs.findIndex((f) => f.id === id);
      if (i === -1) return;
      clearTimeout(openTimer);
      clearTimeout(scrollTimer);
      openTimer = setTimeout(() => {
        setOpen(i);
        // The browser's own anchor scroll ran while the entry was still
        // collapsed, so for entries near the bottom it bottomed out the page
        // before reaching the top. Opening the panel adds height below, which
        // frees up the scroll room, so re-run the scroll once the 250ms
        // expand animation has settled.
        scrollTimer = setTimeout(() => {
          document
            .getElementById(`faq-${id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }, 700);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(scrollTimer);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  return (
    <section id="faq" className="scroll-mt-20 bg-cream-deep py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-script text-3xl text-berry">got questions?</p>
          <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.id}
                id={`faq-${item.id}`}
                className="scroll-mt-28 rounded-2xl bg-cream shadow-sm"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-extrabold text-ink">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-xl font-black text-cream"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-semibold leading-relaxed text-ink/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
