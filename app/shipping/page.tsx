import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping Policy | BigHead Builder",
  description:
    "Build times, shipping speeds, tracking, and what happens if a BigHead arrives damaged.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage kicker="getting it to you" title="Shipping Policy" updated="August 2026">
      <p>
        Every BigHead is printed and hand-assembled to order, so here&rsquo;s exactly what to expect
        between hitting &ldquo;order&rdquo; and waving your head in the stands.
      </p>

      <h2>Build &amp; processing time</h2>
      <p>
        Because each head is custom-made from your photo, we need a little time to print, cut, and
        assemble it. Most orders are built in <strong>1-2 business days</strong>. Orders placed over the
        weekend or on holidays start processing the next business day.
      </p>

      <h2>Shipping time</h2>
      <p>
        Once your head ships, transit typically takes <strong>2-5 days</strong>{" "}depending on
        where you are. In a hurry? Rush printing and expedited shipping are available at checkout.
        Heads can land in as little as 2-3 days.
      </p>

      <h2>Shipping costs</h2>
      <p>
        Shipping is calculated at checkout based on your address and how many heads are in the box.
        Ordering for a group? The whole crew ships together in one box, which keeps per-head shipping
        down.
      </p>

      <h2>Have an event date?</h2>
      <p>
        Tell us your event date at checkout and we&rsquo;ll do everything we can to hit it. If we ever
        miss a deadline you gave us, we&rsquo;ll rush a replacement or refund you. Just reach out.
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
