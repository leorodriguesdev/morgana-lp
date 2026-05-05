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
    /** Caminho em /public — Open Graph, WhatsApp, X, LinkedIn */
    shareImage: string;
    /** og:image:alt / acessibilidade em previews */
    shareImageAlt: string;
  };
  cta: {
    primaryLabel: string;
    /** Ex.: "#inscricao" ou URL absoluta quando existir */
    href: string;
  };
  hero: {
    /** Descrição curta do bloco de título (acessibilidade / previews) */
    bannerImageAlt: string;
    kicker: string;
    /** Destaque no card (~48px no desktop; fluid no mobile) */
    eventTitleLead: string;
    /** Continuação do título no mesmo bloco */
    eventTitleSuffix: string;
    /** Subtítulo em destaque abaixo do card (ex.: tema do evento) */
    headline: string;
    dates: string;
    eventLines: [string, string];
    /** Destaque na caixa laranja do hero */
    promise: string;
    /** Caminhos em /public/hero */
    images: {
      /** Faixa decorativa full-width no topo (ex.: criativo_topo.png) */
      topo: string;
      /** Legado: arte PNG; opcional se o título for só em código */
      bannerVertical?: string;
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
    /** Parágrafo de urgência acima do título da seção */
    leadIn?: string;
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
    /** Rótulo da seção para leitores de tela */
    alt: string;
    title: string;
    body: string;
    /** Última linha em negrito (opcional) */
    closingBold?: string;
    ctaLabel: string;
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
