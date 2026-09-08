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

export default function Home() {
  return (
    <main id="top" className="bg-cream">
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
