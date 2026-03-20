import { Container } from "@/components/ui/Container";
import { PrimaryCta } from "./PrimaryCta";
import type { EventLandingContent } from "@/types/landing";

interface SectionPainProps {
  pain: EventLandingContent["pain"];
  cta: EventLandingContent["cta"];
}

export function SectionPain({ pain, cta }: SectionPainProps) {
  return (
    <section
      id={pain.id}
      aria-labelledby="pain-titulo"
      className="bg-brand-teal py-10 text-white sm:py-14 lg:py-20"
    >
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <h2
            id="pain-titulo"
            className="text-balance text-[clamp(1.75rem,5.8vw,3.5rem)] font-bold leading-[1.1]"
          >
            {pain.titleLine1}
          </h2>
          <p className="mt-3 text-balance text-[clamp(1.75rem,5.8vw,3.5rem)] font-bold leading-[1.1] text-brand-yellow">
            {pain.titleHighlight}
          </p>
        </div>

        <ul className="mx-auto mt-8 max-w-4xl space-y-1 text-center text-[clamp(1rem,3.2vw,2.134rem)] font-semibold leading-[1.25] sm:mt-10 sm:space-y-1.5">
          {pain.bullets.map((line) => (
            <li key={line} className="leading-[1.25]">
              {line}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[clamp(1.6rem,5vw,2.5rem)] font-bold text-brand-yellow sm:mt-12">
          {pain.titleIfYou}
        </p>

        <ul className="mx-auto mt-6 grid max-w-5xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          {pain.painCards.map((text) => (
            <li
              key={text}
              className="rounded-[10px] bg-brand-yellow px-4 py-4 text-center text-[clamp(1.12rem,3.1vw,1.36rem)] font-semibold leading-snug text-brand-teal sm:px-5 sm:py-5"
            >
              {text}
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-[clamp(1.6rem,5vw,2.5rem)] font-bold sm:mt-12">
          {pain.closingLine}
        </p>

        <div className="mt-6 flex w-full justify-center sm:mt-8">
          <PrimaryCta href={cta.href} className="w-full max-w-[760px]">
            {cta.primaryLabel}
          </PrimaryCta>
        </div>
      </Container>
    </section>
  );
}
