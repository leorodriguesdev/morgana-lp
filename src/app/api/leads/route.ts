import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 320;

/** Tabela no Supabase: colunas `data`, `nome`, `email` (ver docs/supabase-leads.sql). */
const LEADS_TABLE = "leads";

type LeadBody = {
  name?: unknown;
  email?: unknown;
};

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(request: Request) {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return NextResponse.json({ error: "JSON invalido." }, { status: 400 });
  }

  const nome = str(body.name, MAX_NAME);
  const email = str(body.email, MAX_EMAIL).toLowerCase();

  if (nome.length < 2) {
    return NextResponse.json({ error: "Nome invalido." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "E-mail invalido." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[api/leads] Supabase admin nao configurado (env).");
    return NextResponse.json(
      { error: "Cadastro temporariamente indisponivel." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from(LEADS_TABLE).insert({
    nome,
    email,
  });

  if (error) {
    console.error("[api/leads] insert", error.message);
    return NextResponse.json(
      { error: "Falha ao salvar o cadastro." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
