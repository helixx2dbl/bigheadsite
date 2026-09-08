import type { MetadataRoute } from "next";

// Emitted as a static /sitemap.xml at build time (fine under output: "export").
//
// Listed by hand rather than globbed: the route set is small and stable, and /build/ has to
// stay out of it — it is a redirect stub, and listing a page we also tell robots not to
// crawl is a contradiction search consoles report as an error.
//
// trailingSlash is on in next.config, so these paths carry their slash to match what the
// server actually serves; a mismatch shows up as a redirect in crawl reports.
const SITE_URL = "https://bigheadbuilder.com";

// Required by output: "export" — without it the build fails with
// 'export const dynamic = "force-static" not configured on route "/sitemap.xml"'.
// A metadata route is treated as dynamic by default, and a static export has no server to
// evaluate it on, so it has to be pinned to build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Frozen at build time by force-static above, so this is the date of the last deploy
  // rather than "now". Bump it when the content of a page meaningfully changes.
  const now = new Date("2026-09-08");

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/shipping/`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/returns/`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
}
