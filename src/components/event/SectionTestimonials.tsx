import Image from "next/image";
import { landingConfig } from "@/config/landing";
import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { HeroEventTitleCard } from "./HeroEventTitleCard";
import type { EventLandingContent } from "@/types/landing";

interface SectionTestimonialsProps {
  testimonials: EventLandingContent["testimonials"];
}

export function SectionTestimonials({ testimonials }: SectionTestimonialsProps) {
  const testimonialImages = [
    { src: "/testimonials/testimonials_1.png", width: 2232, height: 1272 },
    { src: "/testimonials/testimonials_2.png", width: 2288, height: 1296 },
    { src: "/testimonials/testimonials_3.png", width: 2222, height: 1638 },
    { src: "/testimonials/testimonials_4.png", width: 2228, height: 1922 },
    { src: "/testimonials/testimonials_5.png", width: 2238, height: 1890 },
    { src: "/testimonials/testimonials_6.png", width: 2228, height: 1378 },
  ] as const;

  return (
    <section
      id={testimonials.id}
      aria-labelledby="depoimentos-titulo"
      className="bg-brand-yellow pb-14 pt-4 sm:pb-20"
    >
      <Container>
        <h2 id="depoimentos-titulo" className="sr-only">
          {testimonials.heading}
        </h2>
        <AnimateIn variant="scale-in" threshold={0.1}>
          <HeroEventTitleCard
            kicker={landingConfig.hero.kicker}
            eventTitleLead={landingConfig.hero.eventTitleLead}
            eventTitleSuffix={landingConfig.hero.eventTitleSuffix}
            titleAs="div"
            size="compact"
            align="center"
            decorative
          />
        </AnimateIn>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonialImages.map((image, index) => (
            <AnimateIn
              key={image.src}
              as="li"
              variant="fade-up"
              delay={index * 80}
              threshold={0.08}
              className="overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={`Depoimento ${index + 1}`}
                width={image.width}
                height={image.height}
                quality={100}
                unoptimized
                className="h-auto w-full object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </AnimateIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
