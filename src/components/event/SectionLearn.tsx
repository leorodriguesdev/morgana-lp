import { Container } from "@/components/ui/Container";
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
        <h2
          id="learn-titulo"
          className="mx-auto max-w-4xl text-balance text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          {learn.title}
        </h2>
        <ul className="mx-auto mt-10 max-w-5xl space-y-3">
          {learn.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 rounded-[10px] bg-brand-teal px-4 py-4 text-white sm:px-6 sm:py-4"
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
