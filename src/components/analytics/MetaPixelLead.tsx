"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    /** 4º argumento: `{ eventID }` para deduplicação com CAPI (documentação Meta). */
    fbq?: (
      method: "track",
      eventName: "Lead",
      params?: Record<string, unknown>,
      options?: { eventID?: string },
    ) => void;
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
        const capiEventId = window.sessionStorage.getItem(
          "meta-pixel:lead-event-id",
        );
        if (capiEventId) {
          window.sessionStorage.removeItem("meta-pixel:lead-event-id");
          window.fbq("track", "Lead", {}, { eventID: capiEventId });
        } else {
          window.fbq("track", "Lead");
        }
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
