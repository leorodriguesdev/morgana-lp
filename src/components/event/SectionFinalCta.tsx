import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SignupCtaWithModal } from "./SignupCtaWithModal";
import type { EventLandingContent } from "@/types/landing";

interface SectionFinalCtaProps {
  final: EventLandingContent["finalCta"];
}

export function SectionFinalCta({ final }: SectionFinalCtaProps) {
  return (
    <section
      id={final.id}
      aria-labelledby="final-cta-titulo"
      className="bg-gradient-to-b from-brand-yellow to-[#f0a800] pb-16 pt-10 sm:pb-24 sm:pt-14"
    >
      <Container>
        <AnimateIn
          variant="fade-up"
          as="h2"
          id="final-cta-titulo"
          className="text-center text-4xl font-bold text-brand-teal sm:text-5xl lg:text-6xl"
        >
          {final.title}
        </AnimateIn>
        <AnimateIn variant="scale-in" delay={150} className="mt-8 flex flex-col items-center gap-4">
          <SignupCtaWithModal
            label={final.buttonLine}
            className="min-w-[min(100%,280px)] px-6"
          />
          <p className="max-w-xl text-center text-base font-medium text-brand-ink sm:text-lg">
            {final.shareLine}
          </p>
        </AnimateIn>
      </Container>
    </section>
  );
}
