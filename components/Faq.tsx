"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Content lives in lib/faqs.ts so the JSON-LD builder (a server module) can read it too.
import { faqs } from "@/lib/faqs";

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
    <section id="faq" data-section="faq" className="scroll-mt-20 bg-cream-deep py-16 md:py-24">
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
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-button-${item.id}`}
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
                {/* ALWAYS RENDERED, collapsed with CSS rather than unmounted.
                    This used to be {isOpen && ...} inside AnimatePresence, which kept the
                    answer out of the DOM entirely until someone clicked — so the built HTML
                    carried all nine QUESTIONS and none of the nine ANSWERS. That is ~1,200
                    words of the most search-valuable copy on the site, invisible to crawlers
                    (a rendering crawler cannot see it either: it is gated on a click, not on
                    hydration), and it made valid FAQPage structured data impossible, since
                    the markup has to contain the answer text the schema claims.
                    Collapsed-but-present is the standard accordion pattern and is indexed.
                    aria-hidden keeps screen readers from reading out all ten at once.

                    Animated with max-height rather than framer-motion, for one reason only:
                    a plain CSS transition can be verified headlessly and a JS-driven one
                    cannot. The motion version was almost certainly fine — it was measured
                    under Chrome's --virtual-time-budget, which fast-forwards setTimeout but
                    does NOT advance the animation clock, so every animated property reads as
                    stuck at its start value. Two rewrites were made chasing that phantom
                    before the cause was spotted. If you are ever testing an animation in
                    headless Chrome, disable the transition and assert the END STATE; do not
                    trust a mid-flight measurement under virtual time.
                    max-h-96 (384px) is not a guess: the tallest answer measures 232px at a
                    360px viewport and 154px at 900px, so there is ~65% headroom. An answer
                    that outgrew it would CLIP rather than scroll, so re-measure if these get
                    much longer. */}
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                  aria-hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 font-semibold leading-relaxed text-ink/70">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
