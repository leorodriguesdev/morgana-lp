import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminWhatsappPanel } from "@/components/admin/AdminWhatsappPanel";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-session";
import { getWhatsappGroupUrl } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Admin · WhatsApp",
  robots: { index: false, follow: false },
};

export default async function AdminWhatsappPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(getAdminSessionCookieName())?.value;
  const authed = verifyAdminSessionToken(session);
  const initialUrl = authed ? await getWhatsappGroupUrl() : "";
  const passwordConfigured = Boolean(
    process.env.ADMIN_SETTINGS_PASSWORD?.trim(),
  );

  return (
    <AdminWhatsappPanel
      initialAuthed={authed}
      initialUrl={initialUrl}
      passwordConfigured={passwordConfigured}
    />
  );
}
