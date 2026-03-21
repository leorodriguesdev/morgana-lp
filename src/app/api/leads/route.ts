import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_PHONE = 40;

/** Tabela `leads`: data, nome, email, telefone, utm_*, src (ver docs/supabase-leads.sql). */
const LEADS_TABLE = "leads";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_conjunto",
  "utm_content",
  "utm_term",
  "src",
] as const;

type LeadBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
} & Partial<Record<(typeof UTM_KEYS)[number], unknown>>;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function sellfluxPayload(
  name: string,
  email: string,
  phone: string,
  utm: Record<(typeof UTM_KEYS)[number], string>,
) {
  return {
    name,
    email,
    phone: phone || "",
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_conjunto: utm.utm_conjunto,
    utm_content: utm.utm_content,
    utm_term: utm.utm_term,
    src: utm.src,
  };
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const nome = str(body.name, MAX_NAME);
  const email = str(body.email, MAX_EMAIL).toLowerCase();
  const phone = str(body.phone, MAX_PHONE);

  if (nome.length < 2) {
    return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const utm = {} as Record<(typeof UTM_KEYS)[number], string>;
  for (const key of UTM_KEYS) {
    utm[key] = str(body[key], 200);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[api/leads] Supabase admin não configurado (env).");
    return NextResponse.json(
      { error: "Cadastro temporariamente indisponível." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from(LEADS_TABLE).insert({
    nome,
    email,
    telefone: phone || "",
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_conjunto: utm.utm_conjunto,
    utm_content: utm.utm_content,
    utm_term: utm.utm_term,
    src: utm.src,
  });

  if (error) {
    console.error("[api/leads] insert", error.message);
    return NextResponse.json(
      { error: "Falha ao salvar o cadastro." },
      { status: 502 },
    );
  }

  const webhookUrl = process.env.SELLFLUX_FORM_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    const payload = sellfluxPayload(nome, email, phone, utm);
    try {
      const whRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15_000),
      });
      if (!whRes.ok) {
        const t = await whRes.text();
        console.error(
          "[api/leads] SellFlux webhook HTTP",
          whRes.status,
          t.slice(0, 400),
        );
      }
    } catch (e) {
      console.error("[api/leads] SellFlux webhook", e);
    }
  } else {
    console.warn("[api/leads] SELLFLUX_FORM_WEBHOOK_URL não configurada.");
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
