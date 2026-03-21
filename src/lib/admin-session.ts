import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_wm_session";

function getSessionSecret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim();
  if (explicit) return explicit;
  const password = process.env.ADMIN_SETTINGS_PASSWORD?.trim();
  if (password) return password;
  return "";
}

export function getAdminSessionCookieName(): typeof COOKIE_NAME {
  return COOKIE_NAME;
}

export function createAdminSessionToken(): string | null {
  const secret = getSessionSecret();
  if (!secret) return null;

  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ exp });
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(JSON.stringify({ p: payload, sig }), "utf8").toString(
    "base64url",
  );
}

export function verifyAdminSessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  const secret = getSessionSecret();
  if (!secret) return false;

  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const { p, sig } = JSON.parse(raw) as { p: string; sig: string };
    const expected = createHmac("sha256", secret).update(p).digest("hex");
    if (
      sig.length !== expected.length ||
      !timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
    ) {
      return false;
    }
    const { exp } = JSON.parse(p) as { exp: number };
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function verifyAdminPassword(plain: string): boolean {
  const expected = process.env.ADMIN_SETTINGS_PASSWORD?.trim();
  if (!expected || !plain) return false;
  return timingSafeStringEqual(plain, expected);
}
