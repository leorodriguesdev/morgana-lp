import Image from "next/image";
import { Container } from "@/components/ui/Container";
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
        <h2
          id="lessons-titulo"
          className="text-center text-4xl font-bold text-brand-yellow sm:text-5xl lg:text-6xl"
        >
          {lessons.title}
        </h2>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-10">
          {lessons.items.map((lesson) => (
            <article
              key={lesson.number}
              className="rounded-[10px] bg-brand-orange px-6 py-8 text-white shadow-md sm:px-10 sm:py-10"
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
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
