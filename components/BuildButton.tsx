import { BUILD_HREF } from "@/lib/pricing";

export default function BuildButton({
  label = "Build yours",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={BUILD_HREF}
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-105 hover:bg-berry-deep ${className}`}
    >
      {label}
    </a>
  );
}
