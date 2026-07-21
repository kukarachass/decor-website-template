"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";
import { useUI } from "@/lib/store/ui";

export function Toast() {
  const toast = useUI((s) => s.toast);
  const close = useUI((s) => s.closeToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(close, 2800);
    return () => clearTimeout(t);
  }, [toast, close]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4 sm:bottom-8">
      {toast && (
        <div
          key={toast.id}
          className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-full border border-ink/10 bg-ink px-5 py-3 text-paper shadow-[0_20px_50px_-20px_rgba(43,37,33,0.8)]"
          style={{ animation: "rise 0.45s cubic-bezier(0.22,1,0.36,1) both" }}
          role="status"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-paper/15">
            <Check className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm">
            {toast.title}
            {toast.caption && (
              <span className="block text-xs text-paper/60">{toast.caption}</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
