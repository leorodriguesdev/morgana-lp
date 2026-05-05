import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
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
        {pain.leadIn ? (
          <AnimateIn variant="fade-down" className="mx-auto mb-10 max-w-3xl text-center text-[clamp(1rem,3vw,1.25rem)] font-medium leading-relaxed text-white/95 sm:mb-12" as="p">
            {pain.leadIn}
          </AnimateIn>
        ) : null}

        <AnimateIn variant="fade-up" className="mx-auto max-w-5xl text-center">
          <h2
            id="pain-titulo"
            className="text-balance text-[clamp(1.75rem,5.8vw,3.5rem)] font-bold leading-[1.1]"
          >
            {pain.titleLine1}
          </h2>
          <p className="mt-3 text-balance text-[clamp(1.75rem,5.8vw,3.5rem)] font-bold leading-[1.1] text-brand-yellow">
            {pain.titleHighlight}
          </p>
        </AnimateIn>

        <ul className="mx-auto mt-8 max-w-4xl space-y-1 text-center text-[clamp(1rem,3.2vw,2.134rem)] font-semibold leading-[1.25] sm:mt-10 sm:space-y-1.5">
          {pain.bullets.map((line, i) => (
            <AnimateIn
              key={line}
              as="li"
              variant="fade-left"
              delay={i * 70}
              className="leading-[1.25]"
            >
              {line}
            </AnimateIn>
          ))}
        </ul>

        <AnimateIn variant="fade-up" delay={100} as="p" className="mt-10 text-center text-[clamp(1.6rem,5vw,2.5rem)] font-bold text-brand-yellow sm:mt-12">
          {pain.titleIfYou}
        </AnimateIn>

        <ul className="mx-auto mt-6 grid max-w-5xl gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          {pain.painCards.map((text, i) => (
            <AnimateIn
              key={text}
              as="li"
              variant="scale-in"
              delay={i * 90}
              className="rounded-[10px] bg-gradient-to-br from-brand-yellow to-[#f0a800] px-4 py-4 text-center text-[clamp(1.12rem,3.1vw,1.36rem)] font-semibold leading-snug text-brand-teal shadow-[0_4px_16px_rgba(0,0,0,0.15)] ring-1 ring-brand-teal/15 sm:px-5 sm:py-5"
            >
              {text}
            </AnimateIn>
          ))}
        </ul>

        <AnimateIn variant="fade-up" delay={80} as="p" className="mt-10 text-center text-[clamp(1.6rem,5vw,2.5rem)] font-bold sm:mt-12">
          {pain.closingLine}
        </AnimateIn>

        <AnimateIn variant="scale-in" delay={120} className="mt-6 flex w-full justify-center sm:mt-8">
          <PrimaryCta href={cta.href} className="w-full max-w-[760px]">
            {cta.primaryLabel}
          </PrimaryCta>
        </AnimateIn>
      </Container>
    </section>
  );
}
