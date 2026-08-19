import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import BackKicker from "@/components/BackKicker";

// Shared shell for the legal/policy pages: branded header, a script-accented
// title, an optional "last updated" line, then a `.prose-policy` body the page
// fills with plain semantic HTML (h2 / p / ul / a, styled in globals.css).
export default function PolicyPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
          <BackKicker label={kicker} />
          <h1 className="mt-2 text-4xl font-black text-ink md:text-5xl">{title}</h1>
          {updated && (
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-teal">
              Last updated · {updated}
            </p>
          )}
          <div className="prose-policy mt-10">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
