import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
        <div className="relative mx-auto mb-10 aspect-1065/488 max-w-4xl overflow-hidden rounded-xl">
          <Image
            src="/placeholder-about-collage.svg"
            alt=""
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center text-base font-semibold leading-relaxed text-brand-ink sm:text-lg">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
          <p className="whitespace-pre-line font-bold text-brand-ink">
            {about.statsLine}
          </p>
        </div>
      </Container>
    </section>
  );
}
