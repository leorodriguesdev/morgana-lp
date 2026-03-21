"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryCta } from "./PrimaryCta";

interface SignupCtaWithModalProps {
  label: string;
  className?: string;
  variant?: "default" | "hero";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupCtaWithModal({
  label,
  className,
  variant = "default",
}: SignupCtaWithModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const isFormValid = useMemo(() => {
    return name.trim().length >= 2 && EMAIL_REGEX.test(email.trim());
  }, [name, email]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setNameError("");
    setEmailError("");
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    const currentNameError =
      normalizedName.length >= 2 ? "" : "Informe seu nome completo.";
    const currentEmailError = EMAIL_REGEX.test(normalizedEmail)
      ? ""
      : "Informe um e-mail valido.";

    setNameError(currentNameError);
    setEmailError(currentEmailError);

    if (currentNameError || currentEmailError) {
      return;
    }

    try {
      setIsSubmitting(true);
      /** Repassa query da LP (src, utm_*, etc.) — ver planilha `UTMs - UTMS.csv`. */
      const query = typeof window !== "undefined" ? window.location.search : "";
      router.push(`/inscricao-confirmada${query}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PrimaryCta
        variant={variant}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </PrimaryCta>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="inscricao-modal-titulo"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="inscricao-modal-titulo"
                  className="text-xl font-bold text-brand-teal"
                >
                  Confirmar inscricao
                </h2>
                <p className="mt-1 text-sm text-brand-ink/80">
                  Preencha nome e e-mail para continuar.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md px-2 py-1 text-sm font-semibold text-brand-ink/70 transition-[transform,background-color] duration-150 hover:bg-gray-100 motion-safe:active:scale-95"
                aria-label="Fechar modal"
              >
                X
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="signup-name"
                  className="mb-1 block text-sm font-semibold text-brand-ink"
                >
                  Nome
                </label>
                <input
                  id="signup-name"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  className="w-full rounded-lg border border-brand-ink/20 px-3 py-2 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                  placeholder="Seu nome completo"
                  required
                />
                {nameError ? (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {nameError}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-1 block text-sm font-semibold text-brand-ink"
                >
                  E-mail
                </label>
                <input
                  id="signup-email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-brand-ink/20 px-3 py-2 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                  placeholder="voce@email.com"
                  required
                />
                {emailError ? (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {emailError}
                  </p>
                ) : null}
              </div>

              <PrimaryCta
                type="submit"
                className="w-full"
                onClick={undefined}
                variant="default"
              >
                {isSubmitting ? "Enviando..." : "Enviar e continuar"}
              </PrimaryCta>

              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-lg border border-brand-ink/20 px-4 py-2 text-sm font-semibold text-brand-ink transition-[transform,background-color,box-shadow] duration-150 hover:border-brand-teal/30 hover:bg-gray-50 hover:shadow-sm motion-safe:active:scale-[0.98]"
              >
                Cancelar
              </button>
            </form>

            {!isFormValid ? (
              <p className="mt-4 text-center text-xs text-brand-ink/60">
                Use um nome valido e um e-mail valido para continuar.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
