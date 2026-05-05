import type { Metadata } from "next";
import Link from "next/link";
import { HeroEventTitleCard } from "@/components/event/HeroEventTitleCard";
import { PrimaryCta } from "@/components/event/PrimaryCta";
import { landingConfig } from "@/config/landing";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-yellow px-4 py-16 text-center">

      <p className="animate-hero-4 mt-5 text-sm font-medium text-brand-ink/70">
        Erro:
      </p>
      {/* Badge de erro */}
      <p className="animate-confirm-badge inline-block rounded-[10px] bg-brand-orange px-6 py-3 text-5xl font-extrabold text-white shadow-[0_4px_20px_rgba(235,58,1,0.4)] ring-1 ring-white/20 sm:text-7xl">
        404
      </p>

      {/* Card do evento — reforça a identidade visual */}
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
          Ops! Essa página não existe.
        </p>
        <p className="text-base font-semibold leading-relaxed text-white sm:text-lg">
          Talvez o link esteja errado ou a página foi removida. Mas o seu
          lugar no curso ainda está esperando por você!
        </p>
      </div>

      {/* CTA */}
      <div className="animate-hero-3 mt-10 w-full max-w-sm">
        <PrimaryCta href="/" variant="hero" className="w-full">
          Voltar para o início
        </PrimaryCta>
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
      </p>
    </main>
  );
}
