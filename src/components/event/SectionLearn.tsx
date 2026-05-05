import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { EventLandingContent } from "@/types/landing";

interface SectionLearnProps {
  learn: EventLandingContent["learn"];
}

export function SectionLearn({ learn }: SectionLearnProps) {
  return (
    <section
      id={learn.id}
      aria-labelledby="learn-titulo"
      className="bg-brand-yellow py-14 sm:py-20"
    >
      <Container>
        <AnimateIn variant="fade-down" as="h2" id="learn-titulo" className="mx-auto max-w-4xl text-balance text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {learn.title}
        </AnimateIn>
        <ul className="mx-auto mt-10 max-w-5xl space-y-3">
          {learn.items.map((item, i) => (
            <AnimateIn
              key={item}
              as="li"
              variant="fade-left"
              delay={i * 65}
              className="flex items-center gap-4 rounded-[10px] border-l-4 border-brand-green bg-gradient-to-r from-brand-teal to-[#1e7a9e] px-4 py-4 text-white shadow-[0_3px_14px_rgba(45,143,181,0.35)] ring-1 ring-white/10 sm:px-6 sm:py-4"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <span className="text-base font-bold leading-snug sm:text-lg">
                {item}
              </span>
            </AnimateIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
