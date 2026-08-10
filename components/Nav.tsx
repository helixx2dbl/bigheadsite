"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BUILD_HREF } from "@/lib/pricing";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Switch to solid/ink nav once we've scrolled past the hero
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream/90 shadow-sm backdrop-blur-md"
          : "bg-gradient-to-b from-ink/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-sticker.svg"
            alt="BigHead Builder"
            width={44}
            height={49}
            unoptimized
            className="h-auto w-10 drop-shadow-sm sm:w-11"
          />
          <span
            className={`hidden font-script text-xl transition-colors duration-500 sm:inline ${
              solid ? "text-berry" : "text-cream drop-shadow"
            }`}
          >
            BigHead Builder
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a
            href="#faq"
            className={`text-sm font-extrabold transition-colors duration-500 hover:underline ${
              solid ? "text-ink" : "text-cream drop-shadow"
            }`}
          >
            FAQ
          </a>
          {loggedIn ? (
            <button
              type="button"
              onClick={() => setLoggedIn(false)}
              title="Log out"
              aria-label="Account — click to log out"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-berry bg-teal-deep shadow-md transition-transform hover:scale-105"
            >
              <span className="text-xs font-black tracking-tight text-cream">
                BR
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setLoggedIn(true)}
              className={`text-sm font-extrabold transition-colors duration-500 hover:underline ${
                solid ? "text-ink" : "text-cream drop-shadow"
              }`}
            >
              LOGIN
            </button>
          )}
          <a
            href={BUILD_HREF}
            className="whitespace-nowrap rounded-full bg-berry px-4 py-2.5 text-sm font-extrabold text-cream shadow-md transition-transform hover:scale-105 hover:bg-berry-deep sm:px-5"
          >
            Build yours
          </a>
        </div>
      </div>
    </header>
  );
}
