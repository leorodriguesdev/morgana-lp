import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { EventLandingContent } from "@/types/landing";

interface SectionAudienceProps {
  audience: EventLandingContent["audience"];
}

export function SectionAudience({ audience }: SectionAudienceProps) {
  return (
    <section
      id={audience.id}
      aria-labelledby="audience-titulo"
      className="bg-brand-yellow py-14 sm:py-20"
    >
      <Container>
        <AnimateIn variant="fade-up" as="h2" id="audience-titulo" className="text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {audience.title}
        </AnimateIn>
        <ul className="mx-auto mt-10 max-w-4xl space-y-4">
          {audience.forItems.map((item, i) => (
            <AnimateIn
              key={item}
              as="li"
              variant="fade-left"
              delay={i * 70}
              className="flex items-center gap-4 rounded-[10px] border-l-4 border-brand-teal bg-gradient-to-r from-brand-teal-light to-[#6bb8c2] px-4 py-4 shadow-[0_3px_12px_rgba(133,200,208,0.45)] ring-1 ring-brand-teal/15 sm:px-6"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <span className="text-lg font-semibold text-brand-teal">{item}</span>
            </AnimateIn>
          ))}
        </ul>
        <AnimateIn
          variant="fade-right"
          delay={audience.forItems.length * 70}
          className="mx-auto mt-4 flex max-w-4xl items-center gap-4 rounded-[10px] bg-gradient-to-r from-brand-red to-[#cc0000] px-4 py-4 shadow-[0_4px_20px_rgba(255,24,24,0.4)] ring-1 ring-white/15 sm:px-6"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white"
            aria-hidden
          >
            ✕
          </span>
          <p className="text-lg font-semibold text-white">{audience.notFor}</p>
        </AnimateIn>
      </Container>
    </section>
  );
}
