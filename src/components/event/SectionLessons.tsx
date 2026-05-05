import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { EventLandingContent } from "@/types/landing";

interface SectionLessonsProps {
  lessons: EventLandingContent["lessons"];
}

export function SectionLessons({ lessons }: SectionLessonsProps) {
  return (
    <section
      id={lessons.id}
      aria-labelledby="lessons-titulo"
      className="bg-brand-teal py-14 sm:py-20"
    >
      <Container>
        <AnimateIn variant="fade-up" as="h2" id="lessons-titulo" className="text-center text-4xl font-bold text-brand-yellow sm:text-5xl lg:text-6xl">
          {lessons.title}
        </AnimateIn>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-10">
          {lessons.items.map((lesson, i) => (
            <AnimateIn
              key={lesson.number}
              as="article"
              variant="fade-up"
              delay={i * 100}
              threshold={0.08}
              className="rounded-[10px] bg-gradient-to-br from-brand-orange to-[#c43000] px-6 py-8 text-white shadow-[0_8px_32px_rgba(235,58,1,0.4)] ring-1 ring-white/10 sm:px-10 sm:py-10"
            >
              <div className="relative -ml-6 flex h-[82px] w-[250px] items-center justify-center self-start sm:-ml-10 sm:h-[96px] sm:w-[300px]">
                <Image
                  src="/lessons/fundo_aula.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="300px"
                />
                <p className="relative z-10 px-6 text-4xl font-bold sm:text-5xl">
                  {lesson.number}
                </p>
              </div>
              {lesson.titleHtml ? (
                <h3
                  className="mt-4 text-xl font-normal leading-snug sm:text-2xl [&_strong]:font-bold"
                  dangerouslySetInnerHTML={{ __html: lesson.titleHtml }}
                />
              ) : (
                <h3 className="mt-4 text-xl font-bold leading-snug sm:text-2xl">
                  {lesson.title ?? ""}
                </h3>
              )}
              <p className="mt-6 text-base leading-relaxed sm:text-lg">{lesson.body}</p>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
