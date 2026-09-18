import { BUILD_HREF } from "@/lib/pricing";

// `cta` is required rather than defaulted: every instance sits in a different
// section, and the whole point of the reporting is telling them apart. A default
// would quietly merge two placements into one row and read as a real result.
export default function BuildButton({
  cta,
  label = "Build yours",
  className = "",
}: {
  cta: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={BUILD_HREF}
      data-cta={cta}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-105 hover:bg-berry-deep ${className}`}
    >
      {label}
    </a>
  );
}
