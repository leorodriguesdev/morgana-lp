import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
        <div className="relative mx-auto aspect-715/188 w-full max-w-[560px] overflow-hidden rounded-[10px]">
          <Image
            src="/hero/criativo_primeiros_passos.png"
            alt=""
            fill
            quality={100}
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 715px"
          />
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonialImages.map((image, index) => (
            <li key={image.src} className="overflow-hidden rounded-xl">
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
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
