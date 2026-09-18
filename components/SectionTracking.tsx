"use client";

import { useEffect } from "react";
import { EVENT_SECTION_VIEW, GA4_ID } from "@/lib/analytics";

// How far down the landing page people actually get. This is the no-third-party
// version of a heatmap: instead of recording where a cursor went, it reports the
// first time each section comes into view, which turns the page into a drop-off
// funnel — 100% see the hero, N% reach the gallery, N% ever reach the FAQ.
//
// Sections opt in by putting data-section="<name>" on their root element, so a
// section that is reordered or removed needs no change here.
//
// rootMargin shrinks the viewport's bottom edge by 25% rather than using a
// threshold ratio: a threshold like 0.3 is unreachable for a section taller than
// the viewport (30% of it is never on screen at once on a phone), which would
// silently drop exactly the long sections most worth measuring. Requiring the top
// edge to cross into the upper 75% works the same on any section height.
export default function SectionTracking() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const name = entry.target.getAttribute("data-section");
          if (!name || seen.has(name)) continue;

          // Once per page load: this answers "did they reach it", not "how many
          // times did it scroll past", so scrolling back up must not inflate it.
          seen.add(name);
          observer.unobserve(entry.target);

          // Read at fire time, not on mount — gtag.js is loaded async, so on a slow
          // connection the first section can come into view before it lands. An
          // early section silently missing is worse than the event not existing.
          window.gtag?.("event", EVENT_SECTION_VIEW, {
            send_to: GA4_ID,
            section_name: name,
          });
        }
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    document
      .querySelectorAll("[data-section]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
