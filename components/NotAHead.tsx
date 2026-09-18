"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import BuildButton from "./BuildButton";

// The cheeky beat after the gallery: everything in here is a real order that wasn't a head.
// Cycles one at a time on the same rhythm and slide as Testimonials — cutout on one side,
// its line on the other — rather than laying the whole cast out at once.
//
// `fit` works around three source files that aren't shaped like the rest. Nothing is
// re-cut on disk — the crop happens in CSS inside the same portrait frame every item uses,
// so re-exporting any of these tight just means deleting its flag.
//   "left"  — a very wide canvas with the subject in the left corner and dead space beside
//             it (jaime_dani_ski 2804x1243, vas_moose 3013x1282). Cover + left origin keeps
//             the subject and throws away the empty canvas.
//   "cover" — banff_chair is not a die-cut at all: it's a whole rectangular photo with black
//             letterbox bars baked into the top and bottom. Cover trims the bars off. It
//             still reads as a photo rather than a cutout; worth re-exporting properly.
// Everything else is a clean tight portrait and just uses contain.
type Fit = "contain" | "left" | "cover";

const OBJECT_CLASS: Record<Fit, string> = {
  contain: "object-contain object-bottom",
  left: "object-cover object-left-bottom",
  cover: "object-cover object-center",
};

// `label` is the little pill, `line` the punchline. Written blind from the photos — these
// are your people, so rename them to whatever is actually funny to the people in them.
const CUTOUTS: {
  src: string;
  alt: string;
  label: string;
  line: string;
  fit?: Fit;
}[] = [
  {
    src: "/photos/not_really/dog.png",
    alt: "A dog, cut out on a stick",
    label: "The good boy",
    line: "Give him the stick. Don't give him the stick!",
  },
  {
    src: "/photos/not_really/ash_fish.png",
    alt: "Someone holding a freshly caught fish, cut out on a stick",
    label: "You found a fish",
    line: "The one that didn't get away, now permanently not getting away.",
  },
  {
    src: "/photos/not_really/vas_moose.png",
    alt: "Someone riding a moose statue, cut out on a stick",
    label: "The moose",
    line: "How can we tell you're a CDA tourist if you don't have a moose on a stick?",
    fit: "left",
  },
  {
    src: "/photos/not_really/cat.png",
    alt: "A cat, cut out on a stick",
    label: "The cat",
    line: "She did not consent to this and she never will.",
  },
  {
    src: "/photos/not_really/jerm_surf.png",
    alt: "A surfer, cut out on a stick",
    label: "Get Pitted",
    line: "Oh, brah, it's just like... dude, you get the best barrels ever, dude. Just like, you pull in, and you just get spit right out of 'em.",
  },
  {
    src: "/photos/not_really/jaime_dani_ski.png",
    alt: "Two skiers celebrating, cut out on a stick",
    label: "The ski trip",
    line: "Maybe they're banked slaloming champs. Maybe they're just super good at lodge beers. Either way, celebrate their achievement!",
    fit: "left",
  },
  {
    src: "/photos/not_really/banff_chair.png",
    alt: "Two kids in a giant Banff Sunshine Village chair, on a stick",
    label: "The whole chair",
    line: "If you want to break it down at Banff's Goat Club, you must preserve your energy.",
    fit: "cover",
  },
  {
    src: "/photos/not_really/tyson_4wheeler.png",
    alt: "Someone on a four-wheeler, cut out on a stick",
    label: "The four-wheeler",
    line: "Man and machine, on top of Mallorca, hoping nobody whiskey throttles off the mountain.",
  },
  {
    src: "/photos/not_really/krud.png",
    alt: "The back of a KRUD Champion jacket, cut out on a stick",
    label: "KRUD KING",
    line: "Baldface Rookie proudly flaunts his victory. If you can't be king of the hill, be king of the table.",
  },
  {
    src: "/photos/not_really/trav_fieri.png",
    alt: "A man in a stars-and-stripes visor and sunglasses, cut out on a stick",
    label: "Fieri Fridays",
    line: "You know what these tacos could use? A bit more Donkey Sauce. Please visit Cochinito Taqueria Hayden.",
  },
];

const ROTATE_MS = 6200;

const EASE = [0.22, 1, 0.36, 1] as const;
const MARCH_S = 0.9;

