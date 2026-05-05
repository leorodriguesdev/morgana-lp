import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { EventLandingContent } from "@/types/landing";

interface SectionAboutProps {
  about: EventLandingContent["about"];
}

export function SectionAbout({ about }: SectionAboutProps) {
  return (
    <section
      id={about.id}
      aria-labelledby="about-titulo"
      className="bg-brand-yellow py-14 sm:py-20"
    >
      <Container>
        <AnimateIn variant="fade-in" threshold={0.1} className="relative mx-auto mb-10 aspect-1065/488 max-w-4xl overflow-hidden rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.14)] ring-1 ring-black/8">
          <Image
            src="/placeholder-about-collage.svg"
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </AnimateIn>
        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center text-base font-semibold leading-relaxed text-brand-ink sm:text-lg">
          {about.paragraphs.map((p, i) => (
            <AnimateIn key={p.slice(0, 48)} as="p" variant="fade-up" delay={i * 80}>
              {p}
            </AnimateIn>
          ))}
          <AnimateIn as="p" variant="fade-up" delay={about.paragraphs.length * 80} className="whitespace-pre-line font-bold text-brand-ink">
            {about.statsLine}
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
