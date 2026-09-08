import Link from "next/link";
import Image from "next/image";
import { BUILD_HREF } from "@/lib/pricing";

// Simple solid header for interior pages (policies, contact). Unlike the landing
// Nav it has no hero to sit over, so it stays solid cream and just gets you home
// or into the builder.
export default function PageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/brand/logo-sticker.svg"
            alt="BigHead Builder"
            width={44}
            height={49}
            unoptimized
            className="h-auto w-10 drop-shadow-sm sm:w-11"
          />
          <span className="font-script text-xl text-berry">BigHead Builder</span>
        </Link>
        {/* plain <a>: the builder is a different host, so there is no Next
            route to prefetch */}
        <a
          href={BUILD_HREF}
          className="whitespace-nowrap rounded-full bg-berry px-4 py-2.5 text-sm font-extrabold text-cream shadow-md transition-transform hover:scale-105 hover:bg-berry-deep sm:px-5"
        >
          Build yours
        </a>
      </div>
    </header>
  );
}
