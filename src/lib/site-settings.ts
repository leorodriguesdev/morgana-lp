import { getSupabaseAdmin } from "@/lib/supabase/admin";

const SETTINGS_ID = "default";

/**
 * URL do grupo WhatsApp: prioriza Supabase; se vazio ou indisponível, usa env.
 */
export async function getWhatsappGroupUrl(): Promise<string> {
  const fallback =
    process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL?.trim() || "";

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return fallback || "#inscricao-whatsapp";
  }

  const { data, error } = await supabase
    .from("site_settings")
    .select("whatsapp_group_url")
    .eq("id", SETTINGS_ID)
    .maybeSingle();

  if (error) {
    const missingTable =
      /could not find the table|relation .* does not exist/i.test(
        error.message,
      );
    if (!missingTable) {
      console.error("[site-settings] get whatsapp", error.message);
    }
    return fallback || "#inscricao-whatsapp";
  }

  const fromDb = data?.whatsapp_group_url?.trim();
  if (fromDb) return fromDb;

  return fallback || "#inscricao-whatsapp";
}

/** Valida URL usada no botão do WhatsApp (evita XSS / protocolos estranhos). */
export function isValidWhatsappGroupUrl(input: string): boolean {
  const t = input.trim();
  if (!t) return false;
  let u: URL;
  try {
    u = new URL(t);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  const host = u.hostname.toLowerCase();
  const allowed =
    host === "chat.whatsapp.com" ||
    host === "wa.me" ||
    host === "api.whatsapp.com" ||
    host.endsWith(".whatsapp.com");
  return allowed;
}
