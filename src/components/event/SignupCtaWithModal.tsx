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

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_conjunto",
  "utm_content",
  "utm_term",
  "src",
] as const;

type EmailAvailability =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "error";

function attributionFromSearch(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

export function SignupCtaWithModal({
  label,
  className,
  variant = "default",
}: SignupCtaWithModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [emailAvailability, setEmailAvailability] =
    useState<EmailAvailability>("idle");
  const [emailCheckRetry, setEmailCheckRetry] = useState(0);

  const isFormValid = useMemo(() => {
    return name.trim().length >= 2 && EMAIL_REGEX.test(email.trim());
  }, [name, email]);

  const canSubmit =
    isFormValid &&
    emailAvailability === "available" &&
    !isSubmitting;

  useEffect(() => {
    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailAvailability("idle");
      return;
    }

    setEmailAvailability("idle");

    const ctrl = new AbortController();
    const timer = window.setTimeout(async () => {
      setEmailAvailability("checking");
      try {
        const res = await fetch("/api/leads/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed.toLowerCase() }),
          signal: ctrl.signal,
        });
        const json = (await res.json().catch(() => ({}))) as {
          registered?: boolean;
        };
        if (ctrl.signal.aborted) return;
        if (!res.ok) {
          setEmailAvailability("error");
          return;
        }
        setEmailAvailability(json.registered ? "taken" : "available");
      } catch {
        if (ctrl.signal.aborted) return;
        setEmailAvailability("error");
      }
    }, 480);

    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [email, emailCheckRetry]);

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
    setPhone("");
    setNameError("");
    setEmailError("");
    setSubmitError("");
    setEmailAvailability("idle");
    setEmailCheckRetry(0);
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
      : "Informe um e-mail válido.";

    setNameError(currentNameError);
    setEmailError(currentEmailError);

    if (currentNameError || currentEmailError) {
      return;
    }

    if (emailAvailability !== "available") {
      return;
    }

    setSubmitError("");

    try {
      setIsSubmitting(true);
      const query =
        typeof window !== "undefined" ? window.location.search : "";

      const attribution = attributionFromSearch();

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: normalizedName,
          email: normalizedEmail,
          phone: phone.trim(),
          ...Object.fromEntries(
            UTM_KEYS.map((k) => [k, attribution[k] ?? ""]),
          ),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setSubmitError(
          payload.error ??
            "Não foi possível registrar agora. Tente de novo em instantes.",
        );
        return;
      }

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
                  Confirmar inscrição
                </h2>
                <p className="mt-1 text-sm text-brand-ink/80">
                  Preencha nome e e-mail para continuar. WhatsApp é opcional.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md px-2 py-1 text-sm font-semibold text-brand-ink/70 transition-[transform,background-color] duration-150 hover:bg-gray-100 motion-safe:active:scale-95"
                aria-label="Fechar"
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
                  aria-invalid={
                    emailError ? true : emailAvailability === "taken"
                  }
                  aria-describedby={
                    EMAIL_REGEX.test(email.trim())
                      ? "signup-email-status"
                      : undefined
                  }
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-teal/20 ${
                    emailAvailability === "taken"
                      ? "border-red-400 focus:border-red-500"
                      : emailAvailability === "available"
                        ? "border-emerald-500/60 focus:border-brand-teal"
                        : "border-brand-ink/20 focus:border-brand-teal"
                  }`}
                  placeholder="voce@exemplo.com"
                  required
                />
                {emailError ? (
                  <p className="mt-1 text-xs font-medium text-red-600">
                    {emailError}
                  </p>
                ) : null}
                {EMAIL_REGEX.test(email.trim()) ? (
                  <div id="signup-email-status" className="mt-1 space-y-1">
                    {emailAvailability === "checking" ? (
                      <p className="text-xs font-medium text-brand-ink/70">
                        Verificando e-mail...
                      </p>
                    ) : null}
                    {emailAvailability === "available" ? (
                      <p className="text-xs font-medium text-emerald-700">
                        E-mail disponível para inscrição.
                      </p>
                    ) : null}
                    {emailAvailability === "taken" ? (
                      <p className="text-xs font-medium text-red-600">
                        Este e-mail já está cadastrado. Use outro e-mail.
                      </p>
                    ) : null}
                    {emailAvailability === "error" ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-medium text-amber-800">
                          Não foi possível verificar o e-mail.
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setEmailCheckRetry((n) => n + 1)
                          }
                          className="text-xs font-semibold text-brand-teal underline hover:no-underline"
                        >
                          Tentar de novo
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="signup-phone"
                  className="mb-1 block text-sm font-semibold text-brand-ink"
                >
                  WhatsApp <span className="font-normal text-brand-ink/60">(opcional)</span>
                </label>
                <input
                  id="signup-phone"
                  name="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-lg border border-brand-ink/20 px-3 py-2 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                  placeholder="+5587999999999"
                />
              </div>

              <PrimaryCta
                type="submit"
                className="w-full"
                onClick={undefined}
                variant="default"
                disabled={!canSubmit}
              >
                {isSubmitting
                  ? "Enviando..."
                  : emailAvailability === "checking"
                    ? "Verificando e-mail..."
                    : "Enviar e continuar"}
              </PrimaryCta>

              {submitError ? (
                <p
                  className="text-center text-sm font-medium text-red-600"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

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
                Use um nome válido e um e-mail válido.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
