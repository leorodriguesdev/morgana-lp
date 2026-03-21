import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SignupCtaWithModal } from "./SignupCtaWithModal";
import type { EventLandingContent } from "@/types/landing";


interface EventHeroProps {
  hero: EventLandingContent["hero"];
  cta: EventLandingContent["cta"];
}

/**
 * Hero alinhado ao frame Figma node 1:128 (PARTE 1).
 * Assets: public/hero/* (ver landingConfig.hero.images).
 */
export function EventHero({ hero, cta }: EventHeroProps) {
  const { images } = hero;

  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-brand-yellow"
    >
      {/* Faixa única full-width — arte já com recorte no topo (1704×488) */}
      <div className="relative z-0 w-full">
        <div className="relative aspect-[1704/488] w-full overflow-hidden">
          <div className="absolute -top-[44%] left-0 right-0 h-[100%]">
            <Image
              src={images.topo}
              alt=""
              fill
              priority
              unoptimized
              quality={100}
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      <Container className="relative z-10 pb-0 lg:-mt-[250px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-6 xl:gap-10">
          <div className="relative -mt-[32px] flex min-w-0 flex-1 flex-col gap-4 sm:-mt-[44px] sm:flex-row sm:items-start sm:gap-4 lg:-mt-[58px] lg:max-w-[min(100%,560px)] xl:gap-5">


            <div className="min-w-0 flex-1 space-y-4 sm:space-y-5">
              <div className="relative h-[112px] w-full overflow-hidden sm:h-[128px]">
                <Image
                  src={images.bannerVertical}
                  alt={hero.bannerImageAlt}
                  fill
                  priority
                  unoptimized
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-contain object-left"
                />
              </div>
              <h1
                id="hero-titulo"
                className="max-w-[340px] text-[clamp(1.5rem,4.2vw,3.05rem)] font-bold leading-[1.2] text-brand-orange sm:max-w-[420px] lg:max-w-[488px]"
              >
                {hero.headline}
              </h1>

              <p className="text-[clamp(1.35rem,3.8vw,2.55rem)] font-bold leading-tight text-brand-teal">
                {hero.dates}
              </p>

              <div className="max-w-[442px] rounded-[10px] bg-brand-green px-5 py-4 text-white">
                <p className="text-[clamp(1rem,2.4vw,1.35rem)] font-bold leading-snug">
                  {hero.eventLines[0]}
                </p>
                <p className="text-[clamp(1rem,2.4vw,1.35rem)] font-bold leading-snug">
                  {hero.eventLines[1]}
                </p>
              </div>

              <div className="max-w-[488px] rounded-[10px] bg-brand-orange px-5 py-4 text-white">
                <p className="text-[clamp(0.9rem,2vw,1.15rem)] font-bold leading-relaxed">
                  {hero.supporting}
                </p>
              </div>

              <SignupCtaWithModal
                label={cta.primaryLabel}
                variant="hero"
                className="w-full max-w-[680px]"
              />
            </div>
          </div>

          {/* Coluna direita: fundo (halftone) + retrato — proporções Figma ~615×820 */}
          <div className="relative flex w-full flex-1 justify-center lg:mt-4 lg:min-h-[min(82vw,520px)] lg:max-w-[min(100%,560px)] lg:justify-end xl:max-w-[600px]">
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[380px] lg:-mt-[130px] lg:max-w-none lg:w-[min(100%,540px)]">
              <div className="relative aspect-[615/820] w-full">
                <Image
                  src={images.fundoRetrato}
                  alt=""
                  fill
                  priority
                  unoptimized
                  quality={100}
                  className="pointer-events-none object-cover object-[center_12%] scale-[1.3] translate-x-[20%] translate-y-[10%]"
                  sizes="(min-width: 1024px) 540px, 380px"
                />
                <Image
                  src={images.retrato}
                  alt={hero.photoAlt}
                  fill
                  priority
                  unoptimized
                  quality={100}
                  className="object-cover object-[center_12%]"
                  sizes="(min-width: 1024px) 540px, 380px"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
