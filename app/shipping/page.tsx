import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";
// A policy page states the rate, so it reads it from the same constants the pricing block
// and the FAQ do rather than restating it — this page still said "free" for a while after
// checkout started charging.
import { PRICE_SHIPPING_PER_BOX, SHIPPING_HEADS_PER_BOX } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Shipping Policy | BigHead Builder",
  description:
    "Build times, shipping speeds, tracking, and what happens if a BigHead arrives damaged.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage kicker="getting it to you" title="Shipping Policy" updated="September 2026">
      <p>
        Every BigHead is printed and cut to order, so here&rsquo;s exactly what to expect
        between hitting &ldquo;order&rdquo; and waving your head in the stands &mdash; including
        the one small bit of assembly at your end.
      </p>

      <h2>Build &amp; processing time</h2>
      <p>
        Because each head is custom-made from your photo, we need a little time to print, cut, and
        assemble it. Most orders are built in <strong>1-2 business days</strong>. Orders placed over the
        weekend or on holidays start processing the next business day.
      </p>

      <h2>What arrives, and the one thing you do</h2>
      <p>
        Your BigHead ships <strong>flat</strong>, with the stick lying alongside it and a strip of
        industrial-strength 3M double-sided tape already cut to size. Peel it, press the stick to
        the back of the head, and you are done &mdash; about ten seconds, no tools, nothing to buy.
      </p>
      <p>
        We do it this way on purpose. A head with the stick already attached needs a far bigger
        box and arrives creased at the corners more often than not. Flat-packing is what lets a
        24&Prime; board turn up in one piece, and it is why up to {SHIPPING_HEADS_PER_BOX} heads can
        travel in a single box.
      </p>

      <h2>Shipping time</h2>
      <p>
        Once your head ships, transit typically takes <strong>2-6 days</strong>{" "}depending on
        where you are. We ship every order the same way, so there is no faster option to pick at
        checkout — if you are working to a hard date, talk to us before you order.
      </p>

      <h2>Shipping costs</h2>
      <p>
        Shipping is a flat <strong>${PRICE_SHIPPING_PER_BOX} per box</strong>, to any address we
        ship to, with no minimum to hit. One box holds up to {SHIPPING_HEADS_PER_BOX} heads, so a
        single head and a crew of {SHIPPING_HEADS_PER_BOX} cost exactly the same to ship. An order
        too big for one box travels in as many as it needs, at ${PRICE_SHIPPING_PER_BOX} each, and
        the builder shows you the boxes filling up as you choose quantities so there is never a
        surprise at checkout.
      </p>

      <h2>Working to an event date?</h2>
      <p>
        There is no date field at checkout, so please{" "}
        <a href="/contact/">get in touch</a> before you order and we will tell you honestly whether
        your date is achievable. We would rather turn an order down than miss the day it was for.
      </p>

      <h2>Tracking your order</h2>
      <p>
        As soon as your order ships, we&rsquo;ll email you a tracking number so you can follow it to
        your door.
      </p>

      <h2>Changes to your order</h2>
      <p>
        Need to fix an address or swap a photo? Contact us as soon as possible. We&rsquo;ll always try
        to help, but once a head is in production we may not be able to change it.
      </p>

      <h2>Where we ship</h2>
      <p>
        We currently ship within the United States. If you&rsquo;d like a head sent somewhere else,{" "}
        <a href="/contact">get in touch</a>{" "}and we&rsquo;ll see what we can do.
      </p>

      <h2>Lost or damaged in transit</h2>
      <p>
        If your BigHead arrives damaged, or doesn&rsquo;t arrive at all, send us a message within{" "}
        <strong>one week</strong>{" "}of the delivery date so we can make it right. See our{" "}
        <a href="/returns">Return &amp; Refund Policy</a>{" "}for details.
      </p>

      <h2>Questions?</h2>
      <p>
        Email us at <a href="mailto:Tyler@bigheadbuilder.com">Tyler@bigheadbuilder.com</a>{" "}and
        we&rsquo;ll help you out.
      </p>
    </PolicyPage>
  );
}
