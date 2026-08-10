// Small circled "i" that deep-links to an FAQ entry (e.g. faq="shipping").
export default function InfoLink({
  faq,
  className = "",
}: {
  faq: string;
  className?: string;
}) {
  return (
    <a
      href={`#faq-${faq}`}
      title="More info in the FAQ"
      aria-label="More info in the FAQ"
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-current text-[11px] font-black leading-none opacity-50 transition-opacity hover:opacity-100 ${className}`}
    >
      i
    </a>
  );
}
