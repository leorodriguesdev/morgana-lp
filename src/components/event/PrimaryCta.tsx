import Link from "next/link";

interface PrimaryCtaProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  /** Hero Figma: gradiente verde + sombra */
  variant?: "default" | "hero";
  onClick?: () => void;
  type?: "button" | "submit";
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export function PrimaryCta({
  href,
  children,
  className = "",
  variant = "default",
  onClick,
  type = "button",
  target,
  rel,
}: PrimaryCtaProps) {
  const base =
    "inline-flex min-h-11 cursor-pointer select-none items-center justify-center rounded-[10px] px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-white " +
    "transition-[transform,box-shadow,filter] duration-200 ease-out " +
    "motion-safe:hover:-translate-y-0.5 motion-safe:hover:brightness-105 " +
    "motion-safe:active:scale-[0.97] motion-safe:active:brightness-95 motion-reduce:active:opacity-90 " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal sm:text-base";

  const variants = {
    default:
      "min-h-11 bg-gradient-to-b from-[#A8FF03] to-[#36D401] text-sm shadow-sm tracking-wide sm:text-base " +
      "motion-safe:hover:shadow-[0_6px_16px_rgba(54,212,1,0.35)] motion-safe:active:translate-y-px",
    hero:
      "min-h-[38px] w-full bg-gradient-to-b from-[#A8FF03] to-[#36D401] text-[clamp(0.8125rem,2.2vw,1.125rem)] tracking-wide shadow-[0_4px_0_#289f00] sm:w-full sm:px-14 " +
      "motion-safe:hover:shadow-[0_6px_0_#289f00] motion-safe:active:translate-y-0.5 motion-safe:active:shadow-[0_2px_0_#289f00] motion-safe:active:scale-[0.99]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
