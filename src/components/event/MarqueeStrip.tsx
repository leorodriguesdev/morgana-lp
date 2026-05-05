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
      className="-mt-px border-y border-brand-teal/25 bg-gradient-to-r from-[#6bb8c2] via-brand-teal-light to-[#6bb8c2] py-3 text-brand-teal shadow-[0_3px_12px_rgba(45,143,181,0.2)]"
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
