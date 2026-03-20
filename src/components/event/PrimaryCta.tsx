import Link from "next/link";

interface PrimaryCtaProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Hero Figma: gradiente verde + sombra */
  variant?: "default" | "hero";
}

export function PrimaryCta({
  href,
  children,
  className = "",
  variant = "default",
}: PrimaryCtaProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-[10px] px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal sm:text-base";

  const variants = {
    default:
      "bg-gradient-to-b from-[#A8FF03] to-[#36D401] shadow-sm min-h-11 text-sm sm:text-base tracking-wide",
    hero:
      "min-h-[38px] w-full max-w-[680px] bg-gradient-to-b from-[#A8FF03] to-[#36D401] text-[clamp(0.8125rem,2.2vw,1.125rem)] tracking-wide shadow-[0_4px_0_#289f00] sm:w-full sm:px-14",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
