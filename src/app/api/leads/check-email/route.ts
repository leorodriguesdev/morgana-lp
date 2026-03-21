import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 320;

type Body = {
  email?: unknown;
};

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max).toLowerCase();
}

/**
 * POST { "email": "a@b.com" }
 * Resposta: { "registered": boolean }
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const email = str(body.email, MAX_EMAIL);
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Serviço indisponível." },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select("id")
    .eq("email", email)
    .limit(1);

  if (error) {
    console.error("[api/leads/check-email]", error.message);
    return NextResponse.json(
      { error: "Falha ao verificar." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { registered: (data?.length ?? 0) > 0 },
    { status: 200 },
  );
}

export function GET() {
  return NextResponse.json(
    { error: "Use POST com o corpo { \"email\": \"...\" }." },
    { status: 405 },
  );
}
