import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-session";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  getWhatsappGroupUrl,
  isValidWhatsappGroupUrl,
} from "@/lib/site-settings";

const SETTINGS_ID = "default";

async function requireAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(getAdminSessionCookieName())?.value;
  return verifyAdminSessionToken(session);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const url = await getWhatsappGroupUrl();
  return NextResponse.json({ url });
}

export async function PUT(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  let body: { url?: unknown };
  try {
    body = (await request.json()) as { url?: unknown };
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const raw = typeof body.url === "string" ? body.url.trim() : "";
  if (!raw || !isValidWhatsappGroupUrl(raw)) {
    return NextResponse.json(
      {
        error:
          "URL inválida. Use um link oficial do WhatsApp (ex.: chat.whatsapp.com ou wa.me).",
      },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Banco indisponível. Verifique Supabase no servidor." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("site_settings").upsert(
    {
      id: SETTINGS_ID,
      whatsapp_group_url: raw,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("[api/admin/settings/whatsapp]", error.message);
    return NextResponse.json(
      { error: "Não foi possível salvar. Tente de novo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, url: raw });
}
