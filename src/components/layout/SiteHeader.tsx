import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV = [
  { href: "#o-evento", label: "O evento" },
  { href: "#aprender", label: "Aprender" },
  { href: "#conteudo", label: "Aulas" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#sobre", label: "Professora" },
  { href: "#inscricao", label: "Inscrição" },
] as const;

interface SiteHeaderProps {
  siteName: string;
  ctaHref: string;
  ctaLabel: string;
}

export function SiteHeader({ siteName, ctaHref, ctaLabel }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-teal/20 bg-brand-yellow/95 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between gap-3">
        <Link
          href="#conteudo-principal"
          className="max-w-[min(100%,200px)] truncate text-sm font-bold text-brand-teal sm:max-w-xs"
        >
          {siteName}
        </Link>
        <nav
          aria-label="Seções da página"
          className="hidden items-center gap-5 md:flex lg:gap-6"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-brand-ink/80 transition-colors hover:text-brand-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={ctaHref}
          className="shrink-0 rounded-lg bg-brand-green px-3 py-2 text-center text-xs font-bold uppercase text-white sm:px-4 sm:text-sm"
        >
          <span className="hidden sm:inline">{ctaLabel}</span>
          <span className="sm:hidden">Inscrever</span>
        </Link>
      </Container>
    </header>
  );
}
