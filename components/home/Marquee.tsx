"use client";

import { useT } from "@/lib/i18n";

const dotColors = ["#C2A288", "#93A68C", "#D9A5A0", "#C9A85C", "#93A9BC", "#B49FC0"];

export function Marquee() {
  const t = useT();
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper-2/70 py-4">
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {t.home.marquee.map((item, i) => (
              <span
                key={item}
                className="flex items-center gap-10 whitespace-nowrap font-title text-lg text-ink-2 sm:text-xl"
              >
                {item}
                <svg
                  viewBox="0 0 10 10"
                  className="h-2 w-2 shrink-0"
                  style={{ color: dotColors[i % dotColors.length] }}
                  aria-hidden
                >
                  <path
                    d="M5 0l1.6 3.4L10 5l-3.4 1.6L5 10 3.4 6.6 0 5l3.4-1.6z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
