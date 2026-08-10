import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <Image
          src="/brand/logo.svg"
          alt="BigHead Builder"
          width={64}
          height={73}
          unoptimized
          className="h-auto w-16"
        />
        <p className="font-script text-2xl text-berry">BigHead Builder</p>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal">
          Big heads on a stick
        </p>
        <p className="mt-4 text-sm font-semibold text-ink/50">
          © {new Date().getFullYear()} BigHead Builder. All heads reserved.
        </p>
      </div>
    </footer>
  );
}
