const items = ["big heads", "on a stick", "your face", "way bigger"];

export default function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden pb-2 pt-16 md:pt-24">
      <div className="-mx-4 -rotate-[1.5deg] overflow-hidden bg-teal py-4 shadow-md">
        <div className="animate-marquee flex w-max items-center gap-8 pr-8">
          {[...row, ...row].map((item, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-script text-2xl text-cream">{item}</span>
              <span className="text-cream/60">★</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
