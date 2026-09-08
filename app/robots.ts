import type { MetadataRoute } from "next";

// Same output: "export" requirement as sitemap.ts — metadata routes default to dynamic and
// a static export cannot evaluate them at request time.
export const dynamic = "force-static";

// Emitted as a static /robots.txt at build time, which works under output: "export".
//
// /build/ is excluded deliberately: it is a redirect stub that bounces to
// app.bigheadbuilder.com, so there is nothing there worth indexing and a crawler landing on
// it just follows a meta refresh off-site. The page also carries its own noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/build/"],
    },
    sitemap: "https://bigheadbuilder.com/sitemap.xml",
  };
}
