import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { EventLandingContent } from "@/types/landing";

interface SectionPromoImageProps {
  promo: EventLandingContent["promoImage"];
}

export function SectionPromoImage({ promo }: SectionPromoImageProps) {
  return (
    <section
      id={promo.id}
      aria-label={promo.alt}
      className="bg-brand-yellow pb-14 pt-4 sm:pb-20"
    >
      <Container>
        <div className="relative aspect-1518/492 w-full overflow-hidden rounded-[10px] bg-brand-teal-light/50 ring-1 ring-brand-teal/20">
          <Image
            src="/placeholder-wide.png"
            alt=""
            fill
            quality={100}
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1152px"
          />
          <span className="sr-only">{promo.alt}</span>
        </div>
      </Container>
    </section>
  );
}
