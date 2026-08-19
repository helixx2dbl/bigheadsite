import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` (plain HTML/CSS/JS) so it can be
  // served by the Apache/PHP Elastic Beanstalk environment.
  output: "export",
  // Static export can't use the Next.js image optimizer at runtime.
  images: { unoptimized: true },
  // Emit directory-style routes (out/build/index.html) so Apache serves
  // /build/ cleanly via DirectoryIndex.
  trailingSlash: true,
};

export default nextConfig;
