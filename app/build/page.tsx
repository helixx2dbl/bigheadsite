import type { Metadata } from "next";
import { BUILD_HREF } from "@/lib/pricing";

// /build used to be a "coming soon" placeholder that every CTA pointed at.
// The CTAs now go straight to the builder, but the route is kept as a redirect
// so older links — shared URLs, anything already printed — still land somewhere
// useful instead of 404ing.
//
// next.config.ts sets output: "export", and static export does not support
// redirects() (it needs a Node server), so this redirects in the browser: a
// meta refresh, which fires even with JS disabled, plus a visible link for
// anyone the refresh doesn't carry over. React 19 hoists the <meta> into
// <head> from here, so this stays a server component.
export const metadata: Metadata = {
  title: "Taking you to the builder",
  robots: { index: false, follow: false },
};

export default function BuildPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${BUILD_HREF}`} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
        <p className="font-script text-3xl text-teal">one sec</p>
        <h1 className="mt-3 text-4xl font-black text-ink md:text-5xl">
          Taking you to the builder.
        </h1>
        <p className="mt-5 max-w-md text-lg font-semibold text-ink/65">
          If nothing happens, use the button below.
        </p>
        <a
          href={BUILD_HREF}
          data-cta="build-redirect"
          className="mt-10 rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-105 hover:bg-berry-deep"
        >
          Build your BigHead
        </a>
      </main>
    </>
  );
}
