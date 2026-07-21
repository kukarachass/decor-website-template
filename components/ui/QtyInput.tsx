"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyInput({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  compact = false,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
  compact?: boolean;
}) {
  const btn =
    "flex items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-sand disabled:opacity-30 cursor-pointer";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-ink/12 bg-white/60",
        compact ? "p-0.5" : "p-1",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Зменшити кількість"
        className={cn(btn, compact ? "h-7 w-7" : "h-9 w-9")}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className={cn(
          "text-center tabular-nums",
          compact ? "w-6 text-xs" : "w-8 text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Збільшити кількість"
        className={cn(btn, compact ? "h-7 w-7" : "h-9 w-9")}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
