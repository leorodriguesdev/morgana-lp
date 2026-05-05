import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SignupCtaWithModal } from "./SignupCtaWithModal";
import { HeroEventTitleCard } from "./HeroEventTitleCard";
import type { EventLandingContent } from "@/types/landing";

interface EventHeroProps {
  hero: EventLandingContent["hero"];
  cta: EventLandingContent["cta"];
}

/**
 * Hero — faixa superior em arte; título do evento em código (HeroEventTitleCard).
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
            <div className="min-w-0 flex-1 flex flex-col justify-between gap-3 max-sm:min-h-[calc(100svh-5rem)] sm:block sm:space-y-5 lg:pb-10">
              <div className="animate-hero-1">
                <HeroEventTitleCard
                  kicker={hero.kicker}
                  eventTitleLead={hero.eventTitleLead}
                  eventTitleSuffix={hero.eventTitleSuffix}
                  titleAs="h1"
                  headingId="hero-titulo"
                  size="hero"
                  align="left"
                />
              </div>

              <p className="animate-hero-2 max-w-[488px] text-balance text-[clamp(1.5rem,4.2vw,3.05rem)] font-bold leading-[1.2] text-brand-orange">
                {hero.headline}
              </p>

              <p className="animate-hero-3 text-[clamp(1.35rem,3.8vw,2.55rem)] font-bold leading-tight text-brand-teal">
                {hero.dates}
              </p>

              <div className="animate-hero-4 max-w-[442px] rounded-[10px] bg-gradient-to-br from-brand-green to-[#28a800] px-5 py-4 text-white ring-1 ring-white/25 shadow-[0_4px_20px_rgba(54,212,1,0.45)]">
                <p className="text-[clamp(1rem,2.4vw,1.35rem)] font-bold leading-snug">
                  {hero.eventLines[0]}
                </p>
                <p className="text-[clamp(1rem,2.4vw,1.35rem)] font-bold leading-snug">
                  {hero.eventLines[1]}
                </p>
              </div>

              <div className="animate-hero-5 max-w-[488px] rounded-[10px] bg-gradient-to-br from-brand-orange to-[#c43000] px-5 py-4 text-white ring-1 ring-white/20 shadow-[0_4px_20px_rgba(235,58,1,0.4)]">
                <p className="text-[clamp(0.9rem,2vw,1.15rem)] font-bold leading-relaxed">
                  {hero.promise}
                </p>
              </div>

              <div className="animate-hero-6">
                <SignupCtaWithModal
                  label={cta.primaryLabel}
                  variant="hero"
                  className="w-full max-w-[680px]"
                />
              </div>
            </div>
          </div>

          {/* Coluna direita: fundo (halftone) + retrato — proporções Figma ~615×820 */}
          {/* Mobile: "segunda seção" com separador visual. Desktop: layout lado a lado. */}
          <div className="animate-hero-portrait relative flex w-full flex-1 justify-center border-t-2 border-brand-teal/20 pt-6 sm:border-0 sm:pt-0 lg:mt-4 lg:min-h-[min(82vw,520px)] lg:max-w-[min(100%,560px)] lg:justify-end xl:max-w-[600px]">
            <div className="relative z-10 w-full max-w-[min(100%,380px)] sm:max-w-[380px] lg:-mt-[130px] lg:max-w-none lg:w-[min(100%,540px)]">
              <div className="relative aspect-[615/820] w-full">
                {/* Fundo halftone — fixo, não se move */}
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
                {/* Retrato + gradiente se movem juntos */}
                <div className="absolute inset-0 lg:translate-x-10 lg:translate-y-8">
                  <div className="relative h-full w-full">
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
                    {/* Fade bottom: dissolve o recorte no fundo amarelo — mobile e desktop */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#ffbe33] via-[#ffbe33]/55 to-transparent lg:h-40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
