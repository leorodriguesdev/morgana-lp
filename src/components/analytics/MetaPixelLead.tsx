"use client";

import { useEffect } from "react";

type FbqArgs = [method: "track", eventName: "Lead", ...rest: unknown[]];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

interface MetaPixelLeadProps {
  dedupeKey?: string;
}

export function MetaPixelLead({ dedupeKey = "lead-confirmed" }: MetaPixelLeadProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storageKey = `meta-pixel:${dedupeKey}`;
    if (window.sessionStorage.getItem(storageKey) === "1") return;

    let attempts = 0;
    const maxAttempts = 10;
    const timer = window.setInterval(() => {
      attempts += 1;

      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
        window.sessionStorage.setItem(storageKey, "1");
        window.clearInterval(timer);
        return;
      }

      if (attempts >= maxAttempts) {
        window.clearInterval(timer);
      }
    }, 300);

    return () => window.clearInterval(timer);
  }, [dedupeKey]);

  return null;
}
