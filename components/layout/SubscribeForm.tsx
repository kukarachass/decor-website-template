"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export function SubscribeForm({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const dark = tone === "dark";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email)) return;
        setDone(true);
        setEmail("");
      }}
      className={cn("relative", className)}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setDone(false);
        }}
        placeholder="your@email.com"
        aria-label="Email"
        className={cn(
          "h-12 w-full rounded-full border pl-5 pr-14 text-sm outline-none transition-colors",
          dark
            ? "border-paper/20 bg-paper/5 text-paper placeholder:text-paper/40 focus:border-paper/60"
            : "border-ink/15 bg-white/60 placeholder:text-ink-3/70 focus:border-clay",
        )}
      />
      <button
        type="submit"
        aria-label={t.footer.subscribe}
        className={cn(
          "absolute right-1.5 top-1.5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors",
          dark
            ? "bg-paper text-ink hover:bg-paper/85"
            : "bg-ink text-paper hover:bg-ink-2",
        )}
      >
        {done ? (
          <Check className="h-4 w-4" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>
      {done && (
        <p
          className={cn(
            "absolute -bottom-6 left-5 text-[0.72rem]",
            dark ? "text-paper/60" : "text-ink-3",
          )}
        >
          {t.footer.subscribed}
        </p>
      )}
    </form>
  );
}
