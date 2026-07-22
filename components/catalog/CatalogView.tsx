"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";
import { useShop } from "@/lib/store/shop";
import { categories, categoryMap } from "@/lib/data/categories";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { Filters, type FilterState } from "@/components/catalog/Filters";
import { priceBuckets, sortIds, type SortId } from "@/components/catalog/filters-data";
import { Select } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { useLockBody } from "@/lib/hooks";
import { DocumentTitle } from "@/components/ui/DocumentTitle";
import { useLocalizeProducts, usePlural, useT } from "@/lib/i18n";

export function CatalogView() {
  const t = useT();
  const plural = usePlural();
  const localize = useLocalizeProducts();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const products = useShop((s) => s.products);
  const [sheetOpen, setSheetOpen] = useState(false);
  useLockBody(sheetOpen);

  const state: FilterState = {
    category: params.get("category") ?? "",
    price: params.get("price") ?? "",
    tag: params.get("tag") ?? "",
    color: params.get("color") ?? "",
    stock: params.get("stock") === "1",
  };
  const sort = (params.get("sort") ?? "popular") as SortId;
  const query = params.get("q") ?? "";

  const setParams = useCallback(
    (patch: Record<string, string | boolean | undefined>) => {
      const next = new URLSearchParams(params.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (!v || v === "false") next.delete(k);
        else next.set(k, v === true ? "1" : String(v));
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const filtered = useMemo(() => {
    const bucket = priceBuckets.find((b) => b.id === state.price);
    const q = query.trim().toLowerCase();

    const list = localize(products).filter((p) => {
      if (state.category && p.category !== state.category) return false;
      if (bucket && (p.price < bucket.min || p.price >= bucket.max))
        return false;
      if (state.tag && !p.tags.includes(state.tag as never)) return false;
      if (state.color && !p.colors.some((c) => c.name === state.color))
        return false;
      if (state.stock && p.stock <= 0) return false;
      if (
        q &&
        !(
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "new")
      sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else
      sorted.sort(
        (a, b) =>
          Number(b.tags.includes("bestseller")) -
            Number(a.tags.includes("bestseller")) || b.reviews - a.reviews,
      );
    return sorted;
  }, [products, localize, state.category, state.price, state.tag, state.color, state.stock, sort, query]);

  const activeCategory = state.category
    ? categoryMap[state.category as CategorySlug]
    : undefined;
  const activeText = activeCategory
    ? t.categories[activeCategory.slug]
    : undefined;

  const activeChips: { label: string; clear: Record<string, string> }[] = [
    activeText && { label: activeText.title, clear: { category: "" } },
    state.price && {
      label: t.catalog.priceBuckets[state.price as never] ?? "",
      clear: { price: "" },
    },
    state.tag && {
      label: t.tagFilters[state.tag as never] ?? "",
      clear: { tag: "" },
    },
    state.color && {
      label: t.colors[state.color] ?? state.color,
      clear: { color: "" },
    },
    state.stock && { label: t.catalog.inStock, clear: { stock: "" } },
    query && { label: `«${query}»`, clear: { q: "" } },
  ].filter(Boolean) as unknown as {
    label: string;
    clear: Record<string, string>;
  }[];

  useEffect(() => {
    if (sheetOpen) setSheetOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.category]);

  const clearAll = () =>
    setParams({
      category: "",
      price: "",
      tag: "",
      color: "",
      stock: "",
      q: "",
    });

  return (
    <>
      <DocumentTitle title={activeText ? activeText.title : t.catalog.title} />
      {/* шапка каталогу */}
      <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(160deg,#FBF8F4_0%,#F5EFE6_60%,#F2EEE9_100%)] py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[26rem] w-[26rem] rounded-full opacity-70 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              activeCategory?.accent ?? "#EFDDD2"
            }55, transparent 65%)`,
          }}
        />
        <div className="container-x relative">
          <nav className="mb-6 flex items-center gap-2 text-[0.75rem] text-ink-3">
            <Link href="/" className="hover:text-ink">
              {t.common.home}
            </Link>
            <span>/</span>
            <Link href="/catalog" className="hover:text-ink">
              {t.common.catalog}
            </Link>
            {activeText && (
              <>
                <span>/</span>
                <span className="text-ink">{activeText.title}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h1 className="font-display text-[2.3rem] leading-[1.05] sm:text-[3rem]">
                {activeText ? activeText.title : t.catalog.title}
              </h1>
              <p className="lead mt-4 text-sm leading-relaxed">
                {activeText ? activeText.description : t.catalog.text}
              </p>
            </div>
            <p className="text-sm font-medium text-ink-3">
              {filtered.length} {plural(filtered.length, t.catalog.count)}
            </p>
          </div>

          {/* швидкі категорії */}
          <div className="hide-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            <Chip
              active={!state.category}
              onClick={() => setParams({ category: "" })}
            >
              {t.common.all}
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.slug}
                active={state.category === c.slug}
                onClick={() =>
                  setParams({
                    category: state.category === c.slug ? "" : c.slug,
                  })
                }
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: c.accent }}
                  />
                  {t.categories[c.slug].title}
                </span>
              </Chip>
            ))}
            <div aria-hidden className="w-px shrink-0" />
          </div>
        </div>
      </section>

      <section className="container-x py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] xl:gap-14">
          {/* сайдбар */}
          <aside className="hidden lg:block">
            <div className="sticky top-[135px]">
              <Filters
                state={state}
                products={products}
                onChange={(patch) =>
                  setParams(patch as Record<string, string | boolean>)
                }
              />
            </div>
          </aside>

          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSheetOpen(true)}
                  className={cn(
                    buttonStyles({ variant: "outline", size: "sm" }),
                    "lg:hidden",
                  )}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {t.common.filters}
                  {activeChips.length > 0 && (
                    <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[0.65rem] text-paper">
                      {activeChips.length}
                    </span>
                  )}
                </button>

                {activeChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => setParams(chip.clear)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-sand px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-2 transition-colors hover:bg-sand-2"
                  >
                    {chip.label}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {activeChips.length > 1 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="cursor-pointer text-[0.78rem] text-ink-3 underline underline-offset-4 hover:text-ink"
                  >
                    {t.common.clearAll}
                  </button>
                )}
              </div>

              <Select
                aria-label={t.catalog.sort}
                value={sort}
                onChange={(e) => setParams({ sort: e.target.value })}
                className="w-auto min-w-52 py-2.5 text-[0.84rem]"
              >
                {sortIds.map((id) => (
                  <option key={id} value={id}>
                    {t.catalog.sortOptions[id]}
                  </option>
                ))}
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-ink/15 px-8 py-20 text-center">
                <p className="font-display text-2xl">{t.catalog.emptyTitle}</p>
                <p className="lead mx-auto mt-3 max-w-sm text-sm">
                  {t.catalog.emptyText}
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className={cn(buttonStyles({ variant: "outline" }), "mt-6")}
                >
                  {t.common.reset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} className="h-full" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* мобільні фільтри */}
      <div
        className={cn(
          "fixed inset-0 z-[84] lg:hidden",
          sheetOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!sheetOpen}
      >
        <div
          onClick={() => setSheetOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/25 backdrop-blur-[2px] transition-opacity duration-500",
            sheetOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-[28px] bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            sheetOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="sticky top-0 flex items-center justify-between border-b border-line bg-paper px-5 py-4">
            <p className="font-display text-2xl">{t.common.filters}</p>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label={t.common.close}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-sand"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="px-2 py-4">
            <Filters
              state={state}
              products={products}
              onChange={(patch) =>
                setParams(patch as Record<string, string | boolean>)
              }
            />
          </div>
          <div className="sticky bottom-0 border-t border-line bg-paper px-5 py-4">
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className={buttonStyles({ full: true })}
            >
              {t.catalog.show} {filtered.length}{" "}
              {plural(filtered.length, t.catalog.count)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
