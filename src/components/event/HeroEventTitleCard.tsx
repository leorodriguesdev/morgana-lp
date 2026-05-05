export interface HeroEventTitleCardProps {
  kicker: string;
  eventTitleLead: string;
  eventTitleSuffix: string;
  /** Home: único h1. Demais telas: div para não duplicar landmark. */
  titleAs?: "h1" | "div";
  headingId?: string;
  /** Hero principal vs faixas menores (depoimentos, confirmação). */
  size?: "hero" | "compact";
  /** Hero: esquerda. Depoimentos: centro. */
  align?: "left" | "center";
  /** Quando o bloco é repetido na mesma página (somente visual). */
  decorative?: boolean;
  className?: string;
}

/**
 * Faixa azul: kicker centralizado; “PRIMEIROS PASSOS” sempre em uma linha;
 * max 512px; padding menor no mobile para não sobrar área vazia.
 */
export function HeroEventTitleCard({
  kicker,
  eventTitleLead,
  eventTitleSuffix,
  titleAs = "div",
  headingId,
  size = "hero",
  align = "left",
  decorative = false,
  className = "",
}: HeroEventTitleCardProps) {
  const alignClass = align === "center" ? "mx-auto" : "";
  const rowAlign =
    align === "center" ? "items-center" : "items-start";

  const kickerClass =
    size === "hero"
      ? "text-[clamp(0.65rem,2vw,0.85rem)] sm:text-[clamp(0.7rem,1.8vw,0.9rem)]"
      : "text-[clamp(0.6rem,1.8vw,0.75rem)] sm:text-[clamp(0.65rem,1.6vw,0.8rem)]";

  const leadClass =
    size === "hero"
      ? "inline-block max-w-full whitespace-nowrap font-bold uppercase leading-[1.05] tracking-tight text-[clamp(0.8125rem,calc(0.45rem+3.25vw),3rem)] sm:tracking-wide"
      : "inline-block max-w-full whitespace-nowrap font-bold uppercase leading-[1.08] tracking-tight text-[clamp(0.75rem,3.6vw+0.2rem,2.25rem)] sm:tracking-wide";

  const suffixClass =
    size === "hero"
      ? "font-bold uppercase leading-snug text-[clamp(0.875rem,2.5vw+0.35rem,1.5rem)] sm:text-[clamp(1rem,2.4vw,1.5rem)]"
      : "font-bold uppercase leading-snug text-[clamp(0.75rem,2.2vw+0.2rem,1.125rem)]";

  const titleInner = (
    <>
      <span className={leadClass}>{eventTitleLead}</span>
      <span className={suffixClass}>{eventTitleSuffix}</span>
    </>
  );

  const titleClassName =
    "flex min-w-0 w-full max-w-full flex-col items-center gap-0.5 text-center font-bold text-white";

  const titleEl =
    titleAs === "h1" ? (
      <h1 id={headingId} className={titleClassName}>
        {titleInner}
      </h1>
    ) : (
      <p className={titleClassName}>{titleInner}</p>
    );

  return (
    <div
      className={`box-border w-full max-w-[512px] ${alignClass} rounded-[10px] bg-gradient-to-br from-brand-teal to-[#1e7a9e] px-3 py-3 ring-1 ring-white/20 shadow-[0_8px_32px_rgba(45,143,181,0.45)] sm:rounded-xl sm:px-5 sm:py-5 ${className}`}
      aria-hidden={decorative ? true : undefined}
    >
      <div className={`flex w-full min-w-0 flex-col ${rowAlign}`}>
        <div className="inline-flex w-full max-w-full min-w-0 flex-col items-center text-center">
          <p
            className={`mb-2 font-bold uppercase tracking-wide text-brand-yellow ${kickerClass}`}
          >
            {kicker}
          </p>
          {titleEl}
        </div>
      </div>
    </div>
  );
}
