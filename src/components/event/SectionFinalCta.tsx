import { Container } from "@/components/ui/Container";
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
      className="bg-brand-yellow pb-16 pt-10 sm:pb-24 sm:pt-14"
    >
      <Container>
        <h2
          id="final-cta-titulo"
          className="text-center text-4xl font-bold text-brand-teal sm:text-5xl lg:text-6xl"
        >
          {final.title}
        </h2>
        <div className="mt-8 flex flex-col items-center gap-4">
          <SignupCtaWithModal
            label={final.buttonLine}
            className="min-w-[min(100%,280px)] px-6"
          />
          <p className="max-w-xl text-center text-base font-medium text-brand-ink sm:text-lg">
            {final.shareLine}
          </p>
        </div>
      </Container>
    </section>
  );
}