// The heads march through fixed slots rather than the card sliding as a unit: on each tick
// the front head carries on past the viewer, the first background head takes its place, the
// second moves up behind it, and the next one in line arrives at the back.
//
// The mechanic is why these are persistent elements keyed by src, NOT AnimatePresence
// children. Each head stays mounted while it crosses the stack and simply gets a new slot
// as target, so framer tweens it from where it is to where it now belongs. Swapping keyed
// children instead would cross-fade three heads in place, which is the thing this replaces.
//
// `offset` is how far a head is from the front: 0 is the foreground, 1 and 2 the two
// backgrounds, and total-1 is the one that just left.
//
// The x values fan the queue out to the LEFT, so the march runs diagonally: heads arrive
// small at the back left, grow as they step right and forward, and leave off the right.
// The far slots deliberately overhang the portal's left edge and get clipped by it — that
// crop is what makes the line read as continuing past the frame rather than starting in it.
// Depth is carried by HAZE, NOT TRANSPARENCY — ported from the app's party pals
// (BuildPanel_Head.scss: `blur(1px) saturate(.5) contrast(.7)`). Its comment there is the
// reason: a semi-opaque head lets the crowd photo show THROUGH it, which reads as a ghost
// rather than as distance. Staying opaque and washing out — softer, greyer, lifted toward
// white — is what puts a head behind another one. Do not swap these back to opacity now
// that there is a photo behind them.
// `y` pushes a head down past the portal's floor so its stick runs off the bottom edge and
// is cut by it. Every slot sets y explicitly, including the ones that want none: framer
// leaves an omitted property at whatever it currently is, so a y set only on the front slot
// would stay stuck to that head for the rest of its lap around the queue.
const SLOT_FRONT = {
  x: 46,
  y: 26,
  scale: 1.15,
  opacity: 1,
  filter: "blur(0px) saturate(1) contrast(1)",
  zIndex: 30,
};
const SLOT_NEAR = {
  x: -48,
  y: 10,
  scale: 0.7,
  opacity: 1,
  filter: "blur(1.6px) saturate(0.62) contrast(0.78) brightness(1.03)",
  zIndex: 20,
};
const SLOT_FAR = {
  x: -142,
  y: 6,
  scale: 0.5,
  opacity: 1,
  filter: "blur(3px) saturate(0.42) contrast(0.64) brightness(1.06)",
  zIndex: 10,
};
// Leaving: no fade. It carries on to the right, shrinks a little and blurs off, and the
// portal's overflow does the rest — x is far enough that the whole box clears the right
// edge (element spans 70-298 in a 368 portal, so +340 puts its left edge at ~416).
// It can afford to stay opaque because it UNMOUNTS on the very next tick: offset goes
// total-1 -> total-2, which is outside the mounted window, so it never sweeps back across
// the frame to reach the queue slot. Widen that window and this would need its fade back.
const SLOT_GONE = {
  x: 340,
  y: 26,
  scale: 0.95,
  opacity: 1,
  filter: "blur(7px) saturate(0.9) contrast(0.95)",
  zIndex: 40,
};
const SLOT_QUEUE = {
  x: -208,
  y: 4,
  scale: 0.36,
  opacity: 0,
  filter: "blur(4px) saturate(0.4) contrast(0.6) brightness(1.06)",
  zIndex: 5,
};

function slotFor(offset: number, total: number) {
  if (offset === 0) return SLOT_FRONT;
  if (offset === 1) return SLOT_NEAR;
  if (offset === 2) return SLOT_FAR;
  if (offset === total - 1) return SLOT_GONE;
  return SLOT_QUEUE;
}

// The text is the one thing that still swaps rather than marches — it crosses over the top
// of the card while the heads move underneath it.
const TEXT_VARIANTS = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: 0.12 } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.25, ease: EASE } },
};

