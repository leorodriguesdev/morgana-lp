"use client";

import { useEffect } from "react";
import Link from "next/link";
import { HeroEventTitleCard } from "@/components/event/HeroEventTitleCard";
import { PrimaryCta } from "@/components/event/PrimaryCta";
import { landingConfig } from "@/config/landing";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[ErrorPage]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-yellow px-4 py-16 text-center">

      <p className="animate-hero-4 mt-5 text-sm font-medium text-brand-ink/70">
        Erro:
      </p>

      {/* Badge de erro */}
      <p className="animate-confirm-badge inline-block rounded-[10px] bg-brand-red px-6 py-3 text-5xl font-extrabold text-white shadow-[0_4px_20px_rgba(255,24,24,0.4)] ring-1 ring-white/20 sm:text-7xl">
        500
      </p>

      {/* Card do evento — reforça identidade */}
      <div className="animate-hero-1 mt-8 w-full max-w-xs sm:max-w-sm">
        <HeroEventTitleCard
          kicker={landingConfig.hero.kicker}
          eventTitleLead={landingConfig.hero.eventTitleLead}
          eventTitleSuffix={landingConfig.hero.eventTitleSuffix}
          titleAs="div"
          size="compact"
          align="center"
          decorative
        />
      </div>

      {/* Mensagem */}
      <div className="animate-hero-2 mt-8 max-w-md space-y-3">
        <p className="text-2xl font-extrabold leading-snug text-brand-teal sm:text-3xl">
          Algo deu errado por aqui.
        </p>
        <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
          Não se preocupe — isso não afeta a sua inscrição. Tente novamente
          ou volte para a página inicial.
        </p>
      </div>

      {/* CTAs */}
      <div className="animate-hero-3 mt-10 flex w-full max-w-sm flex-col gap-3">
        <PrimaryCta variant="hero" className="w-full" onClick={reset}>
          Tentar novamente
        </PrimaryCta>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-[10px] border-2 border-brand-teal bg-transparent px-8 py-3 text-sm font-bold uppercase tracking-wide text-brand-teal transition-colors hover:bg-brand-teal/10 sm:text-base"
        >
          Voltar para o início
        </Link>
      </div>

      {/* Link alternativo */}
      <p className="animate-hero-4 mt-5 text-sm font-medium text-brand-ink/70">
        Ou acesse diretamente:{" "}
        <Link
          href="/"
          className="font-bold text-brand-teal underline underline-offset-2 hover:no-underline"
        >
          morganadacruz.com.br
        </Link>
        {error.digest ? ` — código: ${error.digest}` : null}
      </p>
    </main>
  );
}
