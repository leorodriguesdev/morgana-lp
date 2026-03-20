import { Container } from "@/components/ui/Container";
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
        <h2
          id="audience-titulo"
          className="text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
        >
          {audience.title}
        </h2>
        <ul className="mx-auto mt-10 max-w-4xl space-y-4">
          {audience.forItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 rounded-[10px] bg-brand-teal-light px-4 py-4 sm:px-6"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white"
                aria-hidden
              >
                ✓
              </span>
              <span className="text-lg font-semibold text-brand-teal">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-4 flex max-w-4xl items-center gap-4 rounded-[10px] bg-brand-red px-4 py-4 sm:px-6">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white"
            aria-hidden
          >
            ✕
          </span>
          <p className="text-lg font-semibold text-white">{audience.notFor}</p>
        </div>
      </Container>
    </section>
  );
}
