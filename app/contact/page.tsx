import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import BackKicker from "@/components/BackKicker";
import { CONTACT_EMAIL, MAILING_ADDRESS } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact | BigHead Builder",
  description:
    "Questions about an order, a bulk request, or a tricky photo? Reach the BigHead Builder team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
          <div>
            <BackKicker label="say hello" />
            <h1 className="mt-2 text-4xl font-black text-ink md:text-5xl">
              Get in touch
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold text-ink/65">
              Have a question about an order, want to put in a big group request, or have a photo
              that&rsquo;s giving you trouble? Send us a note and a real human will get back to you
              shortly.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-5">
            <div className="md:col-span-3">
              <div className="rounded-3xl bg-cream-deep p-6 shadow-sm md:p-8">
                <ContactForm />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="rounded-3xl border border-ink/10 bg-cream p-6 md:p-8">
                <h2 className="font-script text-2xl text-teal">Other ways to reach us</h2>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-1 block wrap-break-word text-lg font-extrabold text-berry underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50">
                    Mailing address
                  </p>
                  <address className="mt-1 text-base font-bold not-italic leading-relaxed text-ink">
                    {MAILING_ADDRESS.name}
                    <br />
                    {MAILING_ADDRESS.street}
                    <br />
                    {MAILING_ADDRESS.cityStateZip}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
