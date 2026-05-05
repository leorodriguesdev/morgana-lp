"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type AnimVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "fade-in";

interface AnimateInProps {
  children: React.ReactNode;
  variant?: AnimVariant;
  /** Delay em ms para efeito stagger */
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  /** Porcentagem do elemento visível para disparar (0–1) */
  threshold?: number;
  /** Animar apenas na primeira vez */
  once?: boolean;
  /** Atributos HTML passados diretamente ao elemento raiz */
  id?: string;
  role?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Wrapper client-side que observa a visibilidade via IntersectionObserver
 * e adiciona a classe `in-view` quando o elemento entra no viewport.
 * As transições CSS em globals.css cuidam da animação.
 *
 * Pode ser importado em Server Components — a fronteira 'use client'
 * fica aqui; os filhos passados como prop continuam sendo RSC.
 */
export function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
  threshold = 0.12,
  once = true,
  id,
  role,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const combined = `anim-${variant}${className ? ` ${className}` : ""}`;

  const extraProps = {
    ...(id !== undefined && { id }),
    ...(role !== undefined && { role }),
    ...(ariaLabelledby !== undefined && { "aria-labelledby": ariaLabelledby }),
    ...(ariaLabel !== undefined && { "aria-label": ariaLabel }),
    ...(ariaHidden !== undefined && { "aria-hidden": ariaHidden }),
  };

  return (
    // @ts-expect-error — `as` genérico com ref é type-safe em runtime
    <Tag
      ref={ref}
      className={combined}
      style={{ "--anim-delay": `${delay}ms` } as CSSProperties}
      {...extraProps}
    >
      {children}
    </Tag>
  );
}
