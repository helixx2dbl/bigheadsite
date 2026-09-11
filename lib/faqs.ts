// The FAQ content, deliberately OUTSIDE the client component that renders it.
//
// components/Faq.tsx is "use client", and a server component importing from a client module
// gets a client-reference proxy rather than the value — so lib/schema.ts read `faqs` as an
// object with no .map and the static export died at prerender. Plain data in a plain module
// can be imported by both sides.
//
// Shipping figures are interpolated from lib/pricing.ts rather than typed in: these answers
// promised free shipping for a while after checkout started charging.
import { PRICE_SHIPPING_PER_BOX, SHIPPING_HEADS_PER_BOX } from "@/lib/pricing";

export const faqs = [
  {
    id: "size",
    q: "How big are the heads?",
    a: "Big. Each BigHead is about 24 inches tall, roughly three times life size, printed on rigid, lightweight board. It arrives flat with a sturdy stick and a strip of industrial-strength 3M double-sided tape \u2014 you press the stick on yourself, which takes about ten seconds. Easy to wave for a whole game, impossible to miss from the bleachers.",
  },
  {
    id: "price",
    q: "How much do they cost?",
    a: `$25 for the first print of a design, and $17.50 for every extra copy of that same design \u2014 30% off. So one face printed three times is $25 + $17.50 + $17.50. Three different faces is $25 each, because each one is a new design to cut. Shipping is a flat $${PRICE_SHIPPING_PER_BOX} per box, and up to ${SHIPPING_HEADS_PER_BOX} heads fit in a box.`,
  },
  {
    id: "photo",
    q: "What kind of photo do I need?",
    a: "A front-facing shot in decent light where the head isn't blocked or blurry. Almost any modern phone photo works great. Our builder shows you a live preview of the cut-out before you pay, so you'll know it looks good before we print it.",
  },
  {
    id: "shipping",
    q: "How long does shipping take?",
    a: `Every head is cut and assembled to order, which takes 1-2 business days, then 2-5 days in transit. Shipping anywhere in the US is a flat $${PRICE_SHIPPING_PER_BOX} per box, and one box holds up to ${SHIPPING_HEADS_PER_BOX} heads \u2014 so ordering for the whole crew costs no more to ship than ordering one. Got a hard date coming up? Get in touch before you order and we'll tell you honestly whether we can make it.`,
  },
  {
    id: "assembly",
    q: "Do I have to put it together?",
    a: "Only the stick, and only once. Your BigHead ships flat with the stick alongside it and a strip of industrial-strength 3M double-sided tape already cut to size. Peel, press the stick to the back, done \u2014 about ten seconds, no tools. We ship it flat on purpose: a pre-attached stick means a much bigger box and a head that arrives creased at the corners.",
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
