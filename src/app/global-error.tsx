"use client";

import { useEffect } from "react";
import Link from "next/link";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Captura erros no root layout — o único nível que `error.tsx` não alcança.
 * Deve incluir <html> e <body> pois substitui o layout inteiro.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#ffbe33",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            display: "inline-block",
            background: "#ff1818",
            color: "#fff",
            borderRadius: "10px",
            padding: "0.75rem 1.5rem",
            fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
            fontWeight: 900,
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(255,24,24,0.4)",
          }}
        >
          500
        </p>

        <p
          style={{
            color: "#2d8fb5",
            fontSize: "clamp(1.25rem, 4vw, 1.875rem)",
            fontWeight: 800,
            maxWidth: "28rem",
            lineHeight: 1.3,
            marginBottom: "0.75rem",
          }}
        >
          Algo deu errado por aqui.
        </p>

        <p
          style={{
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            maxWidth: "28rem",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          Não se preocupe — isso não afeta a sua inscrição. Tente novamente
          ou volte para a página inicial.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            width: "100%",
            maxWidth: "20rem",
          }}
        >
          <button
            onClick={reset}
            style={{
              background: "linear-gradient(to bottom, #A8FF03, #36D401)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "0.875rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              boxShadow: "0 4px 0 #289f00",
            }}
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border: "2px solid #2d8fb5",
              padding: "0.75rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#2d8fb5",
              textDecoration: "none",
            }}
          >
            Voltar para o início
          </Link>
        </div>

        {error.digest ? (
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.75rem",
              color: "rgba(15,23,42,0.5)",
            }}
          >
            Código: {error.digest}
          </p>
        ) : null}
      </body>
    </html>
  );
}
