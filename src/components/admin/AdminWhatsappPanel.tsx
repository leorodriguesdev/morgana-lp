"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminWhatsappPanelProps {
  initialAuthed: boolean;
  initialUrl: string;
  passwordConfigured: boolean;
}

export function AdminWhatsappPanel({
  initialAuthed,
  initialUrl,
  passwordConfigured,
}: AdminWhatsappPanelProps) {
  const router = useRouter();
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  /** Valor no campo de edição (pode divergir do ativo até salvar). */
  const [url, setUrl] = useState(initialUrl);
  /** Link que o site usa de fato (Supabase → env → placeholder). */
  const [activeUrl, setActiveUrl] = useState(initialUrl);
  const [saveMessage, setSaveMessage] = useState("");
  const [copyHint, setCopyHint] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialAuthed) {
      setAuthed(true);
      setUrl(initialUrl);
      setActiveUrl(initialUrl);
    } else {
      setAuthed(false);
    }
  }, [initialAuthed, initialUrl]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "same-origin",
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setLoginError(payload.error ?? "Não foi possível entrar.");
        return;
      }
      setPassword("");
      setAuthed(true);

      const r = await fetch("/api/admin/settings/whatsapp", {
        credentials: "same-origin",
      });
      if (r.ok) {
        const data = (await r.json()) as { url?: string };
        if (typeof data.url === "string") {
          setUrl(data.url);
          setActiveUrl(data.url);
        }
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings/whatsapp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        credentials: "same-origin",
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        url?: string;
      };
      if (!res.ok) {
        setSaveMessage(payload.error ?? "Erro ao salvar.");
        return;
      }
      const saved = typeof payload.url === "string" ? payload.url : url;
      setActiveUrl(saved);
      setUrl(saved);
      setSaveMessage(
        "Salvo com sucesso. O link ativo no site agora é o exibido abaixo.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      setAuthed(false);
      setUrl("");
      setActiveUrl("");
      setSaveMessage("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  if (!passwordConfigured) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
        <div
          className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950"
          role="alert"
        >
          <p className="font-semibold">Admin não configurado</p>
          <p className="mt-2 text-sm">
            Defina a variável{" "}
            <code className="rounded bg-white/80 px-1 py-0.5 text-xs">
              ADMIN_SETTINGS_PASSWORD
            </code>{" "}
            no ambiente do servidor (ex.: Vercel) e faça um novo deploy.
          </p>
        </div>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
        <div className="rounded-2xl border border-brand-ink/15 bg-white p-8 shadow-lg">
          <h1 className="text-xl font-bold text-brand-teal">
            Área administrativa
          </h1>
          <p className="mt-2 text-sm text-brand-ink/80">
            Informe a senha para alterar o link do grupo do WhatsApp.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleLogin} noValidate>
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1 block text-sm font-semibold text-brand-ink"
              >
                Senha
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-brand-ink/20 px-3 py-2 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
                required
              />
            </div>
            {loginError ? (
              <p className="text-sm font-medium text-red-600" role="alert">
                {loginError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-teal px-4 py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:opacity-60"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const isPlaceholder =
    !activeUrl ||
    activeUrl === "#inscricao-whatsapp" ||
    !activeUrl.startsWith("http");

  const copyActiveLink = async () => {
    if (isPlaceholder) return;
    try {
      await navigator.clipboard.writeText(activeUrl);
      setCopyHint("Copiado.");
      window.setTimeout(() => setCopyHint(""), 2000);
    } catch {
      setCopyHint("Não foi possível copiar.");
      window.setTimeout(() => setCopyHint(""), 2500);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-brand-ink/15 bg-white p-8 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-brand-teal">
              Link do WhatsApp
            </h1>
            <p className="mt-2 text-sm text-brand-ink/80">
              Quando o grupo encher, cole aqui o novo link de convite. A página
              de confirmação passará a usar este endereço automaticamente.
            </p>
          </div>
        </div>

        <section
          className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4"
          aria-labelledby="link-ativo-titulo"
        >
          <h2
            id="link-ativo-titulo"
            className="text-sm font-bold text-emerald-900"
          >
            Link ativo no site agora
          </h2>
          {isPlaceholder ? (
            <p className="mt-2 text-sm text-emerald-900/85">
              Nenhum link HTTPS configurado ainda. Defina abaixo ou em{" "}
              <code className="rounded bg-white/70 px-1 py-0.5 text-xs">
                NEXT_PUBLIC_WHATSAPP_GROUP_URL
              </code>
              .
            </p>
          ) : (
            <>
              <p className="mt-1 break-all font-mono text-sm text-emerald-950">
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-emerald-700/50 underline-offset-2 hover:decoration-emerald-900"
                >
                  {activeUrl}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyActiveLink}
                  className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-100/80"
                >
                  Copiar link ativo
                </button>
                {copyHint ? (
                  <span className="self-center text-xs text-emerald-800">
                    {copyHint}
                  </span>
                ) : null}
              </div>
            </>
          )}
        </section>

        <form className="mt-6 space-y-4" onSubmit={handleSave} noValidate>
          <div>
            <label
              htmlFor="whatsapp-url"
              className="mb-1 block text-sm font-semibold text-brand-ink"
            >
              Inserir novo link do grupo WhatsApp
            </label>
            <input
              id="whatsapp-url"
              name="url"
              type="url"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://chat.whatsapp.com/..."
              className="w-full rounded-lg border border-brand-ink/20 px-3 py-2 text-sm outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              autoComplete="off"
            />
            <p className="mt-1 text-xs text-brand-ink/60">
              Ex.: link de convite do grupo (chat.whatsapp.com) ou wa.me.
            </p>
            {url.trim() !== activeUrl.trim() ? (
              <p className="mt-2 text-xs font-semibold text-amber-800">
                Texto alterado — clique em &quot;Salvar link&quot; para publicar
                no site.
              </p>
            ) : null}
          </div>
          {saveMessage ? (
            <p
              className={
                saveMessage.startsWith("Salvo")
                  ? "text-sm font-medium text-emerald-800"
                  : "text-sm font-medium text-red-600"
              }
              role="status"
            >
              {saveMessage}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-teal px-4 py-3 text-sm font-bold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Salvar link"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="w-full shrink-0 rounded-lg border border-brand-ink/20 px-3 py-1.5 text-sm font-semibold text-brand-ink transition hover:bg-gray-50 disabled:opacity-60"
          >
            Sair
          </button>
        </form>
      </div>
    </main>
  );
}
