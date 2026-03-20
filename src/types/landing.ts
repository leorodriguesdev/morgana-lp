export interface EventLesson {
  number: string;
  /** Texto simples quando não usar titleHtml */
  title?: string;
  /** HTML estático do config: use <strong> para negrito */
  titleHtml?: string;
  body: string;
}

export interface EventLandingContent {
  site: {
    name: string;
    title: string;
    description: string;
  };
  cta: {
    primaryLabel: string;
    /** Ex.: "#inscricao" ou URL absoluta quando existir */
    href: string;
  };
  hero: {
    /** Texto alternativo da arte vertical “Primeiros passos” */
    bannerImageAlt: string;
    headline: string;
    dates: string;
    eventLines: [string, string];
    supporting: string;
    /** Caminhos em /public/hero */
    images: {
      /** Faixa decorativa full-width no topo (ex.: criativo_topo.png) */
      topo: string;
      /** Arte azul “Primeiros passos” (export vertical; giramos no layout) */
      bannerVertical: string;
      fundoRetrato: string;
      retrato: string;
    };
    photoAlt: string;
  };
  marquee: {
    text: string;
    repeatCount: number;
  };
  pain: {
    id: string;
    titleLine1: string;
    titleHighlight: string;
    bullets: string[];
    titleIfYou: string;
    painCards: string[];
    closingLine: string;
  };
  learn: {
    id: string;
    title: string;
    items: string[];
  };
  lessons: {
    id: string;
    title: string;
    items: EventLesson[];
  };
  audience: {
    id: string;
    title: string;
    forItems: string[];
    notFor: string;
  };
  promoImage: {
    id: string;
    alt: string;
  };
  about: {
    id: string;
    heading: string;
    paragraphs: string[];
    statsLine: string;
  };
  testimonials: {
    id: string;
    heading: string;
    note: string;
  };
  finalCta: {
    id: string;
    title: string;
    buttonLine: string;
    shareLine: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}
