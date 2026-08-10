# BigHead Builder — Landing Page

Next.js marketing site for BigHead Builder. Scroll-driven hero inspired by [Alterra Mountain Co](https://www.alterramtn.co/en), brand colors pulled from the sticker logo, photos from `/branding/photos`.

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's on the page

1. **Hero** — full-bleed lifestyle photo that shrinks into a tilted card while the headline (`Your face. Way bigger.`) reveals behind it
2. **Marquee** — scrolling tagline strip
3. **Intro** — pitch + overlapping photo stack
4. **How it works** — four steps matching the checkout flow (upload → preview → build → ship)
5. **Referral program** — QR sticker pitch: $1 back per referred head until fully refunded, then 100 points per head, 2,500 points = $25 Visa gift card
6. **Gallery** — horizontal scroll-scrubbed Polaroid cards (dupes reused until more photos arrive)
7. **CTA** — "Build your BigHead" button (wire to the real app when ready)

## Brand tokens

Defined in `app/globals.css`:

| Token | Hex | Use |
| --- | --- | --- |
| cream | `#faf9eb` | page background |
| berry | `#b92a56` | CTAs, accent headline |
| teal | `#2a7d72` | accents, marquee |
| ink | `#26343a` | body / headlines |

Logo lives at `public/brand/logo.png`. Photos at `public/photos/`.
