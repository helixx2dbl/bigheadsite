"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/photos/IMG_4716.jpg",
    caption: "The whole crew got heads",
    rotate: "-rotate-2",
  },
  {
    src: "/photos/331A8865.jpg",
    caption: "Boat days hit different",
    rotate: "rotate-1",
  },
  {
    src: "/photos/IMG_4690.jpg",
    caption: "Course-side cheering squad",
    rotate: "rotate-2",
  },
  {
    src: "/photos/IMG_4713.jpg",
    caption: "Finish line energy",
    rotate: "-rotate-1",
  },
  {
    src: "/photos/IMG_0106.jpg",
    caption: "Double-fisted fandom",
    rotate: "rotate-2",
  },
  {
    src: "/photos/IMG_4693.jpg",
    caption: "Bigger than the kids holding them",
    rotate: "-rotate-2",
  },
  {
    src: "/photos/IMG_4835.jpg",
    caption: "It also works as a mask",
    rotate: "rotate-1",
  },
  {
    src: "/photos/IMG_4715.jpg",
    caption: "Ironman, meet BigHead",
    rotate: "-rotate-1",
  },
  {
    src: "/photos/IMG_4696.jpg",
    caption: "Mandatory selfie",
    rotate: "rotate-2",
  },
];

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
      const half = el.scrollWidth / 2;
      if (half > 0) {
        if (pausedRef.current) {
          // user is scrolling/dragging: follow their position
          pos = el.scrollLeft;
        } else {
          pos += 0.7;
        }
        if (pos >= half) {
          pos -= half;
        } else if (pos < 0) {
          pos += half;
        }
        if (!pausedRef.current) {
          el.scrollLeft = pos;
        } else if (el.scrollLeft >= half || el.scrollLeft < 0) {
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

  const track = [...photos, ...photos];

  return (
    <section className="overflow-hidden bg-cream-deep py-24 md:py-28">
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
        className="no-scrollbar flex cursor-grab select-none gap-8 overflow-x-auto px-8 py-6 active:cursor-grabbing"
      >
        {track.map((photo, i) => (
          <figure
            key={i}
            className={`${photo.rotate} w-60 shrink-0 rounded-2xl bg-white p-3 pb-5 shadow-xl md:w-72`}
          >
            <div className="pointer-events-none relative aspect-[3/4] overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(min-width: 768px) 288px, 240px"
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
