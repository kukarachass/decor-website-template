"use client";

import { Instagram } from "lucide-react";
import type { CategorySlug } from "@/lib/types";
import { ProductArt } from "@/components/ui/ProductArt";
import { Reveal } from "@/components/ui/Reveal";
import { useT } from "@/lib/i18n";

const tiles: CategorySlug[] = [
  "kosmetychky",
  "kastruli",
  "polytsi",
  "chashky",
  "tyulpany",
  "organaizery",
];

export function InstagramStrip() {
  const t = useT();

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className="eyebrow">Instagram</p>
          <h2 className="font-display text-[1.9rem] leading-[1.1] sm:text-[2.35rem]">
            @zoria.decor
          </h2>
          <p className="lead max-w-md text-sm">{t.home.igText}</p>
          <a
            href="https://instagram.com/zoria.decor"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(120deg,#D9A5A0,#C08D8D)] px-5 py-2.5 text-[0.84rem] font-semibold text-paper transition-opacity hover:opacity-90"
          >
            <Instagram className="h-4 w-4" />
            {t.home.igCta}
          </a>
        </Reveal>
      </div>

      <div className="hide-scrollbar mt-12 flex gap-3 overflow-x-auto px-5 md:px-8">
        {tiles.map((cat, i) => (
          <Reveal
            key={cat}
            delay={i * 70}
            className="group relative w-44 shrink-0 sm:w-56 lg:w-auto lg:flex-1"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <ProductArt
                category={cat}
                seed={"ig-" + cat}
                className="aspect-square w-full transition-transform duration-[900ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/45 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="text-xs font-medium leading-snug text-white">
                  {t.home.igTiles[i]}
                </p>
              </div>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/85 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Instagram className="h-3.5 w-3.5" />
              </span>
            </div>
          </Reveal>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>
    </section>
  );
}
