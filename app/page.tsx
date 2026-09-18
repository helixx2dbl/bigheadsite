import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Intro from "@/components/Intro";
import HowItWorks from "@/components/HowItWorks";
import Referral from "@/components/Referral";
import Gallery from "@/components/Gallery";
import NotAHead from "@/components/NotAHead";
import Testimonials from "@/components/Testimonials";
import FinalCta from "@/components/FinalCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import SectionTracking from "@/components/SectionTracking";
import { faqSchema, productSchema } from "@/lib/schema";

export default function Home() {
  return (
    <main id="top" className="bg-cream">
      {/* Product + FAQPage belong to THIS page specifically, so they sit here rather than in
          the layout (Organization and WebSite are site-wide and live there). Both are built
          from lib/pricing.ts and the accordion's own `faqs` array, so neither can claim a
          price or an answer the page does not show — which is exactly what Google checks
          before granting a rich result. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
      <SectionTracking />
      <Nav />
      <Hero />
      <Marquee />
      <Intro />
      <Gallery />
      <NotAHead />
      <HowItWorks />
      <Referral />
      <Testimonials />
      <FinalCta />
      <Faq />
      <Footer />
    </main>
  );
}
