"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/photos/IMG_5466.jpg",
    caption: "Make your buddies instant celebs",
    rotate: "-rotate-2",
    wide: true,
  },
  {
    src: "/photos/IMG_4716.jpg",
    caption: "Ironman, meet BigHead",
    rotate: "rotate-1",
  },
  {
    src: "/photos/IMG_5497.jpg",
    caption: "Big Heads, No Tarps",
    rotate: "rotate-2",
  },
  {
    src: "/photos/IMG_5552.jpg",
    caption: "Poolside for kickoff",
    rotate: "rotate-2",
  },
  {
    src: "/photos/IMG_5519.jpg",
    caption: "Takes a Big Head to hit 961",
    rotate: "rotate-1",
  },
  {
    src: "/photos/IMG_4690.jpg",
    caption: "Course-side cheering squad",
    rotate: "-rotate-1",
  },
];

// The strip scrolls by one set and wraps, so the sets behind the wrap point
// have to keep the viewport covered or the scroll stalls at the end of the
// track. Derive the count from the photo list so trimming photos stays safe.
const CARD_PITCH = 320; // narrowest md card (288) + gap (32); wide cards exceed it
const WIDEST_VIEWPORT = 3840;
const REPEATS =
  Math.ceil(WIDEST_VIEWPORT / (photos.length * CARD_PITCH)) + 1;

export default function Gallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  // Pause auto-scroll while the user interacts, resume shortly after.
  const holdAutoScroll = () => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2500);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf: number;
    // scrollLeft assignments round to integers, so accumulate in a float
    let pos = el.scrollLeft;
    const tick = () => {
      const setWidth = el.scrollWidth / REPEATS;
      if (setWidth > 0) {
        if (pausedRef.current) {
          // user is scrolling/dragging: follow their position
          pos = el.scrollLeft;
        } else {
          pos += 0.7;
        }
        if (pos >= setWidth) {
          pos -= setWidth;
        } else if (pos < 0) {
          pos += setWidth;
        }
        if (!pausedRef.current) {
          el.scrollLeft = pos;
        } else if (el.scrollLeft >= setWidth || el.scrollLeft < 0) {
          el.scrollLeft = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    // touch devices scroll natively; custom drag is for mouse
    if (e.pointerType !== "mouse") {
      holdAutoScroll();
      return;
    }
    const el = scrollerRef.current!;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
    holdAutoScroll();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const el = scrollerRef.current!;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
    holdAutoScroll();
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  const track = Array.from({ length: REPEATS }, () => photos).flat();

  return (
    <section data-section="gallery" className="overflow-hidden bg-cream-deep py-24 md:py-28">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <p className="font-script text-3xl text-teal">spotted in the wild</p>
        <h2 className="mt-3 text-3xl font-black text-ink md:text-4xl">
          <span className="whitespace-nowrap text-berry">Big Heads</span> out
          there doing <span className="whitespace-nowrap">Big Things</span>
        </h2>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onWheel={holdAutoScroll}
        onTouchMove={holdAutoScroll}
        className="no-scrollbar flex cursor-grab select-none items-center gap-8 overflow-x-auto px-8 py-6 active:cursor-grabbing"
      >
        {track.map((photo, i) => (
          <figure
            key={i}
            className={`${photo.rotate} ${
              photo.wide ? "w-[25.5rem] md:w-[30.833rem]" : "w-60 md:w-72"
            } shrink-0 rounded-2xl bg-white p-3 pb-5 shadow-xl`}
          >
            <div
              className={`pointer-events-none relative ${
                photo.wide ? "aspect-[4/3]" : "aspect-[3/4]"
              } overflow-hidden rounded-xl`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes={
                  photo.wide
                    ? "(min-width: 768px) 470px, 384px"
                    : "(min-width: 768px) 288px, 240px"
                }
                className="object-cover"
                draggable={false}
              />
            </div>
            <figcaption className="mt-4 text-center font-script text-lg text-ink/70">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
