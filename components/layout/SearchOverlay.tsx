"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useUI } from "@/lib/store/ui";
import { useShop } from "@/lib/store/shop";
import { useLockBody } from "@/lib/hooks";
import { categories } from "@/lib/data/categories";
import { cn, formatPrice } from "@/lib/utils";
import { ProductArt } from "@/components/ui/ProductArt";
import { useLocalizeProducts, useT } from "@/lib/i18n";

export function SearchOverlay() {
  const t = useT();
  const localize = useLocalizeProducts();
  const open = useUI((s) => s.searchOpen);
  const setOpen = useUI((s) => s.setSearchOpen);
  const products = useShop((s) => s.products);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useLockBody(open);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return localize(products)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          t.categories[p.category]?.title.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query, products, localize, t]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[85]",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 top-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container-x py-6 md:py-10">
          <div className="flex items-center gap-4 border-b border-line pb-4">
            <Search className="h-5 w-5 shrink-0 text-ink-3" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:font-normal placeholder:text-ink-3/60 md:text-3xl"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.common.close}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-sand"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6">
            {query.trim().length < 2 ? (
              <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="eyebrow mb-3">{t.search.popular}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.search.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="cursor-pointer rounded-full border border-ink/12 px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors hover:border-ink/35"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="eyebrow mb-3">{t.common.categories}</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-5">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/catalog?category=${c.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 border-b border-line/70 py-2 font-title text-lg transition-colors hover:text-clay-2"
                      >
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: c.accent }}
                        />
                        {t.categories[c.slug].title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="py-6 text-sm text-ink-3">
                {t.search.empty}{" "}
                <Link
                  href="/catalog"
                  onClick={() => setOpen(false)}
                  className="underline underline-offset-4"
                >
                  {t.search.emptyLink}
                </Link>
                .
              </p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sand/60"
                    >
                      <ProductArt
                        category={p.category}
                        seed={p.id}
                        className="h-16 w-14 shrink-0 rounded-xl"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-title text-base">
                          {p.name}
                        </span>
                        <span className="block text-xs text-ink-3">
                          {t.categories[p.category]?.title}
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
