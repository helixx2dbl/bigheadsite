"use client";

// The script-style kicker above each interior-page title, doubling as a back
// control. Uses browser history so returning doesn't reload the landing page;
// falls back to "/" for visitors who arrived here directly.
export default function BackKicker({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = "/";
        }
      }}
      className="group inline-flex cursor-pointer items-center gap-2 font-script text-3xl text-berry transition-opacity hover:opacity-80"
    >
      <span
        aria-hidden
        className="text-2xl leading-none transition-transform group-hover:-translate-x-0.5"
      >
        ←
      </span>
      {label}
    </button>
  );
}