export default function NotAHead() {
  const [index, setIndex] = useState(0);
  // Pauses the rotation while someone is actually looking at one, so clicking a dot
  // doesn't get yanked away a moment later.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % CUTOUTS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const total = CUTOUTS.length;
  const cut = CUTOUTS[index];

  // Only the heads with somewhere to be stay mounted: the front two backgrounds, the one
  // arriving at the back, and the one on its way out. Mounting all ten would pull every
  // PNG down at once for the sake of seven invisible elements.
  const marching = CUTOUTS.map((c, i) => ({
    cut: c,
    offset: (i - index + total) % total,
  })).filter(({ offset }) => offset <= 3 || offset === total - 1);

  return (
    <section data-section="not-a-head" className="overflow-hidden bg-teal py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-script text-3xl text-cream/90 md:text-4xl"
        >
          &ldquo;Does it have to be a head?&rdquo;
        </motion.p>

        {/* The attribution turns the kicker from a heading into something a real person
            said, which is what sets up the answer as a reply rather than a slogan. Same
            small-caps treatment Testimonials uses under its quotes. */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-cream/55"
        >
          asked by roughly everyone
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.45,
            type: "spring",
            stiffness: 420,
            damping: 12,
          }}
          // Outlined via the knock-out in globals.css (.text-ring), which needs the text
          // twice: once as the element's own content and once in data-text for the stroked
          // copy behind it. Keep the two identical or the outline stops matching the word.
          //
          // --ring-knockout must be the colour BEHIND the type — this section is bg-teal —
          // because that copy is what covers the inward half of the stroke.
          data-text="Not really!"
          style={{ "--ring-knockout": "var(--teal)" } as React.CSSProperties}
          // POSITIVE tracking, not the tracking-tight this had while it was solid. The
          // outline adds ~4px of visual width to each side of every glyph, so at negative
          // tracking neighbouring letters' outlines collide — EA and LL ran together.
          className="text-ring mt-4 text-6xl font-black uppercase tracking-[0.03em] md:text-8xl"
        >
          Not really!
        </motion.h2>
      </div>

      <div
        className="mx-auto mt-10 max-w-4xl px-6 md:mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <figure className="flex flex-col items-center gap-7 md:flex-row md:gap-10">
          {/* The portal: the same crowd scene the builder puts your head in front of
              (Background_Crowd.jpg, copied from the app's app/assets/ui). Two layers, as
              in the app — the photo over a sky gradient that shows if the jpg is slow, so
              the frame never flashes white. `center bottom` keeps the crowd's own heads at
              the foot of the frame, which is where our sticks land. The inset shadow
              vignettes the edges, and overflow-hidden crops the back of the queue against
              the left edge. */}
          <div
            className="relative h-72 w-full shrink-0 overflow-hidden rounded-3xl shadow-[inset_0_2px_30px_rgba(38,52,58,0.3)] md:h-[23rem] md:w-[23rem]"
            style={{
              backgroundImage:
                "url(/photos/crowd.jpg), linear-gradient(180deg, #87cff2 0%, #d9f0ff 100%)",
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
            }}
          >
            {/* Every head is bottom-anchored and scales from its base, so all of them stand
                on the portal's floor whichever slot they're in — the promotion then reads
                as stepping forward rather than sliding up. */}
            {marching.map(({ cut: c, offset }) => (
              <motion.div
                key={c.src}
                // mounting at its slot rather than animating to it — heads join the queue
                // invisible, so arriving in the stack is never a pop
                initial={false}
                animate={slotFor(offset, total)}
                transition={{ duration: MARCH_S, ease: EASE }}
                style={{ transformOrigin: "bottom center" }}
                className="absolute inset-x-0 bottom-0 top-11 mx-auto w-[62%]"
              >
                {/* the sway is a CSS animation on its own transform, so it lives on an
                    inner element — sharing one with framer's transform means the
                    keyframes win and the slot positioning is thrown away */}
                <div className="animate-bighead-sway relative h-full w-full">
                  <Image
                    src={c.src}
                    alt={offset === 0 ? c.alt : ""}
                    aria-hidden={offset !== 0}
                    fill
                    unoptimized
                    priority={offset === 0 && index === 0}
                    sizes="(min-width: 768px) 15rem, 12rem"
                    className={OBJECT_CLASS[c.fit ?? "contain"]}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chip and line sit beside the portal on the teal, vertically centred against
              it. Only the words swap; mode="wait" so the outgoing line clears before the
              new one arrives, since two lines crossing in the same place is unreadable. */}
          <div className="flex w-full max-w-sm items-center md:min-h-[23rem]">
            <AnimatePresence mode="wait">
              <motion.figcaption
                key={cut.src}
                variants={TEXT_VARIANTS}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full text-center md:text-left"
              >
                <span className="inline-block rounded-full border-2 border-cream/30 bg-cream/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wide text-cream">
                  {cut.label}
                </span>
                <p className="mt-3 text-2xl font-extrabold leading-snug text-cream md:text-3xl">
                  {cut.line}
                </p>
              </motion.figcaption>
            </AnimatePresence>
          </div>
        </figure>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5 px-6">
        {CUTOUTS.map((c, i) => (
          <button
            key={c.src}
            onClick={() => setIndex(i)}
            aria-label={`Show ${c.label}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-7 bg-cream" : "w-2.5 bg-cream/35 hover:bg-cream/60"
            }`}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center px-6 md:mt-12">
        <BuildButton
          cta="not-a-head"
          label="Put yours on a stick"
          className="!bg-cream !text-berry hover:!bg-white"
        />
      </div>
    </section>
  );
}
