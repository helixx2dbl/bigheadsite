import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Return & Refund Policy | BigHead Builder",
  description:
    "How returns, refunds, and replacements work on custom-made BigHeads, plus our price-adjustment promise.",
};

export default function ReturnPolicyPage() {
  return (
    <PolicyPage kicker="if something's off" title="Return & Refund Policy" updated="August 2026">
      <p>
        We want you to love your BigHead. Because every head is custom-printed from your photo and made
        to order, we can&rsquo;t resell a returned one, but we stand fully behind our work, and if
        there&rsquo;s a problem we&rsquo;ll make it right.
      </p>

      <h2>Damaged or defective heads</h2>
      <p>
        If your head shows up damaged or defective, <strong>send us a message within one week</strong>{" "}
        of receiving it so we can fix it. A quick photo of the issue helps. We&rsquo;ll replace it or
        refund you, whatever gets you sorted.
      </p>

      <h2>Our mistake</h2>
      <p>
        If we printed the wrong photo, the wrong size, or otherwise got your order wrong, that&rsquo;s
        on us. We&rsquo;ll remake and reship it at no cost to you.
      </p>

      <h2>Changed your mind?</h2>
      <p>
        Because every BigHead is made to order from your photo, we can&rsquo;t promise a standard
        refund for a change of mind, but if you reach out{" "}
        <strong>within 30 days</strong>{" "}of receiving your order, we&rsquo;ll work with you to find
        a solution you&rsquo;re happy with. Please double-check your live preview before you check
        out, since your head is printed exactly from the photo and size you approve.
      </p>

      <h2>How to start a return</h2>
      <p>
        Email <a href="mailto:Tyler@bigheadbuilder.com">Tyler@bigheadbuilder.com</a>{" "}with your order
        number and what&rsquo;s wrong. If a return is approved, ship the item back in its original
        packaging to:
      </p>
      <p>
        BigHead Builder Returns
        <br />
        7184 Boekel Rd
        <br />
        Rathdrum, ID 83858
      </p>
      <p>
        Return shipping is the buyer&rsquo;s responsibility unless the return is due to damage, a defect,
        or our error, in which case we cover it.
      </p>

      <h2>Refunds</h2>
      <p>
        Once we receive your return tracking number, we&rsquo;ll process your refund to the original
        payment method. Please allow <strong>5-10 business days</strong>{" "}for it to appear in your
        account after it&rsquo;s issued.
      </p>

      <h2>Price adjustments</h2>
      <p>
        We offer a one-time price adjustment if an item is marked down within the{" "}
        <strong>7 days</strong>{" "}following your order. Just email us and we&rsquo;ll refund the
        difference.
      </p>

      <h2>Questions?</h2>
      <p>
        We&rsquo;re happy to help. Email <a href="mailto:Tyler@bigheadbuilder.com">Tyler@bigheadbuilder.com</a>{" "}
        or use our <a href="/contact">contact form</a>.
      </p>
    </PolicyPage>
  );
}
