import Image from "next/image";
import type { Metadata } from "next";
import { PrimaryCta } from "@/components/event/PrimaryCta";
import { HeroEventTitleCard } from "@/components/event/HeroEventTitleCard";
import { MetaPixelLead } from "@/components/analytics/MetaPixelLead";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { landingConfig } from "@/config/landing";
import { getWhatsappGroupUrl } from "@/lib/site-settings";

/** Sempre busca URL do WhatsApp no servidor (Supabase/env) em tempo de request. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inscrição confirmada",
  description:
    "Próximo passo: grupo no WhatsApp com links das aulas, materiais e cronograma — curso gratuito Primeiros Passos no AEE (estudo de caso e PAEE).",
  robots: { index: false, follow: false },
};

/** Dimensões nativas do banner superior (evita layout shift). */
const CONFIRM_W = 2368;
const CONFIRM_H = 470;
/** Largura do card do evento vs faixa de cima: 42rem (2xl) / 72rem (6xl) = 7/12 — mobile escala com o pai. */
const CRIATIVO_WIDTH_VS_HERO = "min(42rem, calc(100% * 7 / 12))";

const BENEFITS = [
  "O link exclusivo das aulas no dia certo",
  "Os materiais complementares de cada aula",
  "As orientações práticas e cronograma oficial do curso",
] as const;

export default async function InscricaoConfirmadaPage() {
  const whatsappUrl = await getWhatsappGroupUrl();

  return (
    <main className="min-h-screen bg-brand-yellow px-4 py-6 sm:py-10">
      <MetaPixelLead />
      {/*
        Faixa de cima: max-w-6xl. Criativo: 7/12 da largura útil do pai (igual 2xl/6xl no desktop), encolhe no mobile junto com a de cima.
      */}
      <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
        <AnimateIn variant="fade-down" threshold={0.05}>
          <div className="relative z-0 w-full">
            <Image
              src="/comfirm/confirm.png"
              alt=""
              width={CONFIRM_W}
              height={CONFIRM_H}
              priority
              quality={100} unoptimized
              className="h-auto w-full rounded-2xl sm:rounded-3xl"
              sizes="(max-width: 1152px) 100vw, 1152px"
              role="presentation"
            />
          </div>
        </AnimateIn>
        <AnimateIn variant="scale-in" delay={120} threshold={0.05}>
          <div
            className="relative z-10 mx-auto min-w-0 max-w-full -mt-[5%]"
            style={{ width: CRIATIVO_WIDTH_VS_HERO }}
          >
            <HeroEventTitleCard
              kicker={landingConfig.hero.kicker}
              eventTitleLead={landingConfig.hero.eventTitleLead}
              eventTitleSuffix={landingConfig.hero.eventTitleSuffix}
              titleAs="div"
              size="compact"
              align="center"
            />
          </div>
        </AnimateIn>
      </div>

      <section
        id="inscricao-whatsapp"
        aria-labelledby="confirmacao-titulo"
        className="mx-auto mt-8 w-full max-w-2xl px-2 pb-12 text-center sm:mt-10 sm:px-4"
      >
        <h1
          id="confirmacao-titulo"
          className="sr-only"
        >
          Inscrição confirmada — próximo passo no WhatsApp
        </h1>

        <AnimateIn variant="scale-in">
          <p className="inline-block rounded-lg animate-bounce bg-[#37E400] px-5 py-3 text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
            Inscrição confirmada!
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={80}>
          <p className="mt-5 text-lg font-bold leading-snug text-white sm:text-xl">
            Você acaba de garantir sua vaga no curso gratuito{" "}
            <span className="text-balance sm:whitespace-normal">
              {landingConfig.hero.eventTitleLead}{" "}
              {landingConfig.hero.eventTitleSuffix}
            </span>
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={160}>
          <p className="animate-pulse mt-8 inline-block rounded-lg bg-[#E74612] px-4 py-2 text-lg font-extrabold text-white sm:text-2xl">
            Mas atenção:
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={220}>
          <p className="mt-4 text-lg font-extrabold text-brand-teal sm:text-xl">
            O seu acesso completo depende do próximo passo!
          </p>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={280}>
          <p className="mt-4 text-lg font-extrabold leading-snug text-white sm:text-xl">
            Entre agora no grupo silencioso do WhatsApp. É por lá que vamos
            liberar:
          </p>
        </AnimateIn>

        <ul className="mt-6 flex w-full flex-col gap-3 text-left">
          {BENEFITS.map((item, i) => (
            <AnimateIn key={item} as="li" variant="fade-left" delay={340 + i * 80} className="rounded-lg bg-[#0E4C68] px-4 py-3 text-base font-bold text-white sm:text-lg">
              <span aria-hidden>✅ </span>
              {item}
            </AnimateIn>
          ))}
        </ul>

        <AnimateIn variant="fade-up" delay={620}>
          <p className="mt-8 text-base font-extrabold leading-snug text-white sm:text-lg">
            O grupo é silencioso, sem conversas paralelas. E quem sair antes do
            fim do curso pode perder bônus e certificado.
          </p>
        </AnimateIn>

        <AnimateIn variant="scale-in" delay={700}>
          <PrimaryCta
            href={whatsappUrl}
            target={
              whatsappUrl.startsWith("http") ? "_blank" : undefined
            }
            rel={
              whatsappUrl.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            variant="hero"
            className="mt-8 min-h-14 w-full max-w-md px-6 text-base sm:text-lg"
          >
            Entrar no grupo agora
          </PrimaryCta>
        </AnimateIn>

        {whatsappUrl === "#inscricao-whatsapp" ? (
          <p className="mt-4 text-sm font-medium text-brand-ink/80">
            Configure{" "}
            <code className="rounded bg-white/60 px-1 py-0.5 text-xs">
              NEXT_PUBLIC_WHATSAPP_GROUP_URL
            </code>{" "}
            no ambiente para abrir o grupo real.
          </p>
        ) : null}
      </section>
    </main>
  );
}
