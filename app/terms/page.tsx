import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service | BigHead Builder",
  description:
    "The terms that govern using BigHead Builder and ordering custom big heads, including the rights to the photos you upload.",
};

export default function TermsPage() {
  return (
    <PolicyPage kicker="the ground rules" title="Terms of Service" updated="August 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and BigHead Builder
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) covering your use of bigheadbuilder.com
        and any order you place through it. By using the site or placing an order, you agree to these
        Terms. If you don&rsquo;t agree, please don&rsquo;t use the site.
      </p>

      <h2>Who can order</h2>
      <p>
        You must be at least 18 years old, or have the permission and supervision of a parent or legal
        guardian, to place an order. By ordering, you confirm the information you give us is accurate
        and that you&rsquo;re authorized to use the payment method you provide.
      </p>

      <h2>Orders, pricing &amp; payment</h2>
      <p>
        Placing an order is an offer to buy. We may accept or decline any order, for example, if a
        product or price was listed in error, if we can&rsquo;t verify payment, or if an order violates
        these Terms. Prices, discounts, and shipping costs are shown at checkout and may change over
        time. You authorize us (and our payment processor) to charge your payment method for the total
        shown at checkout, including tax and shipping.
      </p>

      <h2>Custom, made-to-order products</h2>
      <p>
        Every BigHead is printed and assembled to order from the photo you provide, so we can&rsquo;t
        offer standard returns, but if there&rsquo;s a defect, damage, or an error on our end,
        we&rsquo;ll replace it or refund you, and if you change your mind within 30 days we&rsquo;ll
        work with you to find a solution. Please review your live preview carefully before you check
        out. See our <a href="/returns">Return &amp; Refund Policy</a>{" "}for exactly how we handle
        problems.
      </p>

      <h2>Photos &amp; content you upload</h2>
      <p>When you upload a photo or other content to build a head, you represent and confirm that:</p>
      <ul>
        <li>
          You own the photo or otherwise have the right to use it, including any rights held by the
          photographer.
        </li>
        <li>
          You have permission from every person shown in the photo (or their parent/guardian) to use
          their name, image, and likeness to create the product you&rsquo;re ordering.
        </li>
        <li>
          The content isn&rsquo;t unlawful, infringing, defamatory, hateful, obscene, or otherwise
          objectionable, and doesn&rsquo;t violate anyone&rsquo;s privacy, publicity, or intellectual
          property rights.
        </li>
      </ul>
      <p>
        You keep ownership of your photos. You grant us a limited, non-exclusive license to store,
        reproduce, adapt, and print your content solely to fulfill your order and provide support.
        We&rsquo;ll only use your photos to show you a preview and to make what you ordered, never to
        market to others, and you can ask us to delete them at any time (see our{" "}
        <a href="/privacy">Privacy Policy</a>). We may refuse or cancel any order whose content
        we believe breaks these rules, and you&rsquo;re responsible for the content you upload.
      </p>

      <h2>Our intellectual property</h2>
      <p>
        The BigHead Builder name, logo, site design, text, and graphics are owned by us and protected by
        law. You may not copy, reproduce, or use them without our written permission. Nothing in these
        Terms transfers any of our intellectual property to you.
      </p>

      <h2>Shipping &amp; risk of loss</h2>
      <p>
        Build times, shipping speeds, and delivery details are described in our{" "}
        <a href="/shipping">Shipping Policy</a>. Risk of loss passes to you when the carrier takes
        possession of your order, but if a package is lost or arrives damaged, tell us within one week
        and we&rsquo;ll make it right.
      </p>

      <h2>Referral &amp; rewards program</h2>
      <p>
        If we offer referral codes, credits, points, or rewards, they have no cash value except as
        expressly stated, can&rsquo;t be combined with every offer, and may be changed or ended at any
        time. We may withhold or reverse rewards we believe were earned through fraud, abuse, or error.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose or to upload prohibited content.</li>
        <li>Interfere with, disrupt, or attempt to gain unauthorized access to the site or its systems.</li>
        <li>Scrape, copy, or resell any part of the site or its content without permission.</li>
        <li>Impersonate anyone or misrepresent your affiliation with a person or entity.</li>
      </ul>

      <h2>Disclaimers</h2>
      <p>
        The site and products are provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; Beyond
        the specific promises in our Return &amp; Refund Policy, and to the fullest extent allowed by
        law, we disclaim all warranties, express or implied, including merchantability and fitness for a
        particular purpose. Colors and finishes may vary slightly from your on-screen preview.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent allowed by law, BigHead Builder will not be liable for any indirect,
        incidental, special, or consequential damages arising from your use of the site or products. Our
        total liability for any claim relating to an order is limited to the amount you paid for that
        order.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold BigHead Builder harmless from any claims, damages, or costs
        (including reasonable legal fees) arising out of content you upload or your breach of these
        Terms, for example, a claim that a photo you provided infringed someone&rsquo;s rights.
      </p>

      <h2>Governing law &amp; disputes</h2>
      <p>
        These Terms are governed by the laws of the State of Idaho, without regard to its conflict-of-law
        rules. Any dispute that can&rsquo;t be resolved informally will be handled by the state or
        federal courts located in Idaho, and you agree to that venue. We&rsquo;d always rather sort
        things out with a quick email first.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we&rsquo;ll revise the &ldquo;last
        updated&rdquo; date above. Continuing to use the site or place orders means you accept the
        current version.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:Tyler@bigheadbuilder.com">Tyler@bigheadbuilder.com</a>{" "}or write to us at:
      </p>
      <p>
        BigHead Builder
        <br />
        7184 Boekel Rd
        <br />
        Rathdrum, ID 83858
      </p>
    </PolicyPage>
  );
}
