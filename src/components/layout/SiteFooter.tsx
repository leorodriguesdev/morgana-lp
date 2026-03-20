import { Container } from "@/components/ui/Container";

interface SiteFooterProps {
  copyright: string;
}

export function SiteFooter({ copyright }: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-brand-teal/25 bg-brand-yellow py-10">
      <Container className="flex items-center justify-center">
        <p className="text-center text-sm text-brand-ink/70">{copyright}</p>
      </Container>
    </footer>
  );
}
