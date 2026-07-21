"use client";

import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { id: Locale; label: string }[] = [
  { id: "uk", label: "UA" },
  { id: "en", label: "EN" },
];

export function LanguageSwitcher({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5",
        tone === "dark" ? "bg-paper/10" : "bg-sand/80",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {options.map((o) => {
        const active = locale === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLocale(o.id)}
            aria-pressed={active}
            className={cn(
              "relative cursor-pointer rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide transition-colors",
              active
                ? tone === "dark"
                  ? "bg-paper text-ink"
                  : "bg-ink text-paper"
                : tone === "dark"
                  ? "text-paper/60 hover:text-paper"
                  : "text-ink-3 hover:text-ink",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
