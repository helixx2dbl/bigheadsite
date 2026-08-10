import Link from "next/link";

export default function BuildPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-script text-3xl text-teal">coming soon</p>
      <h1 className="mt-3 text-4xl font-black text-ink md:text-5xl">
        The builder lives here.
      </h1>
      <p className="mt-5 max-w-md text-lg font-semibold text-ink/65">
        Placeholder for the photo upload + checkout flow. CTAs across the site
        point here so we can wire the real builder later.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-berry px-8 py-3.5 text-base font-black text-cream shadow-lg transition-transform hover:scale-105 hover:bg-berry-deep"
      >
        Back to home
      </Link>
    </main>
  );
}
