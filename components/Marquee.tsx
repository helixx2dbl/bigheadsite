const items = ["big heads", "on a stick", "your face", "way bigger"];

export default function Marquee() {
  const row = [...items, ...items, ...items];
  return (
    // overflow-x-CLIP, not hidden: the band is tilted, so its low corner reaches below this
    // wrapper and must overlap the cream-deep intro rather than be cut flat against it. A plain
    // overflow-hidden clipped it, and overflow-x-hidden would not help either - any overflow
    // value other than visible or clip forces the OTHER axis to auto, so the vertical overflow
    // would still be clipped. clip is the one value that leaves overflow-y visible.
    <div className="overflow-x-clip pb-2 pt-16 md:pt-24">
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
