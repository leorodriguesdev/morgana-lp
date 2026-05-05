import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { PrimaryCta } from "./PrimaryCta";
import type { EventLandingContent } from "@/types/landing";

interface SectionPromoImageProps {
  promo: EventLandingContent["promoImage"];
  cta: EventLandingContent["cta"];
}

/** Bloco "Por que participar agora?" — antes era imagem (`placeholder-wide`). */
export function SectionPromoImage({ promo, cta }: SectionPromoImageProps) {
  return (
    <section
      id={promo.id}
      aria-labelledby="promo-titulo"
      className="bg-brand-yellow pb-14 pt-4 sm:pb-20"
    >
      <Container>
        <AnimateIn
          variant="scale-in"
          threshold={0.1}
          className="overflow-hidden rounded-[10px] bg-gradient-to-br from-[#79c2d0] to-[#4da8b8] px-5 py-8 text-center shadow-[0_12px_40px_rgba(45,143,181,0.3)] ring-1 ring-white/30 sm:px-8 sm:py-10"
        >
          <h2
            id="promo-titulo"
            className="text-balance text-[clamp(1.05rem,3.4vw,1.35rem)] font-bold uppercase leading-snug tracking-[0.06em] text-[#1a4559]"
          >
            {promo.title}
          </h2>
          <div
            className="mx-auto mt-4 h-px w-14 bg-white sm:w-16"
            aria-hidden
          />
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-[clamp(0.95rem,2.6vw,1.125rem)] font-medium leading-relaxed text-[#1a4559] sm:text-[1.125rem]">
            {promo.body}
            {promo.closingBold ? (
              <>
                {" "}
                <strong className="font-bold">{promo.closingBold}</strong>
              </>
            ) : null}
          </p>
          <PrimaryCta
            href={cta.href}
            variant="hero"
            className="mx-auto mt-8 w-full max-w-xl px-6 text-[clamp(0.75rem,2.5vw,1rem)] sm:px-10"
          >
            {promo.ctaLabel}
          </PrimaryCta>
        </AnimateIn>
      </Container>
    </section>
  );
}
