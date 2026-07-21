"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <div key={item.q} className="border-b border-line">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
          >
            <span className="font-display text-xl leading-tight sm:text-2xl">
              {item.q}
            </span>
            <Plus
              className={cn(
                "h-4 w-4 shrink-0 text-ink-3 transition-transform duration-300",
                open === i && "rotate-45",
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              open === i ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <p className="max-w-2xl text-sm leading-relaxed text-ink-2">
                {item.a}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
