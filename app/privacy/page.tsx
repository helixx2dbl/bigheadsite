import type { Metadata } from "next";
import PolicyPage from "@/components/legal/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | BigHead Builder",
  description:
    "How BigHead Builder collects, uses, and protects your information and the photos you upload.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage kicker="the fine print" title="Privacy Policy" updated="September 2026">
      <p>
        BigHead Builder (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) turns the photos
        you send us into big heads on a stick. We take the trust that requires seriously, especially
        because you&rsquo;re handing us your pictures. This policy explains what we collect, how we use
        it, and the control you have over it. It applies to bigheadbuilder.com, the builder at
        app.bigheadbuilder.com, and everything you order through them.
      </p>

      <h2>Information we collect</h2>
      <p>To build and ship your order, we collect:</p>
      <ul>
        <li>
          <strong>Contact details:</strong>{" "}your name, email address, and phone number.
        </li>
        <li>
          <strong>Shipping information:</strong>{" "}the mailing address where your heads should land.
        </li>
        <li>
          <strong>Photos you upload:</strong>{" "}the images you send us to cut out and print, stored
          securely and used only to produce your order.
        </li>
        <li>
          <strong>Order details:</strong>{" "}quantities, sizes, and any notes tied to your order. If
          you use group split-pay, the payment handles you choose to add (such as Venmo or
          PayPal) so the crew can pay you back.
        </li>
        <li>
          <strong>Payment information:</strong>{" "}processed by our payment provider. We never see or
          store your full card number.
        </li>
        <li>
          <strong>Basic usage data:</strong>{" "}things like browser type and pages visited, used to
          keep the site working, improve it, and measure our advertising.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>Create, print, assemble, and ship your BigHeads.</li>
        <li>Send order confirmations, tracking, and the occasional update about your order.</li>
        <li>Answer your questions and provide support.</li>
        <li>Run our referral and rewards program when you take part.</li>
        <li>Keep the site secure and make it better.</li>
      </ul>

      <h2>Your photos</h2>
      <p>
        The pictures you upload belong to you. We use them only to produce the heads you ordered: to
        cut out the face, print it, and print any preview you approve. We store them securely and{" "}
        <strong>we do not sell, rent, or share your photos</strong>{" "}with anyone outside of fulfilling
        your order. Ask us to delete your uploaded photos at any time and we will.
      </p>

      <h2>We never sell your information</h2>
      <p>
        We&rsquo;re responsible for the information collected here, and{" "}
        <strong>we will never sell or trade it.</strong>{" "}We share information only when it&rsquo;s
        needed to complete what you asked us to do, for example, handing your address to a shipping
        carrier or your payment to our payment processor. Those partners may only use the information to
        do their job for your order. We also share a limited amount of information with Google and Meta
        to measure our advertising, which is described in full under{" "}
        <strong>Cookies &amp; advertising</strong>{" "}below.
      </p>

      <h2>Cookies &amp; advertising</h2>
      <p>
        We use cookies and similar browser storage in two ways &mdash; making the builder work, and
        measuring our advertising. The difference matters, because you can switch the second off
        without breaking anything.
      </p>
      <ul>
        <li>
          <strong>Keeping your place in the builder:</strong>{" "}as you go, the builder saves your
          progress in your own browser&rsquo;s storage, so closing the tab or hitting refresh
          doesn&rsquo;t make you start over. That&rsquo;s your name, email address, shipping address,
          any referral code you arrived with, and a reference to each photo you&rsquo;ve uploaded. The
          photos themselves live on our servers &mdash; what&rsquo;s kept in your browser is only the
          pointer to them. Once your order goes through, the photos and cart clear out; your name and
          address stay, so ordering again is quicker. Clearing your browser data clears all of it, and
          none of it is used for advertising.
        </li>
        <li>
          <strong>Payment:</strong>{" "}our payment processor, Stripe, sets{" "}<code>__stripe_mid</code>
          {" "}and{" "}<code>__stripe_sid</code>{" "}on app.bigheadbuilder.com to take payment and spot
          fraud. Checkout will not work without them.
        </li>
        <li>
          <strong>Analytics &amp; advertising:</strong>{" "}Google Analytics (<code>_ga</code>,{" "}
          <code>_ga_*</code>, <code>_gid</code>), Google Ads (<code>_gcl_au</code>),
          and the Meta pixel (<code>_fbp</code>, <code>_fbc</code>) run on both bigheadbuilder.com and
          the builder. They tell us which ads bring people here and which pages lead to orders. The
          builder also pings our advertising partner at arttrk.com when you start a build and when an
          order completes, with the order total and order number. These are not necessary, and blocking
          them breaks nothing.
        </li>
      </ul>
      <p>
        As you move through the builder, we also send Google and Meta a record of what happened so
        their reporting matches ours &mdash; to Google from your browser, and to Meta both from your
        browser and directly from our server. That record contains your email address, name, and city,
        state, ZIP and country in hashed form (scrambled before they are sent, so they leave as
        unreadable strings rather than plain text), your IP address and browser, the order total and
        order number, and the advertising IDs above. We do this to measure whether our ads are working.
        We are not handing over a customer list to be used for anything else, and{" "}
        <strong>we never send them your photos</strong>.
      </p>
      <p>
        You can block or delete any of this in your browser settings or with a tracking blocker, and
        Google publishes a{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          browser add-on
        </a>{" "}
        to opt out of Google Analytics everywhere. If you&rsquo;d rather we handled it, email us and
        we&rsquo;ll remove your information from our advertising audiences.
      </p>

      <h2>How we protect it</h2>
      <p>
        We use encryption to protect sensitive information in transit, and we limit access to personal
        information to the people who need it to fulfill and support your order. No method of storage or
        transmission is ever 100% secure, but we work to protect your information and review our
        practices regularly.
      </p>

      <h2>How long we keep your information</h2>
      <p>
        We keep your personal information for as long as we need it to fulfill your order, provide
        support, run our referral program, and meet our legal, tax, and accounting obligations. When we
        no longer need it, we delete or de-identify it. You can ask us to delete your uploaded photos at
        any time, and we remove them from active use once your order is complete.
      </p>

      <h2>Your choices &amp; rights</h2>
      <p>You can contact us any time to:</p>
      <ul>
        <li>See what information we have about you.</li>
        <li>Correct or update your details.</li>
        <li>Delete your account information and uploaded photos.</li>
        <li>Opt out of non-essential emails.</li>
      </ul>

      <h2>Your California privacy rights</h2>
      <p>
        If you&rsquo;re a California resident, the California Consumer Privacy Act (as amended by the
        CPRA) gives you additional rights over your personal information:
      </p>
      <ul>
        <li>
          <strong>Know &amp; access:</strong>{" "}request the categories and specific pieces of personal
          information we&rsquo;ve collected about you.
        </li>
        <li>
          <strong>Delete:</strong>{" "}request that we delete personal information we collected from you.
        </li>
        <li>
          <strong>Correct:</strong>{" "}ask us to fix inaccurate personal information.
        </li>
        <li>
          <strong>Opt out of sale or sharing:</strong>{" "}we don&rsquo;t sell your personal
          information, and we never have. We do share advertising identifiers and purchase data with
          Google and Meta to measure our ads, which California counts as{" "}
          <em>sharing for cross-context behavioral advertising</em>. To opt out, block the advertising
          cookies described under{" "}<strong>Cookies &amp; advertising</strong>{" "}above, or email us
          and we&rsquo;ll take care of it.
        </li>
        <li>
          <strong>No discrimination:</strong>{" "}we won&rsquo;t deny you service, charge you a different
          price, or give you a lesser experience for exercising these rights.
        </li>
      </ul>
      <p>
        To exercise any of these, email us at{" "}
        <a href="mailto:Tyler@bigheadbuilder.com">Tyler@bigheadbuilder.com</a>. We&rsquo;ll verify your
        request and respond within the timeframes the law requires, and you may authorize someone to
        make a request on your behalf.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        BigHead Builder is intended for adults. We do not knowingly collect personal information from
        children under 13. If you believe a child has provided us information, contact us and we&rsquo;ll
        remove it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we&rsquo;ll revise the &ldquo;last
        updated&rdquo; date above. Continued use of the site means you accept the current version.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about your privacy? Email us at{" "}
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
