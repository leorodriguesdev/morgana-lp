import type { EventLandingContent } from "@/types/landing";

interface MarqueeStripProps {
  marquee: EventLandingContent["marquee"];
}

export function MarqueeStrip({ marquee }: MarqueeStripProps) {
  const chunk = Array.from({ length: marquee.repeatCount }, () => marquee.text).join(
    "  •  ",
  );
  const row = `${chunk}  •  `;

  return (
    <div
      className="-mt-px border-b border-brand-teal/20 bg-brand-teal-light py-3 text-brand-teal"
      role="presentation"
    >
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex min-w-max gap-0 font-bold uppercase tracking-widest">
          <span className="px-4 text-sm sm:text-base">{row}</span>
          <span className="px-4 text-sm sm:text-base" aria-hidden>
            {row}
          </span>
        </div>
      </div>
    </div>
  );
}
