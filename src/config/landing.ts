import type { EventLandingContent } from "@/types/landing";

export const landingConfig: EventLandingContent = {
  site: {
    name: "Primeiros Passos — Morgana da Cruz",
    title: "Da Nova Política de Inclusão ao PAEE | Evento gratuito",
    description:
      "Evento on-line e gratuito: 24, 25 e 26 de março. Certificado de 20h. Inscrições para professoras do AEE.",
  },
  cta: {
    primaryLabel: "Quero me inscrever agora",
    href: "#inscricao",
  },
  hero: {
    bannerImageAlt:
      "Curso gratuito, Primeiros passos para um AEE eficiente — faixa promocional",
    headline: "Da Nova Política de Inclusão ao PAEE",
    dates: "24, 25 e 26 de março",
    eventLines: ["Evento on-line e gratuito", "Certificado de 20h"],
    supporting:
      "Inscreva-se gratuitamente e comece o ano no AEE sem medo, sem improviso e sem erros.",
    images: {
      topo: "/hero/criativo_topo.png",
      bannerVertical: "/hero/criativo_primeiros_passos.png",
      fundoRetrato: "/hero/fundo_morgada.png",
      retrato: "/hero/morgana.png",
    },
    photoAlt: "Morgana da Cruz, professora do evento Primeiros Passos no AEE",
  },
  marquee: {
    text: "Inscreva-se",
    repeatCount: 12,
  },
  pain: {
    id: "o-evento",
    titleLine1: "Você sente que o AEE mudou…",
    titleHighlight: "mas ninguém explicou claramente o que fazer?",
    bullets: [
      "A Nova Política de Inclusão já está em vigor.",
      "As cobranças aumentaram.",
      "Os documentos ficaram mais confusos.",
      "E o início do ano letivo se aproxima com aluno novo, sem laudo e sem histórico.",
    ],
    titleIfYou: "Se você:",
    painCards: [
      "Tem medo de errar no AEE em 2026",
      "Não sabe exatamente o que a política espera de você",
      "Fica insegura com avaliação, PAEE, PDI, PEI e registros",
      "Já começou outros anos “apagando incêndio”",
    ],
    closingLine: "Este evento é para você.",
  },
  learn: {
    id: "aprender",
    title: "O que você vai aprender (em apenas 3 aulas)",
    items: [
      "O que a Nova Política de Inclusão realmente exige da professora do AEE",
      "Como agir desde o primeiro dia com alunos novos, mesmo sem laudo",
      "Como avaliar, registrar e planejar sem medo de errar",
      "O que é essencial (e o que é excesso) em PDI, PEI e registros",
      "Como começar o ano com organização e segurança no AEE",
    ],
  },
  lessons: {
    id: "conteudo",
    title: "Conteúdo das aulas",
    items: [
      {
        number: "Aula 01",
        titleHtml:
          "<strong>O que mudou com a nova política de inclusão</strong> (e por que o AEE passou a ser cobrado)",
        body: "Nesta aula você deixará de se sentir insegura diante das cobranças da escola e da rede e passará a entender qual é o seu papel no AEE segundo a nova política de inclusão.",
      },
      {
        number: "Aula 02",
        titleHtml:
          "<strong>Aluno novo, sem laudo e sem histórico:</strong> o que fazer no AEE desde o primeiro dia",
        body: "Na aula 2 você vai parar de se sentir perdida diante do aluno e passará a avaliar, compreender e agir com segurança no AEE desde o primeiro atendimento.",
      },
      {
        number: "Aula 03",
        titleHtml:
          "<strong>PAEE na prática:</strong> como transformar avaliação em plano de atendimento",
        body: "Na última e mais importante aula, você deixará de ver os documentos do AEE como burocracia e descobrirá como usar o PAEE como ferramenta para orientar o atendimento e fortalecer a inclusão na escola.",
      },
    ],
  },
  audience: {
    id: "para-quem",
    title: "Para quem é este evento?",
    forItems: [
      "Professoras do AEE",
      "Quem vai iniciar no AEE em 2026",
      "Quem quer se atualizar com a Nova Política de Inclusão",
      "Quem não quer errar, se sobrecarregar ou improvisar",
    ],
    notFor: "Não é para quem acha que “vai dar um jeito depois”.",
  },
  promoImage: {
    id: "destaque",
    alt: "Destaque visual do evento — substituir pela arte final exportada do Figma",
  },
  about: {
    id: "sobre",
    heading: "Quem será sua professora?",
    paragraphs: [
      "Olá, sou a professora Morgana formada em Pedagogia com especialização em educação especial e Psicopedagogia Clínica e institucional. Trabalho na educação desde 2010. Já atuei em Escolas Especiais e escolas regulares, com turmas de Anos Iniciais. Atuei também na Educação de Jovens e adultos, com alfabetização e nivelamento. Também fiz atendimentos psicopedagógicos clínicos durante um ano",
      "Em 2016 após ser aprovada em um concurso comecei a trabalhar no AEE e descobri um fazer pedagógico diferente do que eu já havia feito até então. Estruturei o AEE da escola e desde então os atendimentos são pautados na seriedade, responsabilidade e ética, exercendo assim, papel fundamental na vida dos alunos com deficiência da escola em que trabalho. Além de profissional, sou mãe do João Maurício e esposa.",
    ],
    statsLine:
      "No meu curso Descomplique o AEE já são mais de\n1800 alunas descomplicadas por todo o Brasil.",
  },
  testimonials: {
    id: "depoimentos",
    heading: "Alunas que descomplicaram o AEE",
    note: "Substituir pelos cards de depoimento (exportar imagens do Figma ou integrar embed).",
  },
  finalCta: {
    id: "inscricao",
    title: "Vagas limitadas!",
    buttonLine: "Inscreva-se agora para garantir sua participação",
    shareLine: "e compartilhe com quem precisa descomplicar o AEE!",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Morgana da Cruz. Todos os direitos reservados.`,
    links: [
      { label: "Política de privacidade", href: "#" },
      { label: "Termos de uso", href: "#" },
    ],
  },
};
